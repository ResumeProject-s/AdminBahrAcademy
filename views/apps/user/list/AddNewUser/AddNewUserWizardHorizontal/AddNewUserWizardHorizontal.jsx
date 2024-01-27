// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import AccountDetails from "./steps-with-validation/AccountDetail";
import PersonalInfo from "./steps-with-validation/PersonalInfo";
import Address from "./steps-with-validation/Address";
import SocialLinks from "./steps-with-validation/SocialLinks";
import { useAddUserStore } from "./AddUsersProvider";

// ** Steps

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const { UsersValue, setUsersValue } = useAddUserStore();

  console.log(UsersValue);
  const steps = [
    {
      id: "account-details",
      title: "اطلاعات اولیه کاربر",
      content: <AccountDetails stepper={stepper} />,
    },
    {
      id: "personal-info",
      title: "اطلاعات تکمیلی",
      content: <PersonalInfo stepper={stepper} />,
    },
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
      wizrd
    </div>
  );
};

export default WizardHorizontal;
