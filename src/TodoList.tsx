import AddItemForm from "./AddItemForm"
import { FilterValuesType } from "./AppWithRedux"
import { ChangeEvent } from "react"
import EditableSpan from "./EditableSpan"
import { IconButton, Checkbox, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from "react-redux"
import { AppRootState } from "./state/store"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'

export type TaskType = { 
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

const TodoList = (props: PropsType) => {
    const tasksObj = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

        
      function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
      }
    
      function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
      }

    const onAllClickHandler = () => {props.changeFilter("all", props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active", props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed", props.id)}
    const removeTodoList = () => {props.removeTodoList(props.id)}
    const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}

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
            <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))}/>
            <div style={{padding:"10px 0"}}>
                {
                    taskForTodolist.map(t => {
                        const onRemoveHandler = () => {dispatch(removeTaskAC(t.id, props.id))}
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))}
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                        }
                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox checked={t.isDone} onChange={onChangeStatusHandler}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : "text"} onClick={onActiveClickHandler}>Active</Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : "text"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList