import { Box, IconButton, Modal, Typography, Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { RootState } from "../../../../stores/store";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BranchEditBox from "../branchEditBox/branchEditBox";
import BranchDeleteBox from "../branchDeleteBox/branchDeleteBox";


interface BranchResponse{
  status: number;
  code: string;
  message: string;
  data: BranchesData;
}


interface BranchesData{
  projectBranchInfos: Branch[]
}

interface Branch{
  branchName: string;
  branchUuid: string; 
  updateAt: string;
}



export default function BranchBox() {
  const [branchData, setBranchData] = useState<Branch[]>([]);

  const [activeEditBranch, setActiveEditBranch] = useState<Branch | null>(null);
  const [activeDeleteBranch, setActiveDeleteBranch] = useState<Branch | null>(null);

  const handleEditOpen = (branch: Branch) => {
    setActiveEditBranch(branch);
  };

  const handleEditClose = () => {
    setActiveEditBranch(null);
  };

  const handleDeleteOpen = (branch: Branch) => {
    setActiveDeleteBranch(branch);
  };

  const handleDeleteClose = () => {
    setActiveDeleteBranch(null);
  };
  
  let projectUuid = useSelector((state: RootState)=>{
    return state.project.uuid;  
  });

  useEffect(() => {
    (async () => {
        await axios.get<BranchResponse>('/api/v1/projects/'+ projectUuid +'/branches?page=0')
        .then((response)=> {
            console.log("브랜치 정보 불러오기 성공");
            console.log("가져온 데이터", response.data.data.projectBranchInfos);
            setBranchData(response.data.data.projectBranchInfos);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    })();
  }, [projectUuid]); 

  return(
    <Box display="block">
      {branchData.map(branch => {
        return(
          <Box display="flex" sx={{mb:"10px", width:"930px", alignItems: "center"}}>
            <Box sx={{width:"250px",fontSize: "20px", fontWeight: "bold", textAlign: "left", textOverflow: 'ellipsis'}}>
              {branch.branchName}
            </Box>
            <Box sx={{fontSize: "16px", fontWeight: "regular", textAlign:"center"}}>
              {branch.updateAt}
            </Box>
            <Box sx={{display: "flex", alignItems: "center", ml:"auto"}}>
              <IconButton
                onClick={() => handleEditOpen(branch)}
              >
                <EditIcon/>
              </IconButton>

              <IconButton
                onClick={() => handleDeleteOpen(branch)}
              >
                <DeleteIcon/>
              </IconButton>
            </Box>
          </Box>
        );
        })}
      <BranchEditBox branch={activeEditBranch} onClose={handleEditClose} />
      <BranchDeleteBox branch={activeDeleteBranch} onClose={handleDeleteClose}/>
    </Box>
  );
}