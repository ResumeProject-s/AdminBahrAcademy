// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { columnsSchedules } from "./ColumnsSchedules";

const TableOfSchedules = ({ data }) => {
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects p-2">
        <p className="text-secondary">{data}</p>
      </div>
    </Card>
  );
};

export default TableOfSchedules;
