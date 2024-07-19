import AlsoLike from "../../components/ProductDetails/AlsoLike";
import Reviews from "../../components/ProductDetails/Reviews/Reviews";
import ProductContent from "../../components/ProductDetails/ProductContent/ProductContent";

const ProductDetails = () => {
  return (
    <div className="flex flex-col gap-20 mt-20">
      <ProductContent />
      <Reviews />
      <AlsoLike />
    </div>
  );
};

export default ProductDetails;
