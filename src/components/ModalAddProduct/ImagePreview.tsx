import { Image } from "@nextui-org/react";
import { FC } from "react";
import { IImagePreviewProps } from "../../types/modal.type";

const ImagePreview: FC<IImagePreviewProps> = ({ width, imagePreview }) => {
  return (
    <Image
      width={width}
      alt="product preview image"
      src={imagePreview}
      radius="none"
    />
  );
};

export default ImagePreview;
