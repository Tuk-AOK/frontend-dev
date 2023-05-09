import React from "react";
import { Box, Button } from "@mui/material";

export default function GlobalButton(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <Button size="small" color="primary">
      <Box sx={{ fontWeight: "bold", fontSize: "10px" }}> {children} </Box>
    </Button>
  );
}
