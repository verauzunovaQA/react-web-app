export interface TodoItemObj{
    id:string
    value:string
    isEditing:boolean
    isDone:boolean
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
            <span className = {`todo-item-status-icon${props.todoItem.isDone ? ' is-done':''}`} onClick={ () => props.onClickDone(props.todoItem.id)}>
            </span> 
            {props.todoItem.isEditing 
                ? <>
                    <input className = "input-field" type="text" onKeyUp={(e) => props.onKeyUpEdit(e.key, props.todoItem.id)} value={props.todoItem.value} onChange={ (e) => props.onChangeExistingTodoItem(e.currentTarget.value, props.todoItem.id)} autoFocus/> 
                    <button className = "todo-button save-button" onClick={() => props.onClickSave(props.todoItem.id)}>save</button>
                    </>
                : <>
                    <span className = "input-list-items">{props.todoItem.value} {' '}</span>
                    <button className = "todo-button" onClick={ () => props.onClickEdit(props.todoItem.id)}>edit</button>
                    {' '}
                    <button className = "todo-button" onClick={ () => props.onClickRemove(props.todoItem.id)}>remove</button>
                </>
            }    
        </li>
    )
}