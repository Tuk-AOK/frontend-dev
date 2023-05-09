import { Box } from "@mui/material";
import React from "react";
import GlobalButton from "../button/globalButton/globalButton";
import ProjectBox from "../projectBox/projectBox";

export default function Main() {
  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mt: "60px",
          fontWeight: "bold",
          letterSpacing: "3px",
        }}
      >
        PROJECTS
      </Box>
      <Box sx={{ textAlign: "right", mt: "50px", mr: "130px" }}>
        <GlobalButton>create</GlobalButton>
      </Box>
      <Box
        sx={{
          mt: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexGrow: "1,1,1,1",
          alignContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
      </Box>
    </Box>
  );
}
