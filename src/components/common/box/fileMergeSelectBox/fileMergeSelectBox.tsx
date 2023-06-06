import { Box, Button, Typography, IconButton, Modal, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";

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


export default function FileMergeSelectBox(props: { children: React.ReactNode, text: string, backgroundColor: string, fileLink: string }) {
  const { children, text, backgroundColor, fileLink } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  console.log("파일 링크 왔냐?", fileLink);
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
                    defaultValue="main"
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
                          <img style={{maxWidth: '300px', maxHeight: '300px', border: '1px solid #F0F0F0'}} src={fileLink} alt="Image"/>
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
              <Button variant="outlined" startIcon={<CheckIcon />} onClick={handleClose}>
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