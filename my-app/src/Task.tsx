import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {TaskType} from "./TodoListWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";

type TaskPropsType = {
    id: string
    task: TaskType
}
export const Task = ({id, task}: TaskPropsType) => {
    let dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(removeTaskAC(id, task.id))
        // props.removeTask(props.id, t.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        // props.changeTaskStatus(props.id, t.id, newIsDoneValue);
        dispatch(changeTaskStatusAC(id, task.id, newIsDoneValue))
    }
    const onTitleChangeHandler = (newTitle: string) => {
        // props.changeTaskTitle(t.id, newValue, props.id);
        dispatch(changeTaskTitleAC(id, task.id, newTitle))
    }
    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
            <Checkbox
                onChange={onChangeHandler}
                checked={task.isDone}
                defaultChecked/>
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            {/*<button onClick={onClickHandler}>x</button>*/}
            <IconButton onClick={onClickHandler} aria-label="delete">
                <Delete/>
            </IconButton>
        </li>
    );
};

export default Task;