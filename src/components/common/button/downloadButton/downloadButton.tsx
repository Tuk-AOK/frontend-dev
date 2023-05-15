import { Box, IconButton } from "@mui/material";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function DownloadButton() {
  return (
    <Box>
      <IconButton aria-label="download" color="primary" size="small">
        <FileDownloadIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
