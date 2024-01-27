// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import BasicInformation from "./steps-with-validation/BasicInformation";
import NewsDescriptionTextInformation from "./steps-with-validation/NewsDescriptionTextInformation";
import NewsSEOInformation from "./steps-with-validation/NewsSEOInformation";
import NewsPictures from "./steps-with-validation/NewsPictures";

const WizardHorizontal = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  console.log(stepper);
  const steps = [
    {
      id: "account-details",
      title: "اطلاعات اولیه خبر",
      subtitle: "مرحله ی اول",
      content: <BasicInformation stepper={stepper} />,
    },
    {
      id: "personal-info",
      title: "متن خبر",
      subtitle: "مرحله ی دوم",
      content: <NewsDescriptionTextInformation stepper={stepper} />,
    },

    {
      id: "step-address",
      title: "اطلاعات سئو",
      subtitle: "مرحله ی سوم",
      content: <NewsSEOInformation stepper={stepper} />,
    },

    {
      id: "social-links",
      title: "تصاویر خبر",
      subtitle: "مرحله ی آخر",
      content: <NewsPictures stepper={stepper} />,
    },
  ];
  //   const { addNewsObj, setAddNewsObj } = useSetAddNewsObj();
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
