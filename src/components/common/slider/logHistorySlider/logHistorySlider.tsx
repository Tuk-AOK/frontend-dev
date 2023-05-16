import { Box, Slider } from "@mui/material";
import React from "react";
import UploadInfoBox from "../../box/uploadInfoBox";

function valuetext(value: number) {
  return `${value}`;
}

export default function LogHistorySlider(props: { branchUuid: string }) {
  const { branchUuid } = props;

  return (
    <Box>
    <UploadInfoBox
    message="feat: 23px 수정했는데 잘된건지 모르겠네"
    user="ellie010707"
    createTime="2001-07-07 12:00:00"
    /> 
    <Slider
      aria-label="log"
      defaultValue={0}
      getAriaValueText={valuetext}
      valueLabelFormat={branchUuid}
      marks
      min={0}
      max={20}
      valueLabelDisplay="auto"
    />
    </Box>
  );
}
