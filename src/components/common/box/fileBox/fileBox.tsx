import { Box, Typography } from "@mui/material";
import React from "react";
import DeleteButton from "../../button/deleteButton/deleteButton";

export default function FileBox(props: {children: React.ReactNode}) {
  const {children} = props;

  return (
    <Box
    display="flex"
      sx={{
        width: "440px",
        height: "40px",
        borderRadius: "3px",
        boxShadow: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
      }}
    >

      <Typography style={{overflow: "hidden", textOverflow: "ellipsis", paddingLeft:"10px" }}>
        
      </Typography>
      {children}
    </Box>
  );
}
