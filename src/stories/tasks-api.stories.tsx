import axios from "axios";
import { useState, useEffect } from "react";
import { ResponseType } from "./todolists-api.stories";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "6740b680-3e58-4851-be65-23d2deb62fe9"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})


type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount : number
    items: TaskType[]
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistid = ''
        instance.get<GetTasksResponse>(`todo-lists/${todolistid}/tasks`)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistid = ''
        instance.post<GetTasksResponse>(`todo-lists/${todolistid}/tasks`, {title: "Olya"})
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistid = ''
        const taskId = ''
        instance.delete<ResponseType>(`todo-lists/${todolistid}/tasks/${taskId}`)
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistid = ''
        const taskId = ''
        instance.put<UpdateTaskType>(`todo-lists/${todolistid}/tasks/${taskId}`)
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}