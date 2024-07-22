/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCartActions,
  useIsVoucherApplied,
  useTotalPrice,
} from "../../../zustand/cartStore";
import VoucherEmpty from "./VoucherEmpty";
import Loading from "../../Loading/Loading";
import React, { useEffect, useState } from "react";
import { debounce } from "../../../utils/debounce";
import useVoucher from "../../../hooks/useVouchers";
import { IoCloseCircleSharp } from "react-icons/io5";
import { EVoucher } from "../../../types/enums.type";
import { IVouchers } from "../../../types/vouchers.type";
import CCheckoutLayout from "../../CCheckout/CCheckoutLayout";
import { useGetVouchersList } from "../../../apis/vouchers/getVouchersList.api";

const { VOUCHER_INVALID } = EVoucher;

const OrderVoucher = () => {
  const [voucherError, setVoucherError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeSearch, setActiveSearch] = useState<IVouchers[]>([]);
  const totalPrice = useTotalPrice();
  const isAppliedVoucher = useIsVoucherApplied();
  const { data: vouchersList, isLoading } = useGetVouchersList();
  const { setDiscountInfo, setIsAppliedVoucher } = useCartActions();
  const { appliedVouchers, applyVoucher, removeVoucher } = useVoucher();

  const debouncedSearch = debounce((value: string) => {
    setSearchKeyword(value);
    if (value === "") {
      setActiveSearch(vouchersList?.data);
    } else {
      setActiveSearch(
        vouchersList?.data.filter((item: IVouchers) =>
          item.code.includes(value),
        ),
      );
    }
  }, 500);

  const handleSearchTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    debouncedSearch(value);
  };

  const handleApplyVoucher = (id: string) => {
    const voucher = vouchersList?.data.find(
      (item: IVouchers) => item.id === id,
    );

    if (!voucher) return;

    const isApplied = applyVoucher(voucher.code);

    if (isApplied) {
      setIsAppliedVoucher(true);
      setVoucherError("");
    } else {
      setIsAppliedVoucher(false);
      setDiscountInfo({ priceReduce: 0, totalPriceDiscount: totalPrice });
      setVoucherError(VOUCHER_INVALID);
    }
  };

  const handleCancelVoucher = () => {
    removeVoucher();
    setIsAppliedVoucher(false);
    setDiscountInfo({ priceReduce: 0, totalPriceDiscount: totalPrice });
  };

  useEffect(() => {
    if (isAppliedVoucher && appliedVouchers && appliedVouchers.length > 0) {
      const discount = {
        priceReduce: (totalPrice * appliedVouchers[0].discount) / 100,
        totalPriceDiscount:
          totalPrice - (totalPrice * appliedVouchers[0].discount) / 100,
      };
      setDiscountInfo(discount);
    }
  }, [totalPrice, appliedVouchers]);

  // Update the active search list when the voucher list data changes
  useEffect(() => {
    if (searchKeyword === "") {
      setActiveSearch(vouchersList?.data);
    } else {
      setActiveSearch(
        vouchersList?.data.filter((item: IVouchers) =>
          item.code.includes(searchKeyword),
        ),
      );
    }
  }, [searchKeyword, vouchersList?.data]);

  return (
    <>
      <CCheckoutLayout header="Voucher">
        <div className="flex gap-10 p-4">
          <input
            className="border-1 rounded-md w-[356px] h-[48px] p-3"
            type="text"
            placeholder="Nhập mã khuyến mãi"
            onChange={(e) => handleSearchTrigger(e)}
          />
        </div>
        <span className="text-sm">
          {appliedVouchers?.[0]?.description ? (
            <div className="flex justify-between items-center w-1/3 border-1 border-slate-300 bg-slate-200 p-2 rounded-sm ms-4">
              <p className="w-[200px]">{appliedVouchers?.[0]?.description}</p>
              <IoCloseCircleSharp
                size={18}
                className="cursor-pointer"
                onClick={handleCancelVoucher}
              />
            </div>
          ) : (
            <p className="ms-4">{voucherError}</p>
          )}
        </span>
        <div className="flex overflow-x-scroll scrollbar gap-4 p-4 h-[135px]">
          {!isLoading ? (
            <>
              {activeSearch?.length > 0 ? (
                activeSearch.map((voucher: IVouchers, index: number) => (
                  <div
                    className="flex justify-between border-1 rounded-md p-4 items-center bg-slate-50"
                    key={index}
                  >
                    <div className="flex flex-col gap-1 w-[120px]">
                      <h1 className="text-lg font-semibold ">
                        Mã giảm {voucher.discount}%
                      </h1>
                      <p>Promo Code:</p>
                      <p className="font-semibold">{voucher.code}</p>
                    </div>
                    {appliedVouchers?.some(
                      (applied) => applied.id === voucher.id,
                    ) ? (
                      <button
                        type="button"
                        className="bg-gray-500 text-white text-sm w-[70px] h-[30px] rounded-md ms-5"
                        onClick={() => handleCancelVoucher()}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-black text-white text-sm w-[70px] h-[30px] rounded-md ms-5"
                        onClick={() => handleApplyVoucher(voucher.id)}
                      >
                        Áp dụng
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <VoucherEmpty />
              )}
            </>
          ) : (
            <div className="relative flex justify-center w-full">
              <Loading />
            </div>
          )}
        </div>
      </CCheckoutLayout>
    </>
  );
};

export default OrderVoucher;
