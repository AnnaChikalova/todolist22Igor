import React from 'react';
import './App.css';
import {TaskType} from './TodoListWithRedux';

import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./BasicAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodoListAC} from "./State/todoLists-reducer";
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
    let todoLists= useSelector<AppRootStateType, Array<TodoListType>>(state=>state.todoLists)
    let dispatch = useDispatch()

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

                            return <Grid item>
                                <Paper style={{padding:'10px'}}>
                            <TodoListWithRedux
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
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
