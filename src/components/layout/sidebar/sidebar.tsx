import { Box, Fade } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUuid } from "../../../hooks/userSlice";
import { setProjectUuid } from "../../../hooks/projectSlice";
import { RootState } from "../../../stores/store";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArticleIcon from "@mui/icons-material/Article";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import axios from 'axios';

interface userResponse{
  status: string;
  code: string;
  message: string;
  data: userInfo;
}

interface userInfo{
  userEmail: string;
  userNickname: string;
  userPhoto: string;
  userUuid: string;
  userId: number;
}

interface userUuid{
  uuid: string; 
}

interface ProjectResponse{
  status: number;
  code: string;
  message: string;
  data: ProjectsData;
}

interface Project{
  projectName: string;
  projectUuid: string;
  projectIntro: string;
  projectPreview: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
}

interface ProjectsData{
  projects: Project[] 
}



export default function Example() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [Uuid, setUuidState] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainNavigate = () => navigate("/main")

  let uuid = useSelector((state:RootState) => {
    return state.user.userUuid
  })

  console.log("uuid check : ", uuid)

  useEffect(()=>{
      (async () => {
          await axios.get<userResponse>('/api/v1/users/'+ uuid)
          .then((response)=>
              {setNickname(response.data.data.userNickname)
              console.log("닉네임 불러오기 성공")
              setEmail(response.data.data.userEmail)
              console.log("이메일 불러오기 성공")
              setProfileImg(response.data.data.userPhoto)
              console.log(response.data.data.userPhoto)
              }) 
          .catch((error)=>{
              console.log("닉네임, 이메일 데이터 불러오기 실패")
              console.log(error)
          })
      })();
  },[uuid]);

  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    (async () => {
      await axios.get<ProjectResponse>('/api/v1/projects?userUuid='+ uuid +'&page=0')
      .then((response)=> {
        //console.log("프로젝트 정보 불러오기 성공");
        console.log("가져온 project 데이터", response.data.data.projects);
        setProjects(response.data.data.projects);
        //console.log("저장상태", projects);
      })
      .catch((error)=>{
        console.log("프로젝트 정보 불러오기 실패");
        console.log(error);
      })
    })();
    
  }, [uuid]);

  return (
    <Box sx={{ boxShadow: 1, textOverflow: 'ellipsis', backgroundColor: "#FBFBFB"}}>
      <Sidebar backgroundColor="#FBFBFB">
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
          ></MenuItem>
          
          {!collapsed && (
            <Fade in={!collapsed} timeout={1200}>
              <Box
                sx={{
                  height: 170,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: profileImg,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    width: 85,
                    height: 85,
                    borderRadius: 85,
                    bgcolor: "#000000",
                  }}
                ></Box>
                <Box
                  sx={{
                    color: "black",
                    mt: 2,
                  }}
                >
                  {nickname}
                </Box>
                <Box
                  sx={{
                    color: "gray",
                    mt: 1,
                    fontSize: 12,
                  }}
                >
                  {email}
                </Box>
              </Box>
            </Fade>
          )}
          <MenuItem icon={<HomeOutlinedIcon />} onClick={mainNavigate}>Home</MenuItem>
          <SubMenu icon={<FolderSharedIcon />} label="Projects">
            {projects.map(project => {
              const clickEvent = () => {
                dispatch(setProjectUuid(project.projectUuid));
                navigate('/Project')
                console.log("이동할 프로젝트 이름 : ", project.projectName);
              }
              return(
                <MenuItem icon={<ArticleIcon />} onClick={clickEvent}>{project.projectName}</MenuItem>
              );
            })}

            <MenuItem icon={<AddCircleOutlineIcon />}>create new project</MenuItem>
          </SubMenu>
          <MenuItem icon={<PersonOutlineIcon />}>My Page</MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
}
