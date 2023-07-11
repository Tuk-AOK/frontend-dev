import { Box, Fade, Modal, Typography, Button, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUuid } from '../../../hooks/userSlice';
import { setBranchUuid } from '../../../hooks/branchSlice';
import { setProjectUuid } from '../../../hooks/projectSlice';
import { setMainBranchId } from '../../../hooks/branchSlice';
import { setMainBranchUuid } from '../../../hooks/branchSlice';
import { RootState } from '../../../stores/store';
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from 'react-pro-sidebar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';

import axios from 'axios';

interface userResponse {
  status: string;
  code: string;
  message: string;
  data: userInfo;
}

interface userInfo {
  userEmail: string;
  userNickname: string;
  userPhoto: string;
  userUuid: string;
  userId: number;
}

interface userUuid {
  uuid: string;
}

interface ProjectResponse {
  status: number;
  code: string;
  message: string;
  data: ProjectsData;
}

interface Project {
  projectId: number;
  projectName: string;
  projectUuid: string;
  projectIntro: string;
  projectPreview: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
}

interface ProjectsData {
  projects: Project[];
}

interface Branch {
  branchName: string;
  branchUuid: string;
  branchId: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 265,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};

export default function Example() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const [projectName, setProjectName] = useState('');
  const [projectIntro, setProjectIntro] = useState('');

  const [userId, setUserId] = useState('');

  const [branchData, setBranchData] = useState<Branch[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainNavigate = () => navigate('/main');
  const SignInNavigate = () => {
    window.location.replace('/');
  };
  const projectNavigate = () => navigate('/project');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const ariaLabel = { 'aria-label': 'description' };

  let uuid = useSelector((state: RootState) => {
    return state.user.userUuid;
  });

  let projUuid = useSelector((state: RootState) => {
    return state.project.uuid;
  });

  let branUuid = useSelector((state: RootState) => {
    return state.branch.uuid;
  });

  let mainUuid = useSelector((state: RootState) => {
    return state.branch.mainBranchUuid;
  });

  let mainId = useSelector((state: RootState) => {
    return state.branch.mainBranchId;
  });

  console.log('uuid check : ', uuid);

  useEffect(() => {
    (async () => {
      await axios
        .get<userResponse>('/api/v1/users/' + uuid)
        .then((response) => {
          setNickname(response.data.data.userNickname);
          console.log('닉네임 불러오기 성공');
          setEmail(response.data.data.userEmail);
          console.log('이메일 불러오기 성공');
          setProfileImg(response.data.data.userPhoto);
          console.log(response.data.data.userPhoto);

          const idValue = response.data.data.userId;
          const stringUserId = idValue.toString();
          setUserId(stringUserId);
        })
        .catch((error) => {
          console.log('닉네임, 이메일 데이터 불러오기 실패');
          console.log(error);
        });
    })();
  }, [uuid]);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      await axios
        .get<ProjectResponse>('/api/v1/projects?userUuid=' + uuid + '&page=0')
        .then((response) => {
          //console.log("프로젝트 정보 불러오기 성공");
          console.log('가져온 project 데이터', response.data.data.projects);
          setProjects(response.data.data.projects);
          //console.log("저장상태", projects);
        })
        .catch((error) => {
          console.log('프로젝트 정보 불러오기 실패');
          console.log(error);
        });
    })();
  }, [uuid]);

  const createProject = () => {
    if (projectName === '' && projectIntro !== '') {
      alert('생성할 프로젝트의 이름을 입력해주세요.');
    } else if (projectIntro === '' && projectName !== '') {
      alert('프로젝트의 인트로 내용을 입력해주세요.');
    } else if (projectName === '' && projectIntro === '') {
      alert('내용을 입력해 주세요.');
    } else {
      axios
        .post('/api/v1/projects', {
          projectName: projectName,
          projectUserId: userId,
          projectIntro: projectIntro,
        })
        .then((response) => {
          console.log('프로젝트 생성 완료');
          console.log(response);
          console.log(response.data.data.projectUuid);
          dispatch(setProjectUuid(response.data.data.projectUuid));

          axios
            .get('/api/v1/projects/' + projUuid + '/branches?page=0')
            .then((response) => {
              console.log('브랜치 정보 불러오기 성공');
              console.log(
                '가져온 데이터(sidebar.tsx)',
                response.data.data.projectBranchInfos
              );
              setBranchData(response.data.data.projectBranchInfos);

              branchData.map((branchData) => {
                if (branchData.branchName === 'main') {
                  dispatch(setMainBranchId(branchData.branchId.toString()));
                  console.log('mainbranchId: ', mainId);
                  dispatch(setMainBranchUuid(branchData.branchUuid));
                  console.log('mainbranchUuid : ', mainUuid);
                  dispatch(setBranchUuid(branchData.branchUuid));
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });

          window.location.replace('/project');
        })
        .catch((error) => {
          console.log('프로젝트 생성 실패');
          console.log(error);
        });
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        textOverflow: 'ellipsis',
        backgroundColor: '#FBFBFB',
      }}
    >
      <Sidebar backgroundColor='#FBFBFB'>
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: profileImg,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 85,
                    height: 85,
                    borderRadius: 85,
                    bgcolor: '#000000',
                    overflow: 'hidden',
                  }}
                >
                  <img width='100%' height='100%' src={profileImg} alt='test' />
                </Box>
                <Box
                  sx={{
                    color: 'black',
                    mt: 2,
                  }}
                >
                  {nickname}
                </Box>
                <Box
                  sx={{
                    color: 'gray',
                    mt: 1,
                    fontSize: 12,
                  }}
                >
                  {email}
                </Box>
              </Box>
            </Fade>
          )}
          <MenuItem icon={<HomeOutlinedIcon />} onClick={mainNavigate}>
            Home
          </MenuItem>
          <SubMenu icon={<FolderSharedIcon />} label='Projects'>
            {projects.map((project) => {
              const clickEvent = () => {
                dispatch(setProjectUuid(project.projectUuid));
                console.log('현재 저장된 프로젝트 UUID : ', projUuid);

                axios
                  .get('/api/v1/projects/' + projUuid + '/branches?page=0')
                  .then((response) => {
                    console.log('브랜치 정보 불러오기 성공');
                    console.log(
                      '가져온 데이터(sidebar.tsx)',
                      response.data.data.projectBranchInfos
                    );
                    setBranchData(response.data.data.projectBranchInfos);

                    branchData.map((branchData) => {
                      if (branchData.branchName === 'main') {
                        dispatch(
                          setMainBranchId(branchData.branchId.toString())
                        );
                        console.log('mainbranchId: ', mainId);
                        dispatch(setMainBranchUuid(branchData.branchUuid));
                        console.log('mainbranchUuid : ', mainUuid);
                        dispatch(setBranchUuid(mainUuid));
                        console.log('설정한 branchUuid : ', branUuid);
                      }
                    });
                  });

                projectNavigate();
                console.log('이동할 프로젝트 이름 : ', project.projectName);
              };
              return (
                <MenuItem icon={<ArticleIcon />} onClick={clickEvent}>
                  {project.projectName}
                </MenuItem>
              );
            })}

            <Box>
              <MenuItem
                icon={<AddCircleOutlineIcon />}
                onClick={() => handleModalOpen()}
              >
                create new project
              </MenuItem>

              <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      id='modal-modal-title'
                      variant='h4'
                      component='h2'
                    >
                      New Project
                    </Typography>

                    <Input
                      placeholder='name'
                      inputProps={ariaLabel}
                      value={projectName}
                      onChange={(event) => setProjectName(event.target.value)}
                      sx={{
                        width: '300px',
                        marginBottom: '30px',
                        marginTop: '50px',
                      }}
                    />

                    <Input
                      placeholder='intro'
                      inputProps={ariaLabel}
                      value={projectIntro}
                      onChange={(event) => setProjectIntro(event.target.value)}
                      sx={{ width: '300px', marginBottom: '35px' }}
                    />

                    <Button
                      variant='outlined'
                      startIcon={<CheckIcon />}
                      onClick={createProject}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </SubMenu>
          <MenuItem icon={<PersonOutlineIcon />}>My Page</MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={SignInNavigate}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
}
