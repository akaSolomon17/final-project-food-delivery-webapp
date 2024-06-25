import { useState } from 'react';
import { IVouchers } from '../types/vouchers.type';
import { useGetVouchersList } from '../apis/vouchers/getVouchersList.api';

const useVoucher = () => {
    const {data: vouchers} = useGetVouchersList();
    const [appliedVouchers, setAppliedVouchers] = useState<IVouchers[] | null>(null);

    const applyVoucher = (code: string) => {
        if(code.trim()===""){
            setAppliedVouchers(null)
            return false
        }

        const voucher = vouchers?.data?.filter((voucher: IVouchers) =>  voucher.code === code.trim());
        
        if (voucher && voucher!= undefined && voucher.length > 0) {
            setAppliedVouchers(voucher);
            return true
        } else {
            setAppliedVouchers(null)
            return false
        }

    };

    const getDiscountedPrice = (totalPrice: number) => {
        let priceReduce = 0
        let totalPriceDiscount = totalPrice;
        if (appliedVouchers && appliedVouchers.length > 0) {
            totalPriceDiscount = totalPrice - (totalPrice * appliedVouchers[0].discount / 100);
            priceReduce = totalPrice - totalPriceDiscount;
        }

        return { priceReduce, totalPriceDiscount };
    };

    return { appliedVouchers, applyVoucher, getDiscountedPrice };
    };

export default useVoucher;
