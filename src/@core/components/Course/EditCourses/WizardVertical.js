// ** React Imports
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4, v4 } from "uuid";
// ** Custom Components
import Wizard from "@components/wizard";

import BasicInformation from "./steps-with-validation/BasicInformation";
import CourseClassInformation from "./steps-with-validation/CourseClassInformation";
import SEOInformation from "./steps-with-validation/SEOInformation";
import CoursePictures from "./steps-with-validation/CoursePictures";
import { useMyCourseDetailstore } from "../CourseDetails/CourseDetailProvider";
import { useMyCourseSettings } from "../CourseCommonDataProvider";

const WizardVertical = ({ showAndSetter }) => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const { courseDetails, courseDetailsUser, setDataForUpadate } =
    useMyCourseDetailstore();
  const { courseTypeList, Level, ClassRoom } = useMyCourseSettings();
  const uuid = v4();

  useEffect(() => {
    const sampleObj = {
      Id: courseDetails.courseId,
      Title: courseDetails.title,
      Describe: courseDetails.describe,
      MiniDescribe: courseDetailsUser.miniDescribe,
      Capacity: courseDetailsUser.capacity,
      CourseTypeId: courseTypeList.filter(
        (items) => items.label === courseDetails.courseTypeName
      )[0].value,
      SessionNumber: 10,
      CurrentCoursePaymentNumber: 100,
      TremId: 1,
      ClassId: ClassRoom.filter(
        (items) => items.label === courseDetails.courseClassRoomName
      )[0].value,
      CourseLvlId: Level.filter(
        (items) => items.label === courseDetails.courseLevelName
      )[0].value,
      TeacherId: courseDetails.teacherId,
      Cost: courseDetails.cost,
      UniqeUrlString: uuid.slice(0, 25),
      Image: courseDetails.imageAddress,
      StartTime: courseDetailsUser.startTime,
      EndTime: courseDetailsUser.endTime,
      GoogleSchema: courseDetailsUser.googleSchema,
      GoogleTitle: courseDetailsUser.googleTitle,
      CoursePrerequisiteId: "",
      ShortLink: "",
      TumbImageAddress: "",
      ImageAddress: "",
    };
    setDataForUpadate(sampleObj);
  }, []);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات اولیه دوره",
      subtitle: "مرحله ی اول",
      content: (
        <BasicInformation showAndSetter={showAndSetter} stepper={stepper} />
      ),
    },
    {
      id: "personal-info",
      title: " اطلاعات کلاس دوره",
      subtitle: "مرحله ی دوم",
      content: (
        <CourseClassInformation
          showAndSetter={showAndSetter}
          stepper={stepper}
        />
      ),
    },
    {
      id: "step-address",
      title: "اطلاعات سئو",
      subtitle: "مرحله ی سوم",
      content: (
        <SEOInformation showAndSetter={showAndSetter} stepper={stepper} />
      ),
    },

    {
      id: "social-links",
      title: "تصاویر دوره",
      subtitle: "مرحله ی آخر",
      content: (
        <CoursePictures showAndSetter={showAndSetter} stepper={stepper} />
      ),
    },
  ];

  return (
    <div className="vertical-wizard">
      <Wizard
        type="vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardVertical;
