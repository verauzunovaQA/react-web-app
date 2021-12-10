import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { TodoItem, TodoItemObj } from "./TodoItem";
import { TodoList } from './TodoList';

const todoItem:TodoItemObj = {
    id:"Dummy id",
    isDone:false,
    isEditing:false,
    value:"Read"
}
let unmount:() => void

beforeEach( () => {
    ({unmount} = render(<TodoList />))
})

afterEach( () => {
    unmount()
    cleanup()
})

test('Should disable new todo button when input field is empty', () => {
    const newTodoButtonEl = screen.getByTestId('todo-list-new-todo-button')
    expect(newTodoButtonEl).toHaveAttribute('disabled')
})

test('Should enable new todo button when input field is populated', () => {
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

/*test('Should not create todo item when the Enter key is pressed and the input field is empty', () => {
    const newTodoInputEl = screen.getByTestId('todo-list-new-todo-input')
    fireEvent.keyUp(newTodoInputEl, {
        key:"Enter"
    })
    const containerEl = screen.getByTestId('todo-list-container')
    expect(containerEl.children).toHaveLength(0)
})*/