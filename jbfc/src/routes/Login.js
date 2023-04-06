import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import { Box, Container } from "@mui/system";
function Login() {
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPass] = useState(null);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(`/home`);
  };

  if (localStorage.getItem(`userId`) !== null) {
    goToHome();
  }

  const onSubmit = (event) => {
    event.preventDefault();

    setUserId(event.currentTarget[0].value);
    setUserPass(event.currentTarget[2].value);
    //이제 여기서 이동 usenavigator로!
  };
  try {
    useEffect(() => {
      axios
        .post(
          `http://localhost:8080/login`,
          {
            userId: userId,
            userPassword: userPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.pass === true) {
            localStorage.setItem(`userId`, res.data.userInfo.아이디);
            goToHome();
            return;
          }
          return userId === null ? null : alert(res.data.message);
        });
    }, [userId, userPassword]);
  } catch (error) {
    throw new Error();
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: `secondary.main` }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"></Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="아이디"
            margin="normal"
            name="id"
            required
            fullWidth
            autoComplete="email"
            autoFocus
          />
          <TextField
            label="비밀번호"
            id="password"
            name="password"
            autoComplete="on"
            type="password"
            required
            fullWidth
          />
          <Grid container>
            <Grid item xs>
              <Button sx={{ mt: 2 }} type="submit">
                Sign in
              </Button>
            </Grid>
            <Grid item>
              <Link to={`/sign`} style={{ textDecoration: "none" }}>
                <Button sx={{ mt: 2 }} type="submit">
                  Don't have an account?
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
