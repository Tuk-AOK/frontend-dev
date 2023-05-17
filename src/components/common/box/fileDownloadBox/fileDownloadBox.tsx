import { Box } from "@mui/material";
import React from "react";
import FileBox from "../fileBox/fileBox";
import DownloadButton from "../../button/downloadButton/downloadButton";

export default function FileDownloadBox() {
  return (
    <Box width="100%" maxWidth="500px" minWidth="300px">
            <Box
        height="28px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        uploaded files
      </Box>
      <Box
        sx={{
          height: "400px",
          borderRadius: "3px",
          boxShadow: 1,
          backgroundColor: "#F0F0F0",
          overflow: "auto",
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          sx={{
            py: 6,
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
          <FileBox>
            <DownloadButton />
          </FileBox>
        </Box>
      </Box>
    </Box>
  );
}
