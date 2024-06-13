import { Card, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { Feedback } from "../../types/feedbacks.type";
import { MdVerified } from "react-icons/md";

const TestimonialsCards: React.FC<{ feedbacks: Feedback }> = ({ feedbacks }) => {
    return (
        <div>
            <Card key={feedbacks.id} className="w-[340px] max-w-[340px] select-none">
                <CardBody>
                    <div className="flex gap-2.5 px-1">
                        <Avatar isBordered radius="full" size="md" src={feedbacks.avatar} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{feedbacks.name}</h4>
                        </div>
                        <MdVerified className="self-center size-3.5" color="#0B95E2" />
                    </div>
                </CardBody>
                <CardFooter className="px-4 text-small text-default-400 flex text-left">
                    <p>{feedbacks.feedback}</p>

                </CardFooter>
            </Card>
        </div>
    );
};

export default TestimonialsCards