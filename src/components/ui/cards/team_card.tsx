import { Link as RouterLink } from "react-router-dom";
import type { ITeam } from "@/pages/teams/common/team-types";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";

interface TeamCardProps {
  member: ITeam;
}

export function TeamCard({ member }: TeamCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: theme.shadows[3],
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[8],
          transform: "translateY(-8px)",
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/team/${member._id}`}
        sx={{ height: "100%" }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            aspectRatio: "1 / 1",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={member.profileImage}
            alt={member.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              ".MuiCard-root:hover &": {
                transform: "scale(1.05)",
              },
            }}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              ".MuiCard-root:hover &": {
                opacity: 1,
              },
            }}
          />

          {/* Social Icons */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              display: "flex",
              gap: 1,
              opacity: 0,
              transform: "translateY(16px)",
              transition: "all 0.3s ease",
              ".MuiCard-root:hover &": {
                opacity: 1,
                transform: "translateY(0)",
              },
            }}
          >
            {member.email && (
              <IconButton
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ textAlign: "center", p: 2.5 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {member.name}
          </Typography>

          <Typography variant="body2" color="primary" fontWeight={500} mt={0.5}>
            {member.post}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {member.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
