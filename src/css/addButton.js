import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const ColorButton = styled(Button)(({ theme }) => ({
  color: "#00e082",
  backgroundColor: "#00e082",
  "& > span": {
    fontWeight: "500",
    marginLeft: "5px",
    color: "white",
  },
  "&:hover": {
    backgroundColor: "#00e082",
  },
  "&:active": {
    transform: "scale(0.96)",
  },
}));
