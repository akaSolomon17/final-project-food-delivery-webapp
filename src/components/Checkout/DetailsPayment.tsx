import { FC } from "react";
import { IDetailsPaymentProps } from "../../types/checkout.type";
import CCheckoutLayout from "../CCheckout/CCheckoutLayout";
import SelectValidation from "../SelectValidation/SelectValidation";

const DetailsPayment: FC<IDetailsPaymentProps> = ({ payments, profiles }) => {
  return (
    <CCheckoutLayout header="Chi tiết thanh toán">
      <form className="select-input-wrapper flex flex-col justify-center items-center p-4">
        <div className="w-full flex flex-col gap-2">
          <SelectValidation label="Chọn phương thức thanh toán" name="payment">
            {payments.map((selection: string) => (
              <option key={selection} value={selection}>
                {selection}
              </option>
            ))}
          </SelectValidation>

          <SelectValidation label="Chọn hồ sơ" name="profile">
            {profiles.map((selection: string) => (
              <option key={selection} value={selection}>
                {selection}
              </option>
            ))}
          </SelectValidation>
        </div>
      </form>
    </CCheckoutLayout>
  );
};

export default DetailsPayment;
