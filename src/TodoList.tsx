import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { storeInput } from "./storage";
import './TodoList.css';

interface TodoItem{
    id:string
    value:string
    isEditing:boolean
    isDone:boolean
}

function TodoList(){
    const todoData= storeInput.get("todos") ?? []
    const inputEl = useRef<HTMLInputElement>(null);
    const [todos, setTodos] = useState<TodoItem[]>(todoData)
    const [newtodo, setNewTodo] = useState<string>("")
    const onClickButton = (e: any) => {
        const newTodos = [...todos, {id:uuidv4(),value:newtodo,isEditing:false,isDone:false}]
        setAndSortTodos(newTodos)
        setNewTodo("")
        if(inputEl.current){
            inputEl.current.focus() 
        }
    }
    const onChangeNewTodoItem = (e: any) => {
        setNewTodo(e.target.value)
    }
    const onChangeExistingTodoItem = (e: any, id: string) => {
        const newTodos = todos.map( (todoItem) => todoItem.id === id ? {...todoItem, value: e.target.value} : todoItem)
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
        const newTodos = todos.map( (todoItem) => todoItem.id === id ? {...todoItem, isEditing:false} : todoItem)
        setAndSortTodos(newTodos)
    }
    const onClickDone = (id:string) =>{
        const newTodos = todos.map( (todoItem) => todoItem.id === id ? {...todoItem, isDone:!todoItem.isDone} : todoItem)
        setAndSortTodos(newTodos)
    }
    const setAndSortTodos = (todos:TodoItem[], addToStorage=true) =>{
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

    return (
        <div>
            <input type="text" onChange={onChangeNewTodoItem} value={newtodo} ref={inputEl} autoFocus/> 
            <input type="submit" disabled={newtodo.trim().length===0} onClick={onClickButton} value="submit"/>
            <ul className = "padding-elements">
                { 
                    todos.map( val => <li className = "todo-separate-items" key={val.id}>
                        <span className = {`todo-item-status-icon${val.isDone ? ' is-done':''}`} onClick={ () => onClickDone(val.id)}>
                            </span> 
                        {val.isEditing 
                            ? <>
                                <input className = "input-field" type="text" value={val.value} onChange={ (e) => onChangeExistingTodoItem(e, val.id)} autoFocus/> 
                                <button className = "todo-button save-button" onClick={() => onClickSave(val.id)}>save</button>
                              </>
                            : <>
                                {val.value} {' '}
                                <button className = "todo-button" onClick={ () => onClickEdit(val.id)}>edit</button>
                                {' '}
                                <button className = "todo-button" onClick={ () => onClickRemove(val.id)}>remove</button>
                              </>
                        }    
                    </li>) 
                 }
            </ul>
        </div> 

    ) ;

}

export default TodoList;