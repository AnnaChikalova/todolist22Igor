import React, {ChangeEvent, useState} from "react";
type EditableSpanType={
    title:string
    callback:(currentTitle:string)=>void
}
export const EditableSpan=(props:EditableSpanType)=>{
    const [edit, setEdit]=useState(false)
    let [currentTitle, setCurrentTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }
    const changeEdit=()=>{
        setEdit(!edit)
        changeTask()
    }
    const changeTask = () => {
            props.callback(currentTitle);
    }

    return (
        edit
        ?<input value={currentTitle}
                onBlur={changeEdit}
                onChange={onChangeHandler}
                autoFocus/>
        :<span onDoubleClick={changeEdit}>{props.title}</span>
    )
}