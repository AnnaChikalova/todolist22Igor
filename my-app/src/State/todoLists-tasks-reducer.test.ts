import {TasksStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, todoListsReducer} from "./todoLists-reducer";

test.skip('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todoListId)
    expect(idFromTodoLists).toBe(action.payload.todoListId)
})