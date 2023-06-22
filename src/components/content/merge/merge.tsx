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

interface PreviewType{
  url: string;
}

export default function Merge() {
  const [fileobjects, setFileObjects] = useState<FileObjectType[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [imgFile, setImgFile] = useState<Blob | null>(null);

  const handleFilesChange = async (files: FileObjectType[]) => {
    await console.log("merge로 온 파일은 여기! : ", files)
    const updatedFileObjects = [...files].sort((a,b) => a.id - b.id);
    await setFileObjects(updatedFileObjects)
    await setFileObjects(updatedFileObjects)
  }


  const handlePreviewChange = async (previewImg: PreviewType) => {
    await console.log("merge url 여기! : ",previewImg.url);
    await setPreviewImage(previewImg.url);
  };

  const handleImgFileChange = async (file: Blob | null) => {
    await setImgFile(file);
    await console.log("merge 이미지 파일 여기! : ", imgFile);
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
          <PreviewBox fileobjects={fileobjects} currentLogObjects="" onPreviewChange={handlePreviewChange} onImgFileChange={handleImgFileChange}/>
          <FileMergeBox onFilesChange={handleFilesChange}/>
        </Box>
        <Box>
          <TextBox fileobjects={fileobjects} url={previewImage} imgFile={imgFile}/>
        </Box>
      </Box>
    </Box>
  );
};