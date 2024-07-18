import { Button } from "@nextui-org/react";
import { ILoadmoreProps } from "../../types/carts.type";

const LoadMore: React.FC<ILoadmoreProps> = ({ content, clickEvent }) => {
  return (
    <div>
      <div className="flex w-full justify-center ">
        <Button
          type="button"
          className="flex cursor-pointer w-[20rem] h-[2.5rem] mt-10 border rounded-xl justify-center items-center border-[#777E90] hover:bg-[#00000052] bg-white"
          onClick={clickEvent}
        >
          {content}
        </Button>
      </div>
    </div>
  );
};

export default LoadMore;
