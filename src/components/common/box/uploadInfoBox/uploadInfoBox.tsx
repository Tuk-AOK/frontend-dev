import { Box } from "@mui/material";
import React from "react";
import { UploadInfoData } from "./type";

export default function UploadInfoBox(props: UploadInfoData) {
  const { user, message, createTime } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ py: 4, rowGap: 2 }}
    >
      <Box sx={{ fontSize: "15pt", fontWeight: "bold" }}>{message}</Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ fontSize: "10pt", color: "gray",}}
      >
        <Box>@{user}</Box>
        <Box>{createTime}</Box>
      </Box>
    </Box>
  );
}
