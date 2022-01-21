import { Link } from "react-router-dom";

export interface TodoItemObj{
    id:string
    value:string
    isEditing:boolean
    isDone:boolean
    createdAt:string
    updatedAt:string
}

interface Props{
    todoItem:TodoItemObj
    onClickDone:(id:string) => void
    onKeyUpEdit:(key:string, id:string) => void
    onChangeExistingTodoItem:(newValue:string, id:string) => void
    onClickSave:(id:string) => void
    onClickEdit:(id:string) => void
    onClickRemove:(id:string) => void
}

export function TodoItem(props:Props){
    return(
        <li className = "todo-separate-items">
            <span className = {`todo-item-status-icon${props.todoItem.isDone ? ' is-done':''}`} data-testid = 'todo-item-toggle-done' onClick={ () => props.onClickDone(props.todoItem.id)}>
            </span> 
            {props.todoItem.isEditing 
                ? <>
                    <input className = "input-field" data-testid = "todo-item-change-existing-item" type="text" onKeyUp={(e) => props.onKeyUpEdit(e.key, props.todoItem.id)} value={props.todoItem.value} onChange={ (e) => props.onChangeExistingTodoItem(e.currentTarget.value, props.todoItem.id)} autoFocus/> 
                    <button className = "todo-button save-button" data-testid = "todo-item-save-button" onClick={() => props.onClickSave(props.todoItem.id)}>save</button>
                    </>
                : <>
                    <Link className = "input-list-items" data-testid = "todo-item-value" to={`todos/${props.todoItem.id}`}>{props.todoItem.value}</Link>
                    {' '}
                    <button className = "todo-button" data-testid = "todo-item-edit-button" onClick={ () => props.onClickEdit(props.todoItem.id)}>edit</button>
                    {' '}
                    <button className = "todo-button" data-testid = "todo-item-remove-button" onClick={ () => props.onClickRemove(props.todoItem.id)}>remove</button>
                </>
            }    
        </li>
    )
}