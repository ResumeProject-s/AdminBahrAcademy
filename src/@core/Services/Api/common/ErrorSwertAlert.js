import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const ErrorSwal = (title) => {
  Swal.fire({
    title: title,
    icon: "error",
    customClass: {
      confirmButton: "btn btn-outline-danger ms-1",
    },
  });
};
