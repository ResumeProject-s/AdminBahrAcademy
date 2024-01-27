// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { GetUserApi } from "../../../../src/@core/Services/Api/Users/GetUserApi";
import { useMyUserListAdmin } from "./UserProvider";
import Sidebar from "./Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

// ** Table Header
const CustomHeader = ({
  setCurrentPage,
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  const { rowOfPage, setRowOfPage, setAllUser, SearchDatas, setSearchDatas } =
    useMyUserListAdmin();

  const navigate = useNavigate();

  const searchHandler = (e) => {
    const searchData = e.target.value;
    setTimeout(async () => {
      const data = await GetUserApi(rowOfPage, searchData, currentPage);
      setAllUser(data);
    }, 2000);
  };

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowOfPage}
              onChange={(event) => {
                setCurrentPage(1);
                setRowOfPage(event.target.value);
              }}
              style={{ width: "5rem" }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </Input>
            <label htmlFor="rows-per-page">کاربر</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">خروجی</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">Print</span>
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(store.data)}
                >
                  <FileText className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy className="font-small-4 me-50" />
                  <span className="align-middle">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button
              className="add-new-user"
              color="primary"
              onClick={() => navigate("/AddNewUser")}
            >
              اضافه کردن
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roleOpt, setRoleOpt] = useState([]);

  const {
    allUser,
    setAllUser,
    rowOfPage,
    setRowOfPage,
    FilterByActive,
    setFilterByActive,
    role,
    setRole,
    searchDatas,
  } = useMyUserListAdmin();

  const getUsers = async () => {
    const res = await GetUserApi(currentPage, rowOfPage, FilterByActive, role);
    setAllUser(res);
  };
  const roleSetter = () => {
    const emptyArr = [];
    if (allUser) {
      allUser.roles.map((e) => {
        const sampleObj = {
          value: e.id,
          label: e.roleName,
        };
        emptyArr.push(sampleObj);
      });
    }
    setRoleOpt(emptyArr);
  };
  useEffect(() => {
    getUsers();
    roleSetter();
  }, [currentPage, rowOfPage, FilterByActive, role]);

  // ** Store Vars

  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب نقش",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب وضعیت",
  });

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const statusOptions = [
    { value: "true", label: "فعال", number: 1 },
    { value: "false", label: "غیرفعال", number: 2 },
  ];

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);

    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  // const handleFilter = (val) => {
  //   setSearchTerm(val);
  // };

  // ** Custom Pagination
  const CustomPagination = ({ setCurrentPage }) => {
    const { allUser } = useMyUserListAdmin();
    const count = Number(Math.floor(allUser.totalCount / rowOfPage) + 1);
    const handlePagination = (selectedVal) => {
      setCurrentPage(selectedVal.selected + 1);
    };

    return (
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
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">نقش</Label>
              <Select
                isClearable={false}
                options={roleOpt}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setRoleOpt(data);
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                // value={currentStatus}
                placeholder="انتخاب وضعیت"
                onChange={(data) => {
                  if (data) {
                    setFilterByActive(data.value);
                  } else {
                    setFilterByActive("");
                  }
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={() => {
              return <CustomPagination setCurrentPage={setCurrentPage} />;
            }}
            data={allUser ? allUser.listUser : []}
            subHeaderComponent={
              <CustomHeader
                setCurrentPage={setCurrentPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default UsersList;
