import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./sidebar";
import Header from "./header/header";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Header />
      <Box sx={{ width: 1,height:"calc(100% - 48px)", display: "flex" }}>
        <Sidebar />
        <Box sx={{ p: "16px", width: 1,overflow:"auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
