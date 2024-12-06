import { useState } from 'react'
import PropTypes from 'prop-types'

export default function TasksFilter({ setRenderRule }) {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const changeFilter = (filter) => {
    setSelectedFilter(filter)
    setRenderRule(filter)
  }

  return (
    <ul className="filters">
      <li className={selectedFilter === 'all' ? 'selected' : null}>
        <button onClick={() => changeFilter('all')}>All</button>
      </li>
      <li className={selectedFilter === 'active' ? 'selected' : null}>
        <button onClick={() => changeFilter('active')}>Active</button>
      </li>
      <li className={selectedFilter === 'completed' ? 'selected' : null}>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  setRenderRule: PropTypes.func.isRequired,
}
