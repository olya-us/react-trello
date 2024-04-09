import { useState } from 'react'
import './App.css'
import TodoList, { TaskType }  from './TodoList'
import AddItemForm from './AddItemForm'
import { v1 } from 'uuid'

export type FilterValuesType = "all" | "completed" | "active"

type TodoListType = {
  id: string,
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter((item) => item.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj})
  }

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false}
    let tasks = tasksObj[todolistId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj})
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if(task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if(task) {
      task.title = newTitle
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if(todolist){
      todolist.filter = value;
      setTodolist([...todolists])
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolist] = useState<Array<TodoListType>>([
    {id: todolistId1, title: "What I learn", filter: "all"},
    {id: todolistId2, title: "What I buy", filter: "all"}
  ])

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter(tl => tl.id !== todolistId)
    setTodolist(filteredTodoList)
    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id)
    if(todolist) {
      todolist.title = newTitle
      setTodolist([...todolists])
    }
  }

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Book", isDone: false},
    ]
  })

  function addTodoList(title: string){
    let todolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolist([todolist, ...todolists])
    setTasks({...tasksObj, [todolist.id]: []})
  }

  

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList}/>
      {
        todolists.map(tl => {
          let taskForTodolist = tasksObj[tl.id]

          if(tl.filter === "completed") {
            taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
          }
          if(tl.filter === "active") {
            taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
          }

          return <TodoList 
                    key={tl.id}
                    title={tl.title} 
                    id={tl.id}
                    removeTask={removeTask}
                    tasks={taskForTodolist}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
          />
        })
      }
    </div>
  )
}

export default App