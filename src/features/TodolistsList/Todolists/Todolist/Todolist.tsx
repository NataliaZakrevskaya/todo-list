import React, { useCallback, useEffect } from 'react';

import { Delete } from '@material-ui/icons';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';

import { FilterValues, LoadingStatuses } from '../../../enums';
import { TodolistPropsType } from '../types';

import style from './Todolist.module.css';

import { AddItemForm, EditableSpan } from 'components';
import { TaskStatuses } from 'enums';
import { fetchTasksTC, Task } from 'features';

export const Todolist = React.memo((props: TodolistPropsType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(props.todolist.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id],
  );

  const onDeleteButtonClick = (): void => {
    props.removeTodolist(props.todolist.id);
  };

  const onTodolistTitleChange = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props.todolist.id, props.changeTodolistTitle],
  );

  const onAllButtonClick = useCallback(
    () => props.changeFilter(FilterValues.All, props.todolist.id),
    [props.todolist.id, props.changeFilter],
  );
  const onActiveButtonClick = useCallback(
    () => props.changeFilter(FilterValues.Active, props.todolist.id),
    [props.todolist.id, props.changeFilter],
  );
  const onCompletedButtonClick = useCallback(
    () => props.changeFilter(FilterValues.Completed, props.todolist.id),
    [props.todolist.id, props.changeFilter],
  );

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === FilterValues.Active) {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New);
  }
  if (props.todolist.filter === FilterValues.Completed) {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed);
  }

  return (
    <div className={style.todoList}>
      <h1>
        <EditableSpan value={props.todolist.title} onChange={onTodolistTitleChange} />
        <IconButton
          onClick={onDeleteButtonClick}
          size="large"
          disabled={props.todolist.entityStatus === LoadingStatuses.Loading}
        >
          <Delete />
        </IconButton>
      </h1>
      <AddItemForm
        addItem={addTask}
        disabled={props.todolist.entityStatus === LoadingStatuses.Loading}
      />
      <div>
        {tasksForTodolist.map(task => (
          <Task
            key={task.id}
            task={task}
            todolistId={props.todolist.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
          />
        ))}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          variant={props.todolist.filter === FilterValues.All ? 'outlined' : 'text'}
          onClick={onAllButtonClick}
          color="inherit"
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === FilterValues.Active ? 'outlined' : 'text'}
          onClick={onActiveButtonClick}
          color="primary"
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === FilterValues.Completed ? 'outlined' : 'text'}
          onClick={onCompletedButtonClick}
          color="secondary"
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
