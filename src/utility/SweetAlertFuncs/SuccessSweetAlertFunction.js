import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SuccessSweetAlertFunction = (title, successMessage) => {
  return MySwal.fire({
    title: title,
    text: successMessage,
    icon: "success",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

export default SuccessSweetAlertFunction;
