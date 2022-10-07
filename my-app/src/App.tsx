import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./BasicAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])


    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })

    function removeTask(todoListId: string, taskId: string) {
        // //достанем нужный массив по todolistId:
        // let todoListTasks = tasks[todoListId];
        // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        // tasks[todoListId] = todoListTasks.filter(t => t.id != taskId);
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        setTasks({...tasks, [todoListId]:tasks[todoListId].filter(el=>el.id!==taskId)})
    }
    function addTask(todoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask ] })
    }
    function changeTaskStatus(todoListId: string, taskId: string, isDone: boolean) {
        //достанем нужный массив по todolistId:
        let todoListTasks = tasks[todoListId];
        // найдём нужную таску:
        let task = todoListTasks.find(t => t.id === taskId);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }
    function changeTaskTitle(todoListId: string, taskId: string, newTitle: string) {
        //достанем нужный массив по todolistId:
        let todoListTasks = tasks[todoListId];
        // найдём нужную таску:
        let task = todoListTasks.find(t => t.id === taskId);
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeTodoListFilter(todoListId: string, value: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }
    function removeTodoList(todoListId: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodoLists(todoLists.filter(tl => tl.id != todoListId));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[todoListId]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
    function changeTodoListTitle(todoListId: string, title: string) {
        // найдём нужный todolist
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            // если нашёлся - изменим ему заголовок
            todoList.title = title;
            setTodoLists([...todoLists]);
        }
    }
    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
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
                            <TodoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodoList}
                                removeTask={removeTask}
                                changeTodoListFilter={changeTodoListFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodoListTitle}
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

export default App;
