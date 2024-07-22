import { notify } from "../../hooks/Toastify/notify";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { EOrderStatus, EToastifyStatus } from "../../types/enums.type";
import http from "../../utils/http";

export const updateHistoryOrderStatus = async (
  id: string,
  status: EOrderStatus,
) => http.patch(`historyOrders/${id}`, { status: status });

export const useUpdateHistoryOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: EOrderStatus }) =>
      updateHistoryOrderStatus(id, status),

    onSuccess: (data) => {
      notify(
        `Đơn hàng ${data?.data?.id} đã được cập nhật!`,
        EToastifyStatus.TOAST_SUCCESS,
      );
      queryClient.invalidateQueries({ queryKey: ["historyOrders"] });
    },
    onError: (e) => {
      notify(`Failed to update order: ${e}`, EToastifyStatus.TOAST_ERROR);
    },
  });
};
