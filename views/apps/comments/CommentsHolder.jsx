// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Mail Components Imports
// import MailCard from "./MailCard";
// import MailDetails from "./MailDetails";
// import ComposePopUp from "./ComposePopup";

import { CommentsCard } from "./CommentsCard";

// ** Utils
import { formatDateToMonthShort } from "@utils";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Menu,
  Search,
  Folder,
  Tag,
  Mail,
  Trash,
  Edit2,
  Info,
} from "react-feather";

// ** Reactstrap Imports
import {
  Input,
  Label,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { AdminGetCourseCommentsAPI } from "../../../src/@core/Services/Api/Comments/adminGetCourseCommentsAPI";
import { useCommentsAdminStore } from "../../../src/utility/context/Comments/Comments";
import { AdminGetCommentsUserDetailsApi } from "../../../src/@core/Services/Api/Comments/adminGetCommentsUserDetailsApi";
import { CustomPagination } from "./CustomPagination";
import { useLocation, useParams } from "react-router-dom";

const CommentsHolder = ({ isAccept }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [accept, setAccept] = useState(isAccept);

  /* Get all Comments */
  const {
    allComments,
    setAllComments,
    CommentsTotalCount,
    setCommentsTotalCount,
    rowOfPage,
    setRowOfPage,
    sortType,
    setSortType,
    SearchDatas,
    setSearchDatas,
  } = useCommentsAdminStore();

  const AdminGetCourseCommentsFunc = async () => {
    console.log(accept);

    try {
      const result = await AdminGetCourseCommentsAPI(
        currentPage,
        rowOfPage,
        accept
      );

      setAllComments(result.comments);

      setCommentsTotalCount(result.totalCount);

      setRowOfPage(5);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    AdminGetCourseCommentsFunc();
  }, [currentPage, rowOfPage]);

  return (
    <Fragment>
      <div className="email-app-list">
        <div className="app-fixed-search d-flex align-items-center">
          <div
            className="sidebar-toggle d-block d-lg-none ms-1"
            // onClick={() => setSidebarOpen(true)}
          >
            <Menu size="21" />
          </div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="email-search"
                placeholder="Search email"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="app-action">
          <div className="action-left form-check">
            <Input
              type="checkbox"
              id="select-all"
              //   onChange={handleSelectAll}
              //   checked={
              //     selectedMails.length && selectedMails.length === mails.length
              //   }
            />
            <Label
              className="form-check-label fw-bolder ps-25 mb-0"
              for="select-all"
            >
              انتخاب همه
            </Label>
          </div>
          {/* {selectedMails.length ? ( */}
          <div className="action-right">
            <ul className="list-inline m-0">
              <li className="list-inline-item me-1"></li>
              <li className="list-inline-item me-1"></li>

              <li className="list-inline-item">
                <span
                  className="action-icon"
                  // onClick={() => handleMailToTrash(selectedMails)}
                >
                  <Trash size={18} />
                </span>
              </li>
            </ul>
          </div>
          {/* // ) : null} */}
        </div>

        <PerfectScrollbar
          className="email-user-list"
          options={{ wheelPropagation: false }}
        >
          <div>
            {allComments ? (
              <ul className="email-media-list" style={{ position: "relative" }}>
                {" "}
                {allComments.map((item, index) => {
                  return (
                    <CommentsCard
                      key={index}
                      accept={item.accept}
                      commentId={item.commentId}
                      commentTitle={item.commentTitle}
                      courseId={item.courseId}
                      courseTitle={item.courseTitle}
                      describe={item.describe}
                      dislikeCount={item.dislikeCount}
                      likeCount={item.likeCount}
                      replyCommentId={item.replyCommentId}
                      replyCount={item.replyCount}
                      userFullName={item.userFullName}
                      userId={item.userId}
                      data={item}
                    />
                  );
                })}
              </ul>
            ) : (
              <div className="no-results d-block">
                <h5>داده ای یافت نشد</h5>
              </div>
            )}
            <CustomPagination
              style={{
                border: "1px solid blue",
                background: "#fff",
                width: "100%",
                position: "absolute",
                bottom: "100px",
              }}
              className="justify-content-center"
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
};

export { CommentsHolder };
// ** React Imports
// import { Fragment, useEffect, useState } from "react";

// // ** Mail Components Imports
// // import MailCard from "./MailCard";
// // import MailDetails from "./MailDetails";
// // import ComposePopUp from "./ComposePopup";

// import { CommentsCard } from "./CommentsCard";

// // ** Utils
// import { formatDateToMonthShort } from "@utils";

// // ** Third Party Components
// import PerfectScrollbar from "react-perfect-scrollbar";
// import {
//   Menu,
//   Search,
//   Folder,
//   Tag,
//   Mail,
//   Trash,
//   Edit2,
//   Info,
// } from "react-feather";

// // ** Reactstrap Imports
// import {
//   Input,
//   Label,
//   InputGroup,
//   DropdownMenu,
//   DropdownItem,
//   InputGroupText,
//   DropdownToggle,
//   UncontrolledDropdown,
// } from "reactstrap";
// import { AdminGetCourseCommentsAPI } from "../../../src/@core/Services/Api/Comments/adminGetCourseCommentsAPI";
// import { useCommentsAdminStore } from "../../../src/utility/context/Comments/Comments";
// import { AdminGetCommentsUserDetailsApi } from "../../../src/@core/Services/Api/Comments/adminGetCommentsUserDetailsApi";
// import { CustomPagination } from "./CustomPagination";
// import { useLocation, useParams } from "react-router-dom";

// const CommentsHolder = ({ isAccept }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const [accept, setAccept] = useState(isAccept);

//   /* Get all Comments */
//   const {
//     allComments,
//     setAllComments,
//     CommentsTotalCount,
//     setCommentsTotalCount,
//     rowOfPage,
//     setRowOfPage,
//     sortType,
//     setSortType,
//     SearchDatas,
//     setSearchDatas,
//   } = useCommentsAdminStore();

//   const AdminGetCourseCommentsFunc = async () => {
//     console.log(accept);

//     try {
//       const result = await AdminGetCourseCommentsAPI(
//         currentPage,
//         rowOfPage,
//         accept
//       );

//       setAllComments(result.comments);

//       setCommentsTotalCount(result.totalCount);

//       setRowOfPage(3);
//     } catch (error) {
//       return false;
//     }
//   };

//   useEffect(() => {
//     AdminGetCourseCommentsFunc();
//   }, [currentPage, rowOfPage]);

//   return (
//     <Fragment>
//       <div className="email-app-list">
//         <div className="app-fixed-search d-flex align-items-center">
//           <div
//             className="sidebar-toggle d-block d-lg-none ms-1"
//             // onClick={() => setSidebarOpen(true)}
//           >
//             <Menu size="21" />
//           </div>
//           <div className="d-flex align-content-center justify-content-between w-100">
//             <InputGroup className="input-group-merge">
//               <InputGroupText>
//                 <Search className="text-muted" size={14} />
//               </InputGroupText>
//               <Input
//                 id="email-search"
//                 placeholder="Search email"
//                 // value={query}
//                 // onChange={(e) => setQuery(e.target.value)}
//               />
//             </InputGroup>
//           </div>
//         </div>
//         <div className="app-action">
//           <div className="action-left form-check">
//             <Input
//               type="checkbox"
//               id="select-all"
//               //   onChange={handleSelectAll}
//               //   checked={
//               //     selectedMails.length && selectedMails.length === mails.length
//               //   }
//             />
//             <Label
//               className="form-check-label fw-bolder ps-25 mb-0"
//               for="select-all"
//             >
//               انتخاب همه
//             </Label>
//           </div>
//           {/* {selectedMails.length ? ( */}
//           <div className="action-right">
//             <ul className="list-inline m-0">
//               <li className="list-inline-item me-1"></li>
//               <li className="list-inline-item me-1"></li>

//               <li className="list-inline-item">
//                 <span
//                   className="action-icon"
//                   // onClick={() => handleMailToTrash(selectedMails)}
//                 >
//                   <Trash size={18} />
//                 </span>
//               </li>
//             </ul>
//           </div>
//           {/* // ) : null} */}
//         </div>

//         <PerfectScrollbar
//           className="email-user-list"
//           options={{ wheelPropagation: false }}
//         >
//           <div>
//             {allComments ? (
//               <ul className="email-media-list" style={{ position: "relative" }}>
//                 {" "}
//                 {allComments.map((item, index) => {
//                   return (
//                     <CommentsCard
//                       key={index}
//                       accept={item.accept}
//                       commentId={item.commentId}
//                       commentTitle={item.commentTitle}
//                       courseId={item.courseId}
//                       courseTitle={item.courseTitle}
//                       describe={item.describe}
//                       dislikeCount={item.dislikeCount}
//                       likeCount={item.likeCount}
//                       replyCommentId={item.replyCommentId}
//                       replyCount={item.replyCount}
//                       userFullName={item.userFullName}
//                       userId={item.userId}
//                     />
//                   );
//                 })}
//               </ul>
//             ) : (
//               <div className="no-results d-block">
//                 <h5>داده ای یافت نشد</h5>
//               </div>
//             )}
//             <CustomPagination
//               style={{
//                 border: "1px solid blue",
//                 background: "#fff",
//                 width: "100%",
//                 position: "absolute",
//                 bottom: "100px",
//               }}
//               className="justify-content-center"
//               setCurrentPage={setCurrentPage}
//               currentPage={currentPage}
//             />
//           </div>
//         </PerfectScrollbar>
//       </div>
//     </Fragment>
//   );
// };

// export { CommentsHolder };
