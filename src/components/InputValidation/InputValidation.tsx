import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input, InputProps } from '@nextui-org/react'

interface IInputValidationProps extends InputProps {
    name: string,
}

const InputValidation: FC<IInputValidationProps> = ({
    name,
    ...passProps
}) => {
    const {
        control,
        formState: { errors }
    } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className='h-[80px]'>
                    <div>
                        <Input
                            {...field}
                            {...passProps}
                        />
                    </div>
                    {errors[name] && <span className="text-danger text-sm ms-2">{errors[name]?.message as string}</span>}
                </div>
            )}
        />
    )
}

export default InputValidation