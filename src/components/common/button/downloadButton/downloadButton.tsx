import { Box, IconButton, Tooltip, Zoom } from '@mui/material';
import React, { useRef } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface DownloadButtonProps {
  fileLink: string;
}

export default function DownloadButton({ fileLink }: DownloadButtonProps) {
  console.log('file Link 왔나 테스트 : ', fileLink);

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleClick = () => {
    downloadFile(fileLink);
  };

  const downloadFile = (url: string) => {
    fetch(url, { method: 'GET' })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((err) => {
        console.error('err: ', err);
      });
  };

  return (
    <Box>
      <Tooltip
        TransitionComponent={Zoom}
        title='download'
        placement='top'
        arrow
      >
        <IconButton
          aria-label='download'
          color='primary'
          size='small'
          onClick={handleClick}
        >
          <FileDownloadIcon fontSize='inherit' />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
