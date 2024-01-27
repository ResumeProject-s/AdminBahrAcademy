import { CourseListAnalytics } from "./CourseListAnalytics";
// import { FilterCourses } from "./FilterCourses";
import CoursesList from "./CoursesList";
import CourseProvider from "./CourseProvider";

const CourseList = () => {
  return (
    <CourseProvider>
      <div className="app-user-list">
        <CourseListAnalytics />
        {/* <FilterCourses /> */}
        <CoursesList />
      </div>
    </CourseProvider>
  );
};

export default CourseList;
