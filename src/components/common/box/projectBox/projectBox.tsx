import { Box } from "@mui/material";
import React from "react";
import { ProjectData } from "./types";

export default function ProjectBox(props: ProjectData) {
  const { projectName, projectPreview, projectCreatedAt } = props;
  return (
    <Box
      sx={{
        pb: 2,
        width: "calc(25% - 24px)",
        minWidth: "200px",
        height: "280px",
        boxShadow: 1,
        background: "#FBFBFB",
        borderRadius: "3px",
        textAlign: "center",
        overflow: "hidden",
        "&:hover": {
          opacity: 0.7,
        },
      }}
    >
      <Box sx={{ height: "200px" }}>
        <img width="100%" height={200} src={projectPreview} alt="test" />
      </Box>
      <Box sx={{ pt: "24px", fontSize: "16px", letterSpacing: "1px" }}>
        {projectName}
      </Box>
      <Box sx={{ pt: "12px", fontSize: "12px", color: "gray" }}>
        {projectCreatedAt}
      </Box>
    </Box>
  );
}
