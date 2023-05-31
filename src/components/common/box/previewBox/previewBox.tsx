import { Box } from "@mui/material";
import React from "react";

interface FileListProps {
  fileobjects: FileObjectType[];
}

interface FileObjectType {
  id: number;
  object: File;
  URL: string;
  name: string;
}

export default function PreviewBox({ fileobjects } : FileListProps) {
  console.log("프리뷰 파일 오브젝트 왔워", fileobjects);
  
  var reversed_index;

  return (
    <Box width="100%" maxWidth="500px" minWidth="300px">
      <Box
        height="28px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        preview
      </Box>
      <Box
        height="400px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          borderRadius: "3px",
          boxShadow: 1,
          backgroundColor: "#F0F0F0",
        }}
      >
        {/* <img width="300px" height="300px" src="test.jpeg" alt="test" /> */}
        <div
          style={{
            width: "300px",
            height: "300px",
            display: "table",
            alignItems: "center",
            position: "relative"
          }}
        >
        {fileobjects.length > 0 && fileobjects.map((file: FileObjectType, index: number) => {
          const { URL } = file;

          reversed_index = fileobjects.length - 1 - index;
          return(
            <div
              key={index}
              style={(reversed_index===0) ? {} :  {position: 'absolute', zIndex: reversed_index, display: "table-cell",top: "50%",left: "50%",transform: "translate(-50%, -50%)"}}
            >
              <img src={URL} style={{maxWidth: "300px", maxHeight: "300px"}}/>
            </div>
          );
        })}
        </div>
      </Box>
    </Box>
  );
}