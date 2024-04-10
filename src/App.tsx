import { useState } from 'react'
import './App.css'
import TodoList, { TaskType }  from './TodoList'
import AddItemForm from './AddItemForm'
import { v1 } from 'uuid'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trello
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "30px 0"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let taskForTodolist = tasksObj[tl.id]

              if(tl.filter === "completed") {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
              }
              if(tl.filter === "active") {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
              }

              return <Grid item>
                  <Paper elevation={6} style={{padding:"15px"}}>
                    <TodoList 
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
                  </Paper>
                </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  )
}

export default App