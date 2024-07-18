import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IInputFileValidationProps } from "../../types/input.type";

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
    <>
      <Controller
        control={control}
        name={name}
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
              <span className="text-danger text-sm ms-2">
                {errors[name]?.message as string}
              </span>
            )}
          </div>
        )}
      />
    </>
  );
};

export default InputFileValidation;
