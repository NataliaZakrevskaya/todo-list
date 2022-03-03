import React, {useState} from 'react';
import s from './TodoList.module.css'
import {FilterType} from "../App";



export const TodoList = ({title, tasks, deleteTask, setFilterValue}: TodoListPropsType) => {


    return (
        <div className={s.todolistContainer}>
            <div>
                <h3>{title}</h3>
                <div>
                    <input type="text"/>
                    <button>+</button>
                </div>
                <ul className={s.tasksContainer}>
                    {tasks.map(t => <li key={t.id} className={s.taskContainer}>
                        <input type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => deleteTask(t.id)}>X</button>
                    </li>)}
                </ul>
                <div>
                    <button onClick={() => setFilterValue('all')}>All</button>
                    <button onClick={() => setFilterValue('active')}>Active</button>
                    <button onClick={() => setFilterValue('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

// TYPES
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: number) => void
    setFilterValue: (filterValue: FilterType) => void
}

