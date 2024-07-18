import {
  Pagination,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FC, useEffect, useMemo, useState } from "react";
import { MdCancel } from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { CTooltip } from "../CTooltip/CTooltip";
import { IHistoryOrders } from "../../types/historyOrders.type";
import { formatVnCurrency } from "../../utils/formatCurrency";
import { getStatusColor } from "../../utils/getColorByStatus";
import { EOrderHeaderColumn, EOrderStatus } from "../../types/enums.type";
import { useGetHistoryOrdersByDate } from "../../apis/orders/getHistoryOrdersList.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateOrderStatus } from "../../utils/changeOrderStatus";
import { useCartActions } from "../../zustand/cartStore";
import { useProductActions } from "../../zustand/productStore";
import Loading from "../Loading/Loading";

const { CANCELED, DELIVERING } = EOrderStatus;
const { ORDER_ID, ORDER_DATE, STATUS, TOTAL_PRICE } = EOrderHeaderColumn;
const columnsHeader = [ORDER_ID, ORDER_DATE, TOTAL_PRICE, STATUS, ""];

const TableOrder: FC<{ onOpenChange: () => void }> = ({ onOpenChange }) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: ORDER_ID,
    direction: "descending",
  });
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateOrderStatus } = useUpdateOrderStatus();
  const { setOrderDetail } = useProductActions();
  const { setCart } = useCartActions();
  const navigate = useNavigate();

  const { data: historyOrderByDate, isLoading: orderLoading } =
    useGetHistoryOrdersByDate();

  const historyOrderByDateData = historyOrderByDate?.data;

  const rowsPerPage = 8;

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setPage(parseInt(page));
    }
  }, [searchParams]);

  // Reset page = 1 when change order status
  useEffect(() => {
    setPage(1);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = useMemo(() => {
    const sortedData = [
      ...((historyOrderByDateData && historyOrderByDateData) || []),
    ].sort((a, b) => {
      const sortColumn = sortDescriptor.column ?? "";

      let cmp = a[sortColumn] < b[sortColumn] ? -1 : 1;
      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedData.slice(start, end);
  }, [page, historyOrderByDateData, sortDescriptor]);

  const totalPages = historyOrderByDateData
    ? Math.ceil(historyOrderByDateData?.length / rowsPerPage)
    : 1;

  // HANDLER
  const handleActivePage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const handleGetDetailOrder = (orderDetail: IHistoryOrders) => {
    onOpenChange();
    setOrderDetail(orderDetail);
  };

  const handleReorder = (order: IHistoryOrders) => {
    const products = order.orderDetails.map((order) => ({
      id: order.id,
      quantity: Number(order.quantity),
    }));

    setCart(products);

    navigate("/checkout");
  };

  const handleCancelOrder = (id: string) => {
    updateOrderStatus(CANCELED, id);
  };

  return (
    <Table
      bottomContent={
        items?.length > 0 && (
          <div className="flex w-full justify-center">
            <Pagination
              showShadow
              color="default"
              radius="sm"
              page={page}
              total={totalPages}
              onChange={handleActivePage}
            />
          </div>
        )
      }
      aria-label="Order history table"
      className="w-1/2 h-[560px] mt-10"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        {columnsHeader.map((column, index: number) => (
          <TableColumn
            align="center"
            key={index}
            allowsSorting={column === ORDER_ID}
            className={column === ORDER_ID ? "orderId" : ""}
          >
            <p>{column}</p>
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent="Không tìm thấy đơn hàng nào."
        loadingContent={<Loading />}
        isLoading={orderLoading}
      >
        {items.map((row: IHistoryOrders, index: number) => (
          <TableRow
            className="items-center hover:bg-gray-100 hover:cursor-pointer"
            key={index}
            onClick={() => handleGetDetailOrder(row)}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <TableCell className="font-semibold !outline-none">
              #{row.id}
            </TableCell>
            <TableCell className="!outline-none">
              {new Date(row.orderDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="!outline-none">
              <p
                className={`${
                  row.status === CANCELED && "line-through text-default-400"
                }`}
              >
                {formatVnCurrency(row.discountPrice as number)}
              </p>
            </TableCell>
            <TableCell className="!outline-none">
              <p
                className={`flex items-center justify-center ${getStatusColor(
                  row.status && row.status,
                )} w-3/5 rounded-lg`}
              >
                {row.status}
              </p>
            </TableCell>
            <TableCell className="!outline-none w-[68px]">
              {hoveredRow === index && (
                <div className="flex gap-1 text-right">
                  <CTooltip content="Đặt lại" placement="top">
                    <span>
                      <TbReorder
                        className="cursor-pointer text-default-400 hover:text-default-700"
                        size={18}
                        onClick={() => handleReorder(row)}
                      />
                    </span>
                  </CTooltip>
                  {row.status === DELIVERING && (
                    <CTooltip content="Hủy đơn" placement="top">
                      <span>
                        <MdCancel
                          className="cursor-pointer text-default-400 hover:text-default-700"
                          size={18}
                          onClick={() => handleCancelOrder(row.id)}
                        />
                      </span>
                    </CTooltip>
                  )}
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableOrder;
