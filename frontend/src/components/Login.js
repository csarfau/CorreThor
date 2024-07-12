import {
  Alert,
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import Corrector from "./Corrector";
import Corrections from "./Corrections";

const LoginCard = () => {
  const { admin, login, logout, error } = useContext(AdminContext);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
      setLoading(true);
      await login(token);
      setLoading(false);
  }

  const handleLogout = () => {
    logout();
    setToken(null);
  }


  return (
    <>
    <Box  sx={{ margin: 2 }}>
      {!admin && (
        <Paper elevation={3}>
          <CardContent>
            <Typography variant="h5" component="div" fontWeight={700}>
              Admin
            </Typography>
          </CardContent>
          <CardActions>
            <TextField
              id="outlined-basic"
              label="Token"
              size="small"
              variant="outlined"
              type="password"
              onChange={(e) => setToken(e.target.value)}
              />
              {loading ? <CircularProgress size={24} /> :
                <Button
                variant="contained"
                size="large"
                onClick={handleLogin}
                > VALIDAR
                </Button>
              }
          </CardActions>
          <CardActions>
            <Box sx={{ width: 1 }}>
              {error && (
                <Alert variant="filled" severity="error">
                Não foi possível fazer login.
                <h2>O erro original foi: </h2>
                <p>{error}</p>
              </Alert>
              )}
            </Box>
          </CardActions>
        </Paper>
      )} 

      {admin && (
        <Paper elevation={3}>
          <CardContent>
            <Typography variant="h5" component="div" fontWeight={700}>
              Admin
            </Typography>
          </CardContent>
          <CardActions>
            <Chip
              label={admin}
              size="small"
              avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            />
            <Button variant="outlined" size="small" onClick={handleLogout}>
              <SettingsOutlinedIcon fontSize="medium" />
              Token
            </Button>
          </CardActions>
        </Paper>
      )} 
    </Box>
      {admin && (
        <Corrector />
      )}
    </>
  );
};

export default LoginCard;
