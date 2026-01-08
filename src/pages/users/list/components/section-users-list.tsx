import { Box } from "@mui/material";
import { useGetUsersQuery } from "../../common/users-api";
import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import UsersTable from "./users-table";
import { useMemo } from "react";
import type { IUser } from "../../common/users-type";

function SectionUsersList() {
  const { data: users, isLoading } = useGetUsersQuery();

  const memoizedUsers = useMemo(() => users || [], [users]);
  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <Box sx={{ mt: 4 }}>
      <UsersTable users={memoizedUsers as IUser[]} />
    </Box>
  );
}

export default SectionUsersList;
