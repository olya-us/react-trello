import { todolistsReducer, removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } from './todolists-reducer';
import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../App';
import { it, expect } from 'vitest'

it('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What I learn', filter: "all"},
        {id: todolistId2, title: 'What I buy', filter: "all"},
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

it('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What I learn', filter: "all"},
        {id: todolistId2, title: 'What I buy', filter: "all"},
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
})

it('correct todolist should change it name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What I learn', filter: "all"},
        {id: todolistId2, title: 'What I buy', filter: "all"},
    ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What I learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})

it('correct filter of todolist should be change', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What I learn', filter: "all"},
        {id: todolistId2, title: 'What I buy', filter: "all"},
    ]

    const action = changeTodolistFilterAC(newFilter, todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
})