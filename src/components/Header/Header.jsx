import AddItemForm from '../AddItemForm/AddItemForm'
// import './Header.scss';

export default function Header({ addToDo }) {
  return (
    <header className="header">
      <h1>My todos</h1>
      <AddItemForm autofocus addToDo={addToDo} />
    </header>
  )
}
