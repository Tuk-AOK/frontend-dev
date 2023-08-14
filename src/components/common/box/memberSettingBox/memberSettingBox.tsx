import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from "axios";
import MemberBox from "../memberBox/memberBox";

export default function MemberSettingBox() {
  return(
    <Box display="block">
      <Box sx={{fontSize: "24px", fontWeight: "bold", textAlign: "left"}}>
        Member Settings
      </Box>
      <Box sx={{mt: "10px", width: "1000px", height: "200px",borderRadius: "10px", border: "1px solid #D3D3D3", overflow: "auto", }}>
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
        <MemberBox/>
        <MemberBox/>
        <MemberBox/>
        <MemberBox/>
        <MemberBox/>
      </Box>
      </Box>
    </Box>
  );
}