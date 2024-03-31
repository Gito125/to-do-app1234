import React, { useState } from 'react'
import toggleDark_Icon from '../images/icon-moon.svg'
import toggleLight_Icon from '../images/icon-sun.svg'

const ToDoHeader = ({theme, handleThemeChange, handleSubmit}) => {
  const [input, setInput] = useState('')
  const handleInputSubmited = () => {
    setInput('')
  }

  return (
    <div className="toDoHeader">
      <div className="mb-12 flex justify-between items-center">
        <h1 className="font-semibold text-5xl text-white" style={{letterSpacing: '10px'}}>TODO</h1>
        <button onClick={handleThemeChange} type="button">
          <img src={ theme === 'light' ? toggleDark_Icon : toggleLight_Icon } alt="theme-icon" />
        </button>
      </div>

      <form onSubmit={e => {
        handleSubmit(e, input)
        handleInputSubmited()
      }} className={theme === 'light' ? `bg-white flex justify-start transition-all ease-in items-center shadow-lg shadow-gray-300 sm:shadow-none p-3 my-7 w-full rounded-lg`
        :'bg-veryDarkDesaturatedBlue flex justify-start transition-all ease-in items-center shadow-lg shadow-black2 sm:shadow-none p-3 my-7 w-full rounded-lg'}>
        <button type="submit" className="w-5 h-5 border-2 border-gray-300 hover:border-primary rounded-full mr-3"></button>
        <input onChange={e => setInput(e.target.value)} value={input} required type="text" name="taskName" id="taskName" placeholder="Create a new todo..." className="outline-none border-none bg-inherit w-full p-1 text-lg text-gray-500 font-semibold" />
      </form>
    </div>
  )
}

export default ToDoHeader