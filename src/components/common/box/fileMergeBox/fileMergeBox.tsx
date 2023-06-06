import { Box } from "@mui/material";
import React from "react";
import { ChangeEvent, createContext, useContext, useCallback, useRef, useState, useEffect} from "react";
import UploadButton from "../../button/uploadButton/uploadButton";
import RefreshButton from "../../button/refreshButton/refreshButton";
import FileBox from "../fileBox/fileBox";
import FileMergeSelectBox from "../fileMergeSelectBox/fileMergeSelectBox"
import DeleteButton from "../../button/deleteButton/deleteButton";
import { Upload } from "../../../content/upload/upload";
import { RootState } from "../../../../stores/store";
import { useSelector } from "react-redux";
import axios from "axios";


type NewType = {
  id: number; //파일들의 고유값 id
  object: File;
  URL: string;
  name: string;
};

type IFileTypes = NewType; 

type IFileList = {
  imageFiles: IFileTypes[];
}

interface mergeResponse{
  status: number;
  code: string;
  message: string;
  data: mergeInfos;
}

interface mergeInfos{
  mergeResourceInfos: resourcesData[];
}

interface resourcesData{
  resources: resource[];
}

interface resource {
  fileName: string;
  fileLink: string;
  new: boolean;
  duplicated: boolean;
}

interface FileObjectType {
  id: number;
  object: File;
  URL: string;
  name: string;
};

interface FileUploadBoxProps {
  onFilesChange: (files: FileObjectType[]) => void;
};





interface UploadButtonProps {
  onUpload: (files : FileList | null) => void;
}


export default function FileMergeBox({ onFilesChange } : FileUploadBoxProps) {
  const [fileobjects, setFileObjects] = useState<FileObjectType[]>([]);
  const fileId = useRef<number>(0)
  const [mergeObjects, setMergeObjects] = useState<resourcesData[]>([]);

  let uuid = useSelector((state:RootState) => {
    return state.branch.uuid
  })
  

  var reversed_index;

  const fileList: IFileList = {
    imageFiles: fileobjects
  }

  //파일 오브젝트 추출
  const files: File[] = fileList.imageFiles.map((file) => file.object)

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = fileobjects;
      //temp 변수를 통해 선택한 파일을 담음
      if (e.type === "drop") {
        //드래그 앤 드롭 했을 때
        selectFiles = e.dataTransfer.files;
      } else {
        //파일 첨부 버튼을 눌러 이미지를 선택했을 때 
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        //스프레드 연산자를 통해 기존에 있던 파일들을 복사, 선택한 파일 append

        if (!/\.(png)$/i.test(file.name)){
          return alert('png 파일만 첨부할 수 있습니다.')
        }
        
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++, //fileId의 값을 1씩 늘려주며 각 파일의 고유값으로 사용
            object: file, //object 안에 선택했던 파일들의 정보 담김
            URL: URL.createObjectURL(file), 
            name: file.name
          }
        ];

      }

      setFileObjects(tempFiles);
      onFilesChange(tempFiles);
    },
    [fileobjects, onFilesChange]
  );

  
  //handleFilterFile => id 일치 여부를 확인해 필터링
  

  const handleFilterFile = useCallback(
    (id: number): void => {
      //매개 변수로 받은 id와 일치 여부를 확인해 필터링 함
      //setFiles(fileobjects.filter((file: IFileTypes) => file.id !== id));
      setFileObjects(fileobjects.filter((file) => file.id !== id));
      onFilesChange(fileobjects.filter((file)=>file.id !== id));
    },
    [fileobjects, onFilesChange]
  );
  
  const handleDeleteFile = useCallback(
    (id: number): void => {
      //setFiles(fileobjects.filter((file: IFileTypes) => file.id === id));
      setFileObjects(fileobjects.filter((file) => file.id !== id));
      onFilesChange(fileobjects.filter((file)=>file.id !== id));
    },
    [fileobjects, onFilesChange]
  );



  console.log("업로드 파일 목록", fileobjects)
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    (async () => {
      await axios.get<mergeResponse>('/api/v1/branches/'+ uuid +'/merge')
      .then((response)=> {
        console.log("merge data 불러오기 성공");
        console.log("merge data : ", response.data.data.mergeResourceInfos);
        setMergeObjects(response.data.data.mergeResourceInfos);
        console.log("test",mergeObjects);
      })
      .catch((error)=>{
        console.log("log history 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [uuid]);


  return (
    <Box width="100%" maxWidth="500px" minWidth="300px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="56px"></Box>
        <Box>uploaded files</Box>
        <Box display="flex">
        
          <RefreshButton />
        </Box>
      </Box>
      
      

      <Box
        sx={{
          height: "400px",
          borderRadius: "3px",
          boxShadow: 1,
          backgroundColor: "#F0F0F0",
          overflow: "auto",
        }}
        >
        <Box
          display="flex"
          className="DragDrop-Files"
          flexWrap="wrap"
          sx={{
            py: 6,
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {mergeObjects.length > 0 &&
            mergeObjects.map((resources: any, index) => {
              if(resources.duplicated === true){
                return(
                  <FileMergeSelectBox text={resources.fileName} backgroundColor="#FFFFD2" fileLink={resources.fileLink}>
                    <Box onClick={() => handleFilterFile(index)}>
                      <DeleteButton/>
                    </Box>
                  </FileMergeSelectBox>
                );
              }

              else if(resources.duplicated === false 
                && resources.new === true){
                  return(
                    <FileMergeSelectBox text={resources.fileName} backgroundColor="#BEFBFF" fileLink={''}>
                      <Box onClick={() => handleFilterFile(index)}>
                        <DeleteButton/>
                      </Box>
                    </FileMergeSelectBox>
                  );
              }
              return(
                <Box >
                  <FileBox text={resources.fileName}>
                  <Box onClick={() => handleFilterFile(index)}>
                    <DeleteButton/>
                  </Box>
                  </FileBox>
                </Box>
              );
            })
          }
          
        </Box>
      </Box>
    </Box>
  );
}
