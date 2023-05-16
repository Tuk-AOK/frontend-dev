import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import React from "react";
import SendIcon from '@mui/icons-material/Send';

export default function ApplyButton() {
  return (
    <Box>
      <Tooltip
        TransitionComponent={Zoom}
        title="apply"
        placement="top"
        arrow
      >
        <IconButton aria-label="apply" color="primary"  size="small">
          <SendIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}