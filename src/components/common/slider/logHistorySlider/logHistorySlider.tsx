import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import UploadInfoBox from "../../box/uploadInfoBox";
import { LogData } from "./types";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";


function valuetext(value: number) {
  return `${value}`;
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

interface userResponse{
  status: number;
  code: string;
  message: string;
  data: userInfo;
}

interface userInfo{
  userEmail: string;
  userNickname: string;
  userPhoto: string;
  userUuid: string;
  userId: number;
}

interface currentData {
  currentUuid : string; 
}

interface currentLogProps {
  onCurrentLogsChange: (currentLogUuid : currentData) => void; 
}

export default function LogHistorySlider({ logData,latestLogData, onCurrentLogsChange }: {
  logData: Array<LogData>,
  latestLogData: LogData | null;
  onCurrentLogsChange: (currentLogUuid: currentData) => void
}) {
  // const { logData, onCurrentLogsChange } = props;
  const [currentTime,setCurrentTime] = React.useState<number>(0);
  const [currentUuid, setCurrentUuid] = useState('');
  const [message, setLogMessage] = useState('');
  const [createTime, setCreateTime] = useState('');
  const [nickname, setNickname] = useState('');

  let uuid = useSelector((state:RootState) => {
    return state.branch.uuid
  })


  console.log("현재 uuid 뭐임: ", currentUuid);
  
  useEffect(() => {
    if (latestLogData) {
      setCurrentUuid(latestLogData.logUuid); // 가장 최근 데이터의 logUuid 설정

      // 로그 정보 요청
      (async () => {
        try {
          const response = await axios.get<currentLogResponse>(
            `/api/v1/logs/${latestLogData.logUuid}`
          );

          console.log("현재 위치한 로그 정보 불러오기 성공");
          console.log("현위치 로그 데이터 : ", response.data.data);

          // 로그 생성 시간
          console.log("로그 생성시간 ", response.data.data.data.logCreatedAt);
          setCreateTime(response.data.data.data.logCreatedAt);

          // 로그 정보의 유저 uuid
          console.log(response.data.data.data.userUuid);
          axios
            .get<userResponse>(`/api/v1/users/${response.data.data.data.userUuid}`)
            .then((response) => {
              console.log("닉네임 : ", response.data.data.userNickname);
              setNickname(response.data.data.userNickname);
            });

          // 로그 메시지
          console.log("로그 메시지 ", response.data.data.data.logMessage);
          setLogMessage(response.data.data.data.logMessage);
        } catch (error) {
          console.log("현위치 로그 정보 불러오기 실패");
          console.log(error);
        }
      })();
    }
  }, [latestLogData]);

  useEffect(() => {
    (async () => {
      await axios.get('/api/v1/logs/'+ currentUuid)
      .then((response)=> {
        console.log("현재 위치한 로그 정보 불러오기 성공");
        console.log("현위치 로그 데이터 : ", response.data.data);

        //로그 생성 시간
        console.log("로그 생성시간 ",response.data.data.logCreatedAt);
        setCreateTime(response.data.data.logCreatedAt);

        //로그 정보의 유저 uuid
        console.log(response.data.data.userUuid);
        axios.get<userResponse>('/api/v1/users/'+ response.data.data.userUuid)
        .then((response) => {
          console.log("닉네임 : ", response.data.data.userNickname);
          setNickname(response.data.data.userNickname);
        })

        //로그 메시지
        console.log("로그 메시지 ",response.data.data.logMessage);
        setLogMessage(response.data.data.logMessage);
        
      })
      .catch((error)=>{
        console.log("현위치 로그 정보 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [currentUuid]);

  return (
    <Box>
    <UploadInfoBox
    message={message}
    user={nickname}
    createTime={createTime}
    /> 
    {logData.length > 0 && (
      <Slider
      aria-label="log"
      defaultValue={logData.length - 1}
      getAriaValueText={valuetext}
      onChange={(e,v)=>{
        const reversedIndex = logData.length - 1 - (v as number);
        setCurrentTime(reversedIndex);
        console.log("체크 : ", logData[reversedIndex].logUuid);
        setCurrentUuid(logData[reversedIndex].logUuid);
        onCurrentLogsChange({ currentUuid: logData[reversedIndex].logUuid });
      }}
      valueLabelFormat={logData[currentTime]?.logCreatedAt}
      marks
      min={0}
      max={logData.length - 1}
      valueLabelDisplay="auto"
      />
    )}
    </Box>
  );
}