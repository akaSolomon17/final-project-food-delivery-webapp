import { RadioGroup } from "@nextui-org/react";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IRadioValidationProps } from "../../types/filters.type";
import CErrorMessage from "../CErrorMessage/CErrorMessage";

const RadioValidation: FC<IRadioValidationProps> = ({
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
      render={({ field }) => (
        <>
          <RadioGroup {...field} {...passProps}>
            {children}
          </RadioGroup>
          {errors[name] && (
            <CErrorMessage message={errors[name].message as string} />
          )}
        </>
      )}
    />
  );
};

export default RadioValidation;
