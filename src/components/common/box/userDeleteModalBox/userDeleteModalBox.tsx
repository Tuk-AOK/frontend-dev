import { useState } from "react";
import { Box, Modal, Typography, Button, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

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
  
  if(!user){
    return null;
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
            <Button variant="outlined" startIcon={<CheckIcon />} color="error">
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