import { Box } from "@mui/material";
import React, { useEffect } from "react";
import html2canvas from 'html2canvas';

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

  useEffect(() => {
    capturePreviewImg();
  }, [fileobjects]);

  const capturePreviewImg = async() => {
    const canvas = document.getElementById("capturePreview") as HTMLCanvasElement;
    let url = "";
    let urlData = "";
    html2canvas(canvas).then(async(canvasdata: any) => {
      //url 출력되는 형식이 base64 형식
      urlData = await canvasdata.toDataURL("image/png").split(",")[1]
      url = await canvasdata.toDataURL("image/png")
      //url = URL.createObjectURL(await (await fetch(urlData)).blob());
      console.log("만들어진 URL (inside) : ", url)
      //console.log("uri만 뽑아오기(inside) : ", urlData)

      const array = [] as any;
      for(var i = 0; i < urlData.length; i++ ){
        array.push(urlData.charCodeAt(i));
      }

      console.log(array);

      const fileBlob = new Blob([new ArrayBuffer(array)], {type: 'image/png'});
      const imgfile = new File([fileBlob], "logCaptureImg.png");

      console.log(imgfile);
    })
    
  }


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
          id="capturePreview"
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