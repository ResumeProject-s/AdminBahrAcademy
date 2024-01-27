// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap";

// ** Demo Components
// import ProfilePoll from "./ProfilePolls";
// import ProfileAbout from "./ProfileAbout";
// import ProfilePosts from "./ProfilePosts";
// import ProfileTwitterFeeds from "./ProfileTwitterFeeds";
// import ProfileLatestPhotos from "./ProfileLatestPhotos";
// import ProfileSuggestedPages from "./ProfileSuggestedPages";
// import ProfileFriendsSuggestions from "./ProfileFriendsSuggestions";

// ** Styles
import "@styles/react/pages/page-profile.scss";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileUsersComment from "./ProfileUsersComment";
import ProfileUsersCourse from "./ProfileUsersCourse";
import ReservedCourse from "./ReservedCourse";

const Profile = ({ selectedUser, UsersComment, UseCount }) => {
  // ** States

  const handleBlock = () => {
    setBlock(true);
    setTimeout(() => {
      setBlock(false);
    }, 2000);
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="پروفایل"
        data={[{ title: "لیست کاربران" }, { title: "پروفایل کاربر" }]}
      />
      {selectedUser !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader data={selectedUser} />
            </Col>
          </Row>
          <section id="profile-info">
            <Row>
              <Col
                lg={{ size: 3, order: 1 }}
                sm={{ size: 12 }}
                xs={{ order: 2 }}
              >
                <ProfileAbout data={selectedUser} />
              </Col>
              <Col
                lg={{ size: 6, order: 2 }}
                sm={{ size: 12 }}
                xs={{ order: 1 }}
              >
                <ProfileUsersComment
                  data={UsersComment ? UsersComment : "NO"}
                  UseCount={UseCount}
                />
              </Col>
              <Col
                lg={{ size: 3, order: 3 }}
                sm={{ size: 12 }}
                xs={{ order: 3 }}
              >
                <ProfileUsersCourse data={selectedUser} />
                <ReservedCourse data={selectedUser} />
              </Col>
            </Row>
          </section>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Profile;
