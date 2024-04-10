import { ChangeEvent, KeyboardEventHandler, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
            <TextField value={newTaskTitle} 
                variant={'outlined'}
                label={'Type value'}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
                size="small"
            />
            <IconButton onClick={addTask} color={'primary'}><AddCircleOutlineIcon/></IconButton> 
        </div>
    )
}

export default AddItemForm