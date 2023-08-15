import React, { useState } from "react";
import { Box, Modal, Typography, Button, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

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
  height: 220,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};


export default function BranchEditBox({ branch, onClose }: BranchModalProps) {
  const [branchName, setBranchName] = useState("");

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

          <Button variant="outlined" startIcon={<CheckIcon />}>
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}