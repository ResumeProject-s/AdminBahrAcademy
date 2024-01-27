import { Fragment, useState, useEffect } from "react";
import { columns } from "./columns";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Row, Col, Card, Input, Button } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useNavigate } from "react-router-dom";
import { useNewsListStore } from "../../../../src/utility/context/News/NewsList";

import { AdminNewsFilterListApi } from "../../../../src/services/api/news/adminNewsFilterListApi";
import { SelectReactCleareable } from "./SelectReactCleareable";
import InputeGroupeSearch from "../../../../src/@core/components/InputeGroupeSearch/InputeGroupeSearch";

const CustomHeader = ({ setCurrentPage, currentPage }) => {
  const navigate = useNavigate();
  const {
    rowOfPage,
    setRowOfPage,
    sortType,
    setSortType,
    NewsList,
    setNewsList,
    isActiveDeactive,
    setIsActiveDeactive,
  } = useNewsListStore();

  const optList = [
    { value: "currentView-DESC", label: "بازدید صعودی" },
    { value: "currentView-ASC", label: "بازدید نزولی" },
    { value: "currentRate-DESC", label: "امتیاز صعودی" },
    { value: "currentRate-ASC", label: "امتیاز نزولی" },
  ];

  const optActiveDeactiveList = [
    { value: "true", label: "اخبار فعال" },
    { value: "false", label: "اخبار غیر فعال" },
  ];

  const sortingHandler = (e) => {
    if (e) setSortType(e.value.split("-"));
    // else setSortType("");
  };

  const sortingActiveDeactiveHandler = (e) => {
    if (e) setIsActiveDeactive(e.value);
  };

  const searchHandler = (e) => {
    const searchData = e.target.value;
    setTimeout(async () => {
      const data = await AdminNewsFilterListApi(
        rowOfPage,
        sortType,
        currentPage,
        searchData,
        isActiveDeactive
      );
      setNewsList(data);
    }, 2000);
  };
  // const searchHandler = async (e) => {
  //   const searchData = e.target.value;
  //   setCurrentPage(1);
  //   setTimeout(async () => {
  //     const data = await GetCourseBySortAndSearch(
  //       rowOfPage,
  //       sortType,
  //       searchData
  //     );
  //     setCourseList(data);
  //   }, 2500);
  // };

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="2" className="d-flex align-items-center p-0 mr-1">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">تعداد اخبار در صفحه</label>
            <Input
              className="mx-25"
              type="select"
              id="rows-per-page"
              value={rowOfPage}
              onChange={(event) => {
                setCurrentPage(1);
                setRowOfPage(Number(event.target.value));
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

        <Col xl="3" className="d-flex align-items-center p-0 mr-1">
          <div className="d-flex align-items-center w-100 ">
            <p>مرتب سازی بر اساس</p>
            <SelectReactCleareable
              selectReactCleareableClassName="mx-25"
              setData={sortingHandler}
              optList={optList}
            />
          </div>
        </Col>

        <Col xl="3" className="d-flex align-items-center p-0 mr-1">
          <div className="d-flex align-items-center w-100">
            <p>نمایش بر اساس</p>
            <SelectReactCleareable
              selectReactCleareableClassName="mx-25"
              setData={sortingActiveDeactiveHandler}
              optList={optActiveDeactiveList}
            />
          </div>
        </Col>

        <Col
          xl="4"
          className=" d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="w-100 d-flex align-items-center p-0 mr-1">
            <InputeGroupeSearch changehandler={searchHandler} />
          </div>
        </Col>
        <Col xl="3">
          <div className="w-100 d-flex justify-end align-items-center p-0">
            <Button
              color="primary"
              onClick={() => {
                navigate("/addNews");
              }}
            >
              اضافه کردن اخبار جدید
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
//
const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    NewsList,
    setNewsList,
    rowOfPage,
    setRowOfPage,
    sortType,
    setSortType,
    SearchDatas,
    setSearchDatas,
    sortCol,
    setSortCol,
    isActiveDeactive,
    setIsActiveDeactive,
  } = useNewsListStore();

  const getNewsListFilterFunc = async () => {
    try {
      const result = await AdminNewsFilterListApi(
        rowOfPage,
        sortType,
        currentPage,
        SearchDatas,
        isActiveDeactive
      );

      setNewsList(result);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    getNewsListFilterFunc();
  }, [isActiveDeactive, sortType, rowOfPage, currentPage]);

  // const getData = async () => {
  //   const data = await GetCourseBySortAndSearch(
  //     rowOfPage,
  //     sortType,
  //     SearchDatas,
  //     currentPage
  //   );
  //   setCourseList(data);
  // };

  // useEffect(() => {
  //   getData();
  // }, [rowOfPage, sortType, currentPage]);
  const CustomPagination = ({ setCurrentPage }) => {
    const { NewsList } = useNewsListStore();
    const count = Number(Math.floor(NewsList.totalCount / rowOfPage) + 1);
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
          "pagination react-paginate justify-content-center my-2 pe-1"
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
            data={NewsList ? NewsList.news : []}
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
export default NewsList;
