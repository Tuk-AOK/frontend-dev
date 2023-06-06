import { Box, Typography } from "@mui/material";
import React from "react";
import DeleteButton from "../../button/deleteButton/deleteButton";

export default function FileMergeSelectBox(props: { children: React.ReactNode, text: string, backgroundColor: string }) {
  const { children, text, backgroundColor } = props;

  return (
    <Box
      display="flex"
      sx={{
        width: "440px",
        height: "40px",
        borderRadius: "3px",
        boxShadow: 1,
        backgroundColor: backgroundColor,
        alignItems: "center",
      }}
    >
      <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", paddingLeft: "10px" }}>
        {text}
      </Typography>
      {children}
    </Box>
  );
}