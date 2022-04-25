import React, { useCallback, useEffect } from 'react';

import { Delete } from '@material-ui/icons';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';

import { FilterValues } from '../../../enums/enums';
import { fetchTasksTC } from '../../Tasks/tasksThunk/tasksThunk';
import { TodolistPropsType } from '../types/types';

import style from './Todolist.module.css';

import { AddItemForm, EditableSpan } from 'components';
import { TaskStatuses } from 'enums';
import { Task } from 'features/TodolistsList/Tasks/Task/Task';

export const Todolist = React.memo(({ demo = false, ...props }: TodolistPropsType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchTasksTC(props.todolist.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id],
  );

  const removeTodolist = (): void => {
    props.removeTodolist(props.todolist.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props.todolist.id, props.changeTodolistTitle],
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter(FilterValues.All, props.todolist.id),
    [props.todolist.id, props.changeFilter],
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter(FilterValues.Active, props.todolist.id),
    [props.todolist.id, props.changeFilter],
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter(FilterValues.Completed, props.todolist.id),
    [props.todolist.id, props.changeFilter],
  );

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === FilterValues.Active) {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === FilterValues.Completed) {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  return (
    <div className={style.todoList}>
      <h1>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton
          onClick={removeTodolist}
          size="large"
          disabled={props.todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h1>
      <AddItemForm
        addItem={addTask}
        disabled={props.todolist.entityStatus === 'loading'}
      />
      <div>
        {tasksForTodolist.map(t => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
          />
        ))}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
          onClick={onAllClickHandler}
          color="inherit"
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClickHandler}
          color="primary"
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClickHandler}
          color="secondary"
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
