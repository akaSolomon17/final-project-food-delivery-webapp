import React, { useState } from 'react'

import { Button, Image, Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react'

import { useGetFoodList } from '../apis/products/getFoodList.api'
import { FoodCategory, Food, FoodUpdate } from '../types/foods.type'
import { useGetFoodCategories } from '../apis/products/getFoodCategories.api'

import { formatCurrency } from '../utils/formatCurrency';
import { useUpdateFoodById } from '../apis/products/updateProductById.api';
import ModalAddProduct from '../components/ModalAddProduct/ModalAddProduct'
import { useDeleteProductById } from '../apis/products/deleteProductById.api'


const ProductsManagement = () => {
    // MODAL HANDLE
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    // DATA FOOD LIST
    const { data: foodList } = useGetFoodList()
    const foodListData = foodList?.data

    // DATA FOOD CATEGORIES
    const { data: foodCategories } = useGetFoodCategories()
    const foodCategoriesName = foodCategories?.data;

    // UPDATE FOOD MUTATE
    const { mutate: updateProductMutate } = useUpdateFoodById()
    const [editableById, setEditableById] = useState<string | null | undefined>(null);
    const [foodEdited, setFoodEdited] = useState<Omit<Food, 'price' | 'img' | 'avgRate' | 'isExclusive'>>({
        id: "",
        title: "",
        priceNumber: 0,
        description: "",
        category: "",
        // price: "",
        // img: "",
        // avgRate: 0,
        // isExclusive: "false",
    })

    // DELETE FOOD MUTATE
    const { mutate: deleteProductMutate } = useDeleteProductById()

    const [errorPrice, setErrorPrice] = useState<string | null>("")
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

    // SET PAGINATION STATE
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(foodListData?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return foodListData?.slice(start, end);
    }, [page, foodListData]);

    const editableHandler = (FoodEdited: FoodUpdate) => {
        setEditableById(FoodEdited.id)

        setFoodEdited({
            id: FoodEdited.id,
            title: FoodEdited.title,
            priceNumber: FoodEdited.priceNumber,
            description: FoodEdited.description,
            category: FoodEdited.category,
        })
    }

    // onChange handler title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, item: Food) => {
        const titleValue = e.target.value.trim();

        setFoodEdited(prevFoodEdited => ({
            ...prevFoodEdited,
            title: titleValue !== '' ? titleValue : item.title
        }));
    };

    // onChange handler description
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, item: Food) => {
        const desciptionValue = e.target.value.trim();
        setFoodEdited(prevFoodEdited => ({
            ...prevFoodEdited,
            description: desciptionValue !== '' ? desciptionValue : item.description
        }));
    };

    // onChange handler price
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, item: Food) => {
        const priceValue = e.target.value.trim();

        if (priceValue === '') {
            setFoodEdited(prevFoodEdited => ({
                ...prevFoodEdited,
                priceNumber: item.priceNumber
            }));
            setTooltipOpen(false);
            setErrorPrice(null);
        } else {
            const priceNumber = Number(priceValue);

            if (priceNumber >= 30000 && priceNumber <= 300000) {
                setFoodEdited(prevFoodEdited => ({
                    ...prevFoodEdited,
                    priceNumber: priceNumber
                }));
                setTooltipOpen(false);
                setErrorPrice(null);
            } else {
                setTooltipOpen(true);
                setErrorPrice('Price must be between 30000 and 300000');
            }
        }
    };

    // onChange handler category
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>, item: Food) => {
        const categoryValue = e.target.value.trim();
        const categoryName = foodCategoriesName[Number(categoryValue) - 1]?.name
        setFoodEdited(prevFoodEdited => ({
            ...prevFoodEdited,
            category: categoryName !== '' ? categoryName : item.category
        }));
    };

    const EditSubmitHandler = (id: string) => {
        const currentFood = foodListData?.find((item: Food) => item.id === id)

        const formattedPrice = formatCurrency(foodEdited.priceNumber);

        // CHECK DIFFERENCE OLD & NEW FOOD INFO
        const checkDiff =
            currentFood?.title !== foodEdited.title ||
            currentFood?.priceNumber !== foodEdited.priceNumber ||
            currentFood?.description !== foodEdited.description ||
            currentFood?.category !== foodEdited?.category

        // UPDATE FOOD IF !DIFF
        if (checkDiff && currentFood) {
            updateProductMutate({ id: id, foodUpdated: { ...foodEdited, price: formattedPrice, img: currentFood.img, avgRate: currentFood.avgRate, isExclusive: currentFood.isExclusive } }, {
                onSuccess: () => {
                    setEditableById(null)
                    alert("Update product successfully!");
                },
                onError: () => {
                    alert("Update product failed!");
                }
            })
        }
        else setEditableById(null)
    }

    const deleteHandler = (id: string) => {
        deleteProductMutate(id);
    }

    return (
        <div className='p-10'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-3xl my-10'>Products Management</h1>
                <Button onPress={onOpen} color='success'>Add Product</Button>
            </div>
            <ModalAddProduct isOpen={isOpen} onOpenChange={onOpenChange} />
            {/* TABLE */}
            <Table
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                aria-labelledby='Table of products'
                className='min-w-[500px]'
            >
                <TableHeader >
                    <TableColumn align="start">
                        ID
                    </TableColumn>
                    <TableColumn align="center">
                        Image
                    </TableColumn>
                    <TableColumn align="center">
                        Title
                    </TableColumn>
                    <TableColumn align="center">
                        Description
                    </TableColumn>
                    <TableColumn align="center">
                        Price
                    </TableColumn>
                    <TableColumn align="center">
                        Category
                    </TableColumn>
                    <TableColumn align="center">
                        Average Rating
                    </TableColumn>
                    <TableColumn align="center">
                        Actions
                    </TableColumn>
                </TableHeader>
                <TableBody items={items} >
                    {items?.map((item: Food) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>
                                <Image alt='Product img' width={40} className='select-none' src={item.img} />
                            </TableCell>
                            <TableCell>
                                {editableById === item.id ?
                                    <Input
                                        type='text'
                                        placeholder='Edit title here.'
                                        onChange={(e) => handleTitleChange(e, item)} /> :
                                    item.title
                                }
                            </TableCell>
                            <TableCell className='max-w-[190px]'>
                                {editableById === item.id ?
                                    <Input
                                        type='text'
                                        placeholder='Edit description here.'
                                        onChange={(e) => handleDescriptionChange(e, item)} /> :
                                    <p>{item.description}</p>
                                }
                            </TableCell>
                            <TableCell>
                                {editableById === item.id ?
                                    <div>
                                        <Tooltip isOpen={tooltipOpen} content={errorPrice}>
                                            <Input
                                                type='number'
                                                placeholder='Edit price here.'
                                                onChange={(e) => handlePriceChange(e, item)} />
                                        </Tooltip>
                                    </div> :
                                    item.price
                                }
                            </TableCell>
                            <TableCell>
                                {editableById === item.id ?
                                    <Select
                                        aria-label='Select kind of food'
                                        className='min-w-[200px] max-h-[40px] h-[40px]'
                                        value={foodEdited.category}
                                        onChange={(e) => handleCategoryChange(e, item)}>
                                        {/* console.log("🚀 ~ e.target.value:", e.target.value); */}
                                        {foodCategoriesName.map((category: FoodCategory) => (
                                            <SelectItem className='w-full' key={category.id} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </Select> :
                                    item.category
                                }
                            </TableCell>
                            <TableCell>{item.avgRate}</TableCell>
                            <TableCell>
                                {editableById === item.id ?
                                    (<Button className='min-w-[80px]' color='success' onClick={() => EditSubmitHandler(item.id ?? '')}>Update</Button>) :
                                    (<Button className='min-w-[80px]' color='warning' onClick={() => editableHandler(item)}>Edit</Button>)
                                }
                                <Button className='min-w-[80px] ms-5' color='danger' onClick={() => deleteHandler(item.id ?? '')}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}

export default ProductsManagement