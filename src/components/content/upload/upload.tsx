import { Box } from "@mui/material";
import React from "react";
import BranchButton from "../../common/button/branchButton";
import PreviewBox from "../../common/box/previewBox/previewBox";
import FileBox from "../../common/box/fileBox/fileBox";

export default function Upload() {
  return (
    <Box display="block">
      <Box sx={{ px: 5, py: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>
      <Box display="flex" justifyContent="center" sx={{px:5}}>
        <Box>
          <PreviewBox />
        </Box>
        <Box>
          <FileBox />
        </Box>
      </Box>
    </Box>
  );
}
