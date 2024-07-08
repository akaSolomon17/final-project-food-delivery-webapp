import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/react';

interface ISelectValidationProps {
    label: string;
    name: string;
    className?: string;
    options: { value: string; label: string }[];
}

const SelectValidation: FC<ISelectValidationProps> = ({
    label,
    name,
    options,
    className,
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
                    <div className='h-[80px]'>
                        <Select
                            aria-label={label}
                            label={label}
                            className={className}
                            selectedKeys={options.find((option) => option.label === field.value)?.value ?? options[1].value}
                            {...field}
                            {...passProps}
                        >
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                        {errors[name] && <p className='text-danger text-sm ms-2'>{errors[name]?.message as string}</p>}
                    </div>
                )}
            />

        </div>
    );
};

export default SelectValidation;