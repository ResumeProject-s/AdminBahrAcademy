// ** React Imports
import { useEffect, useState } from "react";

// ** Table Columns
// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown, FileText, Link, MoreVertical } from "react-feather";
import DataTable from "react-data-table-component";
import { FaRegTrashCan } from "react-icons/fa6";
// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import GetAllCourseGroupes from "../../../../Services/Api/CourseDetailsAdmin/GetAllCourseGroupes";
import { LuPowerOff } from "react-icons/lu";
import DeleteGroupe from "../../../../Services/Api/CourseDetailsAdmin/DeleteGroupe";
import ToastSuccess from "../../../../Services/Api/common/react-hot-toasts/ToastSuccess";
import ToastError from "../../../../Services/Api/common/react-hot-toasts/ToastError";

const GroupeTable = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const [allGroups, setAllGroupes] = useState();
  const [refresher, setRefresher] = useState(false);
  const handlePagination = (selectedVal) => {
    setCurrentPage(selectedVal.selected + 1);
  };

  const getData = async () => {
    const res = await GetAllCourseGroupes(currentPage + 1);
    setAllGroupes(res);
    setTotalCount(res.totalCount);
  };
  useEffect(() => {
    getData();
  }, [currentPage]);

  const reOrderColumns = [
    {
      name: "نام گروه",
      reorder: true,
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row.groupName,
    },
    {
      name: "نام دوره",
      reorder: true,
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row.courseName,
    },
    {
      name: "نام استاد",
      reorder: true,
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row.teacherName,
    },
    {
      name: "اعمال",
      reorder: true,
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row.teacherName,
      cell: (row) => {
        console.log(row);
        return (
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <div
                    onClick={async () => {
                      const res = await DeleteGroupe({
                        Id: Number(row.groupId),
                      });
                      if (res.success) {
                        ToastSuccess("حذف گروه با موفقیت انجام شده است");
                        setRefresher(!refresher);
                      } else {
                        ToastError(res.errors[0]);
                      }
                      console.log(res);
                    }}
                  >
                    <FaRegTrashCan size={14} className="me-50" />
                    <span className="align-middle">حذف </span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];
  const count = Number(Math.ceil(totalCount / 7));

  const CustomPagination = () => (
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

  return (
    <Card className="overflow-hidden">
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          data={allGroups ? allGroups.courseGroupDtos : []}
          columns={reOrderColumns}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  );
};

export default GroupeTable;
