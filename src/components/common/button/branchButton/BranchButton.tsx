import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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


const options = ["main", 
"branch 1", 
"branch 2", 
"+ create new branch"];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, []); 

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

  return (
    <React.Fragment>
      <ButtonGroup variant="text" ref={anchorRef}>
        <Button
          //size="small"
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
                  <MenuItem
                  >
                    + create new branch
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {/* <Box
        sx={{
          fontSize: "13px",
          px: 2,
          display: "flex",
          alignItems: "center",
          color: "#ACAACD",
          fontWeight: "bold",
        }}
      >
        3 branches
      </Box> */}
    </React.Fragment>
  );
}
