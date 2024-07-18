/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IVouchers } from "../types/vouchers.type";
import { useGetVouchersList } from "../apis/vouchers/getVouchersList.api";
import {
  useCartActions,
  useTotalPrice,
  useDiscountInfo,
  useIsVoucherApplied,
} from "../zustand/cartStore.ts";

const useVoucher = () => {
  const { data: vouchers } = useGetVouchersList();
  const [appliedVouchers, setAppliedVouchers] = useState<IVouchers[] | null>(
    null,
  );

  const totalPrice = useTotalPrice();
  const { priceReduce, totalPriceDiscount } = useDiscountInfo();
  const isVoucherApplied = useIsVoucherApplied();

  const { setDiscountInfo, setIsAppliedVoucher } = useCartActions();

  const applyVoucher = (code: string) => {
    if (code.trim() === "") {
      setAppliedVouchers(null);
      setIsAppliedVoucher(false);
      setDiscountInfo({ priceReduce: 0, totalPriceDiscount: totalPrice });
      return false;
    }

    const voucher = vouchers?.data?.filter(
      (voucher: IVouchers) => voucher.code === code.trim(),
    );

    if (voucher && voucher.length > 0) {
      setAppliedVouchers(voucher);
      setIsAppliedVoucher(true);
      calculateDiscount(totalPrice, voucher[0].discount);
      return true;
    } else {
      setAppliedVouchers(null);
      setIsAppliedVoucher(false);
      setDiscountInfo({ priceReduce: 0, totalPriceDiscount: totalPrice });
      return false;
    }
  };

  const removeVoucher = () => {
    setAppliedVouchers(null);
    setIsAppliedVoucher(false);
    setDiscountInfo({ priceReduce: 0, totalPriceDiscount: totalPrice });
  };

  const calculateDiscount = (totalPrice: number, discount: number) => {
    const priceReduce = (totalPrice * discount) / 100;
    const totalPriceDiscount = totalPrice - priceReduce;
    setDiscountInfo({ priceReduce, totalPriceDiscount });
  };

  useEffect(() => {
    if (isVoucherApplied && appliedVouchers && appliedVouchers.length > 0) {
      calculateDiscount(totalPrice, appliedVouchers[0].discount);
    }
  }, [totalPrice, appliedVouchers]);

  return {
    appliedVouchers,
    applyVoucher,
    removeVoucher,
    priceReduce,
    totalPriceDiscount,
  };
};

export default useVoucher;
