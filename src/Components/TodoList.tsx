import React, {ChangeEvent, useState} from 'react';
import s from './TodoList.module.css'
import {FilterType} from "../App";


export const TodoList = (props: TodoListPropsType) => {

    let [taskTitle, setTaskTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: any) => {
        setError(null);
        if (e.charCode === 13) {
            addNewTask();
        }
    }

    const addNewTask = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(props.id, taskTitle);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter(props.id,'all');
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id,'active');
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id,'completed');
    }


    return (
        <div className={s.todolistContainer}>
            <div>
                <div className={s.todolistTitleContainer}>
                    <h3>{props.title}</h3>
                    <button onClick={removeTodolist}>x</button>
                </div>
                <div>
                    <input
                        onChange={onChangeHandler}
                        value={taskTitle}
                        onKeyPress={onKeyPressHandler}
                        className={error ? 'error' : ''}
                    />
                    <button onClick={addNewTask}>+</button>
                    {error && <div className='error-message'>{error}</div>}
                </div>
                <ul className={s.tasksContainer}>
                    {
                        props.tasks.map(t => {

                            const onClickHandler = () => props.deleteTask(props.id, t.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeStatus(props.id, t.id, newIsDoneValue)
                            }

                            return <li key={t.id} className={`${s.taskContainer} ${t.isDone === true ? 'is-done' : ''}`}>
                                <input type={"checkbox"} checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>X</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};

// TYPES
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    deleteTask: (todolistID: string, id: string) => void
    addTask: (todolistID: string, title: string) => void
    changeFilter: (todolistID: string, filterValue: FilterType) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

