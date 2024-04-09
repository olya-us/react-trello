import { ChangeEvent, KeyboardEventHandler, useState } from "react"
import { FilterValuesType } from "./App"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

const TodoList = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        setError(null)
        if (e.key === 'Enter'){
            props.addTask(newTaskTitle) 
            setNewTaskTitle("")
        }    
    } 

    const addTask = () => {
        if(newTaskTitle.trim() === ""){
            setError("Title is required")
            return false
        }
        props.addTask(newTaskTitle) 
        setNewTaskTitle("")
    }

    const onAllClickHandler = () => {props.changeFilter("all")}
    const onActiveClickHandler = () => {props.changeFilter("active")}
    const onCompletedClickHandler = () => {props.changeFilter("completed")}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} 
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}    
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {props.removeTask(t.id)}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatus(t.id, e.currentTarget.checked)}
                        
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList