import React, {ChangeEvent, useState} from 'react';
import s from './TodoList.module.css'
import {FilterType} from "../App";


export const TodoList = ({title, tasks, deleteTask, setFilterValue, addTask, changeStatus, filter}: TodoListPropsType) => {

    let [taskTitle, setTaskTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

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
            addTask(taskTitle);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onAllClickHandler = () => {
        setFilterValue('all');
    }
    const onActiveClickHandler = () => {
        setFilterValue('active');
    }
    const onCompletedClickHandler = () => {
        setFilterValue('completed');
    }


    return (
        <div className={s.todolistContainer}>
            <div>
                <h3>{title}</h3>
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
                        tasks.map(t => {

                            const onClickHandler = () => deleteTask(t.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                changeStatus(t.id, newIsDoneValue)
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
                    <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                    <button className={filter === 'active' ? 'active-filter' : ''}onClick={onActiveClickHandler}>Active</button>
                    <button className={filter === 'completed' ? 'active-filter' : ''}onClick={onCompletedClickHandler}>Completed</button>
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
    title: string
    tasks: TaskType[]
    filter: FilterType
    deleteTask: (id: string) => void
    addTask: (title: string) => void
    setFilterValue: (filterValue: FilterType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

