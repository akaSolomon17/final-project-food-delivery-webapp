import { Card, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { Feedback } from '../../types/testimonialsCard.type';

const TestimonialsCards: React.FC<{ feedbacks: Feedback }> = ({ feedbacks }) => {
    return (
        <div>
            <Card key={feedbacks.id} className="max-w-[340px] select-none">
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>{feedbacks.description}</p>
                </CardBody>
                <CardFooter className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src={feedbacks.img} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{feedbacks.username}</h4>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TestimonialsCards