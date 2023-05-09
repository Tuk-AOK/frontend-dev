import { Box } from "@mui/material";
import React from "react";

export default function ProjectBox() {
  return (
    <Box
      sx={{
        ml:"40px",
        mr:"40px",
        mb:"40px",
        width: "200px",
        height: "240px",
        padding: "16px",
        boxShadow: 1,
        background: "#FBFBFB",
        borderRadius: "3px",
        textAlign: "center"
      }}
    >
      <Box>
        <img width="200px" height="200px" src="img/test.jpeg" alt="test"/>
      </Box>
      <Box sx={{mt:"12px", fontSize:"16px"}}>
      Project 1
      </Box>
    </Box>
  );
}
