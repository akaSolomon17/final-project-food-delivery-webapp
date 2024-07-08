import { Image } from '@nextui-org/react'
import React, { FC } from 'react'

const ImagePreview: FC<{ width: number, imagePreview: string }> = ({ width, imagePreview }) => {
    return (
        <Image
            width={width}
            alt="product preview image"
            src={imagePreview}
            radius='none'
        />
    )
}

export default ImagePreview