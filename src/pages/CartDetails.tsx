import { Button, Divider, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const CartDetails = () => {
    return (
        <div className='flex flex-col items-center gap-7'>
            <div className='flex gap-1 text-left w-[750px] font-lato text-lg'>
                <h1 className='font-semibold  '>Cart </h1>
                <span className='text-default-600'>3</span>
            </div>
            <div className='w-[750px] h-[350px]'>
                <Table aria-label="Example table with custom cells" isStriped>
                    <TableHeader >
                        <TableColumn>
                            Item
                        </TableColumn>
                        <TableColumn align='center'>
                            Price
                        </TableColumn>
                        <TableColumn align='center'>
                            Quantity
                        </TableColumn>
                        <TableColumn align='center'>
                            Total Price
                        </TableColumn>
                        <TableColumn>
                            Actions
                        </TableColumn>
                        {/* {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )} */}
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell className='flex gap-4'>
                                <Image
                                    width={70}
                                    src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                    alt="Foods cover"
                                // className="m-5"
                                />
                                <div className='flex flex-col'>
                                    <span className='font-lato font-semibold'>Title</span>
                                    <p className='max-w-[250px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempore pariatur provident facere reiciendis?</p>
                                </div>
                            </TableCell>
                            <TableCell>65.000đ</TableCell>
                            <TableCell className='w-[120px]'>
                                <div className='flex items-center gap-2 h-[40px] border border-default-400 justify-center rounded-full'>
                                    <AiOutlineMinus className='cursor-pointer' />
                                    <div>1</div>
                                    <AiOutlinePlus className='cursor-pointer' />
                                </div>
                            </TableCell>
                            <TableCell>65.000đ</TableCell>
                            <TableCell className='text-default-500'><AiOutlineClose size={20} /></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell className='flex gap-4'>
                                <Image
                                    width={70}
                                    src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                    alt="Foods cover"
                                // className="m-5"
                                />
                                <div className='flex flex-col'>
                                    <span className='font-lato font-semibold'>Title</span>
                                    <p className='max-w-[250px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempore pariatur provident facere reiciendis?</p>
                                </div>
                            </TableCell>
                            <TableCell>65.000đ</TableCell>
                            <TableCell className='w-[120px]'>
                                <div className='flex items-center gap-2 h-[40px] border border-default-400 justify-center rounded-full'>
                                    <AiOutlineMinus className='cursor-pointer' />
                                    <div>1</div>
                                    <AiOutlinePlus className='cursor-pointer' />
                                </div>
                            </TableCell>
                            <TableCell>65.000đ</TableCell>
                            <TableCell className='text-default-500'><AiOutlineClose size={20} /></TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell className='flex gap-4'>
                                <Image
                                    width={70}
                                    src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                    alt="Foods cover"
                                // className="m-5"
                                />
                                <div className='flex flex-col'>
                                    <span className='font-lato font-semibold'>Title</span>
                                    <p className='max-w-[250px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempore pariatur provident facere reiciendis?</p>
                                </div>
                            </TableCell>
                            <TableCell align='center'>65.000đ</TableCell>
                            <TableCell className='w-[120px]'>
                                <div className='flex items-center gap-2 h-[40px] border border-default-400 justify-center rounded-full'>
                                    <AiOutlineMinus className='cursor-pointer' />
                                    <span>1</span>
                                    <AiOutlinePlus className='cursor-pointer' />
                                </div>
                            </TableCell>
                            <TableCell>65.000đ</TableCell>
                            <TableCell className='text-default-500' align='center'><AiOutlineClose size={20} /></TableCell>
                        </TableRow>
                        {/* {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )} */}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center gap-5 w-[750px] text-left text-default-600'>
                <span>Promocode</span>
                <Button className='w-[140px] bg-white flex-col items-start border border-black ' radius='full'>HAPPY</Button>
                <span>Congrats! You have 10% discount</span>
                <div className='flex gap-1'>
                    <span>Discount: </span>
                    <span className='font-semibold'>15.000đ</span>
                </div>
            </div>
            <Divider className=' w-[750px]'></Divider>
            <div className='flex items-center gap-x-80'>
                <div className='flex font-lato text-default-600 gap-2 cursor-pointer'>
                    <div>←</div>
                    <div>Back to shopping</div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='flex gap-2'>
                        <span>Total Price:</span>
                        <span className='font-semibold'>85.000đ</span>
                    </div>
                    <Button className='bg-black text-bold text-[#fff]'>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartDetails