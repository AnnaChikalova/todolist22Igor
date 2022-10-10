import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export const todoListsReducer=(state:Array<TodoListType>, action:mainType):Array<TodoListType>=>{
     switch(action.type) {
         case 'REMOVE-TODOLIST':{
             return state.filter(el=>el.id!==action.payload.id)
         }
         case 'ADD-TODOLIST':{

             let newTodoList: TodoListType = {id: action.payload.todoListId, title: action.payload.newTodolistTitle, filter: 'all'}
             return  [...state, newTodoList]
         }
         case 'CHANGE-TODOLIST-TITLE':{
          return state.map(el=>el.id===action.payload.todoListId?{...el, title:action.payload.title}:el)
         }
         case "CHANGE-TODOLIST-FILTER": {
             return state.map(el=>el.id===action.payload.todoListId?{...el, filter:action.payload.value}:el)
         }
         default: return state
    }
  }

type mainType= removeTodoListACType | addTodoListACType | changeTodoListTitleACType | changeTodoListFilterACType
export type removeTodoListACType= ReturnType< typeof removeTodoListAC>
export type addTodoListACType=ReturnType<typeof addTodoListAC>
type changeTodoListTitleACType=ReturnType<typeof changeTodoListTitleAC>
type changeTodoListFilterACType=ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC=(id: string)=>{
    return {
        type:'REMOVE-TODOLIST',
        payload:{
            id:id
        }
    } as const
}
export const addTodoListAC=(newTodolistTitle: string)=>{
    return {
        type: 'ADD-TODOLIST',
        payload:{newTodolistTitle, todoListId:v1() }
    } as const

}
export const changeTodoListTitleAC=(todoListId: string, title: string)=>{
    return {
        type:'CHANGE-TODOLIST-TITLE',
        payload:{
            todoListId:todoListId,
            title:title
        }

    } as const
}
export const changeTodoListFilterAC=(todoListId: string, value: FilterValuesType)=>{
    return {
        type:'CHANGE-TODOLIST-FILTER',
        payload:{
            todoListId:todoListId,
            value:value
        }
    } as const
}