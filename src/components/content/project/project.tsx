import React from "react";
import { Box } from "@mui/material";
import BranchButton from "../../common/branchButton/BranchButton";
import DownloadButton from "../../common/downloadButton/downloadButton";
import DescriptionBox from "../../common/descriptionBox/descriptionBox";
import ImageBox from "../../common/imageBox/imageBox";

export default function Project() {
  return (
    <Box display="block">
      <Box sx={{ px: 5, py: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>

<Box display="flex">
      <Box sx={{ textAlign: "right", px: 20 }}>
        <DownloadButton />
        <ImageBox />
      </Box>

      <Box sx={{pr:5, pt:3}}>
        <DescriptionBox />

        <Box sx={{pt: 6}}>
        <DescriptionBox />
        </Box>
      </Box>
    </Box>
    </Box>
  );
}
