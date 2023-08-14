import { Box, Button } from "@mui/material";

export default function DeleteBox() {
  return(
    <Box display="flex" sx={{ width:"930px", alignItems: "center"}}>
      <Box sx={{width:"250px",fontSize: "22px", fontWeight: "bold", textAlign: "left", textOverflow: 'ellipsis', color: "#FF3A3A"}}>
        Delete Project
      </Box>
      <Box sx={{display: "flex", alignItems: "center", ml:"auto"}}>
        <Button sx={{width: "150px", height: "50px", color: "white", bgcolor: "#FF3A3A"}}>
          delete
        </Button>
      </Box>
    </Box>
  );
}