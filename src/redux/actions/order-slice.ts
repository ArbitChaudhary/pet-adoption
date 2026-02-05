import { IOrder } from "@/app/checkout/common/checkout-types";
import { api } from "./api";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orderCheckout: builder.mutation({
      query: (orderData: IOrder) => ({
        url: "orders/create-checkout-session",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useOrderCheckoutMutation } = orderSlice;
