import { Input, InputAdornment } from "@mui/material";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApplyButton from "../../button/applyButton/applyButton";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";

interface FileListProps {
  fileobjects: FileObjectType[];
}


interface FileObjectType {
  id: number;
  object: File;
  URL: string;
  name: string;
}

interface branchResponse{
  status: number;
  code: string;
  message: string;
  data: branchData;
}

interface branchData{
  branchId: number;
  branchName: string;
}

interface userResponse{
  status: number;
  code: string;
  message: string;
  data: userData;
}

interface userData {
  userEmail: string;
  userNickname: string;
  userPhoto: string;
  userUuid: string;
  userId: number;
}

interface TextBoxProps {
  fileobjects: FileObjectType[];
  url: string;
  imgFile: Blob | null;
}


export default function TextBox({ fileobjects, imgFile } : FileListProps & TextBoxProps) {
  const ariaLabel = { "aria-label": "description" };
  const [msg, setMsg] = useState('')
  const [currentBranchId, setCurrentBranchId] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  console.log("잘도착하셨읍니까: ", imgFile);

  let branchUuid = useSelector((state:RootState) => {
    return state.branch.uuid
  })

  let mainId = useSelector((state:RootState) => {
    return state.branch.mainBranchId
  })

  let userUuid = useSelector((state: RootState) =>{
    return state.user.userUuid
  })

  useEffect(() => {
    (async () => {
      await axios.get<branchResponse>('/api/v1/branches/'+ branchUuid)
      .then((response)=> {
        console.log("현재 브랜치 데이터 : ", response.data.data.branchId);
        const idValue = response.data.data.branchId
        const stringBranchId = idValue.toString();
        setCurrentBranchId(stringBranchId)
        console.log("id data check : ", currentBranchId);
      })
      .catch((error)=>{
        console.log("log history 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [currentBranchId]);

  useEffect(() => {
    (async () => {
      axios.get<userResponse>('/api/v1/users/'+ userUuid)
      .then((response)=> {
        console.log("현재 유저 데이터 : ", response.data.data.userId);
        const idValue = response.data.data.userId
        const stringUserId = idValue.toString();
        setCurrentUserId(stringUserId)
        console.log("userId data check : ", currentUserId);
      })
      .catch((error)=>{
        console.log("유저 데이터 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [currentUserId]);


  const createLog = async() => {
    
    if(fileobjects.length === 0 && msg === ''){

    }
    else if(fileobjects.length === 0){
      alert('이미지 파일을 업로드 해주세요.')
    }
    else if(msg === ''){
      alert('메시지를 적어주세요.')
    } else {
      const formData = new FormData();
      const files: File[] = fileobjects.map((file) => file.object)
      console.log("파일 오브젝트 추출 : ", files);

      Array.from(files).forEach((el) => {
        formData.append("files", el);
      });
        let branchId, userId;
        
        if(window.location.pathname === '/merge'){
          branchId = mainId;
        } else {
          branchId = currentBranchId; 
        }
        formData.append("userId", currentUserId);
        formData.append("branchId", branchId);
        console.log("그렇다면 지금 브랜치 id는? : ", branchId);
        formData.append("message", msg);
        if(imgFile !== null) {
          formData.append("preview", imgFile, "previewimg.png");
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
