// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

import BasicInformation from "./steps-with-validation/BasicInformation";
import CourseClassInformation from "./steps-with-validation/CourseClassInformation";
import SEOInformation from "./steps-with-validation/SEOInformation";
import CoursePictures from "./steps-with-validation/CoursePictures";
import { useMyCourseObj } from "../AddNewCourseProvider";
import SetTech from "./steps-with-validation/SetTech";

const WizardHorizontal = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const steps = [
    {
      id: "account-details",
      title: "اطلاعات اولیه دوره",
      subtitle: "مرحله ی اول",
      content: <BasicInformation stepper={stepper} />,
    },

    {
      id: "personal-info",
      title: " اطلاعات کلاس دوره",
      subtitle: "مرحله ی دوم",
      content: <CourseClassInformation stepper={stepper} />,
    },

    {
      id: "step-address",
      title: "اطلاعات سئو",
      subtitle: "مرحله ی سوم",
      content: <SEOInformation stepper={stepper} />,
    },

    {
      id: "social-links",
      title: "تصاویر دوره",
      subtitle: "مرحله  چهارم",
      content: <CoursePictures stepper={stepper} />,
    },
    {
      id: "set-Tech",
      title: "تعیین دسته بندی دوره",
      subtitle: "مرحله ی آخر",
      content: <SetTech stepper={stepper} />,
    },
  ];
  const { courseDataObj, setCourseDataObj } = useMyCourseObj();
  return (
    <div className="horizontal-wizard">
      <Wizard
        instance={(el) => setStepper(el)}
        ref={ref}
        steps={steps}

        // options={{
        //   linear: false,
        // }}
      />
    </div>
  );
};

export default WizardHorizontal;
