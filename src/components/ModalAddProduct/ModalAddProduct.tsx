import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddProduct } from '../../apis/products/addProduct.api';
import { uploadImageCloud } from '../../apis/cloudinary/uploadImageCloud.api';
import { Food, FoodCategory, FoodCreate } from '../../types/foods.type';
import { formatCurrency } from '../../utils/formatCurrency';
import { useGetFoodList } from '../../apis/products/getFoodList.api';
import { modalValidationSchema } from '../../utils/schemaValidation';
import { useUpdateFoodById } from '../../apis/products/updateProductById.api';
import { EFood, EToastifyStatus } from '../../types/enums.type';
import { notify } from '../../hooks/Toastify/notify';
import InputValidation from '../InputValidation/InputValidation';
import SelectValidation from '../SelectValidation/SelectValidation';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';
import InputFileValidation from '../InputFileValidation/InputFileValidation';
import { useGetFoodCategories } from '../../apis/products/getFoodCategories.api';
import { CTooltip } from '../CTooltip/CTooltip';
import ImagePreview from './ImagePreview';

const { DEFAULT_IS_EXCLUSIVES } = EFood
const { TOAST_SUCCESS, TOAST_ERROR } = EToastifyStatus

interface IModalAddProps {
    isOpen: boolean,
    onOpenChange: () => void,
    isEdit: boolean,
    currentFood: Food
}

const ModalAddProduct: React.FC<IModalAddProps> =
    ({
        isOpen,
        onOpenChange,
        isEdit,
        currentFood
    }) => {
        const [imagePreview, setImagePreview] = useState<string>("");
        const [imageFile, setImageFile] = useState<File | null>(null);

        const emptyFoodValues: FoodCreate = {
            title: "",
            price: "",
            priceNumber: 0,
            description: "",
            category: ""
        }

        const methods = useForm<FoodCreate>({
            defaultValues: emptyFoodValues,
            values: isEdit && currentFood ? {
                title: currentFood.title,
                price: currentFood.price,
                description: currentFood.description,
                category: currentFood.category,
                priceNumber: currentFood.priceNumber
            } : emptyFoodValues,
            mode: "onSubmit",
            resolver: yupResolver(modalValidationSchema),
        });


        const { handleSubmit, reset, formState: { isDirty } } = methods;

        const { data: foodList } = useGetFoodList()
        const currentFoodListData = foodList?.data

        const { data: foodCategories } = useGetFoodCategories()
        const foodCategoriesName = foodCategories?.data;

        const { mutate: addProductMutate } = useAddProduct()

        const { mutate: updateProductByIdMutate } = useUpdateFoodById()

        useEffect(() => {
            if (isEdit && currentFood) {
                if (currentFood) {
                    setImagePreview(currentFood.img as string)
                }
            }
        }, [isEdit, currentFoodListData, currentFood])

        const uploadImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                setImageFile(file)
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImagePreview(reader.result as string);
                };
            }
        }

        const submitHandler = async (data: FoodCreate) => {
            try {
                const imageById = isEdit && currentFood ? currentFood : data
                let imageUrl = imageById?.img as string;

                const priceFormated = formatCurrency(data.priceNumber as number);
                const categoryName = foodCategoriesName[Number(data.category) - 1]?.name;

                if (imageFile) {
                    const uploadResponse = await uploadImageCloud(imageFile);
                    imageUrl = uploadResponse?.data?.secure_url
                }

                const updateFood: Food = {
                    id: currentFood.id,
                    title: data.title,
                    price: priceFormated,
                    priceNumber: data.priceNumber as number,
                    img: imageUrl,
                    description: data.description,
                    category: categoryName,
                    avgRate: currentFood.avgRate,
                    isExclusive: DEFAULT_IS_EXCLUSIVES,
                }

                const newFood: Food = {
                    id: String(Number(currentFoodListData?.length || 0) + 1),
                    title: data.title,
                    price: priceFormated,
                    priceNumber: data.priceNumber as number,
                    img: imageUrl,
                    description: data.description,
                    category: categoryName,
                    avgRate: 0,
                    isExclusive: DEFAULT_IS_EXCLUSIVES,
                }

                if (isEdit && currentFood) {
                    updateProductByIdMutate({ id: currentFood.id as string, foodUpdated: updateFood }, {
                        onSuccess: () => {
                            reset();
                            setImagePreview("");
                            setImageFile(null);
                            onOpenChange();
                            notify("Update product successfully!", TOAST_SUCCESS);
                        },
                        onError: () => {
                            notify("Update product failed!", TOAST_ERROR);
                        }
                    });
                }
                else {
                    addProductMutate(newFood, {
                        onSuccess: () => {
                            reset();
                            setImagePreview("");
                            setImageFile(null);
                            notify("Add product successfully!", TOAST_SUCCESS);
                            onOpenChange()
                        },
                        onError: () => {
                            notify("Add product failed!", TOAST_ERROR);
                        }
                    })
                }

            } catch (e) {
                notify("Add product failed to upload Image!", TOAST_ERROR)
            }
        }

        const handleModalClose = () => {
            reset();
            setImagePreview("");
            setImageFile(null);
            onOpenChange();
        }

        return (
            <div>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={handleModalClose}
                    placement='top-center'
                >
                    <ModalContent>
                        {() => (
                            <>
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        {isEdit ?
                                            <ModalHeader>Edit Product</ModalHeader> :
                                            <ModalHeader>Add Product</ModalHeader>}

                                        <ModalBody className='flex flex-col gap-1'>
                                            <InputValidation
                                                id='title'
                                                label='Title'
                                                name='title'
                                                placeholder='Title of Product'
                                                type='text'
                                            />

                                            <div className='flex h-[70px] items-center justify-between'>
                                                <InputFileValidation
                                                    name='img'
                                                    className="block text-sm text-slate-500
                                                            file:mr-4 file:py-2 file:px-4
                                                            file:rounded-full file:border-0
                                                            file:text-sm file:font-semibold
                                                            file:bg-violet-50 file:text-violet-700
                                                            hover:file:bg-violet-100"
                                                    onChange={(e) => uploadImageHandler(e)}
                                                />
                                                {imagePreview &&
                                                    <CTooltip
                                                        content={
                                                            <div>
                                                                <ImagePreview width={400} imagePreview={imagePreview} />
                                                            </div>}
                                                        placement='right'>
                                                        <Image
                                                            width={70}
                                                            alt="NextUI hero Image"
                                                            src={imagePreview}
                                                            radius='sm'
                                                        />
                                                    </CTooltip>
                                                }
                                            </div>

                                            <InputValidation
                                                label="Price"
                                                id='price'
                                                name='priceNumber'
                                                labelPlacement="inside"
                                                variant='bordered'
                                                startContent={<CurrencySymbol />}
                                                type="number"
                                            />

                                            <InputValidation
                                                id='description'
                                                name='description'
                                                type='text'
                                                label='Description'
                                                variant='bordered'
                                            />

                                            <SelectValidation
                                                label='Choose product category'
                                                name='category'
                                                options={foodCategoriesName.map((item: FoodCategory) => ({ value: item.id.toString(), label: item.name }))}
                                            />

                                            <InputValidation
                                                type='text'
                                                name='isExclusive'
                                                label='Exclusives'
                                                variant='flat'
                                                value={DEFAULT_IS_EXCLUSIVES}
                                                isReadOnly
                                            />
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button
                                                color='default'
                                                variant='flat'
                                                onPress={handleModalClose}
                                            >
                                                Close
                                            </Button>
                                            <Button
                                                className='bg-black text-white disabled:bg-[#00000080]'
                                                type='submit'
                                                disabled={!isDirty}
                                            >
                                                {isEdit ? 'Update' : 'Add'}
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                </FormProvider>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        )
    }

export default ModalAddProduct