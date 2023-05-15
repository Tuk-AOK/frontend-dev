import { Box, Tooltip, Zoom } from "@mui/material";
import React from "react";


export default function UserPreviewBox() {

  return (
    <Box
      sx={{ px: "2px", py: "4px" }}
      display="flex"
      //justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 32,
          bgcolor: "#000000",
          overflow: "hidden",
        }}
      >
        <Tooltip TransitionComponent={Zoom} title="ellie010707" followCursor>
        <img width="100%" height="100%" src="test.jpeg" alt="test" />
        </Tooltip>
      </Box>
      <Box sx={{pl:"1px"}}>
      </Box>
    </Box>
  );
}
