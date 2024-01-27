import CourseCommonDataProvider from "../@core/components/Course/CourseCommonDataProvider";
import CourseDetails from "../@core/components/Course/CourseDetails";
import CourseDetailProvider from "../@core/components/Course/CourseDetails/CourseDetailProvider";

const CourseDetailsHolder = () => {
  return (
    <CourseCommonDataProvider>
      <CourseDetailProvider>
        <CourseDetails />
      </CourseDetailProvider>
    </CourseCommonDataProvider>
  );
};

export default CourseDetailsHolder;
