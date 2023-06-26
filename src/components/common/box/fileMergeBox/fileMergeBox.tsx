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
  const [currentMainFile, setCurrentMainFile] = useState<File | null>(null);
  const fileId = useRef<number>(0)
  const [mergeObjects, setMergeObjects] = useState<resourcesData[]>([]);
  const fetchedFiles = useRef<File[]>([]);
  const [fileobjects, setFileObjects] = useState<FileObjectType[]>([]);

  let uuid = useSelector((state:RootState) => {
    return state.branch.uuid
  })

  useEffect(() => {
    const fetchMergeData = async () => {
      try {
        const response = await axios.get<mergeResponse>('/api/v1/branches/'+ uuid +'/merge');
        console.log("merge data 불러오기 성공");
        console.log("merge data: ", response.data.data.mergeResourceInfos);
        setMergeObjects(response.data.data.mergeResourceInfos);
        console.log("저장된 mergeData : " , mergeObjects)
      } catch (error) {
        console.log("log history 불러오기 실패");
        console.log(error);
      }
    };
  
    fetchMergeData();
  }, [uuid]);


  const handleMainFileUpdate = (file: File | null) => {
    // mainfile 상태 업데이트 처리
    //console.log("Main file(fileMergeBox.tsx): ", file);
    setCurrentMainFile(file);
    console.log("저장된 Main file(fileMergeBox)", currentMainFile);
  };

  

  var reversed_index;

  const fileList: IFileList = {
    imageFiles: fileobjects
  }

  //파일 오브젝트 추출
  const files: File[] = fileList.imageFiles.map((file) => file.object)

  
  //handleFilterFile => id 일치 여부를 확인해 필터링
  

  // const handleFilterFile = useCallback(
  //   (id: number): void => {
  //     //매개 변수로 받은 id와 일치 여부를 확인해 필터링 함
  //     //setFiles(fileobjects.filter((file: IFileTypes) => file.id !== id));
  //     setFileObjects(fileobjects.filter((file) => file.id !== id));
  //     onFilesChange(fileobjects.filter((file)=>file.id !== id));
  //   },
  //   [fileobjects, onFilesChange]
  // );



  console.log("업로드 파일 목록", fileobjects)
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };  



  
  // fetchedFiles 배열에 저장된 파일 데이터 사용 가능
  console.log("fetch된 파일 데이터:", fetchedFiles);

  useEffect(() => {
    const updatedFileObjects = [...fileobjects]; // fileObjects 배열을 복사하여 업데이트에 사용
    console.log("선언 직후의 updatedFileObjects(fileMergeBox.tsx) : ", updatedFileObjects);
    let fileid = 0;
    
    console.log("currentMainFile 값 : ", currentMainFile)
    

    mergeObjects.map(async (resources: any, index) => {
      try {
        const response = await fetch(resources.fileLink);
        const blobData = await response.blob();
        const file = new File([blobData], resources.fileName, { type: "image/png" });
        
        // 현재의 currentMainFile이 기존 파일 객체를 대체해야 하는지 확인
        if (currentMainFile != null) {
          const index = updatedFileObjects.findIndex((resource: FileObjectType) => resource.name === currentMainFile.name);
          if (index !== -1) {
            updatedFileObjects[index] = {
              ...updatedFileObjects[index],
              object: currentMainFile,
              URL: URL.createObjectURL(currentMainFile),
            };
          }
        }

        else{
          await updatedFileObjects.push({
            id: index++,
            object: file,
            URL: URL.createObjectURL(file),
            name: resources.fileName,
          });
        }
        
        
        // 상태를 업데이트
        setFileObjects(updatedFileObjects);
        onFilesChange(updatedFileObjects);
        console.log("main이 적용된 updatedFileObjects: ", updatedFileObjects);
      } catch (error) {
        // 오류 처리
        console.log("mergeObjects 처리 오류 발생");
        console.log(error);
      }
    });
  }, [mergeObjects, currentMainFile]);

  //console.log("카피한 fileObjects(fileMergeBox.tsx) : ", copyFileObjects);



/*------------- 리스트 드래그 앤 드랍 관련 함수 ------------*/
const onDragEnd = (result: any) => {
  if(!result.destination){
    return;
  }

  const { source, destination } = result;
  let lists = [...fileobjects];
  let index;

  console.log(lists)

  if(source.index !== destination.index){
    let selectItem = lists[result.source.index];
    lists.splice(result.source.index, 1);
    lists.splice(destination.index, 0, selectItem);
    setFileObjects(lists);
    onFilesChange(lists);
    console.log(lists)
  }

};


/*------------- 리스트 드래그 앤 드랍 관련 함수 ------------*/





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
                  <FileMergeSelectBox text={resources.fileName} backgroundColor="#FFFFD2" fileLink={resources.fileLink} onMainFileUpdate={handleMainFileUpdate}>
                    {/* <Box onClick={() => handleFilterFile(index)}>
                      <DeleteButton/>
                    </Box> */}
                  </FileMergeSelectBox>
                );
              }

              else if(resources.duplicated === false 
                && resources.new === true){
                  return(
                    <FileMergeSelectBox text={resources.fileName} backgroundColor="#BEFBFF" fileLink={''} onMainFileUpdate={()=>{}}>
                      {/* <Box onClick={() => handleFilterFile(index)}>
                        <DeleteButton/>
                      </Box> */}
                    </FileMergeSelectBox>
                  );
              }

              else{

                return(
                  <Box >
                    <FileBox text={resources.fileName}>
                    {/* <Box onClick={() => handleFilterFile(index)}>
                      <DeleteButton/>
                    </Box> */}
                    </FileBox>
                  </Box>
                );
              }
            })
          }
          
        </Box>
      </Box>
    </Box>
  );
}
