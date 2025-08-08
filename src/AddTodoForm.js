import React, { useState } from 'react';
import './AddTodoForm.css'; // App styles

function AddTodoForm(props) {
  const [inputText, setInputText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( 
      inputText.trim() === ''||
      dueDate.trim() === ''
    ) {
      alert('Please fill in all fields before adding a TODO.');
      return;
    }
    props.onAddTodo({
      text: inputText.trim(),
      dueDate,
    });
    setInputText('');
    setDueDate("");
    alert('Successfully added!');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className='input-wrapper'>
        <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <label className={inputText ? "filled" : ""}>Enter a new TODO</label>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      </div>

      <button type="submit" className="add-btn">
        Add TODO
      </button>
    </form>
  );
}

export default AddTodoForm;
