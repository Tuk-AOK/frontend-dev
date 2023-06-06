import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import React, {  useRef } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface DownloadButtonProps {
  fileLink: string; 
}


export default function DownloadButton({ fileLink }: DownloadButtonProps) {
  console.log("file Link 왔나 테스트 : ", fileLink);

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleClick = () => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click(); // 다운로드 링크 자동 클릭
    }
  };

  return (
    <Box>
      <Tooltip
        TransitionComponent={Zoom}
        title="download"
        placement="top"
        arrow
      >
        <IconButton aria-label="download" color="primary" size="small" onClick={handleClick}>
          <FileDownloadIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <a ref={downloadLinkRef} href={fileLink} download hidden>
        Download
      </a>
    </Box>
  );
}
