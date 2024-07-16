import { FC } from "react";
import { Slider } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { ISliderValidationProps } from "../../types/filters.type";

const SliderValidation: FC<ISliderValidationProps> = ({
  name,
  ...passProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="priceRange"
      control={control}
      render={({ field }) => (
        <>
          <Slider {...field} {...passProps} />
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

export default SliderValidation;
