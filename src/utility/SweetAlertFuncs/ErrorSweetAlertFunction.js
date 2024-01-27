import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ErrorSweetAlertFunction = (title, errorMessage) => {
  return MySwal.fire({
    title: title,
    text: errorMessage,
    icon: "error",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

export default ErrorSweetAlertFunction;
