import React, { ChangeEvent, useCallback } from 'react';

import { Delete } from '@material-ui/icons';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import { TaskPropsType } from '../types';

import style from './Task.module.css';

import { EditableSpan } from 'components';
import { TaskStatuses } from 'enums';

export const Task = React.memo((props: TaskPropsType) => {
  const onDeleteButtonClick = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId],
  );

  const onCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;
      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId,
      );
    },
    [props.task.id, props.todolistId],
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props.task.id, props.todolistId],
  );

  return (
    <div
      key={props.task.id}
      className={
        props.task.status === TaskStatuses.Completed
          ? `${style.isDone} ${style.task}`
          : style.task
      }
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onCheckboxChange}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onDeleteButtonClick}>
        <Delete />
      </IconButton>
    </div>
  );
});
