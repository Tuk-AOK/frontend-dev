import { Box, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GlobalButton from "../../common/button/globalButton";
import ProjectBox from "../../common/box/projectBox";
import { ProjectData } from "../../common/box/projectBox/types";
import TitleBox from "../../common/box/titleBox/titleBox";
import { RootState } from "../../../stores/store";
import axios from 'axios';
import Project from "../project/project";
import { setProjectUuid } from "../../../hooks/projectSlice";


interface wholeProjectResponse {
  status: number;
  code: string;
  message: string;
  data: ProjectsData;
}

interface ProjectsData {
  projects: project[]
}

interface project {
  projectName: string;
  projectUuid: string;
  projectIntro: string;
  projectPreview: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
}

export default function Main() {
  const [projects, setProjects] = React.useState<project[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userUuid = useSelector((state: RootState) => {
    return state.user.userUuid;
  });

  useEffect(() => {
    (async () => {
        await axios.get<wholeProjectResponse>('/api/v1/projects?userUuid=' + userUuid)
        .then((response)=> {
          console.log("유저 플젝 불러오기 성공");
          console.log(response.data.data.projects);
          setProjects(response.data.data.projects);
        })
        .catch((error)=>{
          console.log("전체 프로젝트 불러오기 실패");
          console.log(error);
        })
    })();
  }, []);

  // React.useEffect(() => {
  //   //fetch logic
  //   //getProjectData();

    
  //   setProjectData([
  //     { projectName: "test1", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //     { projectName: "test2", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //     { projectName: "test3", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //     { projectName: "test4", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //     { projectName: "test5", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //     { projectName: "test1", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //     { projectName: "test2", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //     { projectName: "test3", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
  //   ]);
  
  // }, []);

  return (
    <Box sx={{ px: 3, py: 3 }}>
      <TitleBox content="PROJECTS"/>
      <Box sx={{ px: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{ maxWidth: 1000, width: 1, height: 32, position: "relative" }}
          >
            <Box sx={{ position: "absolute", right: 12 }}>
              <GlobalButton content="create"/>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              mt: "10px",
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {projects.map(project => {
              const clickEvent = () => {
                dispatch(setProjectUuid(project.projectUuid));
                navigate('/Project')
                console.log("이동할 프로젝트 이름 : ", project.projectName);
                window.location.reload();
              } 
              return(
                <Box onClick={clickEvent}>
                <ProjectBox {...project}/>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          mt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination count={10} color="primary" size="small" />
      </Box>
    </Box>
  );
}
