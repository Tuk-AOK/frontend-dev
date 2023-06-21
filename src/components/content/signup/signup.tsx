import * as React from 'react';
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Crepe '}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const createUserData = () => {
    const formData = new FormData();
    const imagepath = "/test.jpeg"
    
    fetch(imagepath)
    .then(response => response.blob())
    .then(blobData => {
      const profileImageFile = new File([blobData], "test.jpeg", { type: "image/jpeg" });
      // 변환된 File 객체를 활용하는 작업을 수행합니다.
      console.log("fetch된 프로필 이미지 : ", profileImageFile);
      
      formData.append("userEmail", email);
      formData.append("userPassword", password); 
      formData.append("userNickname", nickname);
      formData.append("userPhoto", profileImageFile);
      // FormData의 key 확인
      // @ts-ignore
      for (const key of formData.keys()) {
        console.log("키값: ", key);
      }
      // FormData의 value 확인
      // @ts-ignore
      for (const value of formData.values()) {
        console.log("밸류값: ", value);
      }
      console.log(formData);
  
      axios.post('/api/v1/users',{
        data: formData,
      }, {
        headers: {
          "Content-Type" : "multipart/form-data",
        },
        transformRequest: [
          function () {
            return formData;
          }
        ],
      })
      .then((response) => {
        console.log("유저 생성 완료");
        console.log(response);

        navigate("/");
      })
      .catch((error) => {
        console.log("유저 데이터 생성 실패");
        console.log(error);
      })
    })
    .catch(error => {
      // 오류 처리
      console.log(error);
    });
    
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection:'column', alignItems: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event)=>(setEmail(event.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event)=>(setPassword(event.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="nickname"
                    autoFocus
                    value={nickname}
                    onChange={(event)=>(setNickname(event.target.value))}
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={createUserData}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  already have an account? sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}