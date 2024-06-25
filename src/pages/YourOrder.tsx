import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Chip, Progress } from "@nextui-org/react";
import { IoMdTime } from "react-icons/io";
import { IHistoryOrders, IOrder } from '../types/historyOrders.type';
import { useGetFoodList } from '../apis/products/getFoodList.api';
import { FoodHistory } from '../types/foods.type';
import { formatCurrency } from '../utils/formatCurrency';
import { useGetHistoryOrdersList } from '../apis/orders/getHistoryOrdersList.api.ts';
import { useAddHistoryOrders } from '../apis/orders/updateHistoryOrdersList.api';

const YourOrder = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [upcomingOrders, setUpcomingOrders] = useState<IOrder[]>([]);
    const { data: foodList } = useGetFoodList();
    const { data: historyOrdersData } = useGetHistoryOrdersList();
    const [historyOrders, setHistoryOrders] = useState<IHistoryOrders[]>([]);
    const updateHistoryOrdersList = useAddHistoryOrders();

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders') ?? '[]');
        setOrders(storedOrders);
    }, []);

    const addOrderToHistory = (order: IOrder) => {
        const historyOrder: IHistoryOrders = {
            id: order.id,
            status: 'completed',
            orders: order.items.map(item => {
                const food = foodList?.data.find((food: FoodHistory) => food.id === item.id);
                return {
                    id: food?.id ?? '',
                    title: food?.title ?? '',
                    priceNumber: food?.priceNumber ?? 0,
                };
            }),
        };

        setHistoryOrders(prevHistoryOrders => [...prevHistoryOrders, historyOrder]);
        updateHistoryOrdersList.mutate({ newHistoryOrders: historyOrder });
    };

    useEffect(() => {
        if (foodList && orders.length > 0) {
            const interval = setInterval(() => {
                const updatedOrders = orders.map(order => {
                    if (order.status === 'ordering' && order.estimateTime <= Date.now()) {
                        order.status = 'ordered';
                        addOrderToHistory(order);
                    }
                    return order;
                });
                setOrders(updatedOrders);
                setUpcomingOrders(updatedOrders.filter(order => order.status === 'ordering'));
                localStorage.setItem('orders', JSON.stringify(updatedOrders));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [orders, foodList]);

    useEffect(() => {
        if (historyOrdersData) {
            setHistoryOrders(historyOrdersData.data);
        }
    }, [historyOrdersData]);

    const formatTimeLeft = (estimateTime: number) => {
        const secondsLeft = Math.max(0, (estimateTime - Date.now()) / 1000);
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = Math.floor(secondsLeft % 60);
        return `${minutes}m ${seconds}s`;
    };

    return (
        <div className='flex flex-col gap-32 mt-8'>
            <div className="upcoming-order flex flex-col gap-8 items-center">
                <h1 className='font-bold text-4xl '>Upcoming orders</h1>
                <div className="flex gap-10 w-[50rem]">
                    {upcomingOrders.map((order) => (
                        <Card key={order.id} className='flex flex-row w-1/2 p-2'>
                            <CardBody className='flex gap-5 w-[40rem]'>
                                <h3 className='font-bold text-xl'>#Order {order.id}</h3>
                                <div className='flex flex-row items-center gap-4'>
                                    <IoMdTime size={30} color='#A3A3A4' />
                                    <div className='flex flex-col'>
                                        <p color='#A3A3A4'>Estimated arrival</p>
                                        <p className='font-bold text-2xl'>{formatTimeLeft(order.estimateTime)}</p>
                                    </div>
                                </div>
                                <Progress size="sm" color='success' aria-label="Loading..." value={10} />
                            </CardBody>
                            <CardFooter className='justify-end w-[20rem]'>
                                <Button className='bg-black text-white w-[8rem]' radius='sm'>Cancel</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="history-orders flex flex-col gap-8 items-center">
                <h1 className='font-bold text-4xl'>History orders</h1>
                <div className='flex flex-wrap gap-10 w-[62rem]'>
                    {historyOrders.map((order) => (
                        <Card key={order.id} className='flex flex-col w-[300px]'>
                            <CardBody className='flex flex-col gap-5'>
                                <div className='flex justify-between'>
                                    <h3 className='font-bold text-xl'>#Order {order.id}</h3>
                                    <div className="status"><Chip color='success' radius='sm'>{order.status === 'completed' ? 'Completed' : 'Canceled'}</Chip></div>
                                </div>
                                {/* <div>
                                    <div className="calendar flex items-center gap-2 text-[#A3A3A4]">
                                        <IoIosCalendar size={20} color='#A3A3A4' />
                                        <p>{new Date(order.estimateTime).toLocaleDateString()}</p>
                                    </div>
                                </div> */}
                                <div className="detail-ordered font-sans">
                                    <div className="flex flex-col gap-2">
                                        {order?.orders?.map((item, index) => (
                                            <div key={index} className="flex justify-between">
                                                <p>{item.title}</p>
                                                <p>{formatCurrency(item.priceNumber)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter className='flex justify-evenly'>
                                <Button className='bg-[#353945] text-white w-1/3' radius='sm'>Reorder</Button>
                                <Button className='bg-[#BFBFBF] text-[#353945] w-1/3' radius='sm'>Get help</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default YourOrder;
