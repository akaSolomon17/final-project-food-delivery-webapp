import { useEffect, useMemo, useState } from 'react';
import { Pagination, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { IHistoryOrders } from '../../types/historyOrders.type';
import { formatVnCurrency } from '../../utils/formatCurrency';
import ModalOrderDetails from '../ModalOrderDetails/ModalOrderDetails';
import { getStatusColor } from '../../utils/getColorByStatus';
import { EOrderHeaderColumn, EOrderStatus } from '../../types/enums.type';
import { MdCancel } from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { useCartActions, useEndDate, useStartDate } from '../../zustand/cartStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CTooltip } from '../CTooltip/CTooltip';
import { CDateRangePicker } from '../CDateInput/CDateInput';
import { useGetHistoryOrdersByDate } from '../../apis/orders/getHistoryOrdersList.api';
import Loading from '../Loading/Loading';
import { useUpdateOrderStatus } from '../../utils/changeOrderStatus';

import "./YourOrder.css";

const { CANCELED, DELIVERING } = EOrderStatus
const { ORDER_ID, ORDER_DATE, STATUS, TOTAL_PRICE } = EOrderHeaderColumn

const columnsHeader = [ORDER_ID, ORDER_DATE, TOTAL_PRICE, STATUS, ''];

const YourOrder = () => {
    const [orderId, setOrderId] = useState<string>('')
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startDate = useStartDate()
    const endDate = useEndDate()
    const { setCart } = useCartActions()
    const { isOpen, onOpenChange } = useDisclosure()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const { updateOrderStatus } = useUpdateOrderStatus()
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: ORDER_ID, direction: 'descending' });


    const { data: historyOrderByDate, isLoading: orderLoading } = useGetHistoryOrdersByDate(startDate, endDate)
    const historyOrderByDateData = historyOrderByDate?.data

    const rowsPerPage = 8;

    const items = useMemo(() => {
        // Memo for sorting table
        const sortedData = [...(historyOrderByDateData || [])].sort((a, b) => {
            const sortColumn = sortDescriptor.column ?? ""
            let cmp = a[sortColumn] < b[sortColumn] ? -1 : 1;
            if (sortDescriptor.direction === 'descending') {
                cmp *= -1;
            }
            return cmp;
        });

        // Memo for pagination
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return sortedData.slice(start, end);
    }, [page, historyOrderByDateData, sortDescriptor]);

    const calcTotalPages = Math.ceil(historyOrderByDateData?.length / rowsPerPage);

    useEffect(() => {
        if (!isNaN(calcTotalPages)) {
            setTotalPages(calcTotalPages);
            searchParams.set('totalPages', (calcTotalPages.toString()));
            setSearchParams(searchParams);
        }
    }, [historyOrderByDateData])

    useEffect(() => {
        const totalPages = searchParams.get('totalPages');
        const page = searchParams.get('page');
        if (page && totalPages) {
            setTotalPages(parseInt(totalPages));
            setPage(parseInt(page));
        }
    }, [searchParams])

    const handleActivePage = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    }

    const handleGetDetailOrder = (id: string) => {
        onOpenChange()
        setOrderId(id)
    }

    const handleReorder = (order: IHistoryOrders) => {
        const products = order.orderDetails.map((order) => ({
            id: order.id,
            quantity: Number(order.quantity)
        }));
        setCart(products);
        navigate('/checkout');
    }

    const handleCancelOrder = (id: string) => {
        updateOrderStatus(CANCELED, id)
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='font-bold text-3xl my-10'>Your Orders</h1>
            <CDateRangePicker />
            <ModalOrderDetails onOpenChange={onOpenChange} isOpen={isOpen} orderId={orderId} />
            <Table
                bottomContent={items?.length > 0 &&
                    (<div className="flex w-full justify-center">
                        <Pagination
                            showShadow
                            color="default"
                            radius='sm'
                            page={page}
                            total={totalPages}
                            onChange={handleActivePage}
                        />
                    </div>)
                }
                aria-label="Order history table"
                className='w-1/2 h-[560px] mt-10'
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                <TableHeader >
                    {columnsHeader.map((column, index: number) =>
                    (<TableColumn
                        align='center'
                        key={index}
                        allowsSorting={column === ORDER_ID}
                        className={column === ORDER_ID ? "orderId" : ""}>
                        <p>{column}</p>
                    </TableColumn>)
                    )}
                </TableHeader>
                <TableBody
                    emptyContent="Không tìm thấy đơn hàng nào."
                    loadingContent={<Loading />}
                    isLoading={orderLoading}
                >
                    {items?.map((row: IHistoryOrders, index: number) => (
                        <TableRow
                            className='items-center hover:bg-gray-100 hover:cursor-pointer'
                            key={row.id}
                            onClick={() => handleGetDetailOrder(row.id)}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <TableCell className='font-semibold !outline-none'>#{row.id}</TableCell>
                            <TableCell className='!outline-none'>{new Date(row.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell className='!outline-none'>
                                <p className={`${row.status === CANCELED && 'line-through text-default-400'}`}>
                                    {formatVnCurrency(row.discountPrice as number)}
                                </p>
                            </TableCell>
                            <TableCell className='!outline-none'>
                                <p className={`flex items-center justify-center ${getStatusColor(row.status && row.status)} w-3/5 rounded-lg`}>
                                    {row.status}
                                </p>
                            </TableCell>
                            <TableCell className='!outline-none w-[68px]'>
                                {hoveredRow === index && (
                                    <div className='flex gap-1 text-right'>
                                        <CTooltip content="Đặt lại" placement='top'>
                                            <div>
                                                <TbReorder
                                                    className='cursor-pointer text-default-400 hover:text-default-700'
                                                    size={18}
                                                    onClick={() => handleReorder(row)}
                                                />
                                            </div>
                                        </CTooltip>
                                        {row.status === DELIVERING && (
                                            <CTooltip content="Hủy đơn" placement='top'>
                                                <div>
                                                    <MdCancel
                                                        className='cursor-pointer text-default-400 hover:text-default-700'
                                                        size={18}
                                                        onClick={() => handleCancelOrder(row.id)}
                                                    />
                                                </div>
                                            </CTooltip>
                                        )}
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}

export default YourOrder