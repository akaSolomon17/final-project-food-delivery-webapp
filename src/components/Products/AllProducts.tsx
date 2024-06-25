import React, { Key } from 'react'
import { Button, Card, CardBody, CardFooter, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react'
import { BsCartPlus } from 'react-icons/bs'
import { Food } from '../../types/foods.type'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDropdown } from 'react-icons/io'
import LoadMore from '../LoadMore/LoadMore'

const AllProducts: React.FC<{
    foodData: Food[],
    isLoading: boolean,
    isError: boolean,
    selectedValue: string,
    selectedKeys: string | Set<string>,
    handleSelectionChange: (keys: Selection | string | Set<Key>) => void,
    page: number,
    totalPages: number | undefined,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    isLoadingLoadMore: boolean
}> = (
    {
        foodData,
        isLoading,
        isError,
        selectedValue,
        selectedKeys,
        handleSelectionChange,
        page,
        totalPages,
        setPage,
        isLoadingLoadMore
    }) => {
        const navigate = useNavigate();

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isError) {
            return <div>Error loading food list.</div>;
        }
        return (
            <div>
                <div className="all-products flex flex-col items-center">
                    <div className="flex flex-row justify-evenly gap-x-[62rem] items-center">
                        <h1 className='font-sans font-bold text-4xl select-none'>All Product</h1>
                        <div className="dropdown">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="bordered" endContent={<IoIosArrowDropdown color='#777E90' size={20} />} disableAnimation>
                                        {selectedValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Static Actions"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
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
                    <div className="flex flex-rows gap-9 flex-wrap justify-center mt-[4rem] max-w-[96rem]">
                        {foodData?.map((item: Food, index: number) => (
                            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem] items-start" key={index} isPressable onPressEnd={() => { navigate(`/product-details/${item.id}`) }}>
                                <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt={item.title}
                                        className="w-full object-cover h-[15rem] select-none"
                                        src={item.img}
                                    />
                                </CardBody>
                                <CardFooter className="flex flex-col max-w-[30rem] items-start ">
                                    <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px]">
                                        <b>{item.title}</b>
                                        <b className="font-normal max-w-[20rem]">{item.description}</b>
                                    </div>
                                    <p className="border-black text-default-700 text-right w-full">{item.price}₫</p>
                                    <Chip className="bg-black text-white self-end mt-[0.5rem]">
                                        <BsCartPlus className='size-4' />
                                    </Chip>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
                {totalPages && page < totalPages && (
                    <LoadMore content={isLoadingLoadMore ? 'Loading...' : 'Load more foods'} clickEvent={() => setPage(page + 1)} />
                )}
            </div>
        )
    }

export default AllProducts