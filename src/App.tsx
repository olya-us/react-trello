import { useState } from 'react'
import './App.css'
import TodoList, { TaskType } from './TodoList'
import { v1 } from 'uuid'

export type FilterValuesType = "all" | "completed" | "active"

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
  ])

  let [filter, setFilter] = useState<FilterValuesType>("all")
  
  function removeTask(id: string) {
    let filteredTasks = tasks.filter((item) => item.id !== id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if(task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
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
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
      />
    </div>
  )
}

export default App