import Swal from "sweetalert2";


export function handleSuccess(message: string, title: string) {
    return Swal.fire({
        title: title,
        text: message,
        icon: "success"
    });
}
export function handleError(message: string, title: string) {
    return Swal.fire({
        title: title,
        text: message,
        icon: "error"
    });
}