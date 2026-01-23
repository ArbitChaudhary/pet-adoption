"use client";
import { api } from "./api";

const wishlistSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addWishlistItem: builder.mutation({
      query: (data: { petId: string; userId: string }) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishlistItems: builder.query({
      query: (userId: string) => ({
        url: `/wishlist/${userId}`,
      }),
      providesTags: ["Wishlist"],
    }),
  }),
});

export const { useAddWishlistItemMutation, useGetWishlistItemsQuery } =
  wishlistSlice;
