// ** React Imports
import { Outlet, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// ** Email App Component Imports
// import Mails from "./Comments";
import Sidebar from "./Sidebar";

// ** Third Party Components
import classnames from "classnames";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  getMails,
  selectMail,
  updateMails,
  paginateMail,
  selectAllMail,
  updateMailLabel,
  resetSelectedMail,
  selectCurrentMail,
} from "./store";

// ** Styles
import "@styles/react/apps/app-email.scss";
import { AdminGetCourseCommentsAPI } from "../../../src/@core/Services/Api/Comments/adminGetCourseCommentsAPI";
import { useCommentsAdminStore } from "../../../src/utility/context/Comments/Comments";
import { AdminGetCommentsUserDetailsApi } from "../../../src/@core/Services/Api/Comments/adminGetCommentsUserDetailsApi";
import DataTable from "react-data-table-component";
import { columns } from "./columns";
import { ChevronDown } from "react-feather";

const CommentsApp = () => {
  // ** States
  const [query, setQuery] = useState("");
  const [openMail, setOpenMail] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [commentUserDetail, setCommentUserDetail] = useState();

  /* Get all Comments */
  const {
    allComments,
    setAllComments,
    rowOfPage,
    setRowOfPage,
    sortType,
    setSortType,
    SearchDatas,
    setSearchDatas,
  } = useCommentsAdminStore();

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  // useEffect(() => {
  //   dispatch(
  //     getMails({
  //       q: query || "",
  //       folder: params.folder || "inbox",
  //       label: params.label || "",
  //     })
  //   );
  // }, [query, params.folder, params.label]);

  return (
    <Fragment>
      <Sidebar
        store={allComments}
        dispatch={dispatch}
        getMails={getMails}
        setOpenMail={setOpenMail}
        sidebarOpen={sidebarOpen}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMail={resetSelectedMail}
      />
      <div style={{ width: "100%", height: "100%" }} className="content-right">
        <div className="content-body">
          <div
            className={classnames("body-content-overlay", {
              show: sidebarOpen,
            })}
            onClick={() => setSidebarOpen(true)}
          ></div>

          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default CommentsApp;
