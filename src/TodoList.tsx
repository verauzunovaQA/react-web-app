import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { storeInput } from "./storage";
import { TodoItem, TodoItemObj } from "./TodoItem";
import './TodoList.css';

export function TodoList(){
    const todoData= storeInput.get("todos") ?? []
    const inputEl = useRef<HTMLInputElement>(null);
    const [todos, setTodos] = useState<TodoItemObj[]>(todoData)
    const [newtodo, setNewTodo] = useState<string>("")
    const onClickButton = () => {
        createTodo()
    }
    const onChangeNewTodoItem = (e: any) => {
        setNewTodo(e.target.value)
    }
    const onChangeExistingTodoItem = (newValue:string, id: string) => {
        if(newValue.trim().length === 0){
            return
        }
        const newTodos = todos.map( (todoItem) => todoItem.id === id ? {...todoItem, value: newValue} : todoItem)
        setAndSortTodos(newTodos)
    }
    const onClickRemove = (val: string) => {
        const newTodos = todos.filter( (valueItem) => valueItem.id !== val)
        setAndSortTodos(newTodos)
    }
    const onClickEdit = (id: string) => {
        const newTodos = todos.map( (todoItem) => todoItem.id === id ? {...todoItem, isEditing:true} : todoItem)
        setAndSortTodos(newTodos, false)
    }
    const onClickSave = (id:string) =>{
        editTodo(id)
    }
    const onClickDone = (id:string) =>{
        const newTodos = todos.map( (todoItem) => todoItem.id === id ? {...todoItem, isDone:!todoItem.isDone} : todoItem)
        setAndSortTodos(newTodos)
    }
    const setAndSortTodos = (todos:TodoItemObj[], addToStorage=true) =>{
        const sortedTodos = todos.sort((a,b) => {
            if (a.isDone && !b.isDone){
                return 1
            }else if(!a.isDone && b.isDone){
                return -1
            }
            return 0
        })
        if(addToStorage){
            storeInput.add("todos", sortedTodos)
        }
        setTodos(sortedTodos)
    }
    const createTodo = () =>{
        if(newtodo.trim().length === 0){
            return
        }
        const newTodos = [...todos, {id:uuidv4(),value:newtodo,isEditing:false,isDone:false}]
        setAndSortTodos(newTodos)
        setNewTodo("")
        if(inputEl.current){
            inputEl.current.focus() 
        }
    }
    const editTodo = (id:string) => {
        const newTodos = todos.map( (todoItem) => todoItem.id === id ? {...todoItem, isEditing:false} : todoItem)
        setAndSortTodos(newTodos)
    }

    const onKeyUp = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if(isKeyEnter(event.key)){
            createTodo()
        }
    }

    const onKeyUpEdit = (key:string, id:string) => {
        if(isKeyEnter(key)){
            editTodo(id)
        }
    }

    const isKeyEnter = (key:string) => {
        return key === 'Enter'
    }

    return (
        <div>
            <input className = "new-todo-input" data-testid = 'todo-list-new-todo-input' type="text" onKeyUp={onKeyUp} onChange={onChangeNewTodoItem} value={newtodo} ref={inputEl} autoFocus/> 
            <input className = "create-new-todo-button" data-testid = 'todo-list-new-todo-button' type="submit" disabled={newtodo.trim().length===0} onClick={onClickButton} value="submit"/>
            <ul className = "padding-elements" data-testid = 'todo-list-container'>
                { 
                    todos.map( val => <TodoItem 
                        key = {val.id}
                        todoItem = {val} 
                        onChangeExistingTodoItem = {onChangeExistingTodoItem} 
                        onClickDone = {onClickDone} 
                        onClickEdit = {onClickEdit} 
                        onClickRemove = {onClickRemove} 
                        onClickSave = {onClickSave} 
                        onKeyUpEdit = {onKeyUpEdit}/>) 
                 }
            </ul>
        </div> 
    ) ;
}
