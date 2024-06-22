import React from 'react'

import { Button, Card, CardBody, CardFooter, Chip, Progress } from "@nextui-org/react"

import { IoMdTime, IoIosCalendar } from "react-icons/io";
const YourOrder = () => {
    return (
        <div className='flex flex-col gap-32 mt-8'>
            <div className="upcoming-order flex flex-col gap-8 items-center">
                <h1 className='font-bold text-4xl '>Upcoming orders</h1>
                <div className="flex gap-10 w-[50rem]">
                    <Card className='flex flex-row w-1/2 p-2'>
                        <CardBody className='flex gap-5 w-[40rem]'>
                            <h3 className='font-bold text-xl'>#Order 1234</h3>
                            <div className='flex flex-row items-center gap-4'>
                                <IoMdTime size={30} color='#A3A3A4' />
                                <div className='flex flex-col'>
                                    <p color='#A3A3A4'>Estimated arrival</p>
                                    <p className='font-bold text-2xl'>35 phút</p>
                                </div>
                            </div>
                            <Progress size="sm" color='success' aria-label="Loading..." value={30} />
                        </CardBody>
                        <CardFooter className='justify-end w-[20rem]'>
                            <Button className='bg-black text-white w-[8rem]' radius='sm'>Track</Button>
                        </CardFooter>
                    </Card>
                    <Card className='flex flex-row w-1/2 p-2'>
                        <CardBody className='flex gap-5 w-[40rem]'>
                            <h3 className='font-bold text-xl'>#Order 1</h3>
                            <div className='flex flex-row items-center gap-4'>
                                <IoMdTime size={30} color='#A3A3A4' />
                                <div className='flex flex-col'>
                                    <p color='#A3A3A4'>Estimated arrival</p>
                                    <p className='font-bold text-2xl'>15 phút</p>
                                </div>
                            </div>
                            <Progress size="sm" color='success' aria-label="Loading..." value={70} />
                        </CardBody>
                        <CardFooter className='justify-end w-[20rem]'>
                            <Button className='bg-black text-white w-[8rem]' radius='sm'>Track</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="history-orders flex flex-col gap-8 items-center">
                <h1 className='font-bold text-4xl'>History orders</h1>
                <div className='flex gap-10 w-[50rem]'>
                    <Card className='flex flex-col w-1/2'>
                        <CardBody className='flex flex-col gap-2'>
                            <div className='flex justify-between'>
                                <h3 className='font-bold text-xl'>#Order 1234</h3>
                                <div className="status"><Chip color='success' radius='sm'>Completed</Chip></div>
                            </div>
                            <div>
                                <div className="calendar flex items-center gap-2 text-[#A3A3A4]">
                                    <IoIosCalendar size={20} color='#A3A3A4' />
                                    <p>2021-09-27</p>
                                </div>
                            </div>
                            <div className="detail-ordered font-sans">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <p>1 x Gà</p>
                                        <p>65,000₫</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>1 x Kimbap</p>
                                        <p>65,000₫</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>1 x Box Yummy</p>
                                        <p>65,000₫</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>1 x Ramen</p>
                                        <p>65,000₫</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className='flex justify-evenly'>
                            <Button className='bg-[#353945] text-white w-1/3' radius='sm'>Reorder</Button>
                            <Button className='bg-[#BFBFBF] text-[#353945] w-1/3' radius='sm'>Get help</Button>
                        </CardFooter>
                    </Card>
                    <Card className='flex flex-col w-1/2'>
                        <CardBody className='flex flex-col gap-2'>
                            <div className='flex justify-between'>
                                <h3 className='font-bold text-xl'>#Order 1234</h3>
                                <div className="status"><Chip color='default' radius='sm'>Canceled</Chip></div>
                            </div>
                            <div>
                                <div className="calendar flex items-center gap-2 text-[#A3A3A4]">
                                    <IoIosCalendar size={20} color='#A3A3A4' />
                                    <p>2021-09-27</p>
                                </div>
                            </div>
                            <div className="detail-ordered font-sans">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <p>1 x Gà</p>
                                        <p>65,000₫</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>1 x Kimbap</p>
                                        <p>65,000₫</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>1 x Box Yummy</p>
                                        <p>65,000₫</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>1 x Ramen</p>
                                        <p>65,000₫</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className='flex justify-evenly'>
                            <Button className='bg-[#353945] text-white w-1/3' radius='sm'>Reorder</Button>
                            <Button className='bg-[#BFBFBF] text-[#353945] w-1/3' radius='sm'>Get help</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div >
    )
}

export default YourOrder