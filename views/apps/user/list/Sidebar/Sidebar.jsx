// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions
// import { addUser } from "../store";
import { useDispatch } from "react-redux";
import { useMyUserDetailstore } from "../UserDetail/UserDetailProvider";
import UpdateUsers from "../../../../../src/@core/Services/Api/common/UpdateUsers/UpdateUsers";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import AddUserRole from "../../../../../src/@core/Services/Api/common/UpdateUsers/AddRole";
import { SuccessSwal } from "../../../../../src/@core/Services/Api/common/SuccsesSweetAlert";
import { ErrorSwal } from "../../../../../src/@core/Services/Api/common/ErrorSwertAlert";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null,
};

const status = [
  { label: "فعال", value: true },
  { label: "غیرفعال", value: false },
];
const roleOption = [
  { label: "ادمین", value: 1 },
  { label: "استاد", value: 2 },
  { label: "دانشجو", value: 3 },
];
const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [addRole, setAddRole] = useState();

  const initialValue = new Date();
  const [BirthDate, setBirthDate] = useState(initialValue);

  // ** Store Vars
  const dispatch = useDispatch();

  const { UserDetails, setUserDetails } = useMyUserDetailstore();
  const [Image, setImage] = useState();
  console.log(Image ? Image : false);

  const updateValue = async () => {
    const res = await UpdateUsers(UserDetails, Image);
    if (res.success) {
      SuccessSwal(res.message);
    } else ErrorSwal(res.errors);
  };

  const AddRoleData = async (role) => {
    const res = await AddUserRole({
      roleId: role.value,
      userId: UserDetails.id,
    });
    console.log(res);
    if (res.success) {
      SuccessSwal(res.message);
    } else ErrorSwal(res.errors);
  };

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  const onSubmit = (data) => {
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar();
      dispatch(
        addUser({
          role,
          avatar: "",
          active: data.active,
          email: data.email,
          currentPlan: plan,
          billing: "auto debit",
          company: data.company,
          contact: data.contact,
          fullName: data.fullName,
          username: data.username,
          nationalCode: data.nationalCode,
          birthDay: BirthDate.toISOString(),
          country: data.country.value,
          // currentPictureAddress: data.currentPictureAddress.files,
        })
      );
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError("country", {
            type: "manual",
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("subscriber");
    setPlan("basic");
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          updateValue();
        }}
      >
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            نام
          </Label>

          <Input
            id="fullName"
            name="FName"
            placeholder="John Doe"
            value={UserDetails.fName}
            onChange={(e) => {
              setUserDetails({ ...UserDetails, fName: e.target.value });
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="username">
            نام کاربر
          </Label>

          <Input
            id="username"
            value={UserDetails.lName}
            onChange={(e) => {
              setUserDetails({ ...UserDetails, lName: e.target.value });
            }}
            placeholder="johnDoe99"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            ایمیل
          </Label>

          <Input
            type="email"
            id="userEmail"
            value={UserDetails.gmail}
            onChange={(e) => {
              setUserDetails({ ...UserDetails, gmail: e.target.value });
            }}
            placeholder="john.doe@example.com"
          />

          <FormText color="muted">
            You can use letters, numbers & periods
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            شماره همراه
          </Label>

          <Input
            id="contact"
            value={UserDetails.phoneNumber}
            onChange={(e) => {
              setUserDetails({ ...UserDetails, phoneNumber: e.target.value });
            }}
            placeholder="(397) 294-5153"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            درباره کاربر
          </Label>

          <Input
            id="company"
            value={UserDetails.userAbout}
            onChange={(e) => {
              setUserDetails({ ...UserDetails, userAbout: e.target.value });
            }}
            placeholder="Company Pvt Ltd"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            اپلود عکس
          </Label>

          <Input
            id=""
            type="file"
            // value={UserDetails.currentPictureAddress}
            onChange={(e) => {
              setImage({
                ...Image,
                currentPictureAddress: e.target.files[0],
              });
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="country">
            محل سکونت
          </Label>

          <Input
            id="company"
            value={UserDetails.homeAdderess}
            onChange={(e) => {
              setUserDetails({ ...UserDetails, homeAdderess: e.target.value });
            }}
            placeholder="Company Pvt Ltd"
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="company">
            لینکدین
          </Label>

          <Input
            id="company"
            value={UserDetails.linkdinProfile}
            onChange={(e) => {
              setUserDetails({
                ...UserDetails,
                linkdinProfile: e.target.value,
              });
            }}
            placeholder="Company Pvt Ltd"
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="company">
            تلگرام
          </Label>

          <Input
            id="company"
            value={UserDetails.telegramLink}
            onChange={(e) => {
              setUserDetails({
                ...UserDetails,
                telegramLink: e.target.value,
              });
            }}
            placeholder="Company Pvt Ltd"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            کد ملی
          </Label>

          <Input
            id="nationalCode"
            value={UserDetails.nationalCode}
            onChange={(e) => {
              setUserDetails({
                ...UserDetails,
                nationalCode: e.target.value,
              });
            }}
            placeholder="Company Pvt Ltd"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            تاریخ تولد
          </Label>
          <DatePicker
            style={{ display: "block", width: "100%", marginRight: "20px" }}
            value={BirthDate}
            calendar={persian}
            locale={persian_fa}
            onChange={(e) => {
              setUserDetails({
                ...UserDetails,
                birthDay: e.toDate(),
              });
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            وضعیت
          </Label>

          <Select
            isClearable={false}
            classNamePrefix="select"
            options={status}
            theme={selectThemeColors}
            value={UserDetails.active}
            onChange={(e) => {
              setUserDetails({
                ...UserDetails,
                active: e.value,
              });
            }}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="company">
            ویرایش نقش
          </Label>

          <Select
            isClearable={false}
            classNamePrefix="select"
            options={roleOption}
            theme={selectThemeColors}
            // value={UserDetails.active}
            onChange={AddRoleData}
          />
        </div>
        <Button type="submit" className="me-1" color="primary">
          ثبت
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          کنسل
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
