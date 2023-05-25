import { Box } from "@mui/material";
import React from "react";
import BranchButton from "../../common/button/branchButton";
import PreviewBox from "../../common/box/previewBox/previewBox";
import TextBox from "../../common/box/textBox/textBox";
import TitleBox from "../../common/box/titleBox/titleBox";
import FileUploadBox from "../../common/box/fileUploadBox";

//import WholeFileUploadBox from "../../common/box/wholeFileUploadBox";

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
        sx={{ rowGap: 5, mx: 20, py: 5, pt: 0 }}
      >
        <TitleBox content="UPLOAD" />

        <Box
          width="1"
          display="flex"
          justifyContent="center"
          gap={"16px"}
          flexWrap="wrap"
        >
          <PreviewBox />
          <FileUploadBox />
        </Box>
        <Box>
          <TextBox />
        </Box>
      </Box>
    </Box>
  );
}
