// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

import AvatarGroup from "@components/avatar-group";

// alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

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
  Code,
  Edit3,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import DeleteUser from "../../../../src/@core/Services/Api/Users/DeleteUser";
import { SuccessSwal } from "../../../../src/@core/Services/Api/common/SuccsesSweetAlert";
import { ErrorSwal } from "../../../../src/@core/Services/Api/common/ErrorSwertAlert";
import { string } from "prop-types";

let template = [];
const avatarGroupData1 = [
  {
    title: "ادمین",
    icon: <Database size={17} color="purple" />,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const Student = {
  title: "دانشجو",
  icon: <User size={17} color="blue" />,
  imgHeight: 26,
  imgWidth: 26,
};

const Administrator = {
  title: "ادمین",
  icon: <Database size={17} color="purple" />,
  imgHeight: 26,
  imgWidth: 26,
};

const Teacher = {
  title: "استاد",
  icon: <Edit2 size={17} />,
  imgHeight: 26,
  imgWidth: 26,
};

const Referee = {
  title: "Referee",
  icon: <Edit2 size={17} />,
  imgHeight: 26,
  imgWidth: 26,
};

const TournamentMentor = {
  title: "TournamentMentor",
  icon: <Edit2 size={17} />,
  imgHeight: 26,
  imgWidth: 26,
};

// alert

// ** Renders Client Columns
const renderClient = (row) => {
  return (
    <Avatar className="me-1" img={row.pictureAddress} width="32" height="32" />
  );
  // } else {
  return (
    <Avatar
      initials
      className="me-1"
      color={row.avatarColor || "light-primary"}
      content={row.fullName || "John Doe"}
    />
  );
};
// };

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "Teacher",
      icon: User,
    },
    Teacher: {
      class: "text-success",
      icon: Database,
    },
    Teacher: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    Administrator: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.userRoles] ? roleObj[row.userRoles].class : ""
        } me-50`}
      />
      {row.userRoles}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  True: "light-success",
  False: "light-secondary",
};

const DelUser = async (UserId) => {
  const res = await DeleteUser({
    userId: UserId,
  });
  if (res.success) {
    SuccessSwal(res.message);
  } else ErrorSwal(res.message);
};

export const columns = [
  {
    name: "کاربر",
    sortable: true,
    minWidth: "300px",
    sortField: "username",
    selector: (row) => row.fname,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/UserDetails?UserId=${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.fname + " " + row.lname}</span>
          </Link>

          <small className="text-truncate text-muted mb-0">{row.gmail}</small>
        </div>
      </div>
    ),
  },
  {
    name: "نقش",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.userRoles,
    cell: (row) => {
      // console.log(row.userRoles?.split(","));
      let temp = [];

      row.userRoles?.split(",").forEach((item) => {
        if (item.includes("Student")) {
          temp.push(Student);
        } else if (item.includes("Administrator")) {
          temp.push(Administrator);
        } else if (item.includes("Teacher")) {
          temp.push(Teacher);
        } else if (item.includes("TournamentMentor")) {
          temp.push(TournamentMentor);
        } else if (item.includes("Referee")) {
          temp.push(Referee);
        }
      });
      return <AvatarGroup data={temp} />;
    },
    // (row) => <AvatarGroup data={avatarGroupData1} />
  },
  {
    name: "شماره تماس",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.phoneNumber,
    cell: (row) => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: "درصد تکمیل پروفایل",
    minWidth: "230px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.profileCompletionPercentage,
    cell: (row) => (
      <span className="text-capitalize">
        {row.profileCompletionPercentage + "%"}
      </span>
    ),
  },
  {
    name: "وضعیت",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.active,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.active]} pill>
        {row.active === "True" ? "فعال" : "غیر فعال"}
      </Badge>
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
              to={`/UserDetails?UserId=${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزییات</span>
            </DropdownItem>

            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                DelUser(row.id);
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
