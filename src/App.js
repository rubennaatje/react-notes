// src/App.js

import React, { Component } from 'react';
import Todos from './components/todo-list.js';
import TodoCreate from './components/todo-create.js'

import Grid from '@material-ui/core/Grid'

class App extends Component {
  render() {
    return (
      <div className="col-md-3 mx-auto mt-3 card">
        <Grid container direction="column"
              alignItems="center" justify="center">
          <Grid item md={12}>
            <Todos todos={this.state.todos} onCheck={(i) => {this.updateToDo(i)}} onDelete={(i) => {this.removeToDo(i)}} />
          </Grid>
          <Grid item md={12}>
            <TodoCreate onSubmit={(data) => {this.addToDo(data)}} />
          </Grid>
        </Grid>
      </div>
    );
  }

  state = {
    todos: []
  }

  componentDidMount() {
    this.fetchToDos();
  }

  fetchToDos(){
    fetch('http://localhost:3000/notes')
    .then(res => res.json())
    .then((data) => {
      this.setState(() => {return {todos: data.notes}})
    })
    .catch(console.log)
  }

  removeToDo(id){
    fetch('http://localhost:3000/notes/'+ id, {method: 'DELETE'})
    .then(res => res.json())
    .then((data) => {
      this.fetchToDos();
    })
    .catch(console.log)
  }

  addToDo(todo){
    fetch('http://localhost:3000/notes', {method: 'POST', body:JSON.stringify(todo),
    headers: {
        'Content-Type': 'application/json'
    }})
    .then(res => res.json())
    .then((data) => {
      this.fetchToDos();
    })
    .catch(console.log)
  }

  updateToDo(id){
    if(this.state.todos != null){
      // Find the correct to-do item.
      let todo;
      for(let i = 0; i < this.state.todos.length; i++){
        if(id === this.state.todos[i].id){
          todo = this.state.todos[i];
        }
      }
      todo.done = !todo.done;
      
      fetch('http://localhost:3000/notes', {method: 'PUT', body:JSON.stringify(todo),
      headers: {
          'Content-Type': 'application/json'
      }})
      .then(res => res.json())
      .then((data) => {
        this.fetchToDos();
      })
      .catch(console.log)
    }
  }
}

export default App;