import {
  Box,
  Divider,
  IconButton,
  Modal,
  Button,
  Typography,
  Input,
} from '@mui/material';
import { useState, useEffect } from 'react';
import React from 'react';
import UserPreviewBox from '../userPreviewBox/userPreviewBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../stores/store';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

interface projectResponse {
  status: number;
  code: string;
  message: string;
  data: projectInfo;
}

interface projectInfo {
  projectId: number;
  projectName: string;
  projectUserId: string;
  projectIntro: string;
  projectPreview: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 200,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};

export default function DescriptionBox() {
  let projectUuid = useSelector((state: RootState) => {
    return state.project.uuid;
  });

  const [intro, setIntro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteUserName, setInviteUserName] = useState('');
  const [projectId, setProjectId] = useState<number>(0);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const ariaLabel = { 'aria-label': 'description' };

  useEffect(() => {
    (async () => {
      await axios
        .get<projectResponse>('/api/v1/projects/' + projectUuid)
        .then((response) => {
          console.log(' 프로젝트 DATA : ', response.data.data);
          console.log('가져온 intro 데이터', response.data.data.projectIntro);
          setIntro(response.data.data.projectIntro);
          setProjectId(response.data.data.projectId);
        })
        .catch((error) => {
          console.log('intro 불러오기 실패');
          console.log(error);
        });
    })();
  }, [projectUuid]);

  const inviteMember = () => {
    if (inviteUserName === '') {
      alert('초대를 원하는 유저의 이름을 입력하세요.');
    } else {
      axios
        .get('/api/v1/users/nickname/' + inviteUserName)
        .then((response) => {
          console.log('해당 닉네임의 uuid : ', response.data.data.userUuid);

          axios
            .get('/api/v1/users/' + response.data.data.userUuid)
            .then((response) => {
              console.log('유저 id: ', response.data.data.userId);
              axios
                .post('/api/v1/projects/users', {
                  projectId: projectId,
                  userId: response.data.data.userId,
                })
                .then((response) => {
                  console.log('유저 초대 완료');
                  console.log(response);
                  console.log(response.data.data);
                  //window.location.replace("/project");
                })
                .catch((error) => {
                  alert('유저 초대에 실패했습니다.');
                  console.log('유저 초대 실패');
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log('초대되는 아이디 : ', inviteUserName);

  return (
    <Box
      sx={
        {
          /*pr:5*/
        }
      }
    >
      <Box
        sx={{
          //pt: 3,
          letterSpacing: '3px',
        }}
      >
        Intro
      </Box>
      <Divider />
      <Box sx={{ pt: 1 }}>{intro}</Box>
      <Box display='flex' flexWrap='wrap'></Box>

      <Box sx={{ pt: 6 }}>
        <Box
          sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}
        >
          <Box
            sx={{
              //pt: 3,
              letterSpacing: '3px',
            }}
          >
            Contributors
          </Box>
          <IconButton
            aria-label='add'
            size='small'
            onClick={() => handleModalOpen()}
          >
            <AddIcon fontSize='inherit' />
          </IconButton>

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
                <Typography id='modal-modal-title' variant='h4' component='h2'>
                  Invite Member
                </Typography>

                <Input
                  placeholder='name'
                  inputProps={ariaLabel}
                  value={inviteUserName}
                  onChange={(event) => setInviteUserName(event.target.value)}
                  sx={{
                    width: '300px',
                    marginBottom: '30px',
                    marginTop: '50px',
                  }}
                />

                <Button
                  variant='outlined'
                  startIcon={<CheckIcon />}
                  onClick={inviteMember}
                >
                  invite
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
        <Divider />
        <Box sx={{ pt: 1 }}>
          <Box display='flex' flexWrap='wrap'>
            <UserPreviewBox />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
