import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { Key } from 'react'
import { IoIosArrowDropdown } from 'react-icons/io'
import { useProductActions, useSelectedKeys } from '../../zustand/productStore'
import useSelectedValue from '../../utils/reformatSelection'

const SortByDropdown = () => {
    const selectedKeys = useSelectedKeys()
    const { setSelectedKeys } = useProductActions()
    const selectedValue = useSelectedValue(selectedKeys)

    const handleSelectionChange = (keys: string | Set<Key>) => {
        setSelectedKeys(keys);
    }

    return (
        <div>
            <div className="flex flex-row justify-evenly gap-x-[66rem] items-center mt-10">
                <h1 className='font-sans font-bold text-4xl select-none'>All Product</h1>
                <div className="dropdown">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                endContent={
                                    <IoIosArrowDropdown color='#777E90' size={20} />
                                }
                                disableAnimation
                            >
                                {selectedKeys ? selectedValue : "Sort By"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Static Actions"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedValue}
                            onSelectionChange={handleSelectionChange}
                        >
                            <DropdownItem key="Newest" textValue='Newest'>Newest</DropdownItem>
                            <DropdownItem key="Oldest" textValue='Oldest'>Oldest</DropdownItem>
                            <DropdownItem key="RatingUp" textValue='RatingUp'>Rating Up</DropdownItem>
                            <DropdownItem key="RatingDown" textValue='RatingDown'>Rating Down</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default SortByDropdown