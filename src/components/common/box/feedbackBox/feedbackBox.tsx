import { Divider, Input, InputAdornment } from "@mui/material";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApplyButton from "../../button/applyButton/applyButton";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import CommentBox from "../commentBox/commentBox";
import CommentTextBox from "../commentTextBox/commentTextBox";


export default function FeedbackBox(){
  
  return(
    <Box>
      <Box
        sx={{
          letterSpacing: "3px"
        }}
      >
        Feedbacks
      </Box>
      <Divider/>
      <Box sx={{border: "1px solid #dddddd", borderRadius: 5 , mt:3, pt: 3, px: 2, pb: 2, maxHeight: 250, overflowY: "auto"}}>
        <CommentBox></CommentBox>
      </Box>
    </Box>
  );
}