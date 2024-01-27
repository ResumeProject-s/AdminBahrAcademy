import AddNewUser from "../../views/apps/user/list/AddNewUser/AddNewUser";
import AddUserProvider from "../../views/apps/user/list/AddNewUser/AddNewUserWizardHorizontal/AddUsersProvider";

const AddNewUserHolder = () => {
  return (
    <AddUserProvider>
      <AddNewUser />
    </AddUserProvider>
  );
};

export default AddNewUserHolder;
