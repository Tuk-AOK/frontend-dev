import { Box } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useCallback, useRef, useState, useEffect} from "react";
import UploadButton from "../../button/uploadButton/uploadButton";
import RefreshButton from "../../button/refreshButton/refreshButton";
import FileBox from "../fileBox/fileBox";
import DeleteButton from "../../button/deleteButton/deleteButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Upload } from "../../../content/upload/upload";


type NewType = {
  id: number; //파일들의 고유값 id
  object: File;
  URL: string;
  name: string;
};

type IFileTypes = NewType

type IFileList = {
  imageFiles: IFileTypes[];
}

interface UploadButtonProps {
  onUpload: (files : FileList | null) => void;
}


export default function FileUploadBox() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileobjects, setFiles] = useState<IFileTypes[]>([]);
  const dragRef = useRef<HTMLLabelElement | null>(null);
  const selectFile = useRef(null);
  const fileId = useRef<number>(0)

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

      setFiles(tempFiles);
    },
    [fileobjects]
  );

  //handleFilterFile => id 일치 여부를 확인해 필터링
  

  const handleFilterFile = useCallback(
    (id: number): void => {
      //매개 변수로 받은 id와 일치 여부를 확인해 필터링 함
      setFiles(fileobjects.filter((file: IFileTypes) => file.id !== id));
    },
    [fileobjects]
  );
  
  const handleDeleteFile = useCallback(
    (id: number): void => {
      setFiles(fileobjects.filter((file: IFileTypes) => file.id === id));
    },
    [fileobjects]
  );
  
  /*------------- 이미지 업로드 드래그 앤 드랍 관련 함수 ------------*/
  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  /*------------- 이미지 업로드 드래그 앤 드랍 관련 함수 ------------*/

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
        setFiles(lists);
        console.log(lists)
      }

    };

  

  /*------------- 리스트 드래그 앤 드랍 관련 함수 ------------*/
  console.log("업로드 파일 목록", fileobjects)
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };



  return (
    <Box width="100%" maxWidth="500px" minWidth="300px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="56px"></Box>
        <Box>upload files</Box>
        <Box display="flex">
          
          <form style={{display: "flex", width: "30px", height: "30px"}} onSubmit={handleSubmit}>
            <label style={{width: "30px", height: "30px", position:"relative", display:"inline-block", border:"1px solid black"}} htmlFor="fileUploadbtn" ref={selectFile}>
              <input
                type="file"
                id="fileUploadbtn"
                style={{display: "none", position: "absolute",top: 0, left:0, width: "100%", height:"100%",zIndex:-1  }}
                multiple={true}
                onChange={onChangeFiles}
                ref={selectFile}
              />
              <UploadButton/>
            </label>
          </form>

          <RefreshButton />
        </Box>
      </Box>
      
      <label
        className={isDragging? "DragDrop-File-Dragging" : "DragDrop-Files"}
        htmlFor = "fileUpload"
        ref={dragRef}
      >

      <DragDropContext onDragEnd = {onDragEnd}>
        <Droppable droppableId="DragDrop-files">
          {(provided) => (
            <Box
              sx={{
                height: "400px",
                borderRadius: "3px",
                boxShadow: 1,
                backgroundColor: "#F0F0F0",
                overflow: "auto",
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
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
                {fileobjects.length > 0 &&
                  fileobjects.map((file: IFileTypes, index:number) => {
                    const {
                      id,
                      object: {name},
                      URL
                    } = file;

                    return(
                      <Draggable draggableId={name} index={index} key={id}>
                        {(provided)=>(
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps} 
                          >
                            <FileBox>
                              {name}
                            <Box onClick={() => handleFilterFile(id)}>
                            <DeleteButton/>
                            </Box>
                            </FileBox>
                          </Box>
                        )}
                      </Draggable>
                    );
                  })
                }
                
              </Box>
            </Box>
          )} 
          
        </Droppable> 
        </DragDropContext>
      </label>
    </Box>
  );
}
