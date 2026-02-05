import { Avatar, Box, Dialog, DialogContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetTeamByIdQuery } from "../../common/team-api";
import TriangleLoader from "@/components/ui/triangle-loader";
import React, { useMemo } from "react";
import type { ITeam } from "../../common/team-types";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { formateDate } from "@/libs/date-format";

interface IPetDialogProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const PetDialog: React.FC<IPetDialogProps> = ({ id, isOpen, onClose }) => {
  const theme = useTheme();
  const { isLoading, data } = useGetTeamByIdQuery(id);
  const memoizedTeam = useMemo(() => data as ITeam, [data]);

  const parsedDescription = memoizedTeam?.description.replace(/&nbsp;/g, " ");
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      {isLoading ? (
        <TriangleLoader />
      ) : (
        <React.Fragment>
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              opacity: 0.5,
              height: "100px",
              position: "absolute",
              inset: 0,
            }}
          />
          <DialogContent>
            <Avatar
              src={memoizedTeam?.profileImage}
              sx={{
                height: { xs: "70px", md: "120px" },
                width: { xs: "70px", md: "120px" },
              }}
            />
            <Typography variant="h5">{memoizedTeam?.name}</Typography>
            <Typography variant="body1" sx={{ color: "blue" }}>
              {memoizedTeam?.post}
            </Typography>
            {/* <Typography variant="body2">{parsedDescription}</Typography> */}
            <div
              dangerouslySetInnerHTML={{ __html: parsedDescription }}
              style={{ fontSize: "14px", color: "slategray" }}
            />
            <Box sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
              <MailOutlineIcon fontSize="small" sx={{ color: "grey" }} />
              <Box>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Email
                </Typography>
                <Typography variant="body2">{memoizedTeam?.email}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
              <LocalPhoneIcon fontSize="small" sx={{ color: "grey" }} />
              <Box>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Phone
                </Typography>
                <Typography variant="body2">
                  {memoizedTeam?.phoneNumber}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
              <WorkOutlineIcon fontSize="small" sx={{ color: "grey" }} />
              <Box>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Profession
                </Typography>
                <Typography variant="body2">
                  {memoizedTeam?.profession || "N/A"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
              <DateRangeIcon fontSize="small" sx={{ color: "grey" }} />
              <Box>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Email
                </Typography>
                <Typography variant="body2">
                  {formateDate(memoizedTeam?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default PetDialog;
