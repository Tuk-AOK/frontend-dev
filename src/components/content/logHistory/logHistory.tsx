import { Box } from "@mui/material";
import React from "react";
import TitleBox from "../../common/box/titleBox/titleBox";
import LogHistorySlider from "../../common/slider/logHistorySlider/logHistorySlider";
import BranchButton from "../../common/button/branchButton";
import GlobalButton from "../../common/button/globalButton/globalButton";
import PreviewBox from "../../common/box/previewBox";
import FileUploadBox from "../../common/box/fileUploadBox";

export default function LogHistory() {
  return (
    <Box>
      <Box sx={{ px: 5, pt: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>
      <Box display="flex" flexDirection="column" sx={{ px: 20, rowGap: 3 }}>
        <TitleBox content="LOG HISTORY" />
        <Box
          width="1"
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <PreviewBox />
          <FileUploadBox />
        </Box>

        <LogHistorySlider branchUuid="3410837049721390" />

        <Box display="flex" justifyContent="center">
          <GlobalButton content="revert" />
        </Box>
      </Box>
    </Box>
  );
}
