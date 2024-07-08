import { useEffect } from 'react'
import { Food } from '../../types/foods.type'
import { useDataFoodList, usePage, useProductActions, useSelectedKeys } from '../../zustand/productStore'
import SortByDropdown from './SortByDropdown'
import { EFilterSort } from '../../types/enums.type'
import { useFilterActions, useFilterValue, useIsApplyingFilters, useSelectedCheckboxes, useSelectedRating } from '../../zustand/filteredStore'
import useSelectedValue from '../../utils/reformatSelection'
import { useSearchParams } from 'react-router-dom'
import { useGetFoodFiltered } from '../../apis/products/getFoodFiltered.api'
import ProductsList from './ProductsList'
import Loading from '../Loading/Loading'

const { NEWEST, ACS, AVG_RATE, DESC, RATING_UP, ID, OLDEST, } = EFilterSort

const AllProducts = () => {
    const isApplyingFilters = useIsApplyingFilters()
    const filterValue = useFilterValue()
    const selectedCheckboxes = useSelectedCheckboxes()
    const checkboxesLength = selectedCheckboxes?.length ?? 0
    const selectedRating = useSelectedRating()
    const dataFoodList = useDataFoodList()
    const SelectedKeys = useSelectedKeys()
    const page = usePage()
    const { setPage, setDataFoodList } = useProductActions()
    const { setFilterValue, setSelectedCheckboxes, setSelectedRating } = useFilterActions()

    const selectedValue = useSelectedValue(SelectedKeys)
    const [searchParams] = useSearchParams();

    const {
        data: fetchFilter,
        isLoading,
        refetch
    } = useGetFoodFiltered(
        selectedValue === NEWEST || selectedValue === OLDEST ? ID : AVG_RATE,
        selectedValue === NEWEST || selectedValue === RATING_UP ? DESC : ACS,
        filterValue[0],
        filterValue[1],
        selectedCheckboxes,
        Number(selectedRating),
        isApplyingFilters
    )
    console.log("🚀 ~ isApplyingFilters:", isApplyingFilters);
    const fetchFilterData = fetchFilter?.data

    useEffect(() => {
        const priceMin = searchParams.get('priceMin');
        const priceMax = searchParams.get('priceMax');
        const categories = searchParams.get('categories');
        const rating = searchParams.get('rating');

        if (priceMin && priceMax) {
            setFilterValue([Number(priceMin), Number(priceMax)]);
        }

        if (categories) {
            setSelectedCheckboxes(categories.split(','));
        }

        if (rating) {
            setSelectedRating(rating);
        }
    }, [searchParams, setFilterValue, setSelectedCheckboxes, setSelectedRating]);

    useEffect(() => {
        if (fetchFilterData) {
            const updateFoodListData = ((prevData: Food[]): Food[] => {
                if (page === 1) return fetchFilterData;

                const newData = fetchFilterData.filter((item: Food) => !prevData.some(prevItem => prevItem.id === item.id));

                return [...prevData, ...newData];
            });
            setDataFoodList(updateFoodListData(dataFoodList))
        }
    }, [page, fetchFilterData, setDataFoodList])

    // refetch sau khi thay đổi filter/sort
    // useEffect(() => {
    //     refetch()
    //     setPage(1);
    // }, [refetch, selectedValue, setPage]);

    useEffect(() => {
        if (selectedValue || filterValue.length > 0 || checkboxesLength > 0 || selectedRating || isApplyingFilters) {
            refetch();
            setPage(1);
        }
    }, [selectedValue, filterValue, selectedCheckboxes, selectedRating, isApplyingFilters, refetch, setPage]);

    return (
        <div className='mb-20 flex flex-col items-center'>
            <SortByDropdown />
            {
                <>
                    {
                        isLoading ?
                            <div className='flex justify-center items-center w-[50rem] h-[35rem]'>
                                <Loading />
                            </div> :
                            <ProductsList
                                foodData={dataFoodList}
                                isLoading={isLoading}
                            />
                    }
                </>

            }
        </div>
    )
}

export default AllProducts