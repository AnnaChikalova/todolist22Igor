import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType} from "./todoLists-reducer";


export const tasksReducer=(state:TasksStateType, action:mainType): TasksStateType=>{
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state,
        [action.payload.todoListId]:state[action.payload.todoListId].filter(el=>el.id!==action.payload.taskId)}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoListId]:[newTask, ...state[action.payload.todoListId]] }
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,
                [action.payload.todoListId]:state[action.payload.todoListId]
                .map(el=>el.id===action.payload.taskId
                    ?
                    {...el, isDone: action.payload.isDone }
                    :
                    el)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state,
                [action.payload.todoListId]:state[action.payload.todoListId]
                    .map(el=>el.id===action.payload.taskId
                        ?
                        {...el, title: action.payload.newTitle }
                        :
                        el)}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
            }

        default: return state
     }
}
type mainType= removeTaskACType
               | addTaskACType
               | changeTaskStatusACType
               | changeTaskTitleACType
               | addTodoListACType
               |removeTodoListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC=(todoListId: string, taskId: string)=>{
    return {
        type:'REMOVE-TASK',
        payload:{todoListId, taskId}
    } as const
}
export const addTaskAC=(todoListId: string, title: string)=>{
    return {
        type:'ADD-TASK',
        payload:{todoListId, title }
    } as const
}
export const changeTaskStatusAC=(todoListId: string, taskId: string, isDone: boolean)=>{
    return {
        type:'CHANGE-TASK-STATUS',
        payload:{todoListId, taskId, isDone }
    } as const
}
export const changeTaskTitleAC=(todoListId: string, taskId: string, newTitle: string)=>{
    return {
        type:'CHANGE-TASK-TITLE',
        payload:{todoListId, taskId, newTitle}
    } as const
}