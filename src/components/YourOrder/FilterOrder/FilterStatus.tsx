import RadioValidation from "../../RadioValidation/RadioValidation";
import { Radio } from "@nextui-org/react";
import { EOrderStatus } from "../../../types/enums.type";

const { ALL, CANCELED, COMPLETED, DELIVERING } = EOrderStatus;

const FilterStatus = () => {
  return (
    <RadioValidation
      name="orderStatus"
      label="Order status"
      orientation="horizontal"
      defaultValue={ALL}
    >
      <Radio value={ALL}>{ALL}</Radio>
      <Radio value={COMPLETED}>{COMPLETED}</Radio>
      <Radio value={CANCELED}>{CANCELED}</Radio>
      <Radio value={DELIVERING}>{DELIVERING}</Radio>
    </RadioValidation>
  );
};

export default FilterStatus;
