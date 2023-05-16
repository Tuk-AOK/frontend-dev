import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function DownloadButton() {
  return (
    <Box>
      <Tooltip
        TransitionComponent={Zoom}
        title="download"
        placement="top"
        arrow
      >
        <IconButton aria-label="download" color="primary" size="small">
          <FileDownloadIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
