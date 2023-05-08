import { Box } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <Box
      sx={{
        width: 1,
        height: 48,
        // borderBottom:"1px solid",
        // borderColor:"rgb(0, 0, 0, 0.3)",
        boxShadow: '0 4px 6px -6px rgba(0, 0, 0, 0.7)',
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{px:2}}>
      Dino Project
        </Box>
    </Box>
  );
}
