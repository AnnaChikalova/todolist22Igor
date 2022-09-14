import React, {useState} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType={
    id:string
    title: string
    filter:FilterValuesType
}
function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // let[todoLists, setTodoLists]=useState<Array<TodoListsType>>([
    //     {id:v1(),title:'What to learn',filter:'all'},
    //     {id:v1(),title:'What to buy',filter:'all'},
    // ])
    //
    //
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(todoListID:string, taskID: string) {
        setTasks({...tasks, [todoListID]:tasks[todoListID].filter(fl=>fl.id!==taskID)});
    }

    function addTask(todoListID:string, title: string) {
         let newTask = {id: v1(), title: title, isDone: false};

         setTasks({...tasks, [todoListID]:[newTask, ...tasks[todoListID]]});
    }

    function changeStatus(todoListID:string, taskId: string, isDone: boolean) {

         setTasks({...tasks, [todoListID]:tasks[todoListID].map(t=>t.id===taskId?{...t, isDone:isDone}:t) });
    }




    function changeFilter(todoListID:string, filterValue: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filterValue} : el))
    }


    return (
        <div className="App">
            {todoLists.map(el=>{
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return(
                    <Todolist
                              key={el.id}
                              todoListID={el.id}
                              title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
