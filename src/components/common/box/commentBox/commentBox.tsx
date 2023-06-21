import { Box, IconButton, Popper } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApplyButton from "../../button/applyButton/applyButton";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function CommentBox(){

  return(
    <Box sx={{pb: 2, display: "flex", flex: "1 0 40%"}}>
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: 85,
          bgcolor: "#000000",
        }}
      ></Box>
      <Box sx={{display: "flex", flexDirection: "column", flex: "1 0 40%"}}>
        <Box
          sx={{
            ml : 2,
            borderRadius: 5,
            bgcolor: "#F5F5F5",
          }}>
            <Box sx={{p:2, whiteSpace: 'break-spaces'}}>
              dfgsdgsdfsdgsdgsd
            </Box>
        </Box>
        <Box sx={{ ml: 2.5, fontSize: "10pt", color: "gray",}}>
          2023-03-03 16:00
        </Box>
      </Box>
      <Box
        sx={{
          ml: 1,
          mr: 1,
          width: 30,
          height: 30,
        }}
      >
        <React.Fragment>
          <IconButton>
            <PendingRoundedIcon/>
          </IconButton>
        </React.Fragment>
      </Box>
    </Box>
  );
}