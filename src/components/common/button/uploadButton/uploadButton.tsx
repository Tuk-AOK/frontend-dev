import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import React from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadButton(){
    return(
        <Box>
        <Tooltip
          TransitionComponent={Zoom}
          title="upload"
          placement="top"
          arrow
        >
          <IconButton aria-label="download" color="primary" size="small">
            <CloudUploadIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    );
}