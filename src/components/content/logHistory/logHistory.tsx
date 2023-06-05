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
  logMessage: string;
  //logMessage -> 로그 생성시간으로 변경 필요
}

interface currentData {
  currentUuid : string; 
}

export default function LogHistory() {
  const [logDatas, setLogDatas] = useState<log[]>([]);
  const [currentLog, setCurrentLog] = useState(''); 

  let uuid = useSelector((state:RootState) => {
    return state.branch.uuid
  })

  const handleCurrentLogchange = (currentLogUuid : currentData) => {
    setCurrentLog(currentLogUuid.currentUuid)
    console.log("됐음? : ", currentLogUuid.currentUuid);
  }

  useEffect(() => {
    (async () => {
      await axios.get('/api/v1/branches/'+ uuid +'/logs')
      .then((response)=> {
        console.log("log history 불러오기 성공");
        console.log("log history 데이터 : ", response.data.data);
        setLogDatas(response.data.data.logs)
      })
      .catch((error)=>{
        console.log("log history 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [uuid]);

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
          {/* <PreviewBox fileobjects={[]} onPreviewChange={}/> */}
          <FileDownloadBox currentLog={currentLog}/>
        </Box>

        <LogHistorySlider
          logData={logDatas}
          onCurrentLogsChange={handleCurrentLogchange}
        />

        <Box display="flex" justifyContent="center">
          <GlobalButton content="revert" />
        </Box>
      </Box>
    </Box>
  );
}
