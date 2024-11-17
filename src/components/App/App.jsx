// import './App.scss';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
// import AddItemForm from '../AddItemForm/AddItemForm';
import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [renderRule, setRenderRule] = useState('all')

  const addToDo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo])
    console.log(`adder new todo`)
    console.log(todos)
  }

  const updateTodo = (updatedTodo) => {
    setTodos((prev) => prev.map((task) => (task.id === updatedTodo.id ? updatedTodo : task)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }
  const clearCompleted = () => {
    setTodos(todos.filter((item) => !item.completed))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((task) => {
          // Если задача на паузе или таймер уже завершился, ничего не делаем
          if (task.isPaused) return task
          if (task.timeLeft <= 0) return { ...task, completed: true, timeLeft: 0 };
          return { ...task, timeLeft: task.timeLeft - 1 }
        }),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="todoapp">
        {/* <header className="header">
          <h1>my todo&apos;s</h1>
          <AddItemForm addTodo={addTodo} />
        </header> */}
        <Header addToDo={addToDo} />
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
  )
}

export default App
