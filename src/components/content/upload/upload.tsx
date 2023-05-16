import { Box } from "@mui/material";
import React from "react";
import BranchButton from "../../common/button/branchButton";
import PreviewBox from "../../common/box/previewBox/previewBox";
import FileListBox from "../../common/box/fileListBox";
import TextBox from "../../common/box/textBox/textBox";
import GlobalButton from "../../common/button/globalButton/globalButton";
import ApplyButton from "../../common/button/applyButton/applyButton";
import { Title } from "@mui/icons-material";
import TitleBox from "../../common/box/titleBox/titleBox";

export function Upload() {
  return (
    <Box display="block">
      <Box sx={{ px: 5, py: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ rowGap: 5, px: 20, py: 5, }}
      >
        <TitleBox content="UPLOAD" />

        <Box display="flex" sx={{ m: "0 0 0 auto", width: "300px" }}>
          <TextBox />
        </Box>

        <Box width="1" display="flex" justifyContent="space-between">
          <PreviewBox />
          <FileListBox />
        </Box>
      </Box>
    </Box>
  );
}
