import { Box } from "@mui/material";
import React from "react";
import BranchButton from "../../common/button/branchButton";
import PreviewBox from "../../common/box/previewBox/previewBox";
import FileListBox from "../../common/box/fileListBox";
import TextBox from "../../common/box/textBox/textBox";
import GlobalButton from "../../common/button/globalButton/globalButton";
import ApplyButton from "../../common/button/applyButton/applyButton";

export function Upload() {
  return (
    <Box display="block">
      <Box sx={{ px: 5, py: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>
      <Box display="flex" justifyContent="center" sx={{ px: 5 }}>
        <PreviewBox />
        <FileListBox />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        //flexDirection="column"
        alignItems="center"
        sx={{ px: 60, py: 5, rowGap: 2 }}
      >
        <TextBox />
        {/* <GlobalButton>apply</GlobalButton> */}
      </Box>
    </Box>
  );
}
