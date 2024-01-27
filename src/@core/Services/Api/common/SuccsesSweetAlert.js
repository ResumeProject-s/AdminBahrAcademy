import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const SuccessSwal = (title) => {
  Swal.fire({
    title: title,
    icon: "success",
    customClass: {
      confirmButton: "btn btn-success",
    },
  });
};
