import AddNewCourse from "../@core/components/Course/AddNewCourse/AddNewCourse";
import AddNewCourseProvider from "../@core/components/Course/AddNewCourse/AddNewCourseProvider";
import CourseCommonDataProvider from "../@core/components/Course/CourseCommonDataProvider";

const AddNewCourseHolder = () => {
  return (
    <CourseCommonDataProvider>
      <AddNewCourseProvider>
        <AddNewCourse />
      </AddNewCourseProvider>
    </CourseCommonDataProvider>
  );
};

export default AddNewCourseHolder;
