// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Button, UncontrolledTooltip } from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
} from "react-feather";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};
const renderClient = (row) => {
  if (row.avatar.length) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || "light-primary"}
        content={row.fullName || "John Doe"}
      />
    );
  }
};
export const columnsReserved = [
  // {
  //   name: "User",
  //   sortable: true,
  //   minWidth: "300px",
  //   sortField: "fullName",
  //   selector: (row) => row.fullName,
  //   cell: (row) => (
  //     <div className="d-flex justify-content-left align-items-center">
  //       {renderClient(row)}
  //       <div className="d-flex flex-column">
  //         <Link
  //           to={`/apps/user/view/${row.id}`}
  //           className="user_name text-truncate text-body"
  //         >
  //           <span className="fw-bolder">{row.fullName}</span>
  //         </Link>
  //         <small className="text-truncate text-muted mb-0">{row.email}</small>
  //       </div>
  //     </div>
  //   ),
  // },
  {
    name: "نام دانشجو",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.studentName,
  },
  {
    name: "تاریخ  رزو",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => makeDatePersian(row.reserverDate),
  },
  {
    name: "ساعات برگذاری",
    sortable: true,
    sortField: "id",
    minWidth: "250px",
    selector: (row) => row.startTime,
    cell: (row) => {
      return (
        <div className="d-flex gap-1 font16">
          <Button color="danger">حذف </Button>
          <Button color="success"> پذیرفتن</Button>
        </div>
      );
    },
  },
];
