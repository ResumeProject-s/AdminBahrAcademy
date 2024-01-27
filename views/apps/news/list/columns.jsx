// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions

// ** Icons Imports
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
  Zap,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NewsList from "./newsList";
import { NewsActiveDeactiveFormData } from "../../../../src/utility/FormData/NewsActiveDeactiveFormData";
import { AdminActiveDeactiveNewsApi } from "../../../../src/services/api/news/adminActiveDeactivNewsApi";

import ErrorSweetAlertFunction from "./../../../../src/utility/SweetAlertFuncs/ErrorSweetAlertFunction";
import SuccessSweetAlertFunction from "./../../../../src/utility/SweetAlertFuncs/SuccessSweetAlertFunction";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.currentImageAddressTumb) {
    return (
      <img
        src={row.currentImageAddressTumb}
        className="me-1 rounded-circle shadow-lg"
        img={row.avatar}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || "light-primary"}
        content={row.title || "News"}
      />
    );
  }
};

const AdminActiveDeactiveNewsFunc = async (id, isActive) => {
  try {
    const value = { id: id, isActive: isActive };

    console.log(value);

    const formData = NewsActiveDeactiveFormData(value);

    const result = await AdminActiveDeactiveNewsApi(formData);

    if (result.success === true) {
      SuccessSweetAlertFunction("موفق!", result.message);
    } else if (result.success === false || result.status !== 200) {
      ErrorSweetAlertFunction("ناموفق!", result.message);
    }
  } catch (error) {
    return false;
  }
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

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = [
  {
    name: "عنوان",
    sortable: true,
    minWidth: "300px",
    overflow: "hidden",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/NewsDetail/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.title}</span>
          </Link>
          {/* <small className="text-truncate text-muted mb-0">{row.gmail}</small> */}
        </div>
      </div>
    ),
  },
  {
    name: "دسته بندی",
    sortable: true,
    minWidth: "172px",
    sortField: "newsCatregoryName",
    selector: (row) => row.newsCatregoryName,
  },
  {
    name: "امتیاز",
    minWidth: "138px",
    sortable: true,
    sortField: "currentRate",
    selector: (row) => row.currentRate,
  },
  {
    name: "بازدید",
    minWidth: "138px",
    sortable: true,
    sortField: "currentView",
    selector: (row) => row.currentView,
  },
  {
    name: "پسندیدن",
    minWidth: "138px",
    sortable: true,
    sortField: "currentLikeCount",
    selector: (row) => row.currentLikeCount,
  },
  {
    name: "وضعیت",
    minWidth: "138px",
    sortable: true,
    sortField: "currentLikeCount",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <div className="user_name text-truncate text-body">
            <span className="fw-bolder">
              {row.isActive === true ? (
                <Badge
                  pill
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
            </span>
          </div>
          {/* <small className="text-truncate text-muted mb-0">{row.gmail}</small> */}
        </div>
      </div>
    ),
  },
  {
    name: "مدیریت",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/NewsDetail/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزییات</span>
            </DropdownItem>
            <DropdownItem
              tag="Link"
              href="/"
              className="w-100"
              onClick={() =>
                AdminActiveDeactiveNewsFunc(
                  row.id,
                  row.isActive === true ? false : true
                )
              }
            >
              <Zap size={14} className="me-50" />
              <span className="align-middle">فعال/غیر فعال</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
