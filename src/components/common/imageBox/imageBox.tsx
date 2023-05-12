import { Box } from "@mui/material";
import React from "react";

export default function ImageBox() {
  return (
    <Box sx={{textAlign:"center"}}>
      <img width="500px" height="500px" src="test.jpeg" alt="test" />
      <Box sx={{ fontSize: "15pt", py: 3, fontWeight: "bold" }}>
        선 굵기 수정 24 pt
      </Box>
      
      <Box sx={{ fontSize: "10pt", py: 1, color: "gray" }}>@Ellie010707</Box>
      <Box sx={{ fontSize: "10pt", color: "gray" }}>2023/05/12 20:38:01</Box>

    </Box>
  );
}
