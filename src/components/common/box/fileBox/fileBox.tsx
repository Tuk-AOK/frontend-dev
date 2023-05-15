import { Box } from "@mui/material";
import React from "react";
import UploadButton from "../../button/uploadButton/uploadButton";
import RefreshButton from "../../button/refreshButton/refreshButton";

export default function FileBox() {
  return (
    <Box
      sx={{
        px: 3,
        py: 1,
      }}
    >
      <Box display="flex" justifyContent="space-between">
      <Box width="56px">
        </Box>
        <Box sx={{ py: 1, }}>upload files</Box>
        <Box display="flex">
        <UploadButton/>
        <RefreshButton/>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "500px",
          height: "400px",
          borderRadius: "3px",
          boxShadow: 1,
          backgroundColor: "#F0F0F0",
          
        }}
      >
        <Box sx={{
          width: "480px",
          height: "40px",
          borderRadius: "3px",
          boxShadow: 1,
          backgroundColor: "#FFFFD2",
        }}>
        
        </Box>
      </Box>
    </Box>
  );
}
