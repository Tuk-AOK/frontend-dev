import { Box } from "@mui/material";
import React from "react";
import GlobalButton from "../button/globalButton/globalButton";

export default function Main() {
  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mt: "50px",
          fontWeight: "bold",
          letterSpacing: "5px",
        }}
      >
        Projects
      </Box>
      <Box sx={{ textAlign: "right", mr: "95px" }}>
        <GlobalButton>create</GlobalButton>
      </Box>
    </Box>
  );
}
