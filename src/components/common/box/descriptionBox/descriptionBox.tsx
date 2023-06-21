import { Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import UserPreviewBox from "../userPreviewBox/userPreviewBox";
import { useSelector } from 'react-redux';
import { RootState } from "../../../../stores/store";
import axios from 'axios';

interface projectResponse{
  status: number;
  code: string;
  message: string;
  data: projectInfo; 
}

interface projectInfo{
  projectName: string;
  projectUserId: string;
  projectIntro: string;
  projectPreview: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
}

export default function DescriptionBox() {
  let projectUuid = useSelector((state: RootState) => {
    return state.project.uuid
  })
  
  const [intro, setIntro] = useState(''); 

  useEffect(() => {
    (async () => {
        await axios.get('/api/v1/projects/' + projectUuid)
        .then((response)=> {
            console.log(" intro 브랜치 정보 불러오기 성공");
            console.log("가져온 intro 데이터", response.data.data.projectIntro);
            setIntro(response.data.data.projectIntro);
            
        })
        .catch((error)=>{
            console.log("intro 불러오기 실패")
            console.log(error);
        })
    })();
  }, []);

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
        {intro}
      </Box>
      <Box display="flex" flexWrap="wrap">
        
      </Box>
      
      <Box sx ={{pt: 6}}>
        <Box
          sx={{
            //pt: 3,
            letterSpacing: "3px",
          }}
        >
          Contributors
        </Box>
        <Divider />
        <Box sx={{ pt: 1 }}>
          <Box display="flex" flexWrap="wrap">
              <UserPreviewBox />
          </Box>
        </Box>
      </Box>
    </Box>

  );
}
