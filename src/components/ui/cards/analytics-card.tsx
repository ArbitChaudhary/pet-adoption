import { shadows } from "@/theme/shadows";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  bgColor?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  bgColor = "white",
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: "10px",
        position: "relative",
        bgcolor: bgColor,
        boxShadow: theme.shadows[6],
      }}
    >
      <CardContent sx={{ position: "relative", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            // position: "absolute",
            inset: 0,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              borderRadius: "10px",
              boxShadow: shadows[1],
              width: "fit-content",
              p: 1,
              bgcolor: "primary.main",
              color: "white",
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "primary.main", mt: 2 }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.grey[700], fontWeight: 500 }}
          >
            {title}
          </Typography>
        </Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          //   xmlns:xlink="http://www.w3.org/1999/xlink"
          //   xmlns:svgjs="http://svgjs.dev/svgjs"
          viewBox="0 0 500 200"
          style={{ position: "absolute", zIndex: 10, inset: 0, width: "100%" }}
        >
          <path
            d="M258.744384765625,201.79371643066406C267.71299743652344,191.77877044677734,293.72197977701825,145.14200592041016,312.5560607910156,141.70404052734375C331.390141805013,138.26607513427734,356.3527577718099,182.3617401123047,371.7488708496094,181.16592407226562C387.1449839274089,179.97010803222656,391.3303476969401,137.81763458251953,404.9327392578125,134.52914428710938C418.5351308186849,131.24065399169922,437.36920166015625,165.9192860921224,453.36322021484375,161.4349822998047C469.35723876953125,156.95067850748697,487.8923645019531,116.14350128173828,500.8968505859375,107.62332153320312C513.9013366699219,99.10314178466797,523.6173400878906,113.30344136555989,531.39013671875,110.31390380859375C539.1629333496094,107.32436625162761,544.8430480957031,93.12406412760417,547.5336303710938,89.68609619140625"
            fill="none"
            stroke-width="3"
            stroke='url("#SvgjsLinearGradient1002")'
            stroke-linecap="round"
          ></path>
          <defs>
            <linearGradient id="SvgjsLinearGradient1002">
              <stop stop-color="hsl(180, 69%, 40%)" offset="0"></stop>
              <stop stop-color="hsl(180, 69%, 60%)" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
