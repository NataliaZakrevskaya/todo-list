import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { AddBox } from '@material-ui/icons';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import style from './AddItemForm.module.css';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo(
  ({ addItem, disabled = false }: AddItemFormPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onButtonClick = (): void => {
      if (title.trim() !== '') {
        addItem(title);
        setTitle('');
      } else {
        setError('Title is required');
      }
    };

    const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.currentTarget.value);
    };

    const onTextFieldKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (error !== null) {
        setError(null);
      }
      if (e.code === 'Enter') {
        onButtonClick();
      }
    };

    return (
      <div className={style.addItemFormBlock}>
        <TextField
          variant="outlined"
          disabled={disabled}
          error={!!error}
          value={title}
          onChange={onTextFieldChange}
          onKeyPress={onTextFieldKeyPress}
          label="Title"
          helperText={error}
        />
        <IconButton color="primary" onClick={onButtonClick} disabled={disabled}>
          <AddBox />
        </IconButton>
      </div>
    );
  },
);
