import { Box } from "@mui/material";
import { useGetUsersQuery } from "../../common/users-api";
import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import UsersTable from "./users-table";
import { useMemo, useState } from "react";
import type { IUser } from "../../common/users-type";
import SearchBox from "@/components/reusables/search-box";

function SectionUsersList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 20,
  });
  const filter = {
    search: searchQuery,
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  };
  const { data, isLoading } = useGetUsersQuery(filter);

  const memoizedUsers = useMemo(() => data?.users || [], [data]);
  const rowCount = useMemo(() => data?.total || 0, [data]);
  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <Box sx={{ mt: 4 }}>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{ mt: 2 }} />
      <UsersTable
        users={memoizedUsers as IUser[]}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
}

export default SectionUsersList;
