import { Box, IconButton, Grow, Popper, Paper, MenuItem, MenuList, ButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApplyButton from "../../button/applyButton/applyButton";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ClickAwayListener from "@mui/material/ClickAwayListener";

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
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const anchorRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [selectedIcon, setSelectedIcon] = useState<{ [key: string]: React.ReactNode }>({});
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


  

  const handleToggle = (feedbackUuid: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [feedbackUuid]: !prevOpen[feedbackUuid],
    }));
  };

  const handleClose = (event: Event, feedbackUuid: string) => {
    if (

      anchorRefs.current[feedbackUuid] &&
      anchorRefs.current[feedbackUuid]?.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen((prevOpen) => ({
      ...prevOpen,
      [feedbackUuid]: false,
    }));
  };

  const handleMenuItemClick = (feedbackUuid: string, icon: React.ReactNode, iconstatus: string) => {
    setSelectedIcon((prevSelectedIcon) => ({
      ...prevSelectedIcon,
      [feedbackUuid]: icon, iconstatus
    }));

    setOpen((prevOpen) => ({
      ...prevOpen,
      [feedbackUuid]: false
    }));
    
    console.log("얘의 피드백 uuid:", feedbackUuid);
    // 선택한 아이콘에 따라 상태를 전송하는 axios 요청을 수행합니다.
    let feedbackStatus = "";
    if (iconstatus === "inprogress") {
      feedbackStatus = "inProgress";
    } else if (iconstatus === "executed") {
      feedbackStatus = "executed";
    } else if (iconstatus === "rejected") {
      feedbackStatus = "rejected";
    }

    console.log("현재 feedbackStatus: ", feedbackStatus);
    if (feedbackStatus) {
      axios
        .patch('/api/v1/feedbacks/' + feedbackUuid , {
          feedbackStatus: feedbackStatus
        })
        .then((response) => {
          console.log("상태 업데이트 성공:", response.data);
        })
        .catch((error) => {
          console.log("상태 업데이트 실패:", error);
        });
    } 


  };

  const getInitialIcon = (feedbackStatus: string): React.ReactNode => {
    if (feedbackStatus === "inProgress") {
      return <PendingRoundedIcon sx={{pr: 0.8, color: "#1856A5"}}/>;
    } else if (feedbackStatus === "executed") {
      return <CheckCircleRoundedIcon sx={{ pr: 0.8, color: "#8BAF55" }} />;
    } else if (feedbackStatus === "rejected") {
      return <ErrorRoundedIcon sx={{ pr: 0.8, color: "#E93547" }} />;
    } else {
      // 기본 아이콘
      return <PendingRoundedIcon />;
    }
  };

  return(
    <Box>
      {feedbacks.length > 0 && 
        feedbacks.map((datas: any) => {

          axios.get('/api/v1/users/' + datas.feedbackUserUuid)
          .then((response)=>{
            setUserNickname(response.data.data.userNickname)
            setUserProfileImg(response.data.data.userPhoto)
          })

          return(
            <Box sx={{pb: 2, display: "flex", flex: "1 0 40%"}} key={datas.feedbackUuid}>
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
                  <ButtonGroup ref={(node) => (anchorRefs.current[datas.feedbackUuid] = node)}>
                    <IconButton 
                    aria-controls={open[datas.feedbackUuid] ? "split-button-menu" : undefined}
                    aria-expanded={open[datas.feedbackUuid] ? "true" : undefined}
                    aria-label="select merge strategy"
                    onClick={()=>handleToggle(datas.feedbackUuid)}>
                      {selectedIcon[datas.feedbackUuid] || getInitialIcon(datas.feedbackStatus)}
                    </IconButton>
                  </ButtonGroup>
                  <Popper
                    sx={{
                      zIndex: 1,
                    }}
                    open={open[datas.feedbackUuid]}
                    anchorEl={anchorRefs.current[datas.feedbackUuid]}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={(event)=> handleClose(event, datas.feedbackUuid)}>
                            <MenuList id="split-button-menu" autoFocusItem>  
                              <MenuItem
                              onClick={() => handleMenuItemClick(datas.feedbackUuid, <PendingRoundedIcon sx={{ pr: 0.8, color: "#1856A5" }}/>, "inprogress")}
                              >
                                <PendingRoundedIcon sx={{pr: 0.8, color: "#1856A5"}}/> in progress
                              </MenuItem>
                              <MenuItem
                              onClick={() => handleMenuItemClick(datas.feedbackUuid, <CheckCircleRoundedIcon sx={{ pr: 0.8, color: "#8BAF55" }} />, "executed")}
                              >
                                <CheckCircleRoundedIcon sx={{pr: 0.8, color: "#8BAF55"}}/> executed
                              </MenuItem>
                              <MenuItem
                              onClick={() => handleMenuItemClick(datas.feedbackUuid, <ErrorRoundedIcon sx={{ pr: 0.8, color: "#E93547" }} />, "rejected")}
                              >
                                <ErrorRoundedIcon sx={{pr: 0.8, color: "#E93547"}}/> rejected
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </React.Fragment>
              </Box>
            </Box>
          );
        })
      }
    </Box>
  );
}