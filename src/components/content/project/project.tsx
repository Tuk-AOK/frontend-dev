import React from "react";
import { Box } from "@mui/material";
import BranchButton from "../../common/button/branchButton/BranchButton";
import DownloadButton from "../../common/button/downloadButton/downloadButton";
import DescriptionBox from "../../common/box/descriptionBox/descriptionBox";
import ImageBox from "../../common/box/imageBox/imageBox";
import UploadInfoBox from "../../common/box/uploadInfoBox/uploadInfoBox";

export default function Project() {
  return (
    <Box display="block">
      <Box sx={{ px: 5, py: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>
      <Box display="flex" sx={{ flexWrap: "wrap", pt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 0 60%",
            maxWidth: 800,
            minWidth: 500,
          }}
        >
          <Box sx={{ px: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  maxWidth: 500,
                  width: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <DownloadButton />
              </Box>
            </Box>
            <ImageBox image="test.jpeg"/>
            <UploadInfoBox
              message="feat: 23px 수정했는데 잘된건지 모르겠네"
              user="ellie010707"
              createTime="2001-07-07 12:00:00"
            />
          </Box>
        </Box>
        <Box sx={{ flex: "1 0 40%", minWidth: 250 }}>
          <Box sx={{ pt: 2, px: 5 }}>
            <DescriptionBox />
            <Box sx={{ pt: 6 }}>
              <DescriptionBox />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
