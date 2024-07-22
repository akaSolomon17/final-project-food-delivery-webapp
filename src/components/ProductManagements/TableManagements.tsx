import {
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Loading from "../Loading/Loading";
import EmptyTable from "./EmptyTable";
import { CTooltip } from "../CTooltip/CTooltip";
import { MdOutlineEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetFoodList } from "../../apis/products/getFoodList.api";
import { useDeleteProductById } from "../../apis/products/deleteProductById.api";
import { Food } from "../../types/foods.type";
import { notify } from "../../hooks/Toastify/notify";
import { EToastifyStatus } from "../../types/enums.type";
import { useProductManagementsActions } from "../../zustand/productManagements";

const columnsHeader = [
  "ID",
  "Image",
  "Title",
  "Description",
  "Price",
  "Category",
  "Average Rating",
  "",
];
const { TOAST_SUCCESS, TOAST_ERROR } = EToastifyStatus;

const TableManagements: FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [page, setPage] = useState(1);
  const { setCurrentFood } = useProductManagementsActions();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: foodList, isLoading: foodListLoading } = useGetFoodList();
  const { mutate: deleteProductMutate } = useDeleteProductById();
  const rowsPerPage = 5;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const foodListPerPage = foodList?.data?.slice(start, end);

    if (foodListPerPage?.length === 0) {
      setPage(page - 1);
    }

    return foodListPerPage;
  }, [page, foodList?.data]);

  const totalPages = foodList?.data
    ? Math.ceil(foodList?.data.length / rowsPerPage)
    : 1;

  useEffect(() => {
    const page = searchParams.get("page");
    if (page && !isNaN(totalPages)) {
      setPage(Number(page));
    }
  }, [searchParams, totalPages]);

  const handleActivePage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const handleEditProduct = (food: Food) => {
    setCurrentFood(food);
    onOpenModal();
  };

  const handleDeleteProduct = (id: string) => {
    const deleteConfirm = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?",
    );
    if (deleteConfirm) {
      deleteProductMutate(id, {
        onSuccess: () => {
          notify("Xóa sản phẩm thành công", TOAST_SUCCESS);
        },
        onError: () => {
          notify("Xóa sản phẩm thất bại", TOAST_ERROR);
        },
      });
    }
  };

  return (
    <Table
      bottomContent={
        <div className="flex w-full justify-center ">
          <Pagination
            showShadow
            color="default"
            radius="sm"
            page={Number(page)}
            total={Number(totalPages)}
            onChange={handleActivePage}
          />
        </div>
      }
      aria-labelledby="Table of products"
      className="min-w-[409px] w-2/3"
    >
      <TableHeader>
        {columnsHeader.map((column, index: number) => (
          <TableColumn align="center" key={index}>
            <p>{column}</p>
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        isLoading={foodListLoading}
        loadingContent={<Loading />}
        items={items}
        emptyContent={<EmptyTable />}
        className="min-h-[206px]"
      >
        {items?.map((item: Food, index: number) => (
          <TableRow
            className="items-center hover:bg-gray-100"
            key={index}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <TableCell>{item.id}</TableCell>
            <TableCell className="max-w-[50px] w-[50px]">
              <Image
                alt="Product img"
                width={40}
                radius="sm"
                className="select-none"
                src={item.img as string}
              />
            </TableCell>
            <TableCell>
              <div className="max-w-[200px] w-[160px]">{item.title}</div>
            </TableCell>
            <TableCell>
              <CTooltip content={item.description as string} placement="top">
                <p className="text-ellipsis overflow-hidden max-w-[350px] w-[320px] whitespace-nowrap">
                  {item.description}
                </p>
              </CTooltip>
            </TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell className="w-[120px]">{item.category}</TableCell>
            <TableCell>
              <div className="max-w-[50px] w-[50px]">{item.avgRate}</div>
            </TableCell>
            <TableCell className="flex items-center h-[56px] w-[80px] gap-2">
              {hoveredRow === index && (
                <>
                  <MdOutlineEdit
                    className="cursor-pointer"
                    size={18}
                    onClick={() => handleEditProduct(item)}
                  />
                  <IoTrashOutline
                    className="cursor-pointer"
                    size={18}
                    onClick={() => handleDeleteProduct(item.id as string)}
                  />
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableManagements;
