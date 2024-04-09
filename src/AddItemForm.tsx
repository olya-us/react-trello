import { ChangeEvent, KeyboardEventHandler, useState } from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        setError(null)
        if (e.key === 'Enter'){
            props.addItem(newTaskTitle) 
            setNewTaskTitle("")
        }    
    } 

    const addTask = () => {
        if(newTaskTitle.trim() !== ""){
            props.addItem(newTaskTitle.trim()) 
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input value={newTaskTitle} 
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}    
        </div>
    )
}

export default AddItemForm