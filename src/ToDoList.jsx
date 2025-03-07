import React, { useState } from 'react';

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState ("");
    const [editingIndex, setEditingIndex] = useState(null);//new state to store the index of the task being edited
    const [editingText, setEditingText] = useState("");//new state to store the text of the task being edited

    //Function for a event handler
    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    // Add a new task to the list
    function addTask(){

        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    //delete a task from the list
    function deleteTask(index){

        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    //function to move a task up
    function moveTaskUp(index){

        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]]=
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }   
    }

    //function to move a task down
    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]]=
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        } 
    }

    //funtion to edit a task
    function editTask(index){
        setEditingIndex(index);
        setEditingText(tasks[index]);
    }

    //function to save the edited task
    function saveTask(index){
        const updatedTasks = [...tasks];
        updatedTasks[index] = editingText;//replace the task at the index with the new text
        setTasks(updatedTasks);
        setEditingIndex(null);//reset the editing index
        setEditingText("");//reset the editing text
    }


    return (
        <div className= "to-do-list">

            <h1> To Do List </h1>

            <div>
                <input 
                type="text" 
                placeholder="Enter a task..."
                value= {newTask}
                onChange={handleInputChange}/>
                <button className="add-button" onClick={addTask}> 
                    Add
                </button>
            </div>

            <ol>
            {tasks.map((task, index) => 
                <li key={index}>
                    {editingIndex === index ? (
                        <>

                            <input type="text"
                            value={editingText}
                            onChange={(e) => setEditingText (e.target.value)}
                            />
                            
                            <button onClick={() => saveTask(index)}>
                                💾   
                            </button>
                            <button onClick={() => setEditingIndex(null)}>
                                ❌   
                            </button>

                        </>
                    )}
                    <span className="text">{task}</span>
                    <button className="edit-button" 
                    onClick={() => editTask(index)}>
                        ✏️ Edit
                    </button>
                    <button className="delete-button"
                    onClick={() => deleteTask(index)}>
                        🗑 Delete
                    </button>
                    <button className="move-button"
                    onClick={() => moveTaskUp(index)}>
                        👆
                    </button>
                    <button className="move-button"
                    onClick={() => moveTaskDown(index)}>
                        👇
                    </button>
                </li>
            )}
            </ol>
        </div>

    );
}
export default ToDoList;