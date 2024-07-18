import { StarIcon } from "../../StarRating/Star";
import { Button, Input } from "@nextui-org/react";
import { FaRegFaceSmileBeam } from "react-icons/fa6";

const AddReview = () => {
  return (
    <div>
      <div className="review-section ">
        <div className="flex gap-14 max-w-[473px] text-lg font-lato font-bold ms-[20rem]">
          <h2>Description</h2>
          <h2>Reviews</h2>
          <h2>Ingredients</h2>
        </div>
      </div>
      <div className="add-review max-w-[473px] flex flex-col gap-10 ms-[20rem] mt-10">
        <div className="flex flex-col gap-5 font-lato">
          <h1 className="text-4xl font-extrabold">Add a review</h1>
          <p className="text-[#777E90]">
            Be the first reviewer to this product!
          </p>
          <StarIcon size={24} />
        </div>
        <Input //COMMON CHO ENDCONTENT
          type="text"
          label="Share your thoughts"
          labelPlacement="inside"
          className="bg-white"
          endContent={
            <div className="flex gap-3 items-center">
              <FaRegFaceSmileBeam className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              <Button className="h-[2.3rem] rounded-full bg-black text-white">
                Post it! →
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AddReview;
