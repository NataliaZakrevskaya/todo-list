import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import s from './TodoList.module.css'
import {FilterType} from "../App";


export const TodoList = ({title, tasks, deleteTask, setFilterValue, addTask}: TodoListPropsType) => {

    let [taskTitle, setTaskTitle] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: any) => {
        if (e.charCode === 13) {
            addTask(taskTitle);
            setTaskTitle('');
        }
    }

    const addNewTask = () => {
        addTask(taskTitle);
        setTaskTitle('');
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
                    />
                    <button onClick={addNewTask}>+</button>
                </div>
                <ul className={s.tasksContainer}>
                    {
                        tasks.map(t => {

                            const onClickHandler = () => deleteTask(t.id)

                            return <li key={t.id} className={s.taskContainer}>
                                <input type={"checkbox"} checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>X</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
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
    deleteTask: (id: string) => void
    addTask: (title: string) => void
    setFilterValue: (filterValue: FilterType) => void
}

