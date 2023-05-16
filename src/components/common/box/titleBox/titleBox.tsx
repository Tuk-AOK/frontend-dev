import { Box } from "@mui/material";
import React from "react";

export default function TitleBox(props: {content: React.ReactNode}){
    const { content } = props;
return(
    <Box
    sx={{
      textAlign: "center",
      pt: 3,
      fontWeight: "bold",
      letterSpacing: "3px",
    }}
  >
    {content}
  </Box>
)

}