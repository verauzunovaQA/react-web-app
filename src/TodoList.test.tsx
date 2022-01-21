import { fireEvent, render, screen } from '@testing-library/react';
import { storeInput } from './storage';
import { TodoItemObj } from './TodoItem';
import { TodoList } from './TodoList';

jest.mock('./storage', () => ({storeInput: {
    get: jest.fn(),
    add: jest.fn()
    }
}))

let onChangeExistingTodoItem: (newValue:string, id:string) => void
jest.mock('./TodoItem', () => ({
    TodoItem: (props:{
        onChangeExistingTodoItem:any
    }) => {
        onChangeExistingTodoItem = props.onChangeExistingTodoItem
        return <div></div>
    },
}))

test('Should disable new todo button when input field is empty', () => {
    render(<TodoList />)
    const newTodoButtonEl = screen.getByTestId('todo-list-new-todo-button')
    expect(newTodoButtonEl).toHaveAttribute('disabled')
})

test('Should enable new todo button when input field is populated', () => {
    render(<TodoList />)
    const newTodoInputEl = screen.getByTestId('todo-list-new-todo-input')
    fireEvent.change(newTodoInputEl, {
        target:{
            value: "New item."
        }
    })
    const newTodoButtonEl = screen.getByTestId('todo-list-new-todo-button')
    expect(newTodoButtonEl).not.toHaveAttribute('disabled')
})

test('Should create new todo when clicking save button', () => {
    render(<TodoList />)
    const newTodoInputEl = screen.getByTestId('todo-list-new-todo-input')
    fireEvent.change(newTodoInputEl, {
        target:{
            value: "New item."
        }
    })
    const containerEl = screen.getByTestId('todo-list-container')
    expect(containerEl.children).toHaveLength(0)
    const newTodoButtonEl = screen.getByTestId('todo-list-new-todo-button')
    fireEvent.click(newTodoButtonEl)
    expect(containerEl.children).toHaveLength(1)
})

test('Should not create todo item when the Enter key is pressed and the input field is empty', () => {
    render(<TodoList />)
    const newTodoInputEl = screen.getByTestId('todo-list-new-todo-input')
    fireEvent.keyUp(newTodoInputEl, {
        key:"Enter"
    })
    const containerEl = screen.getByTestId('todo-list-container')
    expect(containerEl.children).toHaveLength(0)
})

test('Should not update existing todo item when new value is empty', () => {
    render(<TodoList />)
    onChangeExistingTodoItem(" ", "123")
    expect(storeInput.add).toBeCalledTimes(0)
})

test('Should update existing todo item when new value is not empty', () => {
    const todoItems: TodoItemObj[] = [
        {isDone:false,isEditing:false,id:"123",value:"New-new",createdAt:"",updatedAt:""},
        {isDone:false,isEditing:false,id:"1234",value:"New-new-",createdAt:"",updatedAt:""}
    ]
    ;(storeInput.get as jest.Mock).mockReturnValue(todoItems)
    render(<TodoList />)
    onChangeExistingTodoItem("New thing", "123")
    expect(storeInput.add).toBeCalledTimes(1)
})