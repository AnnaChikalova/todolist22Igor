import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {TasksStateType} from "./AppWithRedux";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./State/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    // tasks: Array<TaskType>
    // removeTask: (todoListId: string, taskId: string) => void
    // changeTodoListFilter: (todoListId: string, value: FilterValuesType) => void
    // addTask: (todoListId: string, title: string) => void
    // changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    // removeTodolist: (todoListId: string) => void
    // changeTodolistTitle: (todoListId: string, newTitle: string) => void
    filter: FilterValuesType
    // changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
}

export function TodoListWithRedux(props: PropsType) {
    let tasks=useSelector<AppRootStateType, Array<TaskType> >(state=>state.tasks[props.id])
    let dispatch= useDispatch()
    const addTask = (title: string) => {
        // props.addTask(title, props.id);
        dispatch(addTaskAC(props.id, title))
    }
    const removeTodolist = () => {
        // props.removeTodolist(props.id);
        dispatch(removeTodoListAC(props.id))
    }
    const changeTodolistTitle = (title: string) => {
        // props.changeTodolistTitle(props.id, title);
        dispatch(changeTodoListTitleAC(props.id, title))
    }
    const onAllClickHandler = () =>
        // props.changeTodoListFilter(props.id, "all");
        dispatch(changeTodoListFilterAC(props.id, "all"))
    const onActiveClickHandler = () =>
        // props.changeTodoListFilter(props.id,"active");
        dispatch(changeTodoListFilterAC(props.id, "active"))
    const onCompletedClickHandler = () =>
        // props.changeTodoListFilter(props.id,"completed");
        dispatch(changeTodoListFilterAC(props.id, "completed"))
    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist} aria-label="delete">
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>

            {

                tasks.map(t => {
                    const onClickHandler = () =>  dispatch(removeTaskAC(props.id, t.id))
                        // props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        // props.changeTaskStatus(props.id, t.id, newIsDoneValue);
                        dispatch(changeTaskStatusAC(props.id, t.id, newIsDoneValue))
                    }
                    const onTitleChangeHandler = (newTitle: string) => {
                        // props.changeTaskTitle(t.id, newValue, props.id);
                        dispatch(changeTaskTitleAC(props.id, t.id, newTitle))
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <Checkbox
                            onChange={onChangeHandler}
                            checked={t.isDone}
                            defaultChecked />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler} variant={props.filter === 'all'?"outlined":"contained"} color="success">all</Button>
            <Button onClick={onActiveClickHandler} variant={props.filter === 'active'?"outlined":"contained"} color="error">active</Button>
            <Button onClick={onCompletedClickHandler} variant={props.filter === 'completed'?"outlined":"contained"} color="secondary">completed</Button>

            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}


