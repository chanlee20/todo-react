import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      todos: [], input: ""
    };
    this.deleting = this.deleting.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sortAlph = this.sortAlph.bind(this);
  } 

  componentDidMount() {
    //Make initial ajax call to list todos
    //this.state.todos = 
    var self = this;
    var xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var todo = JSON.parse(this.responseText);
                    console.log("td: ");
                    console.log(todo);
                    self.setState({todos: todo});
                }
            };
            xhttp.open("GET", "https://cse204.work/todos", true);
            xhttp.setRequestHeader("x-api-key", "e9fbaa-da4d00-da15c2-d10eda-8cc628");
            xhttp.send();
  }

  onChange(event){
    this.setState({
      input: event.target.value
    });
  }

  addTodo(event) {
    event.preventDefault();
    const newTodoText = this.state.input;
    var self = this;
    var data = {text: newTodoText};
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();

    // Response handler
    xhttp2.onreadystatechange = function() {

      // Wait for readyState = 4 & 200 response
      if (this.readyState == 4 && this.status == 200) {

        // parse JSON response
        var todo = JSON.parse(this.responseText);
        console.log(todo);
        self.setState({
          todos: [...self.state.todos, todo],
          input: ''
        });
        self.state.input = '';

                   
        } else if (this.readyState == 4) {

                   // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

           xhttp2.open("POST", "https://cse204.work/todos", true);

           xhttp2.setRequestHeader("Content-type", "application/json");
           xhttp2.setRequestHeader("x-api-key", "e9fbaa-da4d00-da15c2-d10eda-8cc628");
           xhttp2.send(JSON.stringify(data));
  }

  deleting(event) {
    var xhttp = new XMLHttpRequest();
    var id = event.target.parentNode.id;
    console.log("id: " + id);
    var self = this;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const remainingTodos = self.state.todos.filter((todo) => {
              if(todo.id !== id){
                return todo;
              }
            });
            self.setState({todos: remainingTodos});
            }
    };
    xhttp.open("DELETE", "https://cse204.work/todos/" + id, true);

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "e9fbaa-da4d00-da15c2-d10eda-8cc628");
  xhttp.send();

}

sortAlph() {
  let self = this;
  console.log("sorting...");
  let todos = this.state.todos;
  todos.sort(function(a,b){
    return a.text.localeCompare(b.text);
  })
  self.setState({todos: todos});
}
  

  render() {
    return (
      <>
      <div className = "sortBtn">
        <button className = "sortAlpha" onClick = {this.sortAlph}> Sort Alphabetically</button>
      </div>
      <div className="title">
        <h3> Todo App </h3>
      </div>

        
        <div className="event-container" id="event-cont-id">
          <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input} />
          {this.state.todos.map((todo) => <Todo key={todo.id} id={todo.id} text={todo.text} deleting={this.deleting} completed = {todo.completed} />
          )}
        </div></>
    );
  }
}

export default App;
