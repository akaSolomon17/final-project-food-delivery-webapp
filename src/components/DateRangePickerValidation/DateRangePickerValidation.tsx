import { DateRangePicker } from "@nextui-org/react";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IDateRangePickerValidationProps } from "../../types/input.type";

const DateRangePickerValidation: FC<IDateRangePickerValidationProps> = ({
  name,
  ...passProps
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DateRangePicker
          {...field}
          {...passProps}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
};

export default DateRangePickerValidation;
