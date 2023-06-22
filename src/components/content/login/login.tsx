import * as React from 'react';
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
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUuid } from "../../../hooks/userSlice";


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

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const mainNavigate = () => navigate("/main")
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  
  
  //const imagepath = "public\test.jpeg"
  // fetch(imagepath)
  // .then(response => response.blob())
  // .then(blobData => {
  //   const profileImageFile = new File([blobData], "test.jpeg", { type: "image/jpeg" });
  //   // 변환된 File 객체를 활용하는 작업을 수행합니다.
  //   console.log("fetch된 프로필 이미지 : ", profileImageFile);
  // })
  // .catch(error => {
  //   // 오류 처리
  //   console.log(error);
  // });

  // const login = () => {
  //   axios.post('/api/v1/users/signin', {
  //     userEmail: email,
  //     userPassword: password
  //   }).then((response) => {
  //     console.log("로그인 성공?");
  //     console.log(response);
  //   }).catch((error) => {
  //     alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
  //     console.log("로그인 실패");
  //     console.log(error);
  //   })
  // }


  const login = () => {
    axios.post('/api/v1/users/signin', {
      userEmail: email,
      userPassword: password
    }).then((response) => {
      console.log("로그인 성공!");
      console.log(response);
      if(response.data.message === "로그인 성공"){
        dispatch(setUuid(response.data.data.userUuid))
        navigate('/main');
      }

    }).catch((error) => {
      alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
      console.log("로그인 실패");
      console.log(error);
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event)=>(setEmail(event.target.value))}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event)=>(setPassword(event.target.value))}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  kakao login
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"sign up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}