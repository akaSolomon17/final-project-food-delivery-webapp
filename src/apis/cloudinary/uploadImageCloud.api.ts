import axios from "axios";

export const uploadImageCloud = async (image: FileList) => {
    const formData = new FormData();

    formData.append('file', image[0]);
    formData.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET_NAME);
    formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);
    formData.append('folder', 'Food App Media');

  const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData)
   
  return res
};