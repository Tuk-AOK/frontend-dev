import React from "react";
import { Box } from "@mui/material";
import BranchButton from "../../common/branchButton/BranchButton";
import DownloadButton from "../../common/downloadButton/downloadButton";

export default function Project() {
  return (
    <Box display="flex">
      <Box sx={{ px: 5, py: 3, alignItems: "center" }}>
        <BranchButton />
        <Box sx={{ textAlign: "right", px: 18,}}>
          <DownloadButton />
        </Box>
        <Box sx={{ px: 18, textAlign: "center"}}>
          <img width="504px" height="504px" src="test.jpeg" alt="test" />
          <Box sx = {{fontSize: "10pt", py:2}}>
          선 굵기 수정
          </Box>
          
        </Box>
      </Box>


    </Box>
  );
}
