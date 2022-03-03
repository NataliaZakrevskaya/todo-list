import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/TodoList";
import {v1} from "uuid";



const App = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'SCC', isDone: false},
        {id: v1(), title: 'SCSS', isDone: false},
        {id: v1(), title: 'TS', isDone: true}
    ]);

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const setFilterValue = (filterValue: FilterType) => {
        setFilter(filterValue)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodoList = tasks;

    if(filter === 'active'){
        tasksForTodoList = tasks.filter(t => t.isDone === false);
    }
    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    }

  return (
    <div className="App">
      <TodoList
          title={'What to learn'}
          tasks={tasksForTodoList}
          deleteTask={deleteTask}
          addTask={addTask}
          setFilterValue={setFilterValue}
      />
    </div>
  );
}

export default App;

// TYPES
export type FilterType = 'all' | 'active' | 'completed'