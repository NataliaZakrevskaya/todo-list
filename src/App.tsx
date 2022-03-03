import React from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";

const App = () => {

    const tasks1 = [
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'SCC', isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: 'Milk', isDone: true},
        {id: 2, title: 'Chocolate', isDone: false},
        {id: 3, title: 'Meat', isDone: false}
    ]

  return (
    <div className="App">
      <TodoList title={'What to learn'} tasks={tasks1}/>
      <TodoList title={'What to buy'} tasks={tasks2}/>
    </div>
  );
}

export default App;