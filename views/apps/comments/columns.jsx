import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import { ThreeNumberSpiliter } from "../../Services/Api/common/ThreeNumberSpiliter";
// import { makeDatePersian } from "../../Services/Api/common/MakeDatePersian";
import { LuPowerOff } from "react-icons/lu";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
// import ActiveAndDeactiveCourses from "../../Services/Api/Course-Admin/ActiveAndDeactiveCourses";
// import ToastSuccess from "../../Services/Api/common/react-hot-toasts/ToastSuccess";
// import ToastError from "../../Services/Api/common/react-hot-toasts/ToastError";
// import DeleteCourse from "../../Services/Api/Course-Admin/DeleteCourse";
let myData;
let settingdata;

const renderClient = (row) => {
  return (
    <Avatar
      className="me-1"
      img={row.tumbImageAddress ? row.tumbImageAddress : ""}
      width="32"
      height="32"
    />
  );
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
      />
      {row.role}
    </span>
  );
};

// const noww = () => {
//   const { courseList, setCourseList } = useMyCourseListAdmin();
//   console.log(courseList);
// };

const statusObj = {
  true: "light-success",
  fasle: "light-secondary",
};
const activeDeactiveHandler = async () => {};
export const columns = [
  {
    name: "عنوان دوره",
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
      </div>
    ),
  },
  {
    name: "استاد دوره",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.fullName,
  },
  {
    name: "سطح دوره",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.levelName,
  },
  {
    name: "وضعیت دوره",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.isActive,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.isActive]} pill>
        {row.isActive ? "فعال" : "غیر فعال"}
      </Badge>
    ),
  },
  {
    name: "قیمت دوره",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
  },
  {
    name: "آخرین بروز رسانی",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => {
      const onRefresh = () => row.setRefresh((old) => !old);

      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/CourseDetails?CourseId=${row.courseId}`}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">جزئیات </span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={async (e) => {
                  e.preventDefault();

                  const res = await ActiveAndDeactiveCourses({
                    active: row.isActive ? false : true,
                    id: row.courseId,
                  });
                  if (res.success) {
                    ToastSuccess(`
                      دوره ی مورد نظر با موفقیت ${
                        row.isActive ? "غیر فعال" : "فعال"
                      } شد.
                    `);
                    onRefresh();
                  } else {
                    ToastError(res.errors[0]);
                  }
                }}
              >
                {row.isActive ? (
                  <>
                    <LuPowerOff size={14} className="me-50" />
                    <span className="align-middle"> غیر فعال </span>
                  </>
                ) : (
                  <>
                    <MdOutlinePowerSettingsNew size={14} className="me-50" />
                    <span className="align-middle">فعال </span>
                  </>
                )}
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await DeleteCourse({
                    active: true,
                    id: row.courseId,
                  });
                  if (res.success) {
                    ToastSuccess("عملیات مورد نظر با موفقیت انجام شد");
                    onRefresh();
                  } else {
                    ToastError(res.errors[0]);
                  }
                  onRefresh();
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle"> حذف </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
// /Course/DeleteCourse
