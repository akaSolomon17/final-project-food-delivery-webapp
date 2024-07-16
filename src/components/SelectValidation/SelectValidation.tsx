import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ISelectValidationProps } from '../../types/input.type';

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
                    <div className='flex flex-col h-[80px]'>
                        {label &&
                            <label
                                htmlFor={label}
                                className='text-sm mb-2'
                            >
                                {label}
                            </label>
                        }
                        <select
                            id={label}
                            className='w-full h-[55px] border-2 border-default-200 rounded-lg p-2'
                            {...field}
                            {...passProps}
                        >
                            {children}
                        </select>
                        {errors[name] &&
                            <p className='text-danger text-sm ms-2'>
                                {errors[name]?.message as string}
                            </p>
                        }
                    </div>
                )
                }
            />

        </div >
    );
};

export default SelectValidation;