import React, { useState } from 'react'

import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddProduct } from '../../apis/products/addProduct.api';
import { uploadImageCloud } from '../../apis/cloudinary/uploadImageCloud.api';
import { Food, FoodCategory, FoodCreate } from '../../types/foods.type';
import { formatCurrency } from '../../utils/formatCurrency';
import { useGetFoodList } from '../../apis/products/getFoodList.api';
import { useGetFoodCategories } from '../../apis/products/getFoodCategories.api';

// SCHEMA
// YUP SCHEMA
const schema: yup.ObjectSchema<FoodCreate> =
    yup
        .object()
        .shape({
            id: yup.string().nullable(),
            price: yup.string().nullable(),
            avgRate: yup.number().nullable(),
            isExclusive: yup.string().nullable(),
            title: yup
                .string()
                .required("Title is required!"),

            priceNumber: yup
                .number()
                .required("Price is required!")
                .typeError("Price must be a number!")
                .positive("Price must be a positive number!")
                .min(15000, "Price must be greater than 15000")
                .max(300000, "Price must be less than 300000"),

            description: yup
                .string()
                .required("Description is required!"),

            category: yup
                .string()
                .required("Please select a category!"),

            img: yup
                .mixed<FileList>()
                .required("Please upload your image first!")
                .test(
                    "isValidFileName",
                    "File name must be less than 16 characters",
                    function (value) {
                        // Validate name file
                        if (value && value[0]) {
                            const fileNameWithoutExtension = value[0].name
                                .split(".")
                                .slice(0, -1)
                                .join(".");
                            return fileNameWithoutExtension.length <= 16;
                        }
                        // else return this.createError({ message: "Please upload your image first!" })
                        return false;
                    }
                )
                .test(
                    "isValidFileSize",
                    "Image only accepts files under 550KB",
                    (value) => {
                        //Validate size image file
                        return value && value[0] && value[0].size <= 550000;
                    }
                )
        });

const ModalAddProduct: React.FC<{ isOpen: boolean, onOpenChange: () => void }> = ({ isOpen, onOpenChange }) => {
    // FORM HOOK
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FoodCreate>({
        defaultValues: {
            title: "",
            price: "",
            description: "",
            category: "",
            img: undefined,
        },
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    // DATA FOOD LIST
    const { data: foodList } = useGetFoodList()
    const foodListData = foodList?.data

    // DATA FOOD CATEGORIES
    const { data: foodCategories } = useGetFoodCategories()
    const foodCategoriesName = foodCategories?.data;

    // STATE IMAGE PREVIEW
    const [imagePreview, setImagePreview] = useState<string>("");



    // ADD FOOD MUTATE
    const { mutate: addProductMutate } = useAddProduct()

    // HANDLE IMAGE PREVIEW
    const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
        }
    }

    // HANDLE ADD NEW PRODUCT
    const submitHandler = async (data: FoodCreate) => {
        try {
            if (data.img && data.img[0]) {
                const uploadResponse = await uploadImageCloud(data.img);
                const imageUrl = uploadResponse?.data?.secure_url

                const priceFormated = formatCurrency(data.priceNumber)
                const categoryName = foodCategoriesName[Number(data.category) - 1]?.name

                const newFood: Food = {
                    id: (Number(foodListData?.length || 0) + 1).toString(),
                    title: data.title,
                    price: priceFormated,
                    priceNumber: data.priceNumber,
                    img: imageUrl,
                    description: data.description,
                    category: categoryName,
                    avgRate: 0,
                    isExclusive: "Không",
                }

                addProductMutate(newFood, {
                    onSuccess: () => {
                        reset();
                        setImagePreview("");
                        alert("Add product successfully!");
                    },
                    onError: () => {
                        alert("Add product failed!");
                    }
                })
            }
        } catch (e) {
            console.log("🚀 ~ IMAGE UPLOAD ERROR:", e);
        }
    }

    return (
        <div>
            {/* MODAL FORM */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement='top-center'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <ModalHeader>Add Product</ModalHeader>
                                <ModalBody className='flex flex-col gap-2'>
                                    {/* TITLE INPUT */}
                                    <Input isRequired autoFocus type='text' label='Title of product' variant='bordered' {...register("title")}></Input>
                                    <p className='text-danger-400 text-sm'>{errors.title?.message}</p>

                                    {/* IMAGE INPUT */}
                                    <div className='flex gap-4 items-center'>
                                        <input type="file" className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100"
                                            {...register("img")}
                                            onChange={(e) => uploadImageHandler(e)} />
                                        {imagePreview && <Image
                                            width={115}
                                            alt="NextUI hero Image"
                                            src={imagePreview}
                                            radius='sm'
                                        />}
                                    </div>
                                    <p className='text-danger-400 text-sm'>{errors.img?.message}</p>

                                    {/* PRICE INPUT*/}
                                    <Input
                                        label="Price"
                                        labelPlacement="inside"
                                        variant='bordered'
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">₫</span>
                                            </div>
                                        }
                                        type="number"
                                        {...register("priceNumber")}
                                    />
                                    <p className='text-danger-400 text-sm'>{errors.priceNumber?.message}</p>

                                    {/* DESCRIPTION INPUT */}
                                    <Input type='text' label='Description' variant='bordered' {...register("description")}></Input>
                                    {/* <p>{errors.description?.message}</p> */}

                                    {/* CATEGORY INPUT */}
                                    <Select
                                        aria-label='Select kind of food'
                                        label="Kind of food"
                                        className='mt-4'
                                        {...register("category")}
                                    >
                                        {foodCategoriesName.map((item: FoodCategory) => (
                                            <SelectItem className='w-full' key={item.id} value={item.name}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <p className='text-danger-400 text-sm'>{errors.category?.message}</p>

                                    {/* EXCLUSIVES */}
                                    <Input type='text' label='Exclusives' variant='flat' value={"Không"} isReadOnly></Input>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' variant='flat' onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color='success' type='submit'
                                    // onPress={onClose}
                                    >
                                        Add
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalAddProduct