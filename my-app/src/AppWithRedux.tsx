import React from 'react';
import './App.css';
import {TaskType} from './TodoListWithRedux';

import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./BasicAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./State/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {TodoListWithRedux} from "./TodoListWithRedux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    // let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    //     {id: todoListId1, title: "What to learn", filter: "all"},
    //     {id: todoListId2, title: "What to buy", filter: "all"}
    // ])

    // let [todoLists, todoListsDispatch] = useReducer(todoListsReducer,[
    //     {id: todoListId1, title: "What to learn", filter: "all"},
    //     {id: todoListId2, title: "What to buy", filter: "all"}
    // ])

    let todoLists= useSelector<AppRootStateType, Array<TodoListType>>(state=>state.todoLists)
    let tasks=useSelector<AppRootStateType, TasksStateType >(state=>state.tasks)
    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todoListId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // })

    // let [tasks, tasksDispatch] = useReducer(tasksReducer,{
    //     [todoListId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // })
    let dispatch = useDispatch()
    function removeTask(todoListId: string, taskId: string) {
        // setTasks({...tasks, [todoListId]:tasks[todoListId].filter(el=>el.id!==taskId)})
        dispatch(removeTaskAC(todoListId, taskId))
    }
    function addTask(todoListId: string, title: string) {
        // let newTask = {id: v1(), title: title, isDone: false};
        // setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask ] })
        dispatch(addTaskAC(todoListId, title))

    }
    function changeTaskStatus(todoListId: string, taskId: string, isDone: boolean) {
       dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    }
    function changeTaskTitle(todoListId: string, taskId: string, newTitle: string) {
       dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
    }
    function removeTodoList(todoListId: string) {
        dispatch(removeTodoListAC(todoListId))
    }
    function changeTodoListFilter(todoListId: string, value: FilterValuesType) {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }
    function changeTodoListTitle(todoListId: string, title: string) {
       dispatch(changeTodoListTitleAC(todoListId, title))
    }
    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))

    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}} >
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id];
                            let tasksForTodoList = allTodoListTasks;

                            if (tl.filter === "active") {
                                tasksForTodoList = allTodoListTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = allTodoListTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding:'10px'}}>
                            <TodoListWithRedux
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                // tasks={tasksForTodoList}
                                // removeTask={removeTask}
                                // changeTodoListFilter={changeTodoListFilter}
                                // addTask={addTask}
                                // changeTaskStatus={changeTaskStatus}
                                filter={tl.filter}
                                // removeTodolist={removeTodoList}
                                // changeTaskTitle={changeTaskTitle}
                                // changeTodolistTitle={changeTodoListTitle}
                            />
                                </Paper>
                                </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
