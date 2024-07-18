import CCheckoutLayout from "../CCheckout/CCheckoutLayout";
import SelectValidation from "../SelectValidation/SelectValidation";
import {
  cardOptions,
  userProfile,
} from "../../../public/data/checkoutConstants";

const DetailsPayment = () => {
  return (
    <CCheckoutLayout header="Chi tiết thanh toán">
      <div className="select-input-wrapper flex flex-col justify-center items-center p-4">
        <div className="w-full flex flex-col gap-2">
          <SelectValidation label="Chọn phương thức thanh toán" name="payment">
            {cardOptions.map((selection: string) => (
              <option key={selection} value={selection}>
                {selection}
              </option>
            ))}
          </SelectValidation>

          <SelectValidation label="Chọn hồ sơ" name="profile">
            {userProfile.map((selection: string) => (
              <option key={selection} value={selection}>
                {selection}
              </option>
            ))}
          </SelectValidation>
        </div>
      </div>
    </CCheckoutLayout>
  );
};

export default DetailsPayment;
