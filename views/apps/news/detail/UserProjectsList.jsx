// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ReactPaginate from "react-paginate";
import { useNewsDetailStore } from "../../../../src/utility/context/News/NewsDetail";

const projectsArr = [
  {
    progress: 60,
    hours: "210:30h",
    progressColor: "info",
    totalTasks: "233/240",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: reactLabel,
  },
  {
    hours: "89h",
    progress: 15,
    totalTasks: "9/50",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: xdLabel,
  },
  {
    progress: 90,
    hours: "129:45h",
    totalTasks: "100/190",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: vueLabel,
  },
  {
    hours: "45h",
    progress: 49,
    totalTasks: "12/86",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: sketchLabel,
  },

  {
    progress: 73,
    hours: "67:10h",
    totalTasks: "234/378",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: reactLabel,
  },
  {
    progress: 81,
    hours: "108:39h",
    totalTasks: "264/537",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: htmlLabel,
  },
  {
    progress: 78,
    hours: "88:19h",
    totalTasks: "214/627",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Vue Admin template",
    img: vueLabel,
  },
];

export const columns = [
  {
    sortable: true,
    minWidth: "150px",
    name: "",
    selector: (row) => row.autor,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.pictureAddress}
              alt={row.autor}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate">{row.autor}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "عنوان نظر",
    selector: (row) => row.title,
    minWidth: "100px",
  },
  {
    name: "شرح نظر",
    selector: (row) => row.describe,
    minWidth: "150px",
  },
  {
    name: "تعداد پاسخ ها",
    selector: (row) => row.replyCount,
    minWidth: "150px",
  },

  // {
  //   name: "",
  //   selector: (row) => row.describe,
  //   minWidth: "150px",
  // },
  // {
  //   name: "Progress",
  //   selector: (row) => row.progress,
  //   sortable: true,
  //   cell: (row) => {
  //     return (
  //       <div className="d-flex flex-column w-100">
  //         <small className="mb-1">{`${row.progress}%`}</small>
  //         <Progress
  //           value={row.progress}
  //           style={{ height: "6px" }}
  //           className={`w-100 progress-bar-${row.progressColor}`}
  //         />
  //       </div>
  //     );
  //   },
  // },
];

const UserProjectsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [myParams] = useSearchParams();
  const cId = myParams.get("CourseId");
  const { newsComments, setNewsComments } = useNewsDetailStore();

  // const getMyData = async () => {
  //   const res = await GetCourseCommentsAdmin(cId);
  //   setCourseComments(res);
  // };
  useEffect(() => {
    // getMyData();
  }, []);

  const CustomPagination = ({ setCurrentPage }) => {
    // const { courseList } = useMyCourseListAdmin();
    const count = Number(0);
    const handlePagination = (selectedVal) => {
      setCurrentPage(selectedVal.selected + 1);
    };

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };
  const paginationComponentOptions = {
    rowsPerPageText: "تعداد آیتم های در جدول",
    rangeSeparatorText: " ",
    selectAllRowsItem: false,
  };

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={newsComments ? newsComments : []}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          // pagination
          // paginationComponent={() => {
          //   return <CustomPagination setCurrentPage={setCurrentPage} />;
          // }}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
