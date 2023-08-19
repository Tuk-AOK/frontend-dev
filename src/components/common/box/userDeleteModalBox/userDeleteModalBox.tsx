import { useState } from "react";
import { Box, Modal, Typography, Button, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { RootState } from "../../../../stores/store";
import { useSelector } from "react-redux";

interface User{
  userUuid: string;
  userEmail: string; 
  userId: string;
  userNickname: string;
  userPhoto: string;
}

interface ModalProps {
  user: User | null;
  onClose: () => void;
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

export default function UserDeleteModalBox({user, onClose}: ModalProps){
  let projectUuid = useSelector((state: RootState)=>{
    return state.project.uuid;  
  });

  let currentUserUuid = useSelector((state: RootState)=>{
    return state.user.userUuid
  });

  if(!user){
    return null;
  }

  const deleteUser = () => {
    axios.delete("/api/v1/projects/" + projectUuid + "/deleter/" + currentUserUuid + "/target/" + user.userUuid)
    .then((response)=>{
      console.log("유저 삭제 성공"); 
      window.location.reload();    
    })
    .catch((error)=>{
      console.log(error);
      alert("허용되지 않은 접근입니다.");
    })
  }
  
  return( 
    <Modal
      open={!!user}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Delete User
          </Typography>

          <Box sx={{my: "5px",fontSize: "16px", fontWeight: "regular", textAlign:"center"}}>
            다음 유저를 프로젝트에서 삭제합니다.
          </Box>
          <Box sx={{mt: "20px",fontSize: "20px", fontWeight: "bold", textAlign:"center"}}>
            {user.userNickname}
          </Box>

          <Box
            sx={{
              display:"flex",
              justifyContent: "space-between",
              width: "250px", 
              mt: "35px",
            }}
          >
            <Button variant="outlined" startIcon={<CheckIcon />} color="error" onClick={deleteUser}>
              delete
            </Button>
            <Button variant="outlined" startIcon={<ClearIcon />} onClick={onClose}>
              cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}