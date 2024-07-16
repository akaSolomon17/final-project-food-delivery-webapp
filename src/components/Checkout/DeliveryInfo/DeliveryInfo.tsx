import { Divider } from "@nextui-org/react";
// import { useCartActions } from "../../../zustand/cartStore";
import CCheckoutLayout from "../../CCheckout/CCheckoutLayout";
import InputValidation from "../../InputValidation/InputValidation";
import DeliveryTime from "./DeliveryTime";
import { FC } from "react";
import { IDeliveryInfoProps } from "../../../types/checkout.type";

const DeliveryInfo: FC<IDeliveryInfoProps> = ({ setValue, address, note }) => {
  // const { setNote } = useCartActions();

  return (
    <CCheckoutLayout header="Giao đến">
      <DeliveryTime />
      <Divider />
      <form className="flex flex-col justify-center items-center p-4">
        <div className="w-full">
          <InputValidation
            name="address"
            value={address}
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
            value={note}
            onChange={(e) => setValue("note", e.target.value)}
          />
        </div>
      </form>
    </CCheckoutLayout>
  );
};

export default DeliveryInfo;
