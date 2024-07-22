import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IInputFileValidationProps } from "../../types/input.type";
import CErrorMessage from "../CErrorMessage/CErrorMessage";

const InputFileValidation: FC<IInputFileValidationProps> = ({
  name,
  onChange,
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
        <div className="flex flex-col h-[60px] justify-center">
          <div className="flex flex-col items-center justify-center h-[50px]">
            <input
              type="file"
              onChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
              {...passProps}
            />
          </div>
          {errors[name] && (
            <CErrorMessage message={errors[name].message as string} />
          )}
        </div>
      )}
    />
  );
};

export default InputFileValidation;
