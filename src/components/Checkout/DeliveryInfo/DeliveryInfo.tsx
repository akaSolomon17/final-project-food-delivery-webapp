import { Divider } from "@nextui-org/react";
import CCheckoutLayout from "../../CCheckout/CCheckoutLayout";
import InputValidation from "../../InputValidation/InputValidation";
import DeliveryTime from "./DeliveryTime";

const DeliveryInfo = () => {
  return (
    <CCheckoutLayout header="Giao đến">
      <DeliveryTime />
      <Divider />
      <div className="flex flex-col justify-center items-center p-4">
        <div className="w-full">
          <InputValidation
            name="address"
            label="Địa chỉ"
            labelPlacement="outside"
            disabled
            className="w-full"
          />

          <InputValidation
            name="note"
            placeholder="Hãy gặp tôi tại sảnh"
            label="Ghi chú"
            labelPlacement="outside"
          />
        </div>
      </div>
    </CCheckoutLayout>
  );
};

export default DeliveryInfo;
