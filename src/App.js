import React, { useState, useEffect } from 'react'

import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  //State
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setfilteredTodos] = useState([]);

  //Use Effect RUN once when th app start
  useEffect(() => {
    getLocalTodos();
    
  }, [])
  //Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
    
  }, [todos, status])
  //Functions
  const filterHandler = () => {
    switch(status){
      case "completed" :
        setfilteredTodos(todos.filter((todo) => todo.completed===true))
        break;
      case "uncompleted" :
        setfilteredTodos(todos.filter((todo) => todo.completed===false))
        break;
      default:
        setfilteredTodos(todos);
        break;
    }
  };

  //Save to local
  const saveLocalTodos = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = ()=>{
    if(localStorage.getItem("todos"=== null)){
      localStorage.setItem("todos", JSON.stringify([]));
    } else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <section className="glass">
        <div className="dashboard">
          <header>What is your Plan today?</header>
          <Form
            todos={todos}
            setTodos={setTodos}
            inputText={inputText}
            setInputText={setInputText} 
            setStatus={setStatus}/>
          <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
        </div>
      </section>
    </div>
  );
}

export default App;
