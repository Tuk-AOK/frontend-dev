import { Box } from "@mui/material";
import React, { useState ,useEffect } from "react";
import html2canvas from 'html2canvas';
import axios from "axios";

interface FileListProps {
  fileobjects: FileObjectType[];
}

interface FileObjectType {
  id: number;
  object: File;
  URL: string;
  name: string;
}

interface logResponse{
  status: number;
  code: string;
  message: string;
  data: logInfo; 
}

interface logInfo{
  userUuid: string;
  logMessage: string;
  logCreatedAt: string;
  logPreview: string;
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

interface PreviewType{
  url: string;
}

interface previewProps{
  fileobjects: FileObjectType[];
  currentLogObjects: string; 
  onPreviewChange: (previewImg: PreviewType) => void;
  onImgFileChange: (file: Blob | null) => void; 
}

export default function PreviewBox({ fileobjects, currentLogObjects, onPreviewChange, onImgFileChange } : FileListProps & previewProps) {
  console.log("프리뷰 파일 오브젝트 왔워", fileobjects);
  console.log("프리뷰 미리보기 링크 왔워", currentLogObjects);
  var reversed_index;

  const [logPreviewImg, setlogPreviewImg] = useState(''); 


  useEffect(() => {
    axios.get<logResponse>('/api/v1/logs/'+ currentLogObjects)
          .then((response) => {
            console.log("최근 로그 정보 불러오기 성공");
            console.log(response.data);

            //로그 이미지 API
            console.log("history 로그 프리뷰 이미지, ", response.data.data.logPreview)
            setlogPreviewImg(response.data.data.logPreview);


          })
          .catch((error)=>{
            console.log(" 최근 로그  불러오기 실패");
            console.log(error);
          })
  }, [currentLogObjects])
        


  const capturePreviewImg = async() => {
    const canvas = document.getElementById("capturePreview") as HTMLCanvasElement;
    let url = "";
    let urlData = "";
    let wholeUrlData = "";


    html2canvas(canvas).then(async(canvasdata: any) => {
      //url 출력되는 형식이 base64 형식

      urlData = await atob(canvasdata.toDataURL("image/png").split(",")[1]);
      wholeUrlData = await canvasdata.toDataURL("image/png");
      url = URL.createObjectURL(await (await fetch(wholeUrlData)).blob());
      console.log("만들어진 URL (inside) : ", url)

      const array = [] as any;
      for(var i = 0; i < urlData.length; i += 1 ){
        array.push(urlData.charCodeAt(i));
      }

      const unitArray = new Uint8Array(array);
      const fileBlob = new Blob([unitArray], {type: "image/png"});

      console.log(fileBlob);
      onImgFileChange(fileBlob);
      onPreviewChange({url});
    })
    
  }

  useEffect(() => {
    if (fileobjects.length > 0) {
      capturePreviewImg();
    }
  }, [fileobjects]);

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
          <div>
            <img src={logPreviewImg} style={{maxWidth: "300px", maxHeight: "300px"}}/>
          </div>
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