import { Box } from "@mui/material";
import React from "react";

export default function PreviewBox() {
  return (
    <Box
      sx={{
        px: 3,
        py: 1,
      }}
      textAlign="center"
    >
      <Box sx={{ py: 1 }}>preview</Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "500px",
          height: "400px",
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
