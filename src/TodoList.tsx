import AddItemForm from "./AddItemForm"
import { FilterValuesType } from "./AppWithRedux"
import { useCallback, memo } from "react"
import EditableSpan from "./EditableSpan"
import { IconButton, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from "react-redux"
import { AppRootState } from "./state/store"
import Task from "./Task"
import { addTaskAC } from './state/tasks-reducer'

export type TaskType = { 
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

const TodoList = memo((props: PropsType) => {
    const tasksObj = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => {props.changeFilter("all", props.id)}, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {props.changeFilter("active", props.id)}, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {props.changeFilter("completed", props.id)}, [props.changeFilter, props.id])
    const removeTodoList = useCallback(() => {props.removeTodoList(props.id)}, [props.removeTodoList, props.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}, [props.changeTodolistTitle, props.id])

    let allTodolistTasks = tasksObj
    let taskForTodolist = allTodolistTasks

    if(props.filter === "completed") {
      taskForTodolist = allTodolistTasks.filter(t => t.isDone === true)
    }
    if(props.filter === "active") {
      taskForTodolist = allTodolistTasks.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={useCallback((title) => dispatch(addTaskAC(title, props.id)), [dispatch])}/>
            <div style={{padding:"10px 0"}}>
                {
                    taskForTodolist.map(t => <Task t={t} key={t.id} todolistId={props.id}/>)
                }    
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : "text"} onClick={onActiveClickHandler}>Active</Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : "text"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})
 
export default TodoList