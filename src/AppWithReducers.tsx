import { useReducer } from 'react'
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
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer'


export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
  id: string,
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: "What I learn", filter: "all"},
    {id: todolistId2, title: "What I buy", filter: "all"}
  ])

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

  //TASKS
  
  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId))
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
  }
  
  //TODOLIST

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToTodolistReducer(changeTodolistFilterAC(value, todolistId))
  }

  let removeTodoList = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolistReducer(action)
    dispatchToTasksReducer(action)
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    dispatchToTodolistReducer(changeTodolistTitleAC(id, newTitle))
  }

  function addTodoList(title: string){
    const action = addTodolistAC(title)
    dispatchToTasksReducer(action)
    dispatchToTodolistReducer(action)
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

export default AppWithReducers