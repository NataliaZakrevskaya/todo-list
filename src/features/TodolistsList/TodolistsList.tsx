import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TasksStateType } from './Tasks/types';
import {
  FilterValuesType,
  TodolistDomainType,
  TodolistsListPropsType,
} from './Todolists/types/types';

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
} from 'features';

export const TodolistsList: React.FC<TodolistsListPropsType> = ({ demo = false }) => {
  const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);
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

  const changeStatus = useCallback(
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
    dispatch(changeTodolistTitle(id, title));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          const allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper elevation={3} style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={deleteTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
