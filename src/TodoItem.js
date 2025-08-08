import React, { useState } from 'react';
import './TodoItem.css'; // App styles

function TodoItem(props) {
  // State to track if this item is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the edited value while typing
  const [editedText, setEditedText] = useState(props.todo.text);
  const [editedDueDate, setEditedDueDate] = useState(props.todo.dueDate);

  // When "Edit" button is clicked
  const handleEdit = () => {
    setIsEditing(true); // Enter editing mode
  };

  // Save the edited text
  const handleSave = () => {
    if (editedText.trim() === '') {
       alert('Please fill in all the fields before adding a TODO');
      return;
    } 
    props.onEdit(props.todo.id, editedText.trim()); // Save to parent state
    setIsEditing(false); // Exit editing mode
  };

  // Cancel editing and revert text
  const handleCancel = () => {
    setEditedText(props.todo.text); // Revert to original text
    setEditedDueDate(props.todo.dueDate);
    setIsEditing(false); // Exit editing mode
  };

  const getDueDateStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    if (props.todo.dueDate && props.todo.dueDate < today && !props.todo.completed) {
      return '(Overdue)';
    }
    return '';
  };

  return (
    <li className="todo-item">
      {/* Checkbox to toggle completed status */}
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => props.onToggle(props.todo.id)}
      />

      {isEditing ? (
        <div>
          {/* Input field for editing */}
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <div className='button'> 
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {/* Display text, styled if completed */}
          <span className={props.todo.completed ? 'completed' : ''}>
            {props.todo.text}
          </span>
          <span className="meta"> | Due: {props.todo.dueDate} {getDueDateStatus()}</span>
          <button onClick={handleEdit} className="edit-btn">Edit</button>
        </>
      )}

      {/* Delete button */}
      <button
        onClick={() => props.onDelete(props.todo.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
