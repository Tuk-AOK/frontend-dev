import { Box, Divider } from "@mui/material";
import React from "react";
import UserPreviewBox from "../userPreviewBox/userPreviewBox";

export default function DescriptionBox() {
  return (
    <Box
      sx={
        {
          /*pr:5*/
        }
      }
    >
      <Box
        sx={{
          //pt: 3,
          letterSpacing: "3px",
        }}
      >
        Intro
      </Box>
      <Divider />
      <Box sx={{ pt: 1 }}>
        This project is for Dino.This project is for Dino.This project is for
        Dino.This project is for Dino.This project is for Dino.This project is
        for Dino.This project is for Dino.This project is for Dino.This project
        is for Dino.This project is for Dino.This project is for Dino.This
        project is for Dino.This project is for Dino.This project is for Dino.
      </Box>
      <Box display="flex">
          <UserPreviewBox />
          <UserPreviewBox />
          <UserPreviewBox />
          <UserPreviewBox />
          <UserPreviewBox />
          
      </Box>
    </Box>
  );
}
