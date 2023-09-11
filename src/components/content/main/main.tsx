import {
  Box,
  Pagination,
  Modal,
  Button,
  Typography,
  Input,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalButton from '../../common/button/globalButton';
import ProjectBox from '../../common/box/projectBox';
import { ProjectData } from '../../common/box/projectBox/types';
import TitleBox from '../../common/box/titleBox/titleBox';
import { RootState } from '../../../stores/store';
import axios from 'axios';
import Project from '../project/project';
import { setProjectUuid } from '../../../hooks/projectSlice';
import {
  setMainBranchId,
  setMainBranchUuid,
  setBranchUuid,
} from '../../../hooks/branchSlice';
import CheckIcon from '@mui/icons-material/Check';

interface wholeProjectResponse {
  status: number;
  code: string;
  message: string;
  data: ProjectsData;
}

interface ProjectsData {
  projects: project[];
}

interface project {
  projectName: string;
  projectUuid: string;
  projectIntro: string;
  projectPreview: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
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

export default function Main() {
  const [projects, setProjects] = React.useState<project[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [projectIntro, setProjectIntro] = useState('');
  const [userId, setUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noneProduct, setNoneProduct] = useState(true);

  const [defaultPage, setDefaultPage] = useState(0); 

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const ariaLabel = { 'aria-label': 'description' };

  let userUuid = useSelector((state: RootState) => {
    return state.user.userUuid;
  });

  let mainUuid = useSelector((state: RootState) => {
    return state.branch.mainBranchUuid;
  });

  let mainId = useSelector((state: RootState) => {
    return state.branch.mainBranchId;
  });

  let projUuid = useSelector((state: RootState) => {
    return state.project.uuid;
  });

  let branUuid = useSelector((state: RootState) => {
    return state.branch.uuid;
  });

  const [branchData, setBranchData] = useState<Branch[]>([]);

  useEffect(() => {
    (async () => {
      await axios
        .get('/api/v1/users/' + userUuid)
        .then((response) => {
          console.log(response.data.data.userId);
          const idValue = response.data.data.userId;
          const stringUserId = idValue.toString();
          setUserId(stringUserId);
        })
        .catch((error) => {
          console.log('유저 정보 불러오기 실 패');
          console.log(error);
        });
    })();
  }, []);

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
            .get('/api/v1/projects/' + projUuid + '/branches?page=' + defaultPage)
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
          navigate('/project');
        });
    }
  };

  const handlePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setDefaultPage(page - 1);
  }

  useEffect(() => {
    (async () => {
      await axios
        .get<wholeProjectResponse>(
          '/api/v1/projects?userUuid=' + userUuid + '&page=' + defaultPage
        )
        .then((response) => {
          console.log('유저 플젝 불러오기 성공');
          console.log(response.data.data.projects);
          setProjects(response.data.data.projects);

          if (projects.length !== 0) {
            setNoneProduct(false);
          }
        })
        .catch((error) => {
          console.log('전체 프로젝트 불러오기 실패');
          console.log(error);
        });
    })();
  }, [projects.length, defaultPage, userUuid]);

  return (
    <Box sx={{ px: 3, py: 3 }}>
      <TitleBox content='PROJECTS' />
      <Box sx={{ px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{ maxWidth: 1000, width: 1, height: 32, position: 'relative' }}
          >
            <Box sx={{ position: 'absolute', right: 12 }}>
              <Box onClick={() => handleModalOpen()}>
                <GlobalButton content='create' />
              </Box>

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
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              mt: '10px',
              maxWidth: 1000,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
            }}
          >
            {noneProduct ? (
              <Box> 프로젝트가 없습니다. 멋진 프로젝트를 생성해 보세요!</Box>
            ) : (
              <Box
                sx={{
                  mt: '10px',
                  maxWidth: 1000,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 3,
                  justifyContent: 'center',
                }}
              >
                {projects.map((project) => {
                  const clickEvent = async() => {
                    console.log("프로젝트(main.tsx) : ", project);
                    dispatch(setProjectUuid(project.projectUuid));
                    console.log(
                      '현재 저장된 프로젝트 UUID : ',
                      project.projectUuid
                    );

                      await axios
                      .get(
                        '/api/v1/projects/' +
                          project.projectUuid +
                          '/branches?page=0'
                      )
                      .then((response) => {
                        console.log('브랜치 정보 불러오기 성공');
                        console.log(
                          '가져온 데이터(main.tsx)',
                          response.data.data.projectBranchInfos
                        );
                        setBranchData(response.data.data.projectBranchInfos);

                        response.data.data.projectBranchInfos.map(
                          (branchData: Branch) => {
                            if (branchData.branchName === 'main') {
                              console.log(
                                '⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ 브랜치uuid(main.tsx) : ',
                                branchData.branchUuid
                              );

                              dispatch(
                                setMainBranchId(branchData.branchId.toString())
                              );
                              console.log('mainbranchId(main.tsx): ', mainId);
                              dispatch(
                                setMainBranchUuid(branchData.branchUuid)
                              );
                              console.log('mainbranchUuid(main.tsx) : ', mainUuid);
                              dispatch(setBranchUuid(branchData.branchUuid));
                              console.log('설정한 branchUuid(main.tsx) : ', branchData.branchUuid);
                            }
                          }
                        );
                      })
                      .then(() => {
                        navigate('/project');
                        console.log(
                          '이동할 프로젝트 이름 : ',
                          project.projectName
                        );
                      });
                  };
                  return (
                    <Box onClick={clickEvent}>
                      <ProjectBox {...project} />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {noneProduct ? (
          <></>
        ) : (
          <Pagination count={10} color='primary' size='small' defaultPage={1} onChange={handlePage} />
        )}
      </Box>
    </Box>
  );
}
