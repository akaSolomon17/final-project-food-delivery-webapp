import { CheckboxGroup } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import { ICheckboxValidationProps } from "../../types/filters.type";
import CErrorMessage from "../CErrorMessage/CErrorMessage";

const CheckboxValidation: FC<ICheckboxValidationProps> = ({
  name,
  children,
  ...passProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value, ...rest } = field;
        const checkedValues = Array.isArray(value)
          ? value
          : value
            ? value.split(",")
            : [];
        return (
          <>
            <CheckboxGroup value={checkedValues} {...rest} {...passProps}>
              {children}
            </CheckboxGroup>
            {errors[name] && (
              <CErrorMessage message={errors[name].message as string} />
            )}
          </>
        );
      }}
    />
  );
};

export default CheckboxValidation;
