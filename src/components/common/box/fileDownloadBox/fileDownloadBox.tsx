import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBox from "../fileBox/fileBox";
import DownloadButton from "../../button/downloadButton/downloadButton";
import axios from "axios";


interface logProps {
  currentLog : string;
}

interface currentLogResponse{
  status: number;
  code: string;
  message: string;
  data : currentLogData;
}

interface currentLogData{
  status: number;
  code: string;
  message: string;
  data: logInfo;
}

interface logInfo{
  userUuid: string;
  logMessage: string;
  logCreatedAt: string;
  resourceInfos: resourcesData[];
}

interface resourcesData{
  resources: resource[]
}

interface resource{
  fileName: string;
  fileLink: string;
  fileUuid: string; 
}

export default function FileDownloadBox({currentLog} : logProps) {
  console.log("데이터 와쪄여 뿌우 : ", currentLog);
  const [resourcefiles, setResourceFiles] = useState<resource[]>([]);

  useEffect(() => {
    (async () => {
      await axios.get<currentLogResponse>('/api/v1/logs/'+ currentLog)
      .then((response)=> {
        console.log("(download) 현재 위치한 로그 정보 불러오기 성공");
        console.log("(download) 현위치 로그 데이터 : ", response.data.data.data.resourceInfos);
        const resources = response.data.data.data.resourceInfos;

        if (resources.length > 0) {
          const lastResource = resources[resources.length - 1];
          // 또는 setResourceFiles([lastResource]);
        }
        
      })
      .catch((error)=>{
        console.log("(download)현위치 로그 정보 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [currentLog]);

  return (
    <Box width="100%" maxWidth="500px" minWidth="300px">
            <Box
        height="28px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        uploaded files
      </Box>
      <Box
        sx={{
          height: "400px",
          borderRadius: "3px",
          boxShadow: 1,
          backgroundColor: "#F0F0F0",
          overflow: "auto",
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          sx={{
            py: 6,
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        
        {/* {resources.map(resources => {
          return(
          <FileBox text={resources.fileName}>
          <DownloadButton />
          </FileBox>);
        })} */}
        </Box>
      </Box>
    </Box>
  );
}
