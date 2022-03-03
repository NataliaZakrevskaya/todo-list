import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/TodoList";



const App = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'SCC', isDone: false},
        {id: 4, title: 'SCSS', isDone: false},
        {id: 5, title: 'TS', isDone: true}
    ]);

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const setFilterValue = (filterValue: FilterType) => {
        setFilter(filterValue)
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
          setFilterValue={setFilterValue}
      />
    </div>
  );
}

export default App;

// TYPES
export type FilterType = 'all' | 'active' | 'completed'