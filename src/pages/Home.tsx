import { Banner } from "../components/Banner/Banner"
import MainService from "../components/Home/MainService";
import MostPopular from "../components/Home/MostPopular";
import FeedBacks from "../components/Home/Feedbacks";

const Home = () => {
    return (
        <div>
            <Banner />
            <div className="mt-9">
                <MostPopular />
                <MainService />
                <FeedBacks />
            </div>
        </div >
    )
}

export default Home
