import { Radio, RadioGroup } from "@nextui-org/react";
import { EOrderStatus } from "../../types/enums.type";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const { ALL, CANCELED, COMPLETED, DELIVERING } = EOrderStatus;

const FilterOrder = () => {
  const [status, setStatus] = useState<EOrderStatus>(ALL);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const orderStatus = searchParams.get("orderStatus");

    if (orderStatus) {
      setStatus(orderStatus as EOrderStatus);
    } else {
      setStatus(ALL);
    }
  }, [searchParams]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value as EOrderStatus;

    if (newStatus !== ALL) {
      searchParams.set("orderStatus", newStatus);
    } else {
      searchParams.delete("orderStatus");
    }

    setSearchParams(searchParams);
    setStatus(newStatus);
  };

  return (
    <>
      <RadioGroup
        label="Order status"
        orientation="horizontal"
        value={status}
        onChange={(e) => handleRadioChange(e)}
      >
        <Radio value={ALL}>{ALL}</Radio>
        <Radio value={COMPLETED}>{COMPLETED}</Radio>
        <Radio value={CANCELED}>{CANCELED}</Radio>
        <Radio value={DELIVERING}>{DELIVERING}</Radio>
      </RadioGroup>
    </>
  );
};

export default FilterOrder;
