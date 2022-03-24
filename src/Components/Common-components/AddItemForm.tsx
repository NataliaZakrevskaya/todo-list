import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export const AddItemForm = (props: AddItemPropsType) => {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: any) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            {/*<input
                onChange={onChangeHandler}
                value={title}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />*/}
            <TextField
                variant={"outlined"}
                onChange={onChangeHandler}
                value={title}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"Title"}
                helperText={error}
                /*className={error ? 'error' : ''}*/
            />
           {/* <Button variant={"contained"} color={"primary"} onClick={addItem}>+</Button>*/}
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    );
};


// Types
type AddItemPropsType = {
    addItem: (title: string) => void
}