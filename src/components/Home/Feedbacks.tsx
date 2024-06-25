import SwiperCustom from '../Swiper/SwiperCustom'
import TestimonialsCards from '../Testimonials/TestimonialsCards'
import { Feedback } from '../../types/feedbacks.type'
import { useGetFeedbacksApprovedList } from '../../apis/feedbacks/getFeedbacksList.api'

const Feedbacks = () => {
    // Feedbacks approved list data
    const { feedbacksApprovedList } = useGetFeedbacksApprovedList()
    const feedbacksApprovedListData = feedbacksApprovedList?.data || []

    return (
        <div>
            {/* FEEDBACKS */}
            <div className="flex flex-col relative justify-center">
                <h3 className="text-center text-lg font-normal mt-20">Testimonials</h3>
                <h3 className="text-center text-2xl font-semibold mt-3">What's our customer says?</h3>
                <div className="flex flex-col gap-12 justify-start mt-[4rem]">
                    <SwiperCustom slidePerView={1} className=" max-w-[25rem] h-[18rem]">
                        {feedbacksApprovedListData.map((item: Feedback, index: number) => (
                            <TestimonialsCards key={index} feedbacks={item} />
                        ))}
                    </SwiperCustom>
                </div>
            </div>
        </div>
    )
}

export default Feedbacks