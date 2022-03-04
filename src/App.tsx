import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";


const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

//useStates
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Meat', isDone: true}
        ]
    });

    //CRUD for todolists
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }



    //CRUD for tasks
    const deleteTask = (todolistID: string, id: string) => {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    //Filter options for tasks
    const changeFilter = (todolistID: string, filterValue: FilterType) => {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {

                    let alltodolistTasks = tasks[tl.id];
                    let tasksForTodoList = alltodolistTasks;
                    if (tl.filter === 'active') {
                        tasksForTodoList = alltodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = alltodolistTasks.filter(t => t.isDone === true);
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            deleteTask={deleteTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;

// TYPES
export type FilterType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterType
}