import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  constructor(props){
    super(props);
    this.state = {
      completed: this.props.completed,
    };
    this.updateEvent = this.updateEvent.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  onChange(event){
    this.setState({
      input: event.target.value
    });
  }

  updateEvent(event) {
    console.log(this.props.completed);
    var id = event.target.parentNode.id;
    var self = this; 
    var data = {
      completed: !this.state.completed
    };

  // Initalize AJAX Request
  var xhttp2 = new XMLHttpRequest();

  // Response handler
  xhttp2.onreadystatechange = function() {

  // Wait for readyState = 4 & 200 response
  if (this.readyState == 4 && this.status == 200) {

      // parse JSON response
      var todo = JSON.parse(this.responseText);
      console.log(todo);
      self.setState({completed: data.completed});
      

  } else if (this.readyState == 4) {

      // this.status !== 200, error from server
      console.log(this.responseText);

  }
};

  xhttp2.open("PUT", "https://cse204.work/todos/"+id, true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "e9fbaa-da4d00-da15c2-d10eda-8cc628");
  xhttp2.send(JSON.stringify(data));

  }

  render() {
    var className = "listed";
    if(this.state.completed) {
      className = "todoCompleted";
    }
    return (
      
          <ul className = "events" id = "events">
          <li id = {this.props.id} className = {className}> {this.props.text} 
          <input className = "boxes" type = "checkbox" checked = {this.state.completed} onChange={this.onChange} onClick = {this.updateEvent}/> 
          <button id = "del" className = "delete" onClick = {this.props.deleting}> delete </button>
          </li>
        </ul>
      
      
    
    );
  }
}

export default Todo;
