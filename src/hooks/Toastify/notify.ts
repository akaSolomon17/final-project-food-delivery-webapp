import { toast } from "react-toastify";
import { EToastifyStatus } from "../../types/enums.type";

const {TOAST_SUCCESS,TOAST_ERROR,TOAST_WARNING,TOAST_INFO} = EToastifyStatus

export const notify = (message: string, type: EToastifyStatus) => {
    switch (type) {
        case TOAST_INFO:
            toast.info(message,{
                position: "top-left"
            });
            break;
        case TOAST_SUCCESS:
            toast.success(message,{
                position: "top-left"
            });
            break;
        case TOAST_WARNING:
            toast.warning(message,{
                position: "top-left"
            });
            break;
        case TOAST_ERROR:
            toast.error(message,{
                position: "top-left"
            });
            break;
        default:
            toast.info(message,{
                position: "top-left"
            });
            break;
    }
};