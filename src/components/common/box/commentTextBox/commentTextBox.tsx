import { Input, InputAdornment } from "@mui/material";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApplyButton from "../../button/applyButton/applyButton";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";

export default function CommentTextBox(){
  const ariaLabel = { "aria-label": "description" };
  const [comment, setComment] = useState('')
  
  const clickEvent= () => {

  }

  return(
    <Input
      placeholder="feedback message"
      inputProps={ariaLabel}
      value={comment}
      onChange={(event)=>(setComment(event.target.value))}
      fullWidth
      endAdornment={
        <Box onClick={clickEvent}>
          <InputAdornment position="end">
            <ApplyButton/>
          </InputAdornment>
        </Box>
      }
    />
  );
}