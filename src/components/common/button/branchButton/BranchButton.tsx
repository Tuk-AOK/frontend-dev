import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Box, Modal, Typography, Input} from "@mui/material"; 
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from '@mui/icons-material/Check';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBranchUuid } from "../../../../hooks/branchSlice";
import { RootState } from "../../../../stores/store";


interface BranchResponse{
  status: number;
  code: string;
  message: string;
  data: BranchesData;
}


interface BranchesData{
  projectBranchInfos: Branch[]
}

interface Branch{
  branchName: string;
  branchUuid: string; 
}

interface currentBranchResponse{
  status: number;
  code: string;
  message: string;
  data: branchInfo; 
}

interface branchInfo{
  branchId: number;
  branchName: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 200,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};

const options = ["main", 
"branch 1", 
"branch 2", 
"+ create new branch"];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [branchName, setBranchName] = React.useState('');
  const [projectId, setProjectId]= React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () =>{
    setIsModalOpen(false);
  }

  const ariaLabel = { 'aria-label': 'description' };


  let projectUuid = useSelector((state: RootState)=>{
    return state.project.uuid;  
  });

  let branchUuid = useSelector((state: RootState) => {
    return state.branch.uuid;
  });

  const [branchData, setBranchData] = useState<Branch[]>([]);
  const [currentBranch, setCurrentBranch] = useState('');

  useEffect(() => {
    (async () => {
        await axios.get<BranchResponse>('/api/v1/projects/'+ projectUuid +'/branches?page=0')
        .then((response)=> {
            console.log("브랜치 정보 불러오기 성공");
            console.log("가져온 데이터", response.data.data.projectBranchInfos);
            setBranchData(response.data.data.projectBranchInfos);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    })();
  }, [projectUuid]); 

  useEffect(() => {
    (async () => {
        await axios.get('/api/v1/branches/' + branchUuid)
        .then((response)=> {
            console.log(" store 브랜치 정보 불러오기 성공");
            console.log("가져온 store 데이터", response.data.data.branchName);
            setCurrentBranch(response.data.data.branchName);
        })
        .catch((error)=>{
            
            console.log(error);
        })
    })();
  }, []); 
  

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };


  const createBranch = () => {
    if(branchName === ""){
      alert("생성할 브랜치의 이름을 입력해주세요.")
    }
    else {
      axios.post('/api/v1/branches', {
        name: branchName,
        projectId: "1",
      })
      .then((response) => {
        console.log("브랜치 생성 완료");
        console.log(response);
        console.log(response.data.data.branchUuid)
        dispatch(setBranchUuid(response.data.data.branchUuid));
        window.location.replace("/project");
      })
    }
  }
  return (
    <React.Fragment>
      <ButtonGroup variant="text" ref={anchorRef}>
        <Button
          //size="small"
          defaultValue={"main"}
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ textTransform: "None", fontWeight: "bold", boxShadow: 1 }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {currentBranch}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {/* {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))} */}

                  {branchData.map((branch, index) => {
                    const clickEvent = (event:any) => {
                      handleMenuItemClick(event, index);
                      dispatch(setBranchUuid(branch.branchUuid));
                      console.log("클릭된 로그 :", branch.branchUuid);
                      window.location.replace('/Project');
                    }
                    return(
                      <MenuItem
                        key={branch.branchName}
                        selected={index === selectedIndex}
                        onClick={clickEvent}
                      >
                        {branch.branchName}
                      </MenuItem>
                    );
                  })}
                  <MenuItem onClick={() => handleModalOpen()}
                  >
                    + create new branch
                  </MenuItem>
                  <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box sx = {{
                  display: "flex",
                  flexDirection: 'column',
                  justifyItems: 'center',
                  alignItems: 'center',
                  }}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                      New Branch
                    </Typography>
                    
                    <Input 
                      placeholder="name" 
                      inputProps={ariaLabel}
                      value={branchName}
                      onChange={(event)=>(setBranchName(event.target.value))}
                      sx={{width:'300px', marginBottom: '30px', marginTop: '50px'}}
                    />
                    

                    <Button variant="outlined" startIcon={<CheckIcon />} onClick={createBranch}>
                      Create
                    </Button>
                  </Box>
                </Box>
              </Modal>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

    </React.Fragment>
  );
}
