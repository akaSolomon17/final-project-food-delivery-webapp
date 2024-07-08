import { Divider, Select, SelectItem } from '@nextui-org/react'
import { IoCardOutline } from "react-icons/io5";
import { BsPersonSquare } from "react-icons/bs";

const DetailsPayment = () => {
    return (
        <div className='min-w-[624px] w-[624px] bg-white mt-[24px] mx-auto rounded-md'>
            <h2 className='font-semibold text-xl p-4'>Chi tiết thanh toán</h2>
            <Divider />
            <div className="select-input-wrapper flex flex-col justify-center items-center p-4">
                <div className='w-full'>
                    <h2 className='text-default-500 text-sm py-2'>Chọn phương thức thanh toán</h2>
                    <Select
                        aria-label='Select a payment method'
                        className="w-full"
                        radius='sm'
                        startContent={<IoCardOutline size={18} />}
                        defaultSelectedKeys={["3439"]}
                        isRequired
                    >
                        <SelectItem startContent={<IoCardOutline size={18} />} key={"3439"}>3439</SelectItem>
                    </Select>
                </div>
                <div className='w-full'>
                    <h2 className='text-default-500 text-sm py-2'>Hồ sơ</h2>
                    <Select
                        aria-label='Select a profile'
                        className=" w-full"
                        radius='sm'
                        startContent={<BsPersonSquare size={18} />}
                        defaultSelectedKeys={["Huy"]}
                        isRequired
                    >
                        <SelectItem startContent={<BsPersonSquare size={18} />} key={"Personal"}>Personal</SelectItem>
                        <SelectItem startContent={<BsPersonSquare size={18} />} key={"Huy"}>Huy</SelectItem>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default DetailsPayment