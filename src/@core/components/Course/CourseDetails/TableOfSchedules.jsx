// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { columnsSchedules } from "./columnsSchedules";

const TableOfSchedules = ({ data }) => {
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columnsSchedules}
          data={data}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          // pagination
          // paginationComponent={() => {
          //   return <CustomPagination setCurrentPage={setCurrentPage} />;
          // }}
        />
      </div>
    </Card>
  );
};

export default TableOfSchedules;
