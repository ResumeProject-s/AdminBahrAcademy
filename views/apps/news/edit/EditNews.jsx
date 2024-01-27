import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewsDetailStore } from "../../../../src/utility/context/News/NewsDetail";
import { AdminGetNewsWithIdApi } from "../../../../src/services/api/news/adminGetNewsWithIdApi";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap"; // import { Breadcrumbs } from "@components/breadcrumbs";
import Avatar from "./../../../../src/@core/components/avatar/index";
import { makeDatePersian } from "./../../../../src/utility/makeDatePersian/makeDatePersian";
import SelectBasic from "./SelectBasic/SelectBasic";
import { AdminGetNewsCategoryApi } from "../../../../src/services/api/news/adminGetNewsCategoryApi";
import { MakingListForSelect } from "../add/steps-with-validation/SelectBasic/MakingListForSelect";
import SwitchIcons from "../../../../src/@core/components/Switch/SwitchIcons";
import classnames from "classnames";
import FileUploaderSingle from "./../../../../src/@core/components/FileUploader/FileUploaderSingle";
import { AdminNewsDetailsGetUserApi } from "../../../../src/services/api/news/adminNewsDetailsGetUserApi";
import { EditNewsFormData } from "../../../../src/utility/FormData/EditNewsFormData";
import { AdminUpdateNewsApi } from "../../../../src/services/api/news/adminUpdateNewsApi";
import SuccessSweetAlertFunction from "../../../../src/utility/SweetAlertFuncs/SuccessSweetAlertFunction";
import ErrorSweetAlertFunction from "../../../../src/utility/SweetAlertFuncs/ErrorSweetAlertFunction";

const EditNews = () => {
  const navigate = useNavigate();

  useEffect(() => {
    GetNewsDetailWithIdFunc();
    AdminGetNewsCategoryFunc();
  }, []);

  const [editNewsDataObj, setEditNewsDataObj] = useState({});

  const [allNewsCategories, setAllNewsCategories] = useState();

  const [MainImages, setMainImages] = useState([]);
  const [isToggleSlider, setIsToggleSlider] = useState();

  const {
    newsDetails,
    setNewsDetails,
    newsComments,
    setNewsComments,
    reserved,
    setReserved,
  } = useNewsDetailStore();

  const [newsDetailsUserDetails, setNewsDetailsUserDetails] = useState();

  const newsId = useParams().id;

  const GetNewsDetailWithIdFunc = async () => {
    try {
      const result = await AdminGetNewsWithIdApi(newsId);

      AdminNewsDetailsGetUserFunc(result.detailsNewsDto.userId);

      setNewsDetails(result.detailsNewsDto);
      setMiniDescribeValue(result.detailsNewsDto.miniDescribe);
      setIsActiveToggle(result.detailsNewsDto.active);
      setIsToggleSlider(result.detailsNewsDto.isSlider);
    } catch (error) {
      return false;
    }
  };

  const AdminGetNewsCategoryFunc = async () => {
    try {
      const result = await AdminGetNewsCategoryApi();
      if (result) {
        setAllNewsCategories(MakingListForSelect(result, "id", "categoryName"));
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  const [miniDescribeValue, setMiniDescribeValue] = useState("");
  const [isActiveToggle, setIsActiveToggle] = useState();

  const AdminNewsDetailsGetUserFunc = async (value) => {
    try {
      const result = await AdminNewsDetailsGetUserApi(value);

      setNewsDetailsUserDetails(result);
    } catch (error) {
      return false;
    }
  };

  const AdminUpdateNewsFunc = async () => {
    try {
      const formData = EditNewsFormData(editNewsDataObj);

      const result = await AdminUpdateNewsApi(formData);

      if (result.success === true) {
        SuccessSweetAlertFunction("موفق!", result.message);

        setTimeout(() => navigate(`/NewsDetail/${newsDetails.id}`), 1500);
      } else if (result.success === false) {
        ErrorSweetAlertFunction("ناموفق!", result.message);
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="blog-edit-wrapper">
      {newsDetails ? (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div>
                    {newsDetailsUserDetails !== undefined ? (
                      <img
                        src={newsDetailsUserDetails.currentPictureAddress}
                        className="me-1 rounded-circle shadow-lg"
                        width="32"
                        height="32"
                      />
                    ) : (
                      <Avatar
                        initials
                        className="me-1"
                        color={"light-primary"}
                        content={"نویسنده"}
                      />
                    )}
                  </div>
                  <div>
                    <h6 className="mb-25">{newsDetails.addUserFullName}</h6>
                    <CardText>
                      {makeDatePersian(newsDetails.insertDate)}
                    </CardText>
                  </div>
                </div>{" "}
                <Form
                  className="mt-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEditNewsDataObj({
                      Id: newsDetails.id,
                      Title: e.target.Title.value,
                      NewsCatregoryId: e.target.newsCatagoryId.value,
                      Keyword: e.target.editNewsKeyword.value,
                      MiniDescribe: e.target.miniDescribe.value,
                      Active: isActiveToggle,
                      Describe: e.target.newsDescribe.value,
                      GoogleTitle: e.target.editNewsGoogleTitle.value,
                      GoogleDescribe: e.target.editNewsGoogleDescribe.value,
                      SlideNumber: 1,
                      CurrentImageAddress: newsDetails.currentImageAddress,
                      CurrentImageAddressTumb:
                        newsDetails.currentImageAddressTumb,
                      Image: MainImages[0],
                      IsSlider: false,
                    });

                    AdminUpdateNewsFunc();
                  }}
                >
                  <Row>
                    <Col>
                      <SwitchIcons
                        name="Active"
                        isToggle={isActiveToggle}
                        setIsToggle={setIsActiveToggle}
                        switchText="فعال شدن خبر :"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" className="mb-2">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label"
                        for="Title"
                      >
                        عنوان خبر
                      </Label>
                      <Input
                        id="Title"
                        name="Title"
                        defaultValue={newsDetails.title}
                      />
                    </Col>
                    <Col md="4" className="mb-2">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label"
                        for="editNewsKeyword"
                      >
                        کلمات کلیدی خبر
                      </Label>
                      <Input
                        id="editNewsKeyword"
                        name="editNewsKeyword"
                        defaultValue={newsDetails.keyword}
                      />
                    </Col>
                    <Col md="3" className="mb-2">
                      <SelectBasic
                        name={"newsCatagoryId"}
                        opt={allNewsCategories}
                        text={"دسته بندی خبر"}
                        defaultValue={
                          allNewsCategories[newsDetails.newsCatregoryId - 1]
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" className="mb-1">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label"
                        for={`miniDescribe`}
                      >
                        توضیحات مختصر خبر{" "}
                      </Label>
                      <div className="form-floating mb-0">
                        <Input
                          name="miniDescribe"
                          value={miniDescribeValue}
                          type="textarea"
                          style={{ minHeight: "70px" }}
                          onChange={(e) => setMiniDescribeValue(e.target.value)}
                          className={classnames({
                            "text-danger": miniDescribeValue.length > 200,
                          })}
                        />
                      </div>
                      <span
                        className={classnames(
                          "textarea-counter-value float-end",
                          {
                            "bg-danger": miniDescribeValue.length > 200,
                          }
                        )}
                      >
                        {`${miniDescribeValue.length} / 200`}
                      </span>
                    </Col>

                    <Col xs="12" className="mb-1">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label"
                        for="newsDescribe"
                      >
                        توضیحات کامل خبر{" "}
                      </Label>
                      <Input
                        name="newsDescribe"
                        type="textarea"
                        id="newsDescribe"
                        defaultValue={newsDetails.describe}
                        rows="6"
                        placeholder="مثال:"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" className="mb-2">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label"
                        for="editNewsGoogleTitle"
                      >
                        عنوان خبر در گوگل{" "}
                      </Label>
                      <Input
                        id="editNewsGoogleTitle"
                        name="editNewsGoogleTitle"
                        defaultValue={newsDetails.googleTitle}
                      />
                    </Col>
                    <Col xs="12" className="mb-2">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label"
                        for="editNewsGoogleDescribe"
                      >
                        توضیحات کامل خبر در گوگل
                      </Label>
                      <Input
                        name="editNewsGoogleDescribe"
                        type="textarea"
                        id="editNewsGoogleDescribe"
                        defaultValue={newsDetails.googleDescribe}
                        rows="6"
                        placeholder="مثال:"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="2" className="mx-auto">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label  mb-1"
                      >
                        تامبنیل خبر{" "}
                      </Label>{" "}
                      <figure className="w-100 rounded mx-auto">
                        <img
                          className="w-100 rounded"
                          src={newsDetails.currentImageAddressTumb}
                          alt="currentImageAddress"
                        />
                      </figure>
                    </Col>
                    <Col xs="10" className="mx-auto">
                      <Label
                        style={{ fontSize: "15px" }}
                        className="form-label  mb-1"
                      >
                        عکس خبر{" "}
                      </Label>{" "}
                      <figure className="w-100  rounded mx-auto shadow-lg">
                        <img
                          className="w-100 rounded"
                          src={newsDetails.currentImageAddress}
                          alt="currentImageAddress"
                        />
                      </figure>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FileUploaderSingle
                        files={MainImages}
                        setFiles={setMainImages}
                        text="تصویر جدید خبر"
                      />
                    </Col>
                    <Col xs="5">
                      {" "}
                      <SwitchIcons
                        name="newsIsSlider"
                        isToggle={isToggleSlider}
                        setIsToggle={setIsToggleSlider}
                        switchText="تبدیل به اسلایدر:"
                      />
                    </Col>
                  </Row>
                  <Col className="">
                    <Button type="submit" color="primary" className="me-1">
                      ثبت ویرایش
                    </Button>
                    <Button
                      onClick={() => navigate(`/NewsDetail/${newsDetails.id}`)}
                      color="secondary"
                      outline
                    >
                      لغو
                    </Button>
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
        <h2>داده ای یافت نشد</h2>
      )}
    </div>
  );
};

export default EditNews;
