import React from "react";
import { Box, Button } from "@mui/material";

export default function GlobalButton(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <Button  color="primary" sx={{textTransform:"None"}}>
      <Box sx={{ fontWeight: "bold", fontSize: "10px" }}> {children} </Box>
    </Button>
  );
}
