import { ChangeEvent, useCallback, memo } from "react"
import { useDispatch } from "react-redux"
import { IconButton, Checkbox } from "@mui/material"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'
import DeleteIcon from '@mui/icons-material/Delete'
import EditableSpan from "./EditableSpan"
import { TaskType } from "./TodoList"

type TaskPropsType = {
    t: TaskType
    todolistId: string
}

const Task = memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = () => {dispatch(removeTaskAC(props.t.id, props.todolistId))}
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {dispatch(changeTaskStatusAC(props.t.id, e.currentTarget.checked, props.todolistId))}
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.t.id, newValue, props.todolistId))
    }, [props.t.id, props.todolistId])

    return (
        <div key={props.t.id} className={props.t.isDone ? "is-done" : ""}>
            <Checkbox checked={props.t.isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.t.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
    )
})

export default Task