import TriangleLoader from "@/components/ui/triangle-loader";
import { useGetOrdersQuery } from "../../common/order-api";
import OrderTable from "./order-table";

const OrderContainer = () => {
  const { isLoading, data: orders, error } = useGetOrdersQuery();
  if (isLoading) {
    return <TriangleLoader />;
  }
  if (error) {
    return (
      <div className="text-2xl font-semibold text-destructive">
        {error?.message}
      </div>
    );
  }
  return (
    <>
      <OrderTable orders={orders || []} />
    </>
  );
};

export default OrderContainer;
