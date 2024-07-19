import CSwiper from "../Swiper/CSwiper";
import TestimonialsCards from "../Testimonials/TestimonialsCards";
import { Feedback } from "../../types/feedbacks.type";
import { useGetFeedbacksApprovedList } from "../../apis/feedbacks/getFeedbacksList.api";

const Feedbacks = () => {
  const { feedbacksApprovedList } = useGetFeedbacksApprovedList();

  return (
    <div>
      {/* FEEDBACKS */}
      <div className="flex flex-col relative justify-center">
        <h3 className="text-center text-lg font-normal mt-20">Testimonials</h3>
        <h3 className="text-center text-2xl font-semibold mt-3">
          What's our customer says?
        </h3>
        <div className="flex flex-col gap-12 justify-start mt-[4rem]">
          <CSwiper slidePerView={1} className=" max-w-[25rem] h-[18rem]">
            {feedbacksApprovedList?.data?.length &&
              feedbacksApprovedList?.data.map(
                (item: Feedback, index: number) => (
                  <TestimonialsCards key={index} feedbacks={item} />
                ),
              )}
          </CSwiper>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
