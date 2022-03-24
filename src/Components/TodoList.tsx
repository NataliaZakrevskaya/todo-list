import React, {ChangeEvent} from 'react';
import s from './TodoList.module.css'
import {FilterType} from "../App";
import {AddItemForm} from "./Common-components/AddItemForm";
import {EditableSpan} from "./Common-components/EditableSpan";


export const TodoList = (props: TodoListPropsType) => {

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    const onAllClickHandler = () => {
        props.changeFilter(props.id, 'all');
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, 'active');
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, 'completed');
    }


    return (
        <div className={s.todolistContainer}>
            <div>
                <div className={s.todolistTitleContainer}>
                    <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>x</button>
                </div>

                <AddItemForm addItem={addTask}/>

                <ul className={s.tasksContainer}>
                    {
                        props.tasks.map(t => {

                            const onClickHandler = () => props.deleteTask(props.id, t.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeStatus(props.id, t.id, newIsDoneValue)
                            }
                            const onChangeTaskTitle = (newValue: string) => {
                               props.changeTaskTitle(props.id, t.id, newValue)
                            }

                            return <li key={t.id}
                                       className={`${s.taskContainer} ${t.isDone ? 'is-done' : ''}`}>
                                <input type={"checkbox"} checked={t.isDone} onChange={onChangeHandler}/>
                                <EditableSpan value={t.title} onChange={onChangeTaskTitle}/>
                                <button onClick={onClickHandler}>X</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
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
    changeTaskTitle: (todolistID: string, taskId: string, newTaskTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}


