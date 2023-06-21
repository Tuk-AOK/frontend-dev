import { Box, Button, Typography, IconButton, Modal, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};


interface duplicateResponse{
  status: number;
  code: string;
  message: string;
  data: string;
}

export default function FileMergeSelectBox(props: { children: React.ReactNode, text: string, backgroundColor: string, fileLink: string, onMainFileUpdate: (file: File | null) => void}) {
  const { children, text, backgroundColor, fileLink,  } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [duplicateData, setDuplicateData] = React.useState(''); 

  const [mainfile, setMainFile] = React.useState<File | null>(null);


  let projectUuid = useSelector((state: RootState) => {
    return state.project.uuid; 
  })

  React.useEffect(() => {
    (async () => {
      await axios.get<duplicateResponse>('/api/v1/projects/'+ projectUuid +'/main/resources/' + text)
      .then((response)=> {
        console.log("특정 메인 리소스 데이터 불러오기 성공");
        console.log("특정 메인 리소스 데이터 : ", response.data.data);
        setDuplicateData(response.data.data)
        
      })
      .catch((error)=>{
        console.log("특정 메인 리소스 데이터 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [projectUuid]);

  
  console.log("파일 링크 왔냐?(merge)", fileLink);

  const [selectedValue, setSelectedValue] = React.useState("main");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedValue === "main") {
      // 'main'이 선택된 경우 처리할 이벤트
      console.log("main이 선택되었습니다.");
      
      fetch(duplicateData)
      .then((response) => {
        return response.blob()
      }).then((blobData) => {
        const mainfile = new File([blobData], text ,{ type: "image/png" });
        console.log(mainfile);
        setMainFile(mainfile);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      })

    } else if (selectedValue === "branchimg") {
      // 'branchimg'가 선택된 경우 처리할 이벤트
      console.log("current branch가 선택되었습니다.");
      setMainFile(null);
      handleClose();
    }
  };


  // mainfile 상태를 상위 컴포넌트로 전달
  React.useEffect(() => {
    props.onMainFileUpdate(mainfile);
  }, [mainfile, props]);

  return (
    <Box
      display="flex"
      sx={{
        width: "440px",
        height: "40px",
        borderRadius: "3px",
        boxShadow: 1,
        backgroundColor: backgroundColor,
        alignItems: "center",
      }}
    > 
    
      {backgroundColor === "#FFFFD2" && (
        <Box>
          <IconButton onClick={handleOpen} aria-label="error">
            <ErrorIcon/>
          </IconButton>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx = {{
                display: "flex",
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center'
              }}>
              
              <Box sx = {{
                display: "flex",
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
                marginBottom: 1
              }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="main"
                      control={<Radio />}
                      label={
                        <Box sx = {{
                          display: "flex",
                          flexDirection: 'column',
                          justifyItems: 'center',
                          alignItems: 'center'
                        }}>
                          <Typography sx={{marginBottom: 1}} id="modal-modal-title" variant="h6" component="h2">
                            main
                          </Typography>
                          <img style={{maxWidth: '300px', maxHeight: '300px', border: '1px solid #F0F0F0'}} src={duplicateData} alt="Image"/>
                        </Box>
                      }
                      labelPlacement="top"
                    />
                    

                    <FormControlLabel
                      value="branchimg"
                      control={<Radio />}
                      label={
                      <Box sx = {{
                        display: "flex",
                        flexDirection: 'column',
                        justifyItems: 'center',
                        alignItems: 'center'
                      }}>
                        <Typography sx={{marginBottom: 1}} id="modal-modal-title" variant="h6" component="h2">
                          current branch
                        </Typography>
                        <img style={{maxWidth: '300px', maxHeight: '300px', border: '1px solid #F0F0F0'}} src={fileLink} alt="Image"/>
                      </Box>
                      }
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Button variant="outlined" startIcon={<CheckIcon />} onClick={handleConfirm}>
                confirm
              </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}

      <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", paddingLeft: "10px" }}>
        {text}
      </Typography>
      {children}
    </Box>
  );
}