import React, { useState } from 'react';
import './TodoItem.css'; // App styles

function TodoItem(props) {
  // State to track if this item is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the edited value while typing
  const [editedText, setEditedText] = useState(props.todo.text);

  // When "Edit" button is clicked
  const handleEdit = () => {
    setIsEditing(true); // Enter editing mode
  };

  // Save the edited text
  const handleSave = () => {
    if (editedText.trim() === '') {
      props.onEdit(props.todo.id, editedText.trim()); // Save to parent state
      setIsEditing(false); // Exit editing mode
    }
  };

  // Cancel editing and revert text
  const handleCancel = () => {
    setEditedText(props.todo.text); // Revert to original text
    setIsEditing(false); // Exit editing mode
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
        <>
          {/* Input field for editing */}
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </>
      ) : (
        <>
          {/* Display text, styled if completed */}
          <span className={props.todo.completed ? 'completed' : ''}>
            {props.todo.text}
          </span>
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