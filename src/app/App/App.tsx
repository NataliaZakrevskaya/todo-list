import React, { ReactElement, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { EMPTY_URL, LOGIN_URL, NOT_FOUND_URL, UNDEFINED_URL } from '../../constants';
import { AppRootStateType } from '../store';

import style from './App.module.css';
import { RequestStatusType } from './types';

import { ErrorSnackbar } from 'components';
import { initializeAppTC, logoutTC, TodolistsList } from 'features';
import { LoadingStatuses } from 'features/enums';
import { Login } from 'features/Login/Login';

const App = (): ReactElement => {
  const dispatch = useDispatch();

  const status = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.status,
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    state => state.app.isInitialized,
  );
  const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(initializeAppTC());
  });

  const onLogoutButtonClick = (): void => {
    dispatch(logoutTC());
  };

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ErrorSnackbar />
      <AppBar position="static" color="primary">
        <Toolbar className={style.toolBar} variant="regular">
          <Typography variant="overline" style={{ fontSize: '24px' }}>
            Todo List
          </Typography>
          {isLoggedIn && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={onLogoutButtonClick}
              style={{ fontSize: '16px' }}
            >
              LOG OUT
            </Button>
          )}
        </Toolbar>
        {status === LoadingStatuses.Loading && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={EMPTY_URL} element={<TodolistsList />} />
          <Route path={LOGIN_URL} element={<Login />} />
          <Route
            path={NOT_FOUND_URL}
            element={<h1 style={{ textAlign: 'center' }}>404 Page not found</h1>}
          />
          <Route path={UNDEFINED_URL} element={<Navigate to={NOT_FOUND_URL} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
