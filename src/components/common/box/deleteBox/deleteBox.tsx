import { Box, Button, Modal, Typography, Input } from "@mui/material";
import { useState, useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 220,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};


export default function DeleteBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ariaLabel = { 'aria-label': 'description' };

  const [branchName, setBranchName] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  return(
    <Box display="flex" sx={{ width:"930px", alignItems: "center"}}>
      <Box sx={{width:"250px",fontSize: "22px", fontWeight: "bold", textAlign: "left", textOverflow: 'ellipsis', color: "#FF3A3A"}}>
        Delete Project
      </Box>
      <Box sx={{display: "flex", alignItems: "center", ml:"auto"}}>
        <Button sx={{width: "150px", height: "50px", color: "white", bgcolor: "#FF3A3A"}}
          onClick={() => handleModalOpen()}
        >
          delete
        </Button>
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box sx = {{
            display: "flex",
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center',
            }}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Delete Project
              </Typography>
              <Box sx={{mt: "5px",fontSize: "16px", fontWeight: "regular", textAlign:"center"}}>
                삭제할 프로젝트 이름을 입력해 주세요.
              </Box>
              
              <Input 
                placeholder="프로젝트 이름" 
                inputProps={ariaLabel}
                value={branchName}
                onChange={(event)=>(setBranchName(event.target.value))}
                sx={{width:'300px', marginBottom: '30px', marginTop: '50px'}}
              />
              

              <Button sx={{bgcolor: "#FF3A3A", color: "white", width: "125px"}} startIcon={<CheckIcon />}>
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}