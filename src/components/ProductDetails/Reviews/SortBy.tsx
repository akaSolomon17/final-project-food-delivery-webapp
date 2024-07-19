import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Key } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import {
  useReviewsActions,
  useSelectedKeys,
} from "../../../zustand/reviewsStore.ts";
import useSelectedValue from "../../../utils/reformatSelection.ts";

const SortBy = () => {
  const { setSelectedKeys } = useReviewsActions();
  const selectedKeys = useSelectedKeys();
  const selectedValue = useSelectedValue(selectedKeys);

  const handleSelectionChange = (keys: string | Set<Key>) => {
    setSelectedKeys(keys);
  };

  return (
    <div>
      <div className="flex justify-between items-center h-[3rem]">
        <h1 className="text-4xl font-extrabold h-[3rem]">3 comments</h1>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              endContent={<IoIosArrowDropdown color="#777E90" size={20} />}
              disableAnimation
            >
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedValue}
            onSelectionChange={handleSelectionChange}
          >
            <DropdownItem key="Newest" textValue="Newest">
              Newest
            </DropdownItem>
            <DropdownItem key="Oldest" textValue="Oldest">
              Oldest
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default SortBy;
