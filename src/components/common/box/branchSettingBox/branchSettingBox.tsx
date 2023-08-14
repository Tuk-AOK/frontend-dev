import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from "axios";
import BranchBox from "../branchBox/branchBox";

export default function BranchSettingBox() {
  return(
    <Box display="block">
      <Box sx={{pt: "24px", fontSize: "24px", fontWeight: "bold", textAlign: "left"}}>
        Branch Settings
      </Box>
      <Box sx={{mt: "10px", width: "1000px", height: "270px",borderRadius: "10px", border: "1px solid #D3D3D3", overflow: "auto", }}>
      <Box
        display='flex'
        flexWrap='wrap'
        sx={{
          py: 3,
          gap: '10px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <BranchBox/>
        <BranchBox/>
        <BranchBox/>
        <BranchBox/>
        <BranchBox/>
        <BranchBox/>
        <BranchBox/>
      </Box>
      </Box>
    </Box>
  );
}