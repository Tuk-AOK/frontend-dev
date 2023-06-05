import { Input, InputAdornment } from "@mui/material";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApplyButton from "../../button/applyButton/applyButton";
import axios from 'axios';

interface FileListProps {
  fileobjects: FileObjectType[];
}


interface FileObjectType {
  id: number;
  object: File;
  URL: string;
  name: string;
}



interface TextBoxProps {
  fileobjects: FileObjectType[];
  url: string;
  imgFile: File | null;
}


export default function TextBox({ fileobjects, imgFile } : FileListProps & TextBoxProps) {
  const ariaLabel = { "aria-label": "description" };
  const [msg, setMsg] = useState('')

  console.log("잘도착하셨읍니까: ", imgFile);

  const createLog = async() => {
    if(fileobjects.length === 0 && msg === ''){

    }
    else if(fileobjects.length === 0){
      alert('이미지 파일을 업로드 해주세요.')
    }
    else if(msg === ''){
      alert('업로드 메시지를 적어주세요.')
    } else {
      const formData = new FormData();
      const files: File[] = fileobjects.map((file) => file.object)
      console.log("파일 오브젝트 추출 : ", files);

      Array.from(files).forEach((el) => {
        formData.append("files", el);
      });
        formData.append("userId", '1');
        formData.append("branchId", '1');
        formData.append("message", msg);
        if(imgFile !== null) {
          formData.append("preview", imgFile);
        }

      // FormData의 key 확인
      // @ts-ignore
      for (const key of formData.keys()) {
        console.log("키값: ", key);
      }
      // FormData의 value 확인
      // @ts-ignore
      for (const value of formData.values()) {
        console.log("밸류값: ", value);
      }
      console.log(formData);


      await axios.post('/api/v1/logs', {
        data: formData,
      }, {
        headers: {
          "Content-Type" : "multipart/form-data",
        },
        transformRequest: [
          function () {
            return formData;
          }
        ],
      }).then((response) => {
        console.log("로그 생성 성공")
        console.log(response.data.data)
        window.location.replace("/project");

      }).catch((error) => {
        console.log("로그 생성 실패")
        console.log(error);
      })
    }
  }


  const clickEvent = () => {
    createLog()
  }

  console.log("텍스트 박스에도 왔워 ", fileobjects )
  
  return (
    <Input
      placeholder="commit message"
      inputProps={ariaLabel}
      value={msg}
      onChange={(event)=>(setMsg(event.target.value))}
      fullWidth
      endAdornment={
        <Box onClick={clickEvent}>
          <InputAdornment position="end">
            <ApplyButton/>
          </InputAdornment>
        </Box>
      }
    />
  );
}
