import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BlogTable from "./blog-table";
import SearchBox from "@/components/reusables/search-box";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDeleteBlogMutation, useGetBlogsQuery } from "../../common/blog-api";
import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import DeleteModal from "@/components/modal/delete-modal";

const BlogTableContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 20,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const theme = useTheme();
  const navigate = useNavigate();

  const filter = {
    search: searchQuery,
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  };

  const { data, isLoading } = useGetBlogsQuery(filter);
  const { isPending, mutateAsync } = useDeleteBlogMutation();

  const memoizedBlogs = useMemo(() => data?.blogs || [], [data]);
  const rowCount = useMemo(() => data?.total || 0, [data]);
  const handleDeleteModalOpen = (id: string) => {
    setSelectedBlogId(id);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditBlog = (id: string) => {
    navigate(`/blogs/edit/${id}`);
  };
  const handleDeleteBlog = async () => {
    try {
      await mutateAsync(selectedBlogId);
      handleDeleteModalClose();
      // eslint-disable-next-line
    } catch (error: any) {
      console.log(
        error?.data?.message || error?.message || "Error deleting blog",
      );
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 1, md: 2 },
        }}
      >
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Button
          variant="outlined"
          onClick={() => navigate("/blogs/add")}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <AddBoxIcon fontSize="small" />
          <Typography variant="button">New Blog</Typography>
        </Button>
      </Box>
      <Box mt={2} />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <BlogTable
          blogs={memoizedBlogs}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          handleDeleteBlog={handleDeleteModalOpen}
          handleEditBlog={handleEditBlog}
        />
      )}
      <DeleteModal
        onClose={handleDeleteModalClose}
        isOpen={isDeleteModalOpen}
        isLoading={isPending}
        handleDelete={handleDeleteBlog}
      />
    </Box>
  );
};

export default BlogTableContainer;
