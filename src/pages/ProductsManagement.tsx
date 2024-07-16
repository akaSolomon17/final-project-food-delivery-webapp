import React, { useEffect, useState } from 'react'
import { Button, Image, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { useGetFoodList } from '../apis/products/getFoodList.api'
import { Food } from '../types/foods.type'
import ModalAddProduct from '../components/ModalAddProduct/ModalAddProduct'
import { useDeleteProductById } from '../apis/products/deleteProductById.api'
import { useSearchParams } from 'react-router-dom'
import { CTooltip } from '../components/CTooltip/CTooltip'
import { notify } from '../hooks/Toastify/notify'
import { EToastifyStatus } from '../types/enums.type'

import { IoMdAdd } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

import EmptyTable from '../components/ProductManagements/EmptyTable'
import Loading from '../components/Loading/Loading'

const ProductsManagement = () => {
    const [currentFood, setCurrentFood] = useState<Food>({} as Food);
    const { TOAST_SUCCESS, TOAST_ERROR } = EToastifyStatus
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [searchParams, setSearchParams] = useSearchParams()
    const { data: foodList, isLoading: foodListLoading } = useGetFoodList()
    const foodListData = foodList?.data

    const { mutate: deleteProductMutate } = useDeleteProductById()

    const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    const rowsPerPage = 5;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return foodListData?.slice(start, end);
    }, [page, foodListData]);

    const totalPages = foodListData ? Math.ceil(foodListData.length / rowsPerPage) : 1;
    console.log("🚀 ~ totalPages:", totalPages);

    // useEffect(() => {
    //     if (!isNaN(calcTotalPages)) {
    //         setTotalPages(calcTotalPages);
    //         searchParams.set('totalPages', (calcTotalPages.toString()));
    //         setSearchParams(searchParams);
    //     }
    // }, [foodListData])

    useEffect(() => {
        const page = searchParams.get('page');
        if (page && !isNaN(totalPages)) {
            setPage(Number(page));
        }
    }, [searchParams])

    const handleActivePage = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    }


    const handleAddProduct = () => {
        setIsEdit(false);
        setCurrentFood({} as Food);
        onOpen();
    };

    const handleEditProduct = (food: Food) => {
        setIsEdit(true);
        setCurrentFood(food);
        onOpen();
    };

    const handleDeleteProduct = (id: string) => {
        const deleteConfirm = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (deleteConfirm) {
            deleteProductMutate(id, {
                onSuccess: () => {
                    notify('Xóa sản phẩm thành công', TOAST_SUCCESS);
                },
                onError: () => {
                    notify('Xóa sản phẩm thất bại', TOAST_ERROR);
                }
            });
        }
    };

    return (
        <div className='p-10 flex flex-col justify-center items-center h-[605px]'>
            <ModalAddProduct
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isEdit={isEdit}
                currentFood={currentFood}
            />
            <div className='flex items-center justify-between w-2/3 '>
                <h1 className='font-bold text-3xl my-10'>Products Management</h1>
                <Button
                    onPress={handleAddProduct}
                    className='bg-black text-white'
                    size='sm'
                >
                    <IoMdAdd size={18} />
                </Button>
            </div>
            <Table
                bottomContent={
                    <div className="flex w-full justify-center ">
                        <Pagination
                            showShadow
                            color="default"
                            radius='sm'
                            page={Number(page)}
                            total={Number(totalPages)}
                            onChange={handleActivePage}
                        />
                    </div>
                }
                aria-labelledby='Table of products'
                className='min-w-[409px] w-2/3'
            >
                <TableHeader>
                    <TableColumn align="start">ID</TableColumn>
                    <TableColumn align="center">Image</TableColumn>
                    <TableColumn align="center">Title</TableColumn>
                    <TableColumn align="center">Description</TableColumn>
                    <TableColumn align="center">Price</TableColumn>
                    <TableColumn align="center">Category</TableColumn>
                    <TableColumn align="center">Average Rating</TableColumn>
                    <TableColumn children={null}></TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={foodListLoading}
                    loadingContent={<Loading />}
                    items={items}
                    emptyContent={<EmptyTable />}
                    className='min-h-[206px]'
                >
                    {items?.map((item: Food, index: number) => (
                        <TableRow
                            className='items-center hover:bg-gray-100'
                            key={index}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <TableCell>{item.id}</TableCell>
                            <TableCell className='max-w-[50px] w-[50px]'>
                                <Image
                                    alt='Product img'
                                    width={40}
                                    radius='sm'
                                    className='select-none'
                                    src={item.img as string} />
                            </TableCell>
                            <TableCell>
                                <div className='max-w-[200px] w-[160px]'>
                                    {item.title}
                                </div>
                            </TableCell>
                            <TableCell>
                                <CTooltip
                                    content={item.description as string}
                                    placement='top'
                                >
                                    <p className='text-ellipsis overflow-hidden max-w-[350px] w-[320px] whitespace-nowrap'>
                                        {item.description}
                                    </p>
                                </CTooltip>
                            </TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell className='w-[120px]'>{item.category}</TableCell>
                            <TableCell>
                                <div className='max-w-[50px] w-[50px]'>
                                    {item.avgRate}
                                </div>
                            </TableCell>
                            <TableCell className='flex items-center h-[56px] w-[80px] gap-2'>
                                {
                                    hoveredRow === index && (
                                        <>

                                            <MdOutlineEdit
                                                className='cursor-pointer'
                                                size={18}
                                                onClick={() => handleEditProduct(item)}
                                            />
                                            <IoTrashOutline
                                                className='cursor-pointer'
                                                size={18}
                                                onClick={() => handleDeleteProduct(item.id as string)}
                                            />
                                        </>
                                    )
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}

export default ProductsManagement