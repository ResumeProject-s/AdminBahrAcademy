import { Fragment, useState, useEffect } from "react";
import { columns } from "./columns";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Row, Col, Card, Input, Button } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import GetCourseBySortAndSearch from "../../Services/Api/Course-Admin/GetCourseBySortAndSearch";
import InputeGroupeSearch from "../InputeGroupeSearch/InputeGroupeSearch";
import { useMyCourseListAdmin } from "./CourseProvider";
import SelectReactCleareable from "../SelectReactCleareable/SelectReactCleareable";
import { useNavigate } from "react-router-dom";

const CustomHeader = ({ setCurrentPage, currentPage }) => {
  const navigate = useNavigate();
  const {
    rowOfPage,
    setRowOfPage,
    sortType,
    setSortType,
    SearchDatas,
    setCourseList,
  } = useMyCourseListAdmin();

  const optList = [
    { value: "cost-ASC", label: "قیمت صعودی" },
    { value: "cost-DESC", label: "قیمت نزولی" },
    { value: "lastUpdate-ASC", label: "اخرین بروز رسانی نزولی" },
    { value: "lastUpdate-DESC", label: "اخرین بروز رسانی نزولی" },
  ];
  const sortingHandler = (e) => {
    if (e) setSortType(e.value.split("-"));
    else setSortType("");
  };

  const searchHandler = (e) => {
    const searchData = e.target.value;
    setTimeout(async () => {
      const data = await GetCourseBySortAndSearch(
        rowOfPage,
        sortType,
        searchData,
        currentPage
      );
      setCourseList(data);
    }, 2000);
  };

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="2" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">تعداد دوره در صفحه</label>
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
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col xl="4" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <p>مرتب سازی بر اساس</p>
            <SelectReactCleareable setData={sortingHandler} optList={optList} />
          </div>
        </Col>
        <Col
          xl="4"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className=" w-100 d-flex align-items-center mb-sm-0 mb-1 me-1">
            <InputeGroupeSearch changehandler={searchHandler} />
          </div>
        </Col>
        <Col lg="2">
          <div className=" w-100 d-flex align-items-center mb-sm-0 mb-1 me-1">
            <Button
              color="primary"
              onClick={() => {
                navigate("/addNewCourse");
              }}
            >
              اضافه کردن دوره ی جدید
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
//
const CoursesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const {
    courseList,
    setCourseList,
    rowOfPage,
    setRowOfPage,
    sortType,
    setSortType,
    SearchDatas,
    setSearchDatas,
  } = useMyCourseListAdmin();

  const getData = async () => {
    const data = await GetCourseBySortAndSearch(
      rowOfPage,
      sortType,
      SearchDatas,
      currentPage
    );
    setCourseList({
      ...data,
      courseDtos: data?.courseDtos.map((m) => ({ ...m, setRefresh })),
    });
  };

  useEffect(() => {
    getData();
  }, [rowOfPage, sortType, currentPage, refresh]);

  const CustomPagination = ({ setCurrentPage }) => {
    const { courseList } = useMyCourseListAdmin();
    const count = Number(Math.floor(courseList.totalCount / rowOfPage) + 1);
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
  return (
    <Fragment>
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
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            data={courseList ? courseList.courseDtos : []}
            paginationComponent={() => {
              return <CustomPagination setCurrentPage={setCurrentPage} />;
            }}
            subHeaderComponent={
              <CustomHeader
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};
export default CoursesList;
