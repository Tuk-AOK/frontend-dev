import { Box } from "@mui/material";
import React from "react";

export default function ImageBox(props: {image: string}) {
  const {image} = props;

  return (
    <Box sx={{textAlign:"center"}}>
      <img width="100%" style={{
        maxWidth:"500px",
        maxHeight:"500px"
      }} src={image} alt="test" />
    </Box>
  );
}
