import * as yup from "yup";
import { FoodCreate } from "../types/foods.type";

// YUP SCHEMA
export const modalValidationSchema: yup.ObjectSchema<FoodCreate> = yup
  .object()
  .shape({
    id: yup.string().nullable(),
    price: yup.string().nullable(),
    avgRate: yup.number().nullable(),
    isExclusive: yup.string().nullable(),
    description: yup.string().nullable(),
    title: yup.string().required("Title is required!"),

    priceNumber: yup
      .number()
      .required("Price is required!")
      .typeError("Price must be a number!")
      .positive("Price must be a positive number!")
      .min(15000, "Price must be greater than 15000")
      .max(300000, "Price must be less than 300000"),

    category: yup.string().required("Please select a category!"),

    img: yup.mixed<FileList>().required("Please upload your image first!"),
    // .test(
    //     "isValidFileName",
    //     "File name must be less than 16 characters",
    //     function (value) {
    //         // Validate name file
    //         if (value && value[0]) {
    //             const fileNameWithoutExtension = value[0]?.name
    //                 ?.split(".")
    //                 .slice(0, -1)
    //                 .join(".");
    //             return fileNameWithoutExtension?.length <= 16;
    //         }
    //         // else return this.createError({ message: "Please upload your image first!" })
    //         return false;
    //     }
    // )
    // .test(
    //     "isValidFileSize",
    //     "Image only accepts files under 550KB",
    //     (value) => {
    //         //Validate size image file
    //         return value && value[0] && value[0].size <= 550000;
    //     }
    // )
  });
