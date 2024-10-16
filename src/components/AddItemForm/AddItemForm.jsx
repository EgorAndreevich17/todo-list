import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function AddItemForm({ addTodo }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue === '') return;
        addTodo({
          id: `task${Date.now()}`,
          value: inputValue,
          completed: false,
          createDate: new Date(),
        });
        setInputValue('');
      }}
    >
      <input
        ref={inputRef}
        onInput={(e) => {
          setInputValue(e.target.value);
        }}
        className="new-todo"
        placeholder="Type new task here"
        value={inputValue}
      />
    </form>
  );
}
AddItemForm.propTypes = {
  addTodo: PropTypes.func,
};
