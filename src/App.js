import React, { useState } from "react";
import "./styles/App.css";
import BgDesktop_Light from "./images/bg-desktop-light.jpg";
import BgDesktop_Dark from "./images/bg-desktop-dark.jpg"
import BgMobile_Dark from "./images/bg-mobile-dark.jpg"
import BgMobile_Light from "./images/bg-mobile-light.jpg";
import ActionButtons from "./components/ActionButtons";
import ListItem from "./components/ListItem/ListItem";
import ToDoHeader from "./components/ToDoHeader";

let initList = []

const initDnD = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: null,
  originalListOrder: [],
  newListOrder: []
}

const App = () => {
  window.onload = () => {
    alert("Drag and drop doesn't work on mobile devices...")
  }

  // State
  const [list, setList] = useState(initList)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [dragAndDrop, setDragAndDrop] = useState(initDnD)
  const [completedText, setCompletedText] = useState("😀Please enter something you'd like to do today...")

  document.body.style.transition = '1s ease'
  if (theme === 'light') { 
    document.body.style.backgroundColor = 'rgb(243 244 246)'
  } else { 
    document.body.style.backgroundColor = 'hsl(235, 21%, 11%)'
  }

  // Handlers
  const handleThemeChange = () => {
    console.log('handling theme...')
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      document.body.style.backgroundColor = 'hsl(235, 21%, 11%)'
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      document.body.style.backgroundColor = 'rgb(243 244 246)'
    }
  }
  const handleClearCompleted = () => {
    const notCompleted = initList.filter(item => item.isDone !== true)
    initList = [...notCompleted]
    setList(initList)
    handleActionButtonFilter('Active')
    console.log('cleared completed')
  }
  const handleSetCompletedText = action => {
    if (action==='All') {
      setCompletedText("😀Please enter something you'd like to do today...")
      
    } else if (action==='Completed') {
      setCompletedText("Nothing is completed...")
      
    } else if (action==='Active') {
      setCompletedText("You have no active todos right now 😎")
      
    }
  }
  const handleActionButtonFilter = action => {
    console.log('gona filter')
    let newList
    if (action==='All') {
      newList = initList
      setList(newList)
      handleSetCompletedText('All')
      
    } else if (action==='Completed') {
      newList = initList.filter(item => item.isDone === true)
      setList(newList)
      handleSetCompletedText('Completed')
      
    } else if (action==='Active') {
      newList = initList.filter(item => item.isDone === false)
      setList(newList)
      handleSetCompletedText('Active')
    }
  }
  const handle_toDoSubmit = (e, input) => {
    e.preventDefault()
    let id = (Math.random()*100000).toFixed(0).toString()
    const newItem = {
      id: `tx${id}`,
      text: input,
      isDone: false,
      time: new Date().getTime()
    }
    initList.unshift(newItem)
    initList.sort((a,b) => a.time-b.time)
    handleActionButtonFilter('Active')
    console.log('TODO ADDED')
  }
  const handleListItem_Click = id => {
    initList.forEach(item => {
      if(item.id===id) {
        item.isDone = !item.isDone
      }
    })
    console.log('toggle list click')
    setList(initList)
    handleActionButtonFilter('Active')
  }

  // Drag And Drop Code
  const onDragStart = e => {
    const initialPosition = Number(e.currentTarget.dataset.position)
    setDragAndDrop({
      ...dragAndDrop,
      isDragging: true,
      draggedFrom: initialPosition,
      originalListOrder: initList
    })
        
    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    e.dataTransfer.setData("text/html", "");
    console.log('isDragging...')
  }
  const onDragOver = e => {
    e.preventDefault()
    let newList = dragAndDrop.originalListOrder
    const draggedFrom = dragAndDrop.draggedFrom
    const draggedTo = Number(e.currentTarget.dataset.position)

    const itemDragged = newList[draggedFrom]
    const remainingItems = newList.filter((item, i) => i !== draggedFrom)

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ]

    if(draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        draggedTo: draggedTo,
        newListOrder: newList,
      })
    }
  }
  const onDrop = e => {
    e.preventDefault()
    
    initList = dragAndDrop.newListOrder
    setList(initList)
    
    setDragAndDrop({
      ...dragAndDrop,
      isDragging: false,
      draggedFrom: null,
      draggedTo: null
    })
    
    console.log('dropped...')
  }
  const onDragLeave = e => {
    e.preventDefault()
    
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    })
  }

  return (
    <div className="relative w-full">
      <header>
        <img src={theme === 'light' ? BgDesktop_Light : BgDesktop_Dark} className="w-full hidden sm:block" alt="background_image" />
        <img src={theme === 'light' ? BgMobile_Light : BgMobile_Dark} className="w-full sm:hidden" alt="background_image" />
      </header>

      <main className="flex justify-center items-center absolute top-12 mx-auto w-full">
        <div className="toDoListContainer relative top-10 w-10/12 md:w-6/12">
          <ToDoHeader theme={theme} handleThemeChange={handleThemeChange} handleSubmit={handle_toDoSubmit}/>

          <div className="toDoListMain sm:shadow-lg sm:rounded-lg shadow-gray-300 shadow-none">
            <ul className={theme === 'light' ? `bg-white shadow-lg shadow-gray-300 transition-all ease-in sm:shadow-none rounded-lg sm:rounded-t-lg sm:rounded-b-none h-72 overflow-y-scroll overflow-x-hidden` 
              : `bg-veryDarkDesaturatedBlue shadow-lg shadow-black2 sm:shadow-none transition-all ease-in -lg sm:rounded-t-lg sm:rounded-b-none h-72 overflow-y-scroll overflow-x-hidden`}>
              {list.length !== 0 ? 
                list.map((item,i) => (
                  <ListItem
                    i={i}
                    key={item.id}
                    item={item}
                    handleClick={handleListItem_Click}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    dragAndDrop={dragAndDrop}
                  />
                ))
              : <p className="p-10 text-gray-500 text-3xl">{completedText}</p>}
            </ul>

            <div className={theme === 'light' ? `bg-white transition-all ease-in toDoActions p-3 py-6 flex justify-between items-center rounded-lg sm:rounded-t-none mt-4 sm:mt-0  shadow-lg shadow-gray-300 sm:shadow-none`
              : 'bg-veryDarkDesaturatedBlue toDoActions transition-all ease-in p-3 py-6 flex justify-between items-center rounded-lg sm:rounded-t-none mt-4 sm:mt-0  shadow-lg shadow-black2 sm:shadow-none'}>
              <p className="text-sm font-semibold text-gray-400">{initList.filter(item => item.isDone === false).length} Items left</p>
              {/* Action Buttons for Desktop */}
              <div className="hidden sm:block">
                <ActionButtons handleFilter={handleActionButtonFilter} />
              </div>
              <button type="button" onClick={handleClearCompleted} className="text-sm font-semibold text-gray-400 hover:text-gray-700">Clear Completed</button>
            </div>

            {/* Action Buttons For Mobile */}
            <div className={theme === 'light' ? 'bg-white actionButtons transition-all ease-in p-4 py-2 mt-5 shadow-lg shadow-gray-300 sm:shadow-none rounded-lg sm:rounded-b-lg sm:rounded-t-none sm:hidden w-full flex justify-center items-center'
             : 'bg-veryDarkDesaturatedBlue actionButtons p-4 py-2 mt-5 shadow-lg transition-all ease-in shadow-black2 sm:shadow-none rounded-lg sm:rounded-b-lg sm:rounded-t-none sm:hidden w-full flex justify-center items-center'}>
              <ActionButtons handleFilter={handleActionButtonFilter} />
            </div>

          </div>

          <div className="toDoListFooter text-center mt-12">
            <p className="text-gray-500 font-semibold">Drag and drop to order list</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
