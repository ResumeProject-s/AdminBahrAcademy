import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import AddModalGroupForm from "./AddModalGroupForm/AddModalGroupForm";
import ManageGroupes from "./ManageGroupes";

const GroupeModal = ({ Showing, settingsShow }) => {
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
      <ModalBody className="px-sm-5 pt-50 pb-5" style={{ height: "600px" }}>
        <div className="text-center mb-2">
          <h3 className="mb-1 f-bold">مدریت گروه ها</h3>
        </div>
        <ManageGroupes />
      </ModalBody>
    </Modal>
  );
};

export default GroupeModal;
