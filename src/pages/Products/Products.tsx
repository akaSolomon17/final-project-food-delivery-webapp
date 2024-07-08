import AllProduct from '../../components/Products/AllProducts';
import SideBarFilter from '../../components/SidebarFilter/SidebarFilter';

const Products = () => {
  return (
    <div className='flex flex-col gap-12'>
      <SideBarFilter />
      <AllProduct />
    </div>
  )
}

export default Products