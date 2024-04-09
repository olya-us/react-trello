import AddItemForm from "./AddItemForm"
import { FilterValuesType } from "./App"
import { ChangeEvent } from "react"

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
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

const TodoList = (props: PropsType) => {
    const onAllClickHandler = () => {props.changeFilter("all", props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active", props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed", props.id)}
    const removeTodoList = () => {props.removeTodoList(props.id)}

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title} 
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {props.removeTask(t.id, props.id)}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatus(t.id, e.currentTarget.checked, props.id)}
                        
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