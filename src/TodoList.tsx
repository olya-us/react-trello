import AddItemForm from "./AddItemForm"
import { FilterValuesType } from "./App"
import { ChangeEvent } from "react"
import EditableSpan from "./EditableSpan"
import { IconButton, Checkbox, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'

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
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

const TodoList = (props: PropsType) => {
    const onAllClickHandler = () => {props.changeFilter("all", props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active", props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed", props.id)}
    const removeTodoList = () => {props.removeTodoList(props.id)}
    const addTask = (title: string) => {props.addTask(title, props.id)}
    const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{padding:"10px 0"}}>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {props.removeTask(t.id, props.id)}
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatus(t.id, e.currentTarget.checked, props.id)}
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
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