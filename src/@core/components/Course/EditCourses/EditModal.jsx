import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useMyCourseSettings } from "../CourseCommonDataProvider";
import WizardVertical from "./WizardVertical";
import { useMyCourseDetailstore } from "../CourseDetails/CourseDetailProvider";

export function EditModal({ Showing, settingsShow, data }) {
  const { courseTypeList, Level, Status, ClassRoom, Teacher, Terms, TechList } =
    useMyCourseSettings();

  return (
    <Modal
      isOpen={Showing}
      toggle={() => settingsShow(!Showing)}
      className="modal-dialog-centered modal-xl"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={() => settingsShow(!Showing)}
      ></ModalHeader>
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطلاعات دوره</h1>
        </div>
        <WizardVertical showAndSetter={{ settingsShow, Showing }} />
      </ModalBody>
    </Modal>
  );
}
