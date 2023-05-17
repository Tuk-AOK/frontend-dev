import { Box, Slider } from "@mui/material";
import React from "react";
import UploadInfoBox from "../../box/uploadInfoBox";
import { LogData } from "./types";

function valuetext(value: number) {
  return `${value}`;
}

export default function LogHistorySlider(props: {logData: Array<LogData>}) {
  const { logData } = props;
  const [currentTime,setCurrentTime] = React.useState<number>(0);

  return (
    <Box>
    <UploadInfoBox
    message="feat: 23px 수정했는데 잘된건지 모르겠네"
    user="ellie010707"
    createTime="2001-07-07 12:00:00"
    /> 
    <Slider
      aria-label="log"
      defaultValue={currentTime}
      getAriaValueText={valuetext}
      onChange={(e,v)=>{
        setCurrentTime(v as number)
      }}
      valueLabelFormat={logData[currentTime].createTime}
      marks
      min={0}
      max={logData.length - 1}
      valueLabelDisplay="auto"
    />
    </Box>
  );
}
