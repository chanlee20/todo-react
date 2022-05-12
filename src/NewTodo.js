import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
    
    <div className = "submission">
        <form>
            <input placeholder = "Add an Event..." id = "add-event" value = {this.props.input} onChange = {this.props.onChange}/>
            <button className = "sub-btn" id = "add" onClick = {this.props.addTodo}> Submit </button>
        </form>
    </div>
    );
  }
}

export default NewTodo;
