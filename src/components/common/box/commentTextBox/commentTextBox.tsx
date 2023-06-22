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
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentBranchId, setCurrentBranchId] = useState('');

  let userUuid = useSelector((state: RootState) => {
    return state.user.userUuid;
  });

  let branchUuid = useSelector((state: RootState) => {
    return state.branch.uuid;
  });
  
  useEffect(()=>{
    axios.get('/api/v1/users/'+ userUuid)
    .then((response)=>{
      const idValue = response.data.data.userId
      const stringUserId = idValue.toString();
      setCurrentUserId(stringUserId);
      
      console.log("저장된 user의 ID값(project.tsx의 commentTextBox) : ", currentUserId);

    })
    .catch((error)=>{
      console.log(error);
    })
  }, [userUuid])

  useEffect(()=>{
    axios.get('/api/v1/branches/'+ branchUuid)
    .then((response)=>{
      const idValue = response.data.data.branchId
      const stringBranchId = idValue.toString();
      setCurrentBranchId(stringBranchId);
      
      console.log("저장된 현재 브랜치의 ID값(project.tsx의 commentTextBox) : ", currentBranchId);

    })
    .catch((error)=>{
      console.log(error);
    })
  }, [branchUuid])

  const clickEvent= () => {
    axios.post('/api/v1/feedbacks', {
      branchId: currentBranchId,
      userId: currentUserId,
      message: comment
    }).then((response)=>{
      console.log("피드백 생성 성공");
      console.log(response.data);
      window.location.reload()
    }).catch((error)=>{
      console.log("피드백 생성 실패")
      console.log(error)
    });
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