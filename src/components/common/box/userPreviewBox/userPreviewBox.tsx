import { Box, Tooltip, Zoom } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import axios from "axios";


interface userResponse {
  status: number;
  code: string;
  message: string;
  data: projectUserInfos;
}

interface projectUserInfos{
  userInfos: user[]
}

interface user{
  userUuid: string;
  userEmail: string; 
  userId: string;
  userNickname: string;
  userPhoto: string;
}

export default function UserPreviewBox() {
  const [userData, setUserData] = useState<user[]>([]);

  let projectUuid = useSelector((state: RootState)=>{
    return state.project.uuid;  
  });

  useEffect(() => {
    (async () => {
        await axios.get<userResponse>('/api/v1/projects/'+ projectUuid +'/users?page=0')
        .then((response)=> {
            console.log("유저들 정보 불러오기 성공");
            console.log("가져온 유저 데이터", response.data.data.userInfos);
            setUserData(response.data.data.userInfos);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    })();
  }, []); 


  return (
    <Box sx={{display: "flex"}}>
    {userData.reverse().map(user => {
      return(
      <Box
      sx={{ px: "2px", py: "4px" }}
      display="flex"
      //justifyContent="center"
      alignItems="center"
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 32,
            bgcolor: "#000000",
            overflow: "hidden",
          }}
        >
          <Tooltip TransitionComponent={Zoom} title={user.userNickname} followCursor>
          <img width="100%" height="100%" src={user.userPhoto} alt="test" />
          </Tooltip>
        </Box>
        <Box sx={{pl:"1px"}}>
        </Box>
    </Box>
      );
    })}
    </Box>
  );
}
