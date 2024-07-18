import { EOrderStatus } from "../types/enums.type";

const { DELIVERING, COMPLETED, CANCELED } = EOrderStatus;

export const getStatusColor = (status: EOrderStatus) => {
  switch (status) {
    case DELIVERING:
      return "bg-orange-200 text-orange-500";
    case COMPLETED:
      return "bg-green-200 text-green-500";
    case CANCELED:
      return "bg-default-200 text-default-500";
    default:
      return "";
  }
};
