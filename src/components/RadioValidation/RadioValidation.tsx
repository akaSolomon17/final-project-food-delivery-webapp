import { RadioGroup } from "@nextui-org/react";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IRadioValidationProps } from "../../types/filters.type";

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
            <span className="text-danger text-sm ms-2">
              {errors[name]?.message as string}
            </span>
          )}
        </>
      )}
    />
  );
};

export default RadioValidation;
