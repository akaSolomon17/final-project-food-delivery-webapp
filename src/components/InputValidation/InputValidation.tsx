import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { IInputValidationProps } from "../../types/input.type";
import CErrorMessage from "../CErrorMessage/CErrorMessage";

const InputValidation: FC<IInputValidationProps> = ({
  name,
  clearOnFocus,
  ...passProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="h-[80px] flex flex-col justify-center">
          <Input
            onFocus={() => clearOnFocus && field.onChange("")}
            {...field}
            {...passProps}
          />
          {errors[name] && (
            <CErrorMessage message={errors[name].message as string} />
          )}
        </div>
      )}
    />
  );
};

export default InputValidation;
