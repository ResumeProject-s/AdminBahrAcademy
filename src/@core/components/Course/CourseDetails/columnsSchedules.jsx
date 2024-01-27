// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { UncontrolledTooltip } from "reactstrap";

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
import { makeDatePersian } from "../../../Services/Api/common/MakeDatePersian";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

// ** Table columns
export const columnsSchedules = [
  {
    name: "هفته ی ",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.weekNumber,
  },
  {
    name: "تاریخ برگزاری",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => makeDatePersian(row.startDate),
  },
  {
    name: "ساعات برگذاری",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.startTime,
    cell: (row) => {
      return (
        <div className="d-flex gap-1 font16">
          از
          <span className="f-bold">{row.startTime}</span>
          تا
          <span className="f-bold">{row.endTime}</span>
        </div>
      );
    },
  },
];
