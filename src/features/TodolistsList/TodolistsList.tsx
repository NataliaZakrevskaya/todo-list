import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TaskStatuses } from '../../api/todolists-api';
import { AppRootStateType } from '../../app/store';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';

import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from './tasks-reducer';
import { Todolist } from './Todolist/Todolist';
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from './todolists-reducer';

type PropsType = {
  demo: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
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
    const thunk = fetchTodolistsTC();
    dispatch(thunk);
  }, []);

  const removeTask = useCallback((id: string, todolistId: string) => {
    const thunk = removeTaskTC(id, todolistId);
    dispatch(thunk);
  }, []);

  const addTask = useCallback((title: string, todolistId: string) => {
    const thunk = addTaskTC(title, todolistId);
    dispatch(thunk);
  }, []);

  const changeStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      const thunk = updateTaskTC(id, { status }, todolistId);
      dispatch(thunk);
    },
    [],
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      const thunk = updateTaskTC(id, { title: newTitle }, todolistId);
      dispatch(thunk);
    },
    [],
  );

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  }, []);

  const removeTodolist = useCallback((id: string) => {
    const thunk = removeTodolistTC(id);
    dispatch(thunk);
  }, []);

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    const thunk = changeTodolistTitleTC(id, title);
    dispatch(thunk);
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      dispatch(thunk);
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
                  removeTask={removeTask}
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
