import React, { useState } from "react";
import { Box, Modal, Typography, Button, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from 'axios';

interface Branch {
  branchName: string;
  branchUuid: string;
}

interface BranchModalProps {
  branch: Branch | null;
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


export default function BranchEditBox({ branch, onClose }: BranchModalProps) {
  const [branchName, setBranchName] = useState("");

  const changeBranchName = () => {
    if(branchName === ""){
      alert("수정할 브랜치 이름을 적어주세요.")
    } else {
      axios.patch('/api/v1/branches/'+ branch?.branchUuid, {
        name: branchName
      })
      .then((response)=>{
        console.log("이름 변경 성공")
        console.log(response.data)
        window.location.reload();
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  if (!branch) {
    return null;
  }

  return(
    <Modal
      open={!!branch}
      onClose={onClose}
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
            Edit Branch
          </Typography>

          <Input
            placeholder={branch.branchName}
            value={branchName}
            onChange={(event) => setBranchName(event.target.value)}
            sx={{
              width: "300px",
              marginBottom: "30px",
              marginTop: "50px",
            }}
          />

          <Button variant="outlined" startIcon={<CheckIcon />} onClick={changeBranchName}>
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}