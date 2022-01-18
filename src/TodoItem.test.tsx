import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem, TodoItemObj } from './TodoItem';

const todoItem:TodoItemObj = {
    id:"Dummy id",
    isDone:false,
    isEditing:false,
    value:"Read"
}

describe('TodoItem', () => {
    describe('given a TodoItem', () => {
        const mockOnClickEdit = jest.fn()
        const mockOnClickRemove = jest.fn()
        const mockOnClickDone = jest.fn()
        beforeEach(() =>{
            const todoItem:TodoItemObj = {
                id:"Dummy id",
                isDone:false,
                isEditing:false,
                value:"Read"
            }
            
            render(<TodoItem 
                todoItem = {todoItem} 
                onChangeExistingTodoItem = {() => null} 
                onClickDone = {mockOnClickDone} 
                onClickEdit = {mockOnClickEdit} 
                onClickRemove = {mockOnClickRemove} 
                onClickSave = {() => null} 
                onKeyUpEdit = {() => null}/>)
        })
        test('then the todoItem value should be displayed', () => {
            const todoItemValueEl = screen.getByTestId("todo-item-value")
            expect(todoItemValueEl.textContent).toEqual(todoItem.value)
        })
        describe('when edit button is clicked',() => {
            beforeEach(() => {
                const todoItemEditButtonEl = screen.getByTestId("todo-item-edit-button")
                fireEvent.click(todoItemEditButtonEl)
            })
            test('then onClickEdit callback should be invoked', () => {
                expect(mockOnClickEdit).toBeCalledWith(todoItem.id)
            })
        })
        describe('when remove button is clicked',() => {
            beforeEach(() => {
                const todoItemRemoveButtonEl = screen.getByTestId("todo-item-remove-button")
                fireEvent.click(todoItemRemoveButtonEl)
            })
            test('then onClickRemove callback should be invoked', () => {
                expect(mockOnClickRemove).toHaveBeenCalledWith(todoItem.id)
            })
        })
        describe('when marking a task as done', () =>{
            beforeEach(() =>{
                const todoItemDoneEl = screen.getByTestId("todo-item-toggle-done")
                fireEvent.click(todoItemDoneEl)
            })
            test('then onClickDone callback should be invoke', () => {
                expect(mockOnClickDone).toHaveBeenLastCalledWith(todoItem.id)
            })
        })
        
    })
    describe('given a todoItem being edited',() => {
        const mockOnClickSave = jest.fn()
        const mockOnKeyUpEdit = jest.fn()
        const mockOnChangeExistingItem = jest.fn()
        const todoItemBeingEdited:TodoItemObj = {...todoItem,isEditing:true}
        beforeEach(() => {
            render(<TodoItem 
                todoItem = {todoItemBeingEdited} 
                onChangeExistingTodoItem = {mockOnChangeExistingItem} 
                onClickDone = {() => null} 
                onClickEdit = {() => null} 
                onClickRemove = {() => null} 
                onClickSave = {mockOnClickSave} 
                onKeyUpEdit = {mockOnKeyUpEdit}/>)
        })
        describe('when save button is clicked',() =>{
            beforeEach(() =>{
                const todoItemSaveButtonEl = screen.getByTestId("todo-item-save-button")
                fireEvent.click(todoItemSaveButtonEl)
            })
            test('then onClickSave callback should be invoked', () => {  
                expect(mockOnClickSave).toHaveBeenLastCalledWith(todoItem.id)
            })
        })
        describe('when changing the todoItem value', () => {
            let todoItemChangeExistingItem: HTMLElement 
            beforeEach(() => {
                todoItemChangeExistingItem = screen.getByTestId("todo-item-change-existing-item")
                expect(todoItemChangeExistingItem).toBeInTheDocument()
                fireEvent.change(todoItemChangeExistingItem, {
                    target:{
                       value: "New item."
                    }
                })
            })
            test('then onChangeExistingItem callback should be invoked', () => {
                expect(mockOnChangeExistingItem).toBeCalledWith("New item.", todoItemBeingEdited.id)
            })
            describe('and the Enter key is pressed', () => {
                beforeEach(() => {
                    fireEvent.keyUp(todoItemChangeExistingItem, {key: 'Enter'})
                })
                test('then onKeyUpEdit callback should be invoked', () => {
                    expect(mockOnKeyUpEdit).toBeCalledWith("Enter", todoItemBeingEdited.id)
                })
            })
        })
        
    })
    describe('', () => {
        const todoItemIsDone:TodoItemObj = {...todoItem,isDone:true}
        
        beforeEach(() => {
            render(<TodoItem
                todoItem = {todoItemIsDone}
                onChangeExistingTodoItem = {() => null} 
                onClickDone = {() => null} 
                onClickEdit = {() => null} 
                onClickRemove = {() => null} 
                onClickSave = {() => null} 
                onKeyUpEdit = {() => null}/>)
        })
        describe('when a todo iten is done', () => {
            test('then should show check mark for a todo item', () => {
                const todoItemDoneEl = screen.getByTestId("todo-item-toggle-done")
                expect(todoItemDoneEl).toHaveClass("is-done")
            })
        })
    })
})

test('should show check mark for a todo item that is done', () => {
    const todoItemIsDone:TodoItemObj = {...todoItem,isDone:true}
    render(<TodoItem
        todoItem = {todoItemIsDone}
        onChangeExistingTodoItem = {() => null} 
        onClickDone = {() => null} 
        onClickEdit = {() => null} 
        onClickRemove = {() => null} 
        onClickSave = {() => null} 
        onKeyUpEdit = {() => null}/>)
    const todoItemDoneEl = screen.getByTestId("todo-item-toggle-done")
    expect(todoItemDoneEl).toHaveClass("is-done")
})