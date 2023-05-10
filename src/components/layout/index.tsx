import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { ContentData } from "./types";

export default function Layout(props: ContentData) {
  const { headerInfo, children } = props;

  return (
    <Box sx={{ width: 1, height: 1, display: "flex"}}>
      <Sidebar />
      <Box sx={{ width: 'calc(100% - 40px)', height: 1}}>
        <Header>{headerInfo}</Header>
        <Box sx = {{width:1, height:'calc(100% - 48px)', overflowY:"auto"}}>
        {children}
        </Box>
      </Box>
    </Box>
  );
}
