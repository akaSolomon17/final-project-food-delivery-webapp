import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

interface IInputFileValidationProps {
    name: string,
    className: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFileValidation: FC<IInputFileValidationProps> = ({
    name,
    className,
    onChange,
    ...passProps
}) => {
    const { control, formState: { errors } } = useFormContext()
    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <div className="flex flex-col h-[60px] justify-center">
                        <div className="flex flex-col items-center justify-center h-[50px]">
                            <input
                                className={className}
                                type="file"
                                // value={field.value || ''}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (onChange) {
                                        onChange(e);
                                    }
                                }}
                                {...passProps}
                            />
                        </div>
                        {errors[name] && (<span className="text-danger text-sm ms-2">{errors[name]?.message as string}</span>)}
                    </div>
                )}
            />

        </>
    )
}

export default InputFileValidation