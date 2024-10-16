import './App.scss';
import Footer from './components/Footer/Footer.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import NewTaskForm from './components/AddItemForm/AddItemForm.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [renderRule, setRenderRule] = useState('all');
  const addTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };
  const updateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === updatedTodo.id) return updatedTodo;
        return item;
      }),
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  const clearCompleted = () => {
    setTodos(todos.filter((item) => !item.completed));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTodos([...todos]);
    }, 1000);

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>my todo&apos;s</h1>
          <NewTaskForm addTodo={addTodo} />
        </header>
        <section className="main">
          <TaskList
            todos={todos}
            editTodo={updateTodo}
            deleteTodo={deleteTodo}
            renderRule={renderRule}
          />
          <Footer todos={todos} clearCompleted={clearCompleted} setRenderRule={setRenderRule} />
        </section>
      </section>
    </>
  );
}

export default App;
