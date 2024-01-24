import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import "./App.css"


function TodoItem({label, delete_todo}) {
    return (
    <div className="todo-item">
                <span className='todo-text'>{label}</span>
                <div className='deletetrash' onClick={delete_todo}>
                <FaRegTrashAlt />
                </div>
            </div>
    );
}

const createUser = () => {
    try {
        const raw = JSON.stringify([])
        const url = `https://playground.4geeks.com/apis/fake/todos/user/NickolaiGaming`;
        const options = {
            method: 'POST',
            body: raw,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = fetch (url,options)
        const data = response.json()
        if(data.msg){
            obtenerTareas()
        }
        console.log(data);
    }
    catch(error){
        console.log(error.msg)
    }
}
 
const App = () => {
    const [todos, setTodos] = useState([]);
    const[todoInput, setTodoInput]= useState("");

    useEffect(() => {
        obtenerTareas()
    }, [])


    const obtenerTareas = () => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/NickolaiGaming")
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((data) => {
            console.log(data)
            if(data.msg) {
                // aqui debo llamar a la funcion que crea usuario
                createUser()
            } else {
                setTodos(data) 
            }
            
        })
    }
    const agregarTarea = (todoInput) => {
        try {
            const raw = JSON.stringify([{label: {todoInput}}]) // no detecta la variable de todoInput
            const url = `https://playground.4geeks.com/apis/fake/todos/user/NickolaiGaming`;
            const options = {
                method: 'POST',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = fetch (url,options)
            const data = response.json()
            if(data.msg){
                obtenerTareas()
            }
            console.log(data);
        }
        catch(error){
            console.log(error.msg)
        }
    }
 
    
    return (
        <div className='container-fluid'>
           
        
        <form onSubmit={(ev) => {
         ev.preventDefault();
            
            if(todoInput.length > 0) {
                setTodos([{
                    label: todoInput,
                }, ...todos])
                setTodoInput("");
            }                       
            }}
         className='container flex column align-items-center justify-content-start'>
            
            <h1>To Do List</h1>
            <input className='form-control form-control-lg' 
            type="text"
            placeholder='Que necesitas hacer?'
            aria-label="todo list input field"
            value={todoInput}
            onChange={(ev) => setTodoInput(ev.target.value)}
            />
            {todos.map((item, id)=>
            <TodoItem key={id} label={item.label}
             toggle_todo={() => 
                setTodos(todos.toSpliced(id, 1,{
                    label: item.label,
                    is_done: !item.is_done,
                }
                ))}
                delete_todo={() =>setTodos(todos.toSpliced(id,1))}
                 /> )}
        
            
            <small>{todos.length} Que haceres restantes</small>
            <small>{todos.length == 0 ? ", agregue una tarea" : ""}</small>
            
           
        </form>
        </div>

    )
}

export default App;