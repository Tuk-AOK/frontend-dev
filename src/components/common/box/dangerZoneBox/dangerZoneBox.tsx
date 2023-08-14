import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from "axios";
import DeleteBox from "../deleteBox/deleteBox";

export default function DangerZoneBox() {
  return(
    <Box display="block">
      <Box sx={{fontSize: "24px", fontWeight: "bold", textAlign: "left", color: "#FF3A3A"}}>
        Danger Zone
      </Box>
      <Box sx={{mt: "10px", width: "1000px", height: "100px",borderRadius: "10px", border: "1px solid #FF3A3A", overflow: "auto", }}>
      <Box
        display='flex'
        flexWrap='wrap'
        sx={{
          py: 3,
          gap: '15px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <DeleteBox/>
      </Box>
      </Box>
    </Box>
  );
}