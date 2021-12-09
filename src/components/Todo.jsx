import React from "react";
import './Todo.scss'

// Used that function to shift tasks up and down in array
function move(input, from, to) {
    let numberOfDeletedElm = 1;
  
    const elm = input.splice(from, numberOfDeletedElm)[0];
  
    numberOfDeletedElm = 0;
  
    input.splice(to, numberOfDeletedElm, elm);
  }

export default class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            taskList:[],
            task:""
        }
    }



    addTask(){
        var idNumb = `todo${Math.random()}`
        const task = {
            id: idNumb,
            value: this.state.task.slice()
        }


        if (task.value.length === 0){
            alert("please enter text")
        }
        // else if(task.value.length !== 0){
        //     for (let i = 0; i < this.state.taskList.length; i ++){
        //         if (task.value === this.state.taskList[i]){
        //             alert("Task already exists")
        //         }
        //         else {
        //             continue
        //         }
        //     }
        // }
        else {
            const taskList = [...this.state.taskList];
            taskList.push(task);
    
            this.setState({
                taskList,
                task:""
            })
        }
     
    }
    
    doneTask(id){
        const item = this.state.taskList.filter(element =>  element.id === id)
        item["isdone"] = true;
        document.getElementById(item[0].id).style.color = "red";
        // console.log(item[0].id)
        
    }

    moveUp(id){
        const taskList = [...this.state.taskList];
        const item = taskList.filter(element => element.id === id);
        const result = move(this.state.taskList, this.state.taskList.indexOf(item[0]), (this.state.taskList.indexOf(item[0])-1))
        // console.log(taskList.indexOf(item[0]))
        console.log(result)
        this.setState({
            result,
            task:""
        })
        // console.log(item[0])
    }
    moveDown(id){
        const taskList = [...this.state.taskList];
        const item = taskList.filter(element => element.id === id);
        const result = move(this.state.taskList, this.state.taskList.indexOf(item[0]), (this.state.taskList.indexOf(item[0])+1))
        // console.log(taskList.indexOf(item[0]))
        console.log(result)
        this.setState({
            result,
            task:""
        })
    }
    edit(id){
        const item = this.state.taskList.filter(element => element.id === id);
        console.log(item[0].value)
        this.setState({
            task:item[0].value
        })
        return (
            <button onClick={() => {
                const taskList = this.state.taskList.filter(element => element.id !== id)
                this.setState({
                    taskList,
                    task:""
                })
            }}>Change</button>
        )
        // document.getElementsByClassName("input").value = item[0].value
    }
    saveTask(key,value){
        this.setState({
            [key]:value
        })
    }
    deleteTask(id){
        const updatedtaskList = this.state.taskList.filter(item => item.id !== id)
        this.setState({taskList:updatedtaskList})
    }
    clear(){
        this.setState({
            taskList:[],
            task:""
        })
    }

    render(){
        return (
            <div   style={{
                padding: 30,
                textAlign: "left",
                maxWidth: 1000,
                margin: "auto"
              }}>
                <h1 className="title">To Do List</h1>
                <input
                    className="input"
                    type="text"
                    placeholder="Enter text"
                    onChange={e => this.saveTask("task", e.target.value)}
                    value={this.state.task}
                />
                <button className="add-btn" onClick={() => this.addTask()}>Add</button>
                <button className="add-btn clear" onClick={() => this.clear()}>Delete All</button>
                <ul>
                    {this.state.taskList.map(element => {
                        return(
                            <li id={element.id}
                                key={element.id}>
                                {element.value}
                                <button className="btn" onClick={() => this.doneTask(element.id)}>Done</button>
                                <button className="btn" onClick={() => this.deleteTask(element.id)}>Delete</button>
                                <button className="btn" onClick={() => this.moveUp(element.id)}>UP</button>
                                <button className="btn" onClick={() => this.moveDown(element.id)}>Down</button>
                                <button className="btn" onClick={() => this.edit(element.id)}>Edit</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}