import './App.css'
import TodoList, { TaskType }  from './TodoList'
import AddItemForm from './AddItemForm'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'
import { useCallback } from 'react';

export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
  id: string,
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolist)
    
  //TODOLIST

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(value, todolistId))
  }, [dispatch])

  let removeTodoList = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }, [dispatch])

  const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(id, newTitle))
  }, [dispatch])

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])

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
              return <Grid item key={tl.id}>
                  <Paper elevation={6} style={{padding:"15px"}}>
                    <TodoList 
                      key={tl.id}
                      id={tl.id}
                      title={tl.title} 
                      changeFilter={changeFilter}
                      filter={tl.filter}
                      removeTodoList={removeTodoList}
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

export default AppWithRedux