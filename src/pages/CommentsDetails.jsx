// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Card,
  CardBody,
  CardText,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  Label,
  Row,
  Col,
  Input,
} from "reactstrap";

// ** Images
import profileImg from "@src/assets/images/portrait/small/avatar-s-7.jpg";
import { useParams } from "react-router";
import { Fragment, useEffect, useState } from "react";
import { AdminGetCourseCommentsAPI } from "../@core/Services/Api/Comments/adminGetCourseCommentsAPI";
import { AdminGetCourseIdCommentsApi } from "../@core/Services/Api/Comments/adminGetCourseIdCommentsApi";
import { makeDatePersian } from "./../utility/makeDatePersian/makeDatePersian";
import { comment } from "postcss";
import { onSetReplyCommentFormData } from "../utility/FormData/onSetReplyCommentFormData";
import { AdminReplyCommentsApi } from "../@core/Services/Api/Comments/adminReplyCommentsApi";
import SuccessSweetAlertFunction from "./../utility/SweetAlertFuncs/SuccessSweetAlertFunction";
import ErrorSweetAlertFunction from "../utility/SweetAlertFuncs/ErrorSweetAlertFunction";
import { AdminGetCourseIdCommentsReplyApi } from "../@core/Services/Api/Comments/adminGetCourseIdCommentsReplyApi";

const CommentsDetails = () => {
  const courseIdParams = useParams().courseId;
  const commentIdParams = useParams().commentsId;

  const [allComments, setAllComments] = useState();
  const [commentDetail, setCommentDetail] = useState();
  const [commentReplyArray, setCommentReplyArray] = useState();

  /* FormReply */
  const [titleReply, setTitleReply] = useState();
  const [describeReply, setDescribeReply] = useState();

  const [commentReply, setCommentReply] = useState();

  const getAllCommentsFunc = async () => {
    try {
      const result = await AdminGetCourseIdCommentsApi(courseIdParams);

      setAllComments(result);

      const commentFilter = allComments.filter(
        (items) => items.id === commentIdParams
      );

      setCommentDetail(commentFilter[0]);
    } catch (error) {
      return false;
    }
  };

  const AdminReplyCommentsFunc = async () => {
    try {
      const formData = onSetReplyCommentFormData(commentReply);

      const result = await AdminReplyCommentsApi(formData);

      if (result.success === true) {
        SuccessSweetAlertFunction(result.message);
        setBasicModal(!basicModal);
      } else if (result.success === false) {
        ErrorSweetAlertFunction("ناموفق!", result.error.message);
      }

      console.log(commentReply);
    } catch (error) {
      return false;
    }
  };

  const AdminGetCourseIdCommentsReplyFunc = async () => {
    try {
      const result = await AdminGetCourseIdCommentsReplyApi(
        courseIdParams,
        commentIdParams
      );

      const commentReplyFilter = result.filter(
        (items) => items.parentId === commentIdParams
      );

      setCommentReplyArray(commentReplyFilter);

      console.log(commentReplyFilter, "l,mk");
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    getAllCommentsFunc();
    AdminGetCourseIdCommentsReplyFunc();
  }, []);

  /* Comments Details */
  const [basicModal, setBasicModal] = useState(false);
  const [centeredModal, setCenteredModal] = useState(false);
  const [disabledModal, setDisabledModal] = useState(false);
  const [disabledAnimation, setDisabledAnimation] = useState(false);

  const commentBadge = (accept) => {
    if (accept === true) {
      return (
        <Badge
          color="light-success"
          className="bg-success text-white rounded-pill "
        >
          فعال
        </Badge>
      );
    } else {
      return (
        <Badge
          pill
          color="light-danger"
          className="bg-danger  text-white rounded-pill "
        >
          غیر فعال
        </Badge>
      );
    }
  };

  return (
    <Fragment>
      <PerfectScrollbar
        style={{ height: "100%" }}
        className="email-user-list"
        options={{ wheelPropagation: false }}
      >
        <div>
          <Card className="card-apply-job">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  {commentDetail !== undefined ? (
                    <Avatar
                      className="me-1"
                      img={commentDetail.pictureAddress}
                      imgHeight="42"
                      imgWidth="42"
                    />
                  ) : (
                    <Avatar initials content="عکس نویسنده" />
                  )}
                  <div>
                    {commentDetail !== undefined ? (
                      <h6 className="mb-0">{commentDetail.author}</h6>
                    ) : (
                      <h6 className="mb-0">نویسنده</h6>
                    )}
                    <small className="text-muted">
                      {commentDetail
                        ? makeDatePersian(commentDetail.insertDate)
                        : "تاریخ نویشتن"}
                    </small>
                  </div>
                </div>
                {commentDetail !== undefined ? (
                  commentBadge(commentDetail.accept)
                ) : (
                  <Badge
                    color="light-secondary"
                    className="bg-secondary text-white rounded-pill "
                  >
                    نا مشخص
                  </Badge>
                )}
              </div>
              <h5 className="apply-job-title">
                {commentDetail !== undefined ? commentDetail.title : "عنوان"}
              </h5>
              <CardText className="mb-2">
                {commentDetail !== undefined ? commentDetail.describe : "متن"}
              </CardText>

              <div className="d-grid">
                <div className="basic-modal">
                  <Button
                    className="mx-auto "
                    color="primary"
                    outline
                    onClick={() => setBasicModal(!basicModal)}
                  >
                    پاسخ
                  </Button>
                  <Modal
                    isOpen={basicModal}
                    toggle={() => setBasicModal(!basicModal)}
                  >
                    <ModalHeader toggle={() => setBasicModal(!basicModal)}>
                      فرم پاسخ
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setCommentReply({
                            CommentId: commentIdParams,
                            CourseId: courseIdParams,
                            Title: titleReply,
                            Describe: describeReply,
                          });

                          AdminReplyCommentsFunc();
                        }}
                      >
                        <Row>
                          <Col xs="12">
                            <Label
                              style={{ fontSize: "15px" }}
                              className="form-label"
                              for="replyTitle"
                            >
                              عنوان{" "}
                            </Label>
                            <Input
                              id="replyTitle"
                              name="replyTitle"
                              type="text"
                              onChange={(e) => setTitleReply(e.target.value)}
                            />
                          </Col>
                          <Col xs="12">
                            <Label
                              style={{ fontSize: "15px" }}
                              className="form-label"
                              for="replyDescribe"
                            >
                              متن{" "}
                            </Label>
                            <Input
                              name="replyDescribe"
                              type="textarea"
                              row="6"
                              onChange={(e) => setDescribeReply(e.target.value)}
                            />
                          </Col>
                          <Row style={{ marginTop: "40px" }}>
                            <Button color="primary" type="submit">
                              ثبت
                            </Button>
                          </Row>
                        </Row>
                      </Form>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                  </Modal>
                </div>{" "}
              </div>
            </CardBody>
          </Card>

          {commentReplyArray !== undefined
            ? commentReplyArray.map((item, index) => {
                return (
                  <Card className="card-apply-job bg-light-primary">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div className="d-flex align-items-center">
                          {item !== undefined ? (
                            <Avatar
                              className="me-1"
                              img={item.pictureAddress}
                              imgHeight="42"
                              imgWidth="42"
                            />
                          ) : (
                            <Avatar initials content="عکس نویسنده" />
                          )}
                          <div>
                            {item !== undefined ? (
                              <h6 className="mb-0">{item.author}</h6>
                            ) : (
                              <h6 className="mb-0">نویسنده</h6>
                            )}
                            <small className="text-muted">
                              {item
                                ? makeDatePersian(item.insertDate)
                                : "تاریخ نویشتن"}
                            </small>
                          </div>
                        </div>
                        {item !== undefined ? (
                          commentBadge(item.accept)
                        ) : (
                          <Badge
                            color="light-secondary"
                            className="bg-secondary text-white rounded-pill "
                          >
                            نا مشخص
                          </Badge>
                        )}
                      </div>
                      <h5 className="apply-job-title">
                        {item !== undefined ? item.title : "عنوان"}
                      </h5>
                      <CardText className="mb-2">
                        {item !== undefined ? item.describe : "متن"}
                      </CardText>

                      <div className="d-grid">
                        <div className="basic-modal">
                          <Button
                            className="mx-auto "
                            color="primary"
                            outline
                            onClick={() => setBasicModal(!basicModal)}
                          >
                            پاسخ
                          </Button>
                          <Modal
                            isOpen={basicModal}
                            toggle={() => setBasicModal(!basicModal)}
                          >
                            <ModalHeader
                              toggle={() => setBasicModal(!basicModal)}
                            >
                              فرم پاسخ
                            </ModalHeader>
                            <ModalBody>
                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  setCommentReply({
                                    CommentId: commentIdParams,
                                    CourseId: courseIdParams,
                                    Title: titleReply,
                                    Describe: describeReply,
                                  });

                                  AdminReplyCommentsFunc();
                                }}
                              >
                                <Row>
                                  <Col xs="12">
                                    <Label
                                      style={{ fontSize: "15px" }}
                                      className="form-label"
                                      for="replyTitle"
                                    >
                                      عنوان{" "}
                                    </Label>
                                    <Input
                                      id="replyTitle"
                                      name="replyTitle"
                                      type="text"
                                      onChange={(e) =>
                                        setTitleReply(e.target.value)
                                      }
                                    />
                                  </Col>
                                  <Col xs="12">
                                    <Label
                                      style={{ fontSize: "15px" }}
                                      className="form-label"
                                      for="replyDescribe"
                                    >
                                      متن{" "}
                                    </Label>
                                    <Input
                                      name="replyDescribe"
                                      type="textarea"
                                      row="6"
                                      onChange={(e) =>
                                        setDescribeReply(e.target.value)
                                      }
                                    />
                                  </Col>
                                  <Row style={{ marginTop: "40px" }}>
                                    <Button color="primary" type="submit">
                                      ثبت
                                    </Button>
                                  </Row>
                                </Row>
                              </Form>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                          </Modal>
                        </div>{" "}
                      </div>
                    </CardBody>
                  </Card>
                );
              })
            : null}
        </div>
      </PerfectScrollbar>
    </Fragment>
  );
};

export default CommentsDetails;
