import React from "react";
import { useGetAnalyticsQuery } from "../common/home-api";
import AnalyticsCard from "@/components/ui/cards/analytics-card";
import { Grid } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PetsIcon from "@mui/icons-material/Pets";

const SectionAnalytics = () => {
  const { data, isLoading, error } = useGetAnalyticsQuery();
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
          <AnalyticsCard
            title="Revenue"
            value={data?.totalAmount}
            icon={<AttachMoneyIcon />}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
          <AnalyticsCard
            title="Adopted Pets"
            value={data?.totalAdoptedPets}
            icon={<FavoriteBorderIcon />}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
          <AnalyticsCard
            title="Available Pets"
            value={data?.availablePets}
            icon={<PetsIcon />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SectionAnalytics;
