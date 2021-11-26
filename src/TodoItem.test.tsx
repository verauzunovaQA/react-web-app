import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem, TodoItemObj } from './TodoItem';

const todoItem:TodoItemObj = {
    id:"Dummy id",
    isDone:false,
    isEditing:false,
    value:"Read"
}
test('should display todoItem value', () => {
    render(<TodoItem 
        todoItem = {todoItem} 
        onChangeExistingTodoItem = {() => null} 
        onClickDone = {() => null} 
        onClickEdit = {() => null} 
        onClickRemove = {() => null} 
        onClickSave = {() => null} 
        onKeyUpEdit = {() => null}/>)
    const todoItemValueEl = screen.getByTestId("todo-item-value")
    expect(todoItemValueEl.textContent).toEqual(todoItem.value)
})

test('should invoke onClickEdit callback when edit button is clicked', () => {
    const mockOnClickEdit = jest.fn()
    render(<TodoItem 
        todoItem = {todoItem} 
        onChangeExistingTodoItem = {() => null} 
        onClickDone = {() => null} 
        onClickEdit = {mockOnClickEdit} 
        onClickRemove = {() => null} 
        onClickSave = {() => null} 
        onKeyUpEdit = {() => null}/>)
    const todoItemEditButtonEl = screen.getByTestId("todo-item-edit-button")
    fireEvent.click(todoItemEditButtonEl)
    expect(mockOnClickEdit).toBeCalledWith(todoItem.id)
})

test('should invoke onClickRemove callback when remove button is clicked', () => {
    const mockOnClickRemove = jest.fn()
    render(<TodoItem 
        todoItem = {todoItem} 
        onChangeExistingTodoItem = {() => null} 
        onClickDone = {() => null} 
        onClickEdit = {() => null} 
        onClickRemove = {mockOnClickRemove} 
        onClickSave = {() => null} 
        onKeyUpEdit = {() => null}/>)
    const todoItemRemoveButtonEl = screen.getByTestId("todo-item-remove-button")
    fireEvent.click(todoItemRemoveButtonEl)
    expect(mockOnClickRemove).toHaveBeenCalledWith(todoItem.id)
})

test('should invoke onClickSave callback when save button is clicked', () => {
    const mockOnClickSave = jest.fn()
    //const mockOnClickEdit = jest.fn()
    render(<TodoItem 
        todoItem = {todoItem} 
        onChangeExistingTodoItem = {() => null} 
        onClickDone = {() => null} 
        onClickEdit = {() => null} 
        onClickRemove = {() => null} 
        onClickSave = {mockOnClickSave} 
        onKeyUpEdit = {() => null}/>)
    //const todoItemEditButtonEl = screen.getByTestId("todo-item-edit-button")
    //fireEvent.click(todoItemEditButtonEl)
    const todoItemSaveButtonEl = screen.getByTestId("todo-item-save-button")
    fireEvent.click(todoItemSaveButtonEl)
    expect(mockOnClickSave).toHaveBeenLastCalledWith(todoItem.id)
})