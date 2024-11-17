import { formatDistanceToNowStrict } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';

import playIcon from '../../images/play.png';
import pauseIcon from '../../images/pause.png';

export default function Task({ task, editTodo, deleteTodo }) {
  const [editValue, setEditValue] = useState(task.value);

  const handlePauseClick = () => {
    // Изменяем состояние задачи (пауза/возобновление)
    editTodo({ ...task, isPaused: !task.isPaused });
    console.log(`Task ${task.id} is now ${!task.isPaused ? 'paused' : 'resumed'}`);
  };

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          id={task.id}
          type="checkbox"
          checked={task.completed}
          onChange={() => editTodo({ ...task, completed: !task.completed })}
        />
        <label htmlFor={task.id}>
          <span>{task.value}</span>
          <span className="description">
            <button onClick={handlePauseClick}>
              {task.isPaused ? <img className='timer-icon' src={playIcon} /> : <img className='timer-icon' src={pauseIcon} />}
            </button>
            {parseInt(task.timeLeft / 60)}:{String(task.timeLeft % 60).padStart(2, '0')} left
          </span>
          <span className="description">
            {'created ' +
              formatDistanceToNowStrict(task.createDate, { includeSeconds: true, addSuffix: true })}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => !task.completed && editTodo({ ...task, editState: true })}
        ></button>
        <button className="icon icon-destroy" onClick={() => deleteTodo(task.id)}></button>
      </div>
      {task.editState && !task.completed && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editTodo({
              ...task,
              value: editValue.trim() === '' ? task.value : editValue,
              editState: false,
            });
          }}
        >
          <input
            type="text"
            className="edit"
            value={editValue}
            onInput={(e) => setEditValue(e.target.value)}
          />
        </form>
      )}
    </>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    completed: PropTypes.bool,
    value: PropTypes.string,
    createDate: PropTypes.instanceOf(Date),
    timeLeft: PropTypes.number,
    isPaused: PropTypes.bool,
    id: PropTypes.string,
    editState: PropTypes.bool,
  }),
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};
