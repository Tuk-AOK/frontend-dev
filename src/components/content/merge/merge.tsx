import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BranchButton from "../../common/button/branchButton";
import PreviewBox from "../../common/box/previewBox/previewBox";
import TextBox from "../../common/box/textBox/textBox";
import TitleBox from "../../common/box/titleBox/titleBox";
import FileMergeBox from "../../common/box/fileMergeBox";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useNavigate } from "react-router-dom";

interface branchResponse {
  status: number;
  code: string;
  message: string;
  data: branchData;
}

interface branchData {
  branchId: number;
  branchName: string; 
}

interface FileObjectType {
  id: number;
  object: File;
  URL: string;
  name: string;
}

export default function Merge() {
  const [fileobjects, setFileObjects] = useState<FileObjectType[]>([]);

  const handleFilesChange = (files: FileObjectType[]) => {
    console.log("merge로 온 파일은 여기! : ", files)
    setFileObjects(files)
  }

  let uuid = useSelector((state:RootState) => {
    return state.branch.uuid
  })

  const navigate = useNavigate();
  const projectNavigate = () => {
    navigate("/project")
  }

  useEffect(() => {
    (async () => {
      await axios.get<branchResponse>('/api/v1/branches/'+ uuid)
      .then((response)=> {
        console.log("단일로그 불러오기 성공");
        console.log("단일로그 데이터 : ", response.data.data.branchName);
        if(response.data.data.branchName === "main") {
          alert("main 브랜치에서는 머지할 수 없습니다");
          projectNavigate();
        }
      })
      .catch((error)=>{
        console.log("단일로그 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [uuid]);


  return(
    <Box display="block">
      <Box sx={{ px: 5, py: 3, alignItems: "center" }}>
        <BranchButton />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ rowGap: 5, mx: 20, py: 5, pt: 0 }}
      >
        <TitleBox content="MERGE" />

        <Box
          width="1"
          display="flex"
          justifyContent="center"
          gap={"16px"}
          flexWrap="wrap"
        >
          <PreviewBox fileobjects={fileobjects} onPreviewChange={()=>{}} onImgFileChange={()=>{}}/>
          <FileMergeBox onFilesChange={handleFilesChange}/>
        </Box>
        <Box>
          {/* <TextBox fileobjects={[]} url={''} imgFile={}/> */}
        </Box>
      </Box>
    </Box>
  );
};