import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export default function AddItemForm({ addToDo }) {
  const [inputValue, setInputValue] = useState('')
  const [inputMins, setInputMins] = useState('')
  const [inputSecs, setInputSecs] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleNumericInput = (e, setter) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setter(value)
    }
  }

  return (
    <form
      className="new-todo-form"
      onSubmit={(e) => {
        e.preventDefault()
        const mins = parseInt(inputMins) || 0
        const secs = parseInt(inputSecs) || 0
        if (mins + secs === 0 || inputValue.trim() === '') return
        console.log(`input value: ${inputValue}`)
        console.log(`input mins: ${inputMins}`)
        console.log(`input secs: ${inputSecs}`)
        addToDo({
          id: `task${Date.now()}`,
          value: inputValue,
          completed: false,
          createDate: new Date(),
          timeLeft: mins * 60 + secs,
          isPaused: false,

        })
        console.log(`submitted`)
        setInputValue('')
        setInputSecs('')
        setInputMins('')
      }}
    >
      <input
        // onKeyDown={(e) => {
        //   if (e.key === 'Enter') {
        //     handleSubmit(e)
        //   }
        // }}
        ref={inputRef}
        onInput={(e) => {
          setInputValue(e.target.value)
        }}
        className="new-todo"
        placeholder="Type new task"
        value={inputValue}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onInput={(e) => {
          handleNumericInput(e, setInputMins)
        }}
        value={inputMins}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onInput={(e) => {
          handleNumericInput(e, setInputSecs)
        }}
        value={inputSecs}
      />
      <button style={{'visibility': 'hidden'}} type="submit">submit</button>
    </form>
  )
}

AddItemForm.propTypes = {
  addToDo: PropTypes.func,
}
