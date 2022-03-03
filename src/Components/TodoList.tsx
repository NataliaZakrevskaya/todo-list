import React from 'react';
import s from './TodoList.module.css'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
}

export const TodoList = ({title, tasks}: TodoListPropsType) => {
    return (
        <div className={s.todolistContainer}>
            <div>
                <h3>{title}</h3>
                <div>
                    <input type="text"/>
                    <button>+</button>
                </div>
                <ul className={s.tasksContainer}>
                    {tasks.map(t => <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title}</span>
                    </li>)}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};