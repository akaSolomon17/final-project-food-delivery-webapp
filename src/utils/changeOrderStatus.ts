import { EOrderStatus, EToastifyStatus } from "../types/enums.type";
import { useUpdateHistoryOrderStatus } from "../apis/orders/updateHistoryOrderStatus.api";
import { notify } from "../hooks/Toastify/notify";
import { useRef } from "react";
import { useCartTimeArrival } from "../zustand/cartStore";

export const getTimeEstimateInMs = (timeEstimate: number) => {
  return timeEstimate * 60 * 1000;
};

// const storeProgressData = (orderId: string, status: EOrderStatus, endTime: number) => {
//   const progressData = JSON.parse(localStorage.getItem('orderProgress') || '{}');
//   progressData[orderId] = { status, endTime };
//   localStorage.setItem('orderProgress', JSON.stringify(progressData));
// };

// const clearProgressData = (orderId: string) => {
//   const progressData = JSON.parse(localStorage.getItem('orderProgress') || '{}');
//   delete progressData[orderId];
//   localStorage.setItem('orderProgress', JSON.stringify(progressData));
// };

// const retrieveProgressData = (orderId: string) => {
//   const progressData = JSON.parse(localStorage.getItem('orderProgress') || '{}');
//   return progressData[orderId] || null;
// };

export const useUpdateOrderStatus = () => {
  const { mutate: updateOrderMutate } = useUpdateHistoryOrderStatus();
  const timeoutIdRef = useRef<number | null>(null);
  const cartTimeArrival = useCartTimeArrival();

  const updateOrderStatus = (status: EOrderStatus.COMPLETED | EOrderStatus.CANCELED, orderId: string) => {
    const deliveryTimeInMs = getTimeEstimateInMs(cartTimeArrival);
    // const endTime = Date.now() + deliveryTimeInMs;

    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    // storeProgressData(orderId, status, endTime);

    const newTimeoutId = setTimeout(() => {
      updateOrderMutate({ id: orderId, status }, {
        onSuccess: () => {
          if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          // clearProgressData(orderId);
        },
        onError: (e) => {
          notify(`Failed to update order: ${e}`, EToastifyStatus.TOAST_ERROR);
        },
      });
    }, deliveryTimeInMs) as unknown as number;
    
    timeoutIdRef.current = newTimeoutId;
  };

  return { updateOrderStatus };
};
