import { Box, Typography } from "@mui/material";
import React from "react";
import DeleteButton from "../../button/deleteButton/deleteButton";

export default function FileBox() {
  return (
    <Box
    display="flex"
      sx={{
        width: "440px",
        height: "40px",
        borderRadius: "3px",
        boxShadow: 1,
        backgroundColor: "#FFFFD2",
        alignItems: "center",
      }}
    >

      <Typography style={{overflow: "hidden", textOverflow: "ellipsis", paddingLeft:"10px" }}>
        hiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihiihii
      </Typography>
      <DeleteButton/>

    </Box>
  );
}
