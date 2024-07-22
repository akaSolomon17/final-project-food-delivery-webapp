import { FC } from "react";
import { Slider } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { ISliderValidationProps } from "../../types/filters.type";
import CErrorMessage from "../CErrorMessage/CErrorMessage";

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
            <CErrorMessage message={errors[name].message as string} />
          )}
        </>
      )}
    />
  );
};

export default SliderValidation;
