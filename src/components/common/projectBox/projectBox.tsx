import { Box } from "@mui/material";
import React from "react";

export default function ProjectBox() {
  return (
    <Box
      sx={{
        pb:2,
        width: "calc(25% - 24px)",
        minWidth:"200px",
        height: "280px",
        boxShadow: 1,
        background: "#FBFBFB",
        borderRadius: "3px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Box sx={{height:"200px",}}>
        <img width="100%" height={200} src="img/test.jpeg" alt="test"/>
      </Box>
      <Box sx={{ fontSize:"16px"}}>
      Project 1
      </Box>
    </Box>
  );
}
