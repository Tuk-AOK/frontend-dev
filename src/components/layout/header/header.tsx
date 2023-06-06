import { Box, Tabs, Tab } from "@mui/material";
import React, { useCallback, useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import MergeIcon from '@mui/icons-material/Merge';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Header(props: { children: React.ReactNode }) {
  const {children} = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const navigate = useNavigate();
  const Uploadnavigate = () => {
    navigate("/upload")
  }; 
  const Lognavigate = () => {
    navigate("/loghistory")
  }; 
  const mergenavigate = () => {
    navigate("/merge")
  }

  return (
    <Box
      sx={{
        marginTop: 2,
        width: 1,
        boxShadow: '0 4px 6px -6px rgba(0, 0, 0, 0.7)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Box sx={{px:2, marginBottom: 1}}>
        {children}
      </Box>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <Tab value="upload" label= {<Box onClick={Uploadnavigate} display={"flex"} justifyContent={"center"} alignItems={"center"}><UploadIcon sx={{mr:"5px", fontSize:"20px"}}/><Typography sx={{mr:"5px", fontSize:"15px"}}>upload</Typography></Box>} />
        <Tab value="merge" label= {<Box onClick={mergenavigate} display={"flex"} justifyContent={"center"} alignItems={"center"}><MergeIcon sx={{mr:"5px", fontSize:"20px"}}/><Typography sx={{mr:"5px", fontSize:"15px"}}>merge</Typography></Box>} />
        <Tab value="log history" label= {<Box onClick={Lognavigate} display={"flex"} justifyContent={"center"} alignItems={"center"}><HistoryIcon sx={{mr:"5px", fontSize:"20px"}}/><Typography sx={{mr:"5px", fontSize:"15px"}}>log history</Typography></Box>} />
        <Tab value="setting" label= {<Box display={"flex"} justifyContent={"center"} alignItems={"center"}><SettingsIcon sx={{mr:"5px", fontSize:"20px"}}/><Typography sx={{mr:"5px", fontSize:"15px"}}>setting</Typography></Box>} />
      </Tabs>
    </Box>
  );
}
