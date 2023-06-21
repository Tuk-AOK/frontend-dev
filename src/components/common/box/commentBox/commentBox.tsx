import { Box, IconButton, Popper, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApplyButton from "../../button/applyButton/applyButton";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface currentFeedbackResponse{
  status: number;
  code: string;
  message: string;
  data: feedbacksData;
}

interface feedbacksData{
  branchFeedbackInfos: feedback[];
}

interface feedback{
  userUuid: string;
  feedbackMessage: string;
  feedbackUserUuid: string;
  feedbackUuid: string;
  feedbackStatus: string;
}


export default function CommentBox(){
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [feedbacks, setFeedbacks] = useState<feedback[]>([])
  const [userNickname, setUserNickname] = useState('');
  const [userProfileImg, setUserProfileImg] = useState('');
  let branchUuid = useSelector((state: RootState) => {
    return state.branch.uuid;
  });

  useEffect(()=>{
    (async () => {
      await axios.get<currentFeedbackResponse>('/api/v1/branches/'+ branchUuid +'/feedbacks?page=0')
      .then((response)=> {
          console.log("피드백 정보 불러오기 성공(feedbackBox.tsx)");
          console.log("가져온 피드백 데이터", response.data.data.branchFeedbackInfos);
          setFeedbacks(response.data.data.branchFeedbackInfos);
          console.log("feedback 저장상태 : ", feedbacks);
          
      })
      .catch((error)=>{
          console.log(error);
      })
  })();
  }, [branchUuid])

  return(
    <Box>
      {feedbacks.length > 0 && 
        feedbacks.map((datas: any) => {

          axios.get('/api/v1/users/' + datas.feedbackUserUuid)
          .then((response)=>{
            console.log(response.data.data.userNickname)
            setUserNickname(response.data.data.userNickname)
            console.log(response.data.data.userPhoto)
            setUserProfileImg(response.data.data.userPhoto)
          })

          return(
            <Box sx={{pb: 2, display: "flex", flex: "1 0 40%"}}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 85,
                  bgcolor: "#000000",
                  overflow: "hidden",
                }}
              >
                <img width="100%" height="100%" src={userProfileImg} alt="test" />
              </Box>
              <Box sx={{display: "flex", flexDirection: "column", flex: "1 0 40%"}}>
                <Box
                  sx={{
                    ml : 2,
                    borderRadius: 5,
                    bgcolor: "#F5F5F5",
                  }}>
                    <Box sx={{p:2, whiteSpace: 'break-spaces'}}>
                      {datas.feedbackMessage}
                    </Box>
                </Box>
                <Box sx={{ ml: 2.5, fontSize: "10pt", color: "gray",}}>
                  {userNickname}
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
        })
      }
    </Box>
  );
}