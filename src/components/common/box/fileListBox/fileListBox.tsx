import { Box } from "@mui/material";
import React from "react";
import UploadButton from "../../button/uploadButton/uploadButton";
import RefreshButton from "../../button/refreshButton/refreshButton";
import FileBox from "../fileBox/fileBox";

export default function FileListBox() {
  return (
    <Box
      sx={{
        px: 3,
        py: 1,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="56px"></Box>
        <Box>upload files</Box>
        <Box display="flex">
          <UploadButton />
          <RefreshButton />
        </Box>
      </Box>
      <Box
        sx={{
          width: "500px",
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
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
          <FileBox />
        </Box>
      </Box>
    </Box>
  );
}
