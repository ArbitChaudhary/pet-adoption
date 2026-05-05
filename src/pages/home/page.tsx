import { Box, Typography } from "@mui/material";
import SectionAnalytics from "./components/section-analytics";
import SectionRecentOrders from "./components/section-recent-transactions";

function HomePage() {
  return (
    <Box sx={{ p: 3 }}>
      <section>
        <SectionAnalytics />
      </section>
      <section style={{ marginTop: "30px" }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Recent Orders
        </Typography>
        <SectionRecentOrders />
      </section>
    </Box>
  );
}

export default HomePage;
