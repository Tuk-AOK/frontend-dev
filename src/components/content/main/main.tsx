import { Box, Pagination } from "@mui/material";
import React from "react";
import GlobalButton from "../../common/globalButton";
import ProjectBox from "../../common/projectBox";

export default function Main() {
  return (
    <Box sx={{ px: 3,py:3 }}>
      <Box
        sx={{
          textAlign: "center",
          pt: 3,
          fontWeight: "bold",
          letterSpacing: "3px",
        }}
      >
        PROJECTS
      </Box>
      <Box sx={{ px: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ maxWidth: 1000,width:1, height: 32, position: "relative" }}>
            <Box sx={{ position: "absolute", right: 0 }}>
              <GlobalButton>create</GlobalButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              mt: "10px",
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
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
      </Box>
      <Box sx={{ textAlign: "center", mt: 2,display:"flex",justifyContent:"center" }}>
        <Pagination count={10} color="primary" size="small" />
      </Box>
    </Box>
  );
}
