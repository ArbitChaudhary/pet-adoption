"use client";
import { PetCard } from "@/components/ui/cards/pet-card";
import { useAppSelector } from "@/hooks/redux";
import { useGetWishlistItemsQuery } from "@/redux/actions/wishlist-slice";
import { useMemo } from "react";
import { IWishlistItem } from "../_common/profile-types";

const SectionWishlist = () => {
  const { user } = useAppSelector((state) => state.global);
  const { isLoading, data } = useGetWishlistItemsQuery(user?._id as string);
  const memoizedWishlist = useMemo(() => data?.wishlist || [], [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {memoizedWishlist?.map((item: IWishlistItem) => (
          <PetCard key={item?.petId?._id} pet={item?.petId} />
        ))}
      </div>
    </>
  );
};

export default SectionWishlist;
