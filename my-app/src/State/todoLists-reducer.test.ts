
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, todoListsReducer} from './todoLists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodoListType} from '../App'

test.skip('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState,
        {type: 'REMOVE-TODOLIST',
            payload:{
                id: todolistId1
            }
            })

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test.skip('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test.skip('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListId: todolistId2,
        title: newTodolistTitle
    }

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId2,newTodolistTitle ))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test.skip('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListId: todolistId2,
        value: newFilter
    }

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})