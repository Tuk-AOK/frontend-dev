import React from "react";
import { Box, Button } from "@mui/material";

export default function GlobalButton(props: { content: React.ReactNode }) {
  const { content } = props;

  return (
    <Button  color="primary" sx={{textTransform:"None"}}>
      <Box sx={{ fontWeight: "bold" }}> {content} </Box>
    </Button>
  );
}
