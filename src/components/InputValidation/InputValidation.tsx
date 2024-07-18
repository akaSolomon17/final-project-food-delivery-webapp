import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { IInputValidationProps } from "../../types/input.type";

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
        <div className="h-[80px] flex items-center">
          <Input
            onFocus={() => clearOnFocus && field.onChange("")}
            {...field}
            {...passProps}
          />
          {errors[name] && (
            <span className="text-danger text-sm ms-2">
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default InputValidation;
