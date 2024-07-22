import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ISelectValidationProps } from "../../types/input.type";
import CErrorMessage from "../CErrorMessage/CErrorMessage";

const SelectValidation: FC<ISelectValidationProps> = ({
  name,
  label,
  children,
  ...passProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex flex-col h-[80px]">
            {label && (
              <label htmlFor={label} className="text-sm mb-2">
                {label}
              </label>
            )}
            <select
              id={label}
              className="w-full h-[55px] border-2 border-default-200 rounded-lg p-2"
              {...field}
              {...passProps}
            >
              <option value="" disabled>
                Choose food category
              </option>
              {children}
            </select>
            {errors[name] && (
              <CErrorMessage message={errors[name].message as string} />
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SelectValidation;
