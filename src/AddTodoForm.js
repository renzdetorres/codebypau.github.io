import React, { useState } from 'react';
import './AddTodoForm.css'; // App styles

function AddTodoForm(props) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      alert('Please fill in all the fields before adding a TODO');
      return;
    }
    props.onAddTodo(inputText.trim());
    setInputText('');
    alert('Successfully added!');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a new TODO..."
        className="todo-input"
      />

      <button type="submit" className="add-btn">
        Add TODO
      </button>
    </form>
  );
}

export default AddTodoForm;