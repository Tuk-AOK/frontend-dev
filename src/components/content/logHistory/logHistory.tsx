import { Box } from "@mui/material";
import React from "react";
import TitleBox from "../../common/box/titleBox/titleBox";
import LogHistorySlider from "../../common/slider/logHistorySlider/logHistorySlider";
import BranchButton from "../../common/button/branchButton";
import GlobalButton from "../../common/button/globalButton/globalButton";
import PreviewBox from "../../common/box/previewBox";
import FileDownloadBox from "../../common/box/fileDownloadBox";

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
          justifyContent="center"
          gap="16px"
          flexWrap="wrap"
        >
          {/* <PreviewBox fileobjects={[]} onPreviewChange={}/> */}
          <FileDownloadBox />
        </Box>

        <LogHistorySlider
          logData={[
            { createTime: "2001-07-07 12:00:00", logUuid: "asd" },
            { createTime: "2001-07-10 12:00:00", logUuid: "asd" },
            { createTime: "2001-07-11 12:00:00", logUuid: "asd" },
            { createTime: "2001-07-12 12:00:00", logUuid: "asd" },
            { createTime: "2001-07-13 12:00:00", logUuid: "asd" },
          ]}
        />

        <Box display="flex" justifyContent="center">
          <GlobalButton content="revert" />
        </Box>
      </Box>
    </Box>
  );
}
