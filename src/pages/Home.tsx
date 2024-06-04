import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Banner from "../components/Banner/Banner"
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";

const list = [
    {
        title: "Kimbap Heo Galbi",
        img: "/foods/kimbap-bo.jpg",
        price: "65.000",
        description: "Sản phẩm được đựng trong hộp giấy xinh xắn."
    },
    {
        title: "Kimbap bò cay sốt BBQ",
        img: "/foods/kimbap-cay.jpg",
        price: "65.000",
        description: `BEST SELLER - Kimbap với nhân Thịt bò ba chỉ Mỹ thấm ướp gia vị kèm sốt BBQ thơm cay. Sản phẩm được đựng vào hộp giấy xinh xắn.`
    },
    {
        title: "Kimbap Phô Mai",
        img: "/foods/kimbap.jpg",
        price: "65.000",
        description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
    }
];


const Home = () => {
    return (
        <div>
            <Banner />
            <div className="most-popular h-[300px] mt-9">
                <h3 className="text-center text-lg font-normal">Most Popular</h3>
                <h3 className="text-center text-2xl font-semibold mt-3">Our Exclusive Cakes</h3>
                <div className="flex flex-rows justify-center mt-[4rem]">
                    {list.map((item, index) => (
                        <Card shadow="sm" className="mx-[30px] max-h-[750px]" key={index} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0 cardbody h-[420px] max-h-[420px]">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={item.title}
                                    className="w-full object-cover h-[400px]"
                                    src={item.img}
                                />
                            </CardBody>
                            <CardFooter className="flex flex-col max-w-[30rem] items-start p-3">
                                <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px]">
                                    <b>{item.title}</b>
                                    <b className="font-normal max-w-[20rem]">{item.description}</b>
                                </div>
                                <p className="border-black text-default-700 text-right w-full">{item.price}₫</p>
                                <Button className="bg-black text-white self-end mt-[0.5rem]">Order Now</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="main-services">
                    <h3 className="text-center text-lg font-normal mt-20">Main Service</h3>
                    <h3 className="text-center text-2xl font-semibold mt-3">Our Exclusive Cakes</h3>
                    <div className="flex gap-11 items-center justify-center mt-[2.5rem]">
                        <div className="flex flex-col items-center">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Gà</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Kimbap</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Box Yummy</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Mỳ Hàn Quốc</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Lẩu Tokbokki</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Thức uống</span>
                        </div>
                    </div>
                    <div className="feedbacks">
                        <h3 className="text-center text-lg font-normal mt-40">Testimonials</h3>
                        <h3 className="text-center text-2xl font-semibold mt-3">What's our customer says?</h3>
                        <div className="flex gap-11 justify-center mt-[4rem]">
                            {/* <Card shadow="sm" className="mx-[30px] max-h-[550px]" isPressable onPress={() => console.log("item pressed")}>
                                <CardBody className="overflow-visible p-0 cardbody h-[300px] w-[250px] max-h-[420px]">
                                    This is body
                                </CardBody>
                                <CardFooter className="flex flex-col max-w-[30rem] items-start p-3">
                                    This is footer
                                </CardFooter>
                            </Card> */}

                            <Card className="max-w-[340px]">
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <p>
                                        Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                                    </p>
                                    <span className="pt-2">
                                        #FrontendWithZoey
                                        <span className="py-2" aria-label="computer" role="img">
                                            💻
                                        </span>
                                    </span>
                                </CardBody>
                                <CardFooter className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className="max-w-[340px] max-h-[250px] h-[200px]">
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <p>
                                        Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                                    </p>
                                    <span className="pt-2">
                                        #FrontendWithZoey
                                        <span className="py-2" aria-label="computer" role="img">
                                            💻
                                        </span>
                                    </span>
                                </CardBody>
                                <CardFooter className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    <div className="page-footer w-full h-[415px] mt-14 border-t-1 shadow-inner bg-[#f7fafc93]">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home