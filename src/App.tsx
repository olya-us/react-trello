import { useState } from 'react'
import './App.css'
import TodoList, { TaskType } from './TodoList'

export type FilterValuesType = "all" | "completed" | "active"

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
  ])

  let [filter, setFilter] = useState<FilterValuesType>("all")
  
  function removeTask(id: number) {
    let filteredTasks = tasks.filter((item) => item.id !== id)
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let taskForTodolist = tasks
  if(filter === "completed") {
    taskForTodolist = tasks.filter(t => t.isDone === true)
  }
  if(filter === "active") {
    taskForTodolist = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <TodoList title="What I learn" 
                removeTask={removeTask}
                tasks={taskForTodolist}
                changeFilter={changeFilter}
      />
    </div>
  )
}

export default App