import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function RefreshButton(){
  const handleReload = () =>{
    window.location.reload();
  }
  
  return(
        <Box>
        <Tooltip
          TransitionComponent={Zoom}
          title="refresh"
          placement="top"
          arrow
        >
          <IconButton aria-label="refresh" color="primary" size="small" onClick={handleReload}>
            <RefreshIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    );
}