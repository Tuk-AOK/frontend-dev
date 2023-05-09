import { Box, Pagination } from "@mui/material";
import React from "react";
import GlobalButton from "../../common/globalButton";
import ProjectBox from "../../common/projectBox";
import { ProjectData } from "../../common/projectBox/types";

export default function Main() {
  const [projectData, setProjectData] = React.useState<Array<ProjectData>>([]);

  const getProjectData = async () => {
    console.log(123)
    const response = await fetch(
      `/api/v1/users/5452b295-fcb6-4ede-b06a-745282453e01/projects`,
      {
        method:"GET",
      }
    ).then((res) => res.json());

    console.log(response);
    setProjectData(response?.data?.projects ?? []); //res가 undifined면 빈 배열 줌
  };

  React.useEffect(() => {
    //fetch logic
    getProjectData();

    /*
    setProjectData([
      { projectName: "test1", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test2", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test3", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test4", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test5", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test1", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test2", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test3", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test4", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
      { projectName: "test5", imageUrl: "/test.jpeg", createTime: "2023-05-09 23:00:00" },
    ]);
    */
  }, []);

  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Box
        sx={{
          textAlign: "center",
          pt: 3,
          fontWeight: "bold",
          letterSpacing: "3px",
        }}
      >
        PROJECTS
      </Box>
      <Box sx={{ px: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{ maxWidth: 1000, width: 1, height: 32, position: "relative" }}
          >
            <Box sx={{ position: "absolute", right: 12 }}>
              <GlobalButton>create</GlobalButton>
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
            {projectData.map((v) => {
              return <ProjectBox {...v} />;
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
