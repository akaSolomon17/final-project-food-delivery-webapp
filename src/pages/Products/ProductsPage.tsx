import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductList from "../../components/Products/ProductList";

const ProductsPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <ProductFilter />
      <ProductList />
    </div>
  );
};

export default ProductsPage;
