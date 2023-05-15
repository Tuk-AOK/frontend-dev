import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';

export default function DeleteButton() {
  return (
    <Box>
      <Tooltip
        TransitionComponent={Zoom}
        title="delete"
        placement="top"
        arrow
      >
        <IconButton aria-label="delete" size="small">
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}