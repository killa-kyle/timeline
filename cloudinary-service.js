import 'dotenv/config';
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getImages() {
  const data = await cloudinary.v2.api.resources(async function (
    error,
    result
  ) {
    if (error) return error;
    //  console.log(result);
    return result;
  });

  return data;
}

export const getImageUrls = async () => {
  let imageResults = await getImages();
  let imageUrls = imageResults.resources.map((result) => result.secure_url);
  console.log("images", imageUrls);
  return imageUrls;
};
