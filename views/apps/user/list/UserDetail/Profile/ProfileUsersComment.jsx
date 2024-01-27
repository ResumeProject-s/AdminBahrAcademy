// ** Custom Components
import Avatar from "@components/avatar";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
// ** Third Party Components
import classnames from "classnames";
import { CheckCircle, Star } from "react-feather";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";

const ProfileUsersComment = ({ data, UseCount }) => {
  const { count, setCount } = UseCount;
  console.log(count);
  const renderFeeds = () => {
    return (
      <>
        {data.comments
          ? data.comments?.map((comment, index) => {
              return (
                <div
                  className={classnames("profile-twitter-feed", {
                    "mt-1": index === 0,
                    "mt-2": index !== 0,
                  })}
                  key={index}
                >
                  <div className="d-flex justify-content-start align-items-center mb-1">
                    {/* <Avatar
              className="me-1"
              img={feed.imgUrl}
              imgHeight="40"
              imgWidth="40"
            /> */}
                    <div className="profile-user-info">
                      <h6 className="mb-0">نام دوره : {comment.courseTitle}</h6>
                      {/* <a href="/" onClick={(e) => e.preventDefault()}>
                <small className="text-muted">@{comment.courseId}</small>
                <CheckCircle size={14} />
              </a> */}
                    </div>
                  </div>
                  <CardText className="mb-50">
                    {" "}
                    کامنت : {comment.describe}
                  </CardText>
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    <small>
                      {comment.likeCount + " "}
                      <AiFillLike />
                    </small>
                    <small>
                      {comment.dislikeCount + " "}
                      <AiFillDislike />
                    </small>
                  </a>
                </div>
              );
            })
          : "کامنتی موجود نیست ..."}
      </>
    );
  };

  return (
    <Card>
      <CardBody>
        <h5> کامنت های کاربر</h5>
        {renderFeeds()}
      </CardBody>
      <div className="d-flex gap-xl-1 p-2">
        <div
          className="cursor-pointer"
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          <FaArrowRight />
        </div>
        <div className="">page num {count}</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setCount((prev) => prev - 1);
          }}
        >
          <FaArrowLeft />
        </div>
      </div>
    </Card>
  );
};

export default ProfileUsersComment;
