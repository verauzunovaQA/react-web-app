import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { repository } from "./repository";

export function TodoPage(){
    let { todoId } = useParams();
    const todoItem = repository.getById(todoId as string)
    return(
        <>
            <div>Value: {todoItem?.value}</div>
            <div>Is done: {todoItem?.isDone ? 'Yes' : 'No'}</div>
            <div>Created at: {moment(todoItem?.createdAt).format('YYYY-MM-DD hh:mm')}</div>
            <div>Updated at: {moment(todoItem?.updatedAt).format('YYYY-MM-DD hh:mm')}</div>
            <Link to="/">Go home</Link>
        </>
    )
}