import React, { useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { initializeAppTC, logoutTC } from '../features/Login/auth-reducer';
import { Login } from '../features/Login/Login';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';

import { RequestStatusType } from './app-reducer';

// @ts-ignore
import s from './App.module.css';
import { AppRootStateType } from './store';

type PropsType = {
  demo?: boolean;
};

const App = ( { demo = false }: PropsType) => {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.status,
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    state => state.app.isInitialized,
  );
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(initializeAppTC());
  });

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static" color="primary">
        <Toolbar className={s.toolBar} variant="regular">
          <Typography variant="overline" style={{ fontSize: '24px' }}>
            Todo List
          </Typography>
          {isLoggedIn && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={logoutHandler}
              style={{ fontSize: '16px' }}
            >
              LOG OUT
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList demo={demo} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/404"
            element={<h1 style={{ textAlign: 'center' }}>404 Page not found</h1>}
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
