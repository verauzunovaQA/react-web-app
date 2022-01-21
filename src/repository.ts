import { storeInput } from "./storage";
import { TodoItemObj } from "./TodoItem";

class Repository{
    getById(id:string){
        const todos:TodoItemObj[] = storeInput.get("todos") ?? []
        return todos.find(todoItem => todoItem.id === id)
    }
}

export const repository = new Repository()