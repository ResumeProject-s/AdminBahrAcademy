// ** Reactstrap Imports
import { Card } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { columnsReserved } from "./ColumnsReserved";

const TableOfReserved = ({ data }) => {
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columnsReserved}
          data={data}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default TableOfReserved;
