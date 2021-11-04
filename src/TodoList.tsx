import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface TodoItem{
    id:string
    value:string
    isEditing:boolean
}

function TodoList(){
    const inputEl = useRef<HTMLInputElement>(null);
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [newtodo, setNewTodo] = useState<string>("")
    const onClickButton = (e: any) => {
        setTodos((todos) => ([...todos, {id:uuidv4(),value:newtodo,isEditing:false}]))
        setNewTodo("")
        if(inputEl.current){
            inputEl.current.focus() 
        }
    }
    const onChangeNewTodoItem = (e: any) => {
        setNewTodo(e.target.value)
    }
    const onChangeExistingTodoItem = (e: any, id: string) => {
        setTodos((todos) => (todos.map( (todoItem) => todoItem.id === id ? {...todoItem, value: e.target.value} : todoItem)))
    }
    const onClickRemove = (val: string) => {
        setTodos((todos) => (todos.filter( (valueItem) => valueItem.id !== val)))
    }
    const onClickEdit = (id: string) => {
        setTodos((todos) => (todos.map( (todoItem) => todoItem.id === id ? {...todoItem, isEditing:true} : todoItem)))
    }
    const onClickSave = (id:string) =>{
        setTodos((todos) => (todos.map( (todoItem) => todoItem.id === id ? {...todoItem, isEditing:false} : todoItem)))
    }

    return (
        <div>
            <input type="text" onChange={onChangeNewTodoItem} value={newtodo} ref={inputEl} autoFocus/> 
            <input type="submit" disabled={newtodo.trim().length===0} onClick={onClickButton} value="submit"/>
            <ul>
                { 
                    todos.map( val => <li key={val.id}>
                        {val.isEditing 
                            ? <>
                                <input type="text" value={val.value} onChange={ (e) => onChangeExistingTodoItem(e, val.id)} autoFocus/> 
                                <button onClick={() => onClickSave(val.id)}>save</button>
                              </>
                            : <>
                                {val.value} {' '}
                                <a href="#" onClick={ () => onClickRemove(val.id)}>remove</a>
                                {' '}
                                <a href="#" onClick={ () => onClickEdit(val.id)}>edit</a>
                              </>
                        }    
                    </li>) 
                 }
            </ul>
        </div> 

    ) ;

}

export default TodoList;