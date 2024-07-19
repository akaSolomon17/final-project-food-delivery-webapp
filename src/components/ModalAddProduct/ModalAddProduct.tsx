import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { CTooltip } from "../CTooltip/CTooltip";
import { notify } from "../../hooks/Toastify/notify";
import { yupResolver } from "@hookform/resolvers/yup";
import { IModalAddProps } from "../../types/modal.type";
import { FormProvider, useForm } from "react-hook-form";
import { formatCurrency } from "../../utils/formatCurrency";
import { EFood, EToastifyStatus } from "../../types/enums.type";
import { useAddProduct } from "../../apis/products/addProduct.api";
import { useGetFoodList } from "../../apis/products/getFoodList.api";
import { modalValidationSchema } from "../../utils/schemaValidation";
import { Food, FoodCategory, FoodCreate } from "../../types/foods.type";
import { uploadImageCloud } from "../../apis/cloudinary/uploadImageCloud.api";
import { useUpdateFoodById } from "../../apis/products/updateProductById.api";
import { useGetFoodCategories } from "../../apis/products/getFoodCategories.api";

import ImagePreview from "./ImagePreview";
import CurrencySymbol from "../CurrencySymbol/CurrencySymbol";
import InputValidation from "../InputValidation/InputValidation";
import SelectValidation from "../SelectValidation/SelectValidation";
import InputFileValidation from "../InputFileValidation/InputFileValidation";

const { DEFAULT_IS_EXCLUSIVES } = EFood;
const { TOAST_SUCCESS, TOAST_ERROR } = EToastifyStatus;
const emptyFoodValues: FoodCreate = {
  title: "",
  price: "",
  priceNumber: 0,
  description: "",
  category: "",
};

const ModalAddProduct: FC<IModalAddProps> = ({
  isOpen,
  onOpenChange,
  currentFood,
}) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const methods = useForm<FoodCreate>({
    defaultValues: emptyFoodValues,
    values: currentFood
      ? {
          title: currentFood.title,
          price: currentFood.price,
          description: currentFood.description,
          category: currentFood.category,
          priceNumber: currentFood.priceNumber,
          img: currentFood.img,
        }
      : emptyFoodValues,
    mode: "onSubmit",
    resolver: yupResolver(modalValidationSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
    setValue,
  } = methods;

  const { data: foodList } = useGetFoodList();

  const { data: foodCategories } = useGetFoodCategories();

  const { mutate: addProductMutate, isPending: addProductPending } =
    useAddProduct();
  const { mutate: updateProductByIdMutate, isPending: updateProductPending } =
    useUpdateFoodById();

  useEffect(() => {
    if (currentFood) {
      setImagePreview(currentFood.img as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFood]);

  const uploadImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImagePreview(reader.result as string);
    } else {
      setValue("img", currentFood?.img as string);
      setImageFile(null);
      setImagePreview(currentFood?.img as string);
    }
  };

  const submitHandler = async (data: FoodCreate) => {
    try {
      const imageById = currentFood ? currentFood : data;
      let imageUrl = imageById?.img as string;

      if (imageFile) {
        const uploadResponse = await uploadImageCloud(imageFile);
        imageUrl = uploadResponse?.data?.secure_url;
      }

      const priceFormated = formatCurrency(data.priceNumber as number);
      const categoryName =
        foodCategories?.data[Number(data.category) - 1]?.name;

      const productData: Food = {
        id: currentFood
          ? currentFood.id
          : String(Number(foodList?.data.length || 0) + 1),
        title: data.title,
        price: priceFormated,
        priceNumber: data.priceNumber as number,
        img: imageUrl,
        description: data.description,
        category: categoryName ?? data.category,
        avgRate: currentFood ? currentFood.avgRate : 0,
        isExclusive: DEFAULT_IS_EXCLUSIVES,
      };

      if (currentFood) {
        updateProductByIdMutate(
          { id: currentFood.id as string, foodUpdated: productData },
          {
            onSuccess: () => {
              handleModalClose();
              notify("Update product successfully!", TOAST_SUCCESS);
            },
            onError: () => {
              notify("Update product failed!", TOAST_ERROR);
            },
          },
        );
      } else {
        addProductMutate(productData, {
          onSuccess: () => {
            handleModalClose();
            notify("Add product successfully!", TOAST_SUCCESS);
          },
          onError: () => {
            notify("Add product failed!", TOAST_ERROR);
          },
        });
      }
    } catch (e) {
      notify("Add product failed to upload Image!", TOAST_ERROR);
    }
  };

  const handleModalClose = () => {
    reset();
    setImagePreview("");
    setImageFile(null);
    onOpenChange();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalClose}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submitHandler)}>
                  {currentFood ? (
                    <ModalHeader>Edit Product</ModalHeader>
                  ) : (
                    <ModalHeader>Add Product</ModalHeader>
                  )}
                  <ModalBody className="flex flex-col">
                    <InputValidation
                      id="title"
                      label="Title"
                      name="title"
                      placeholder="Title of Product"
                      type="text"
                    />
                    <div className="flex h-[70px] items-center justify-between">
                      <InputFileValidation
                        name="img"
                        className="block text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                        onChange={(e) => uploadImageHandler(e)}
                      />
                      {imagePreview && (
                        <CTooltip
                          content={
                            <ImagePreview
                              width={400}
                              imagePreview={imagePreview}
                            />
                          }
                          placement="right"
                        >
                          <Image
                            width={50}
                            alt="NextUI hero Image"
                            src={imagePreview}
                            radius="sm"
                          />
                        </CTooltip>
                      )}
                    </div>

                    <InputValidation
                      label="Price"
                      id="price"
                      name="priceNumber"
                      labelPlacement="inside"
                      variant="bordered"
                      startContent={<CurrencySymbol />}
                      type="number"
                      clearOnFocus={currentFood ? false : true}
                    />

                    <InputValidation
                      id="description"
                      name="description"
                      type="text"
                      label="Description"
                      variant="bordered"
                    />

                    <SelectValidation name="category">
                      {foodCategories?.data.map((category: FoodCategory) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </SelectValidation>

                    <InputValidation
                      type="text"
                      name="isExclusive"
                      label="Exclusives"
                      variant="flat"
                      value={DEFAULT_IS_EXCLUSIVES}
                      isReadOnly
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      color="default"
                      variant="flat"
                      onPress={handleModalClose}
                    >
                      Close
                    </Button>
                    <Button
                      className="bg-black text-white disabled:bg-[#00000080]"
                      type="submit"
                      isLoading={addProductPending || updateProductPending}
                      disabled={!isDirty}
                    >
                      {currentFood ? "Update" : "Add"}
                    </Button>
                  </ModalFooter>
                </form>
              </FormProvider>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalAddProduct;
