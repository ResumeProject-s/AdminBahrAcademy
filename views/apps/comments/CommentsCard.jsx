import React, { useEffect, useState } from "react";
import { Badge, Input, Label } from "reactstrap";
import Avatar from "../../../src/@core/components/avatar";
import { Star } from "react-feather";
import classnames from "classnames";
import { AdminGetCommentsUserDetailsApi } from "../../../src/@core/Services/Api/Comments/adminGetCommentsUserDetailsApi";
import { useNavigate } from "react-router";

const CommentsCard = ({
  accept,
  commentId,
  commentTitle,
  courseId,
  courseTitle,
  describe,
  dislikeCount,
  likeCount,
  replyCommentId,
  replyCount,
  userFullName,
  userId,
  data,
}) => {
  const [commentsUserDetails, setCommentsUserDetails] = useState();

  const navigate = useNavigate();

  const AdminGetCommentsUserDetailsFunc = async (userId) => {
    try {
      const result = await AdminGetCommentsUserDetailsApi(userId);

      console.log(result);

      setCommentsUserDetails(result);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    AdminGetCommentsUserDetailsFunc(userId);
  }, []);

  return (
    <li
      onClick={() => navigate(`/Comments/Details/${courseId}/${commentId}`)}
      className={classnames("d-flex user-mail")}
    >
      <div className="mail-left pe-50">
        {commentsUserDetails !== undefined ? (
          <Avatar img={commentsUserDetails.currentPictureAddress} />
        ) : (
          <Avatar initials content="News" />
        )}
        <div className="user-action">
          {/* <Input
            label=''
            type='checkbox'
            checked={selectedMails.includes(mail.id)}
            id={`${mail.from.name}-${mail.id}`}
            onChange={e => e.stopPropagation()}
            onClick={e => {
              dispatch(selectMail(mail.id))
              e.stopPropagation()
            }}
          /> */}
          <div className="form-check">
            <Input
              type="checkbox"
              //   id={`${mail.from.name}-${mail.id}`}
              //   onChange={e => e.stopPropagation()}
              //   checked={selectedMails.includes(mail.id)}
              //   onClick={e => {
              //     dispatch(selectMail(mail.id))
              //     e.stopPropagation()
              //   }}
            />
            <Label
            //   onClick={(e) => e.stopPropagation()}
            //   for={`${mail.from.name}-${mail.id}`}
            ></Label>
          </div>
          <div
            className="email-favorite"
            // onClick={e => {
            //   e.stopPropagation()
            //   dispatch(updateMails({ emailIds: [mail.id], dataToUpdate: { isStarred: !mail.isStarred } }))
            // }}
          >
            <Star
              size={14}
              //   className={classnames({
              //     favorite: mail.isStarred
              //   })}
            />
          </div>
        </div>
      </div>
      <div className="mail-body">
        <div className="mail-details">
          <div className="mail-items">
            <h5 className="mb-25">
              {commentsUserDetails !== undefined
                ? commentsUserDetails.fName
                : ""}
              {commentsUserDetails !== undefined
                ? commentsUserDetails.lName
                : ""}
            </h5>
            <span className="text-truncate">{commentTitle}</span>
          </div>
          <div className="mail-meta-item">
            {accept === true ? (
              <Badge
                color="light-success"
                className="bg-success text-white rounded-pill "
              >
                فعال
              </Badge>
            ) : (
              <Badge
                pill
                color="light-danger"
                className="bg-danger  text-white rounded-pill "
              >
                غیر فعال
              </Badge>
            )}
            <div>
              {" "}
              <span
                style={{ fontSize: "15px" }}
                className="mail-date text-primary"
              >
                {courseTitle}
              </span>
            </div>
          </div>
        </div>
        <div className="mail-message">
          <p className="text-truncate mb-0">{describe}</p>
        </div>
      </div>
    </li>
  );
};

export { CommentsCard };
