import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function BranchBox() {
  return(
    <Box display="flex" sx={{ width:"930px", alignItems: "center"}}>
      <Box sx={{width:"250px",fontSize: "20px", fontWeight: "bold", textAlign: "left", textOverflow: 'ellipsis'}}>
        branch1
      </Box>
      <Box sx={{fontSize: "16px", fontWeight: "regular", textAlign:"center"}}>
        last update : 2022/08/14 19:00
      </Box>
      <Box sx={{display: "flex", alignItems: "center", ml:"auto"}}>
        <IconButton>
          <EditIcon/>
        </IconButton>

        <IconButton>
          <DeleteIcon/>
        </IconButton>
      </Box>
    </Box>
  );
}