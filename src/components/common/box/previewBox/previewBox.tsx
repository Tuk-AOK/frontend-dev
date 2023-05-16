import { Box } from "@mui/material";
import React from "react";

export default function PreviewBox() {
  return (
    <Box width="100%" maxWidth="500px" minWidth="300px">
      <Box
        height="28px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        preview
      </Box>
      <Box
        height="400px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          borderRadius: "3px",
          boxShadow: 1,
          backgroundColor: "#F0F0F0",
        }}
      >
        <img width="300px" height="300px" src="test.jpeg" alt="test" />
      </Box>
    </Box>
  );
}
