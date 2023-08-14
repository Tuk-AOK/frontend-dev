import { Box, IconButton } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function MemberBox() {
  return(
    <div>
      <Box display="flex" sx={{ width:"930px", alignItems: "center"}}>
      <Box sx={{width:"45px", height:"45px", borderRadius:100, bgcolor:"black"}}>

      </Box>
      <Box sx={{width:"250px",fontSize: "20px", ml: "30px", fontWeight: "bold", textAlign: "left", textOverflow: 'ellipsis'}}>
        MyName
      </Box>
      <Box sx={{display: "flex", alignItems: "center", ml:"auto"}}>
        <IconButton>
          <ExitToAppIcon/>
        </IconButton>
      </Box>
    </Box>
    </div>
  );
}