import FilterOrder from "../components/YourOrder/FilterOrder/FilterOrder";
import TableOrder from "../components/YourOrder/TableOrder";
import "../components/YourOrder/YourOrder.css";

const YourOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl my-10">Your Orders</h1>
      <FilterOrder />
      <TableOrder />
    </div>
  );
};

export default YourOrder;
