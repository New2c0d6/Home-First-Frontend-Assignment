import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);


  useEffect(()=>{
    const arr = ["noel", "noelpass"];
    const cred = JSON.stringify(arr);
    localStorage.setItem("login", cred);
  }, [])


  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  function handleLogin(e) {
    e.preventDefault();
    
    const json = localStorage.getItem("login");
    const logArr = JSON.parse(json);

    logArr[0] === user && logArr[1] === pass && setLogin(true);
    setPass("");
    setUser("");

  }

  return (
    <>
      {login === false ? (
      <form id="login" onSubmit={handleLogin}>
          <h4>UserName</h4>
          <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <h4>Password</h4>
          <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
          <button type="submit">Login</button>
        </form>)
         : (
          <div id="todo-list">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit">Add Todo</button>
          </form>
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}
  
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
         ) }
      
      
    </>
  );
}

export default App;
