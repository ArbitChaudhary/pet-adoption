import PetsTable from "./pets-table";
import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import { useGetPetsQuery } from "../../common/pets-api";
import { useMemo } from "react";
import type { IPet } from "../../common/pets-types";

const PetsTableContainer = () => {
  const { data: pets, isLoading } = useGetPetsQuery();
  const memoizedPets = useMemo(() => pets, [pets]);
  if (isLoading) {
    return <TableSkeleton />;
  }
  return <PetsTable pets={(memoizedPets as IPet[]) || []} />;
};

export default PetsTableContainer;
