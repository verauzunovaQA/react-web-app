import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TodoList } from './TodoList';
import { TodoPage } from './TodoPage';

function App() {
  return (
    <div>
      <header className="App-header">
      <h1>ToDoList</h1>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todos/:todoId" element={<TodoPage />} />
      </Routes>
      </header>
    </div>
  );
}

export default App;
