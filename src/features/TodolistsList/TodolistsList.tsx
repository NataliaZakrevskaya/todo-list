import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LOGIN_URL } from '../../constants';

import { TasksStateType } from './Tasks/types';
import { FilterValuesType, TodolistDomainType } from './Todolists/types';

import { AppRootStateType } from 'app/store';
import { AddItemForm } from 'components';
import { TaskStatuses } from 'enums';
import {
  fetchTodolistsTC,
  removeTodolistTC,
  Todolist,
  addTaskTC,
  changeTodolistFilterAC,
  removeTaskTC,
  updateTaskTC,
  addTodolistTC,
  changeTodolistTitleTC,
} from 'features';

export const TodolistsList: React.FC = () => {
  const CONTAINER_SPACING = 3;
  const PAPER_ELEVATION = 3;

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists,
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, []);

  const deleteTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskTC(id, todolistId));
  }, []);

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(title, todolistId));
  }, []);

  const changeTaskStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(id, { status }, todolistId));
    },
    [],
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(updateTaskTC(id, { title: newTitle }, todolistId));
    },
    [],
  );

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(todolistId, value));
  }, []);

  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodolistTC(id));
  }, []);

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleTC(id, title));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={LOGIN_URL} />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={CONTAINER_SPACING}>
        {todolists.map(todolist => {
          const allTodolistTasks = tasks[todolist.id];

          return (
            <Grid item key={todolist.id}>
              <Paper elevation={PAPER_ELEVATION} style={{ padding: '10px' }}>
                <Todolist
                  todolist={todolist}
                  tasks={allTodolistTasks}
                  removeTask={deleteTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
