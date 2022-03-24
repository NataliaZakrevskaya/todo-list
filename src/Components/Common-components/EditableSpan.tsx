import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const activateEditMode = () => {
        setEditMode(true)
       // setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <TextField variant={"outlined"} type="text" value={title} onChange={changeTitle} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
    )
}

//TYPES
type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}