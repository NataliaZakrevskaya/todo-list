import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/Common-components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

//useStates
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {
            id: newTodolistId, title: title, filter: 'all'
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }


    //CRUD for tasks
    const deleteTask = (todolistID: string, id: string) => {
        let todolistTasks = tasks[todolistID];
        tasks[todolistID] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks})
    }
    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistID];
        tasks[todolistID] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        let todolistTasks = tasks[todolistID];
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }
    const changeTaskTitle = (todolistID: string, taskId: string, newTaskTitle: string) => {
        let todolistTasks = tasks[todolistID];
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTaskTitle;
            setTasks({...tasks});
        }
    }
    //Filter options for tasks
    const changeFilter = (todolistID: string, filterValue: FilterType) => {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolists([...todolists]);
        }
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todo list
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            let alltodolistTasks = tasks[tl.id];
                            let tasksForTodoList = alltodolistTasks;
                            if (tl.filter === 'active') {
                                tasksForTodoList = alltodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = alltodolistTasks.filter(t => t.isDone);
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            deleteTask={deleteTask}
                                            addTask={addTask}
                                            changeFilter={changeFilter}
                                            changeStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
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
type TasksStateType = {
    [key: string]: TaskType[]
}