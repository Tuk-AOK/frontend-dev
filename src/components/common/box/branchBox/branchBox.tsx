import { Box, IconButton, Modal, Typography, Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

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

export default function BranchBox() {
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
      <Box sx={{width:"250px",fontSize: "20px", fontWeight: "bold", textAlign: "left", textOverflow: 'ellipsis'}}>
        branch1
      </Box>
      <Box sx={{fontSize: "16px", fontWeight: "regular", textAlign:"center"}}>
        last update : 2022/08/14 19:00
      </Box>
      <Box sx={{display: "flex", alignItems: "center", ml:"auto"}}>
        <IconButton
          onClick={() => handleModalOpen()}
        >
          <EditIcon/>
        </IconButton>

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
                Edit Branch
              </Typography>
              
              <Input 
                placeholder="name" 
                inputProps={ariaLabel}
                value={branchName}
                onChange={(event)=>(setBranchName(event.target.value))}
                sx={{width:'300px', marginBottom: '30px', marginTop: '50px'}}
              />
              

              <Button variant="outlined" startIcon={<CheckIcon />}>
                Edit
              </Button>
            </Box>
          </Box>
        </Modal>

        <IconButton>
          <DeleteIcon/>
        </IconButton>
      </Box>
    </Box>
  );
}