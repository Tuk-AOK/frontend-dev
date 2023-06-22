import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleBox from "../../common/box/titleBox/titleBox";
import LogHistorySlider from "../../common/slider/logHistorySlider/logHistorySlider";
import BranchButton from "../../common/button/branchButton";
import GlobalButton from "../../common/button/globalButton/globalButton";
import PreviewBox from "../../common/box/previewBox";
import FileDownloadBox from "../../common/box/fileDownloadBox";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useNavigate } from "react-router-dom";

interface wholeLogResponse{
  status: number;
  code: string;
  message: string;
  data: logsData;
}

interface logsData {
  logs: log[]
}

interface log {
  logUuid: string;
  logCreatedAt: string;
}

interface currentData {
  currentUuid : string; 
}

export default function LogHistory() {
  const [logDatas, setLogDatas] = useState<log[]>([]);
  const [currentLog, setCurrentLog] = useState(''); 

  const navigate = useNavigate();
  let uuid = useSelector((state:RootState) => {
    return state.branch.uuid
  })

  const handleCurrentLogchange = (currentLogUuid : currentData) => {
    setCurrentLog(currentLogUuid.currentUuid)
    console.log("됐음? : ", currentLogUuid.currentUuid);
  }

  console.log("store uuid test: ", uuid);
  useEffect(() => {
    (async () => {
      await axios.get('/api/v1/branches/'+ uuid +'/logs?page=0')
      .then((response)=> {
        console.log("log history 불러오기 성공(loghistory)");
        console.log("log history 데이터 : ", response.data.data);
        setLogDatas(response.data.data.logs)
      })
      .catch((error)=>{
        console.log("log history 불러오기 실패(loghistory)");
        console.log(error);
      })
    })();
    
  }, [uuid]);

  useEffect(() => {
    if (logDatas.length > 0) {
      setCurrentLog(logDatas[0].logUuid);
    }
  }, [logDatas]);

  const revertEvent = () => {
    if(logDatas.length <= 1){
      alert("로그의 수가 너무 적습니다.");
    } 
    else{
      if(currentLog){
        const currentLogIndex = logDatas.findIndex((log) => log.logUuid === currentLog)
        if(currentLogIndex !== -1) {
          const logsToDelete = logDatas.slice(0, currentLogIndex);
          logsToDelete.map((log) =>
            axios.delete('/api/v1/logs/'+ log.logUuid)
            .then((response)=>{
              console.log("로그 제거 성공(logHistory)");
              console.log(response.data);
              navigate('/project');
            }).catch((error)=>{
              alert("로그 제거에 실패하였습니다.")
              console.log("로그 제거 실패(logHistory)");
              console.log(error);
            })
          )
        }
      }
    }
  }

  // 가장 최근 데이터 추출
  const latestLogData = logDatas.length > 0 ? logDatas[0] : null;

  return (
    <Box>
      <Box sx={{ px: 5, pt: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>
      <Box display="flex" flexDirection="column" sx={{ px: 20, rowGap: 3 }}>
        <TitleBox content="LOG HISTORY" />
        <Box
          width="1"
          display="flex"
          justifyContent="center"
          gap="16px"
          flexWrap="wrap"
        >
          <PreviewBox fileobjects={[]} currentLogObjects={currentLog} onPreviewChange={()=> {}} onImgFileChange={()=>{}}/>
          <FileDownloadBox currentLog={currentLog}/>
        </Box>

        <LogHistorySlider
          logData={logDatas}
          latestLogData={latestLogData}
          onCurrentLogsChange={handleCurrentLogchange}
        />

        <Box display="flex" justifyContent="center" onClick={revertEvent}>
          <GlobalButton content="revert" />
        </Box>
      </Box>
    </Box>
  );
}
