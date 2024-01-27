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
import { makeDatePersian } from "../../../Services/Api/common/MakeDatePersian";
import ConfirmationReserved from "../../../Services/Api/CourseDetailsAdmin/ConfirmationReserved";
import ToastSuccess from "../../../Services/Api/common/react-hot-toasts/ToastSuccess";
import ToastError from "../../../Services/Api/common/react-hot-toasts/ToastError";
import { error } from "jquery";
import RemoveFromReserved from "../../../Services/Api/CourseDetailsAdmin/RemoveFromReserved";

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
      const onRefresh = () => row.setRefresh((old) => !old);
      return (
        <div className="d-flex gap-1 font16">
          {row.accept ? (
            <Button color="primary">تایید شده </Button>
          ) : (
            <>
              <Button
                color="danger"
                onClick={async () => {
                  const res = await RemoveFromReserved({ id: row.reserveId });
                  if (res.success) {
                    ToastSuccess("حذف رزو دوره با موفقیت  انجام شده است");
                    onRefresh();
                  } else {
                    ToastError(res.message);
                  }
                }}
              >
                حذف
              </Button>
              <Button
                color="success"
                onClick={async () => {
                  if (row.courseGroupId) {
                    const res = await ConfirmationReserved({
                      courseId: row.courseId,
                      courseGroupId: row.courseGroupId,
                      studentId: row.studentId,
                    });
                    if (res.success) {
                      ToastSuccess("دوره ی کاربر  با موفقیت انجام شده است");
                      onRefresh();
                    } else {
                      ToastError(res.message);
                    }
                  } else {
                    ToastError(
                      "گروهی برای دوره مورد نظر موجود نمی باشد، ابتدا گروه  را برای دوره ایجاد نمایید."
                    );
                  }
                }}
              >
                پذیرفتن
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
