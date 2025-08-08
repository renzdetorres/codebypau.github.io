import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem(props) {
  const [isEditing, setIsEditing] = useState(false); // Editing mode flag
  const [editedText, setEditedText] = useState(props.todo.text); // Temp edited text
  const [editedDueDate, setEditedDueDate] = useState(props.todo.dueDate); // Temp edited due date

  // Switch to editing mode
  const handleEdit = () => setIsEditing(true);

  // Save changes
  const handleSave = () => {
    if (editedText.trim() === '') {
      alert('Please fill in all the fields before adding a TODO');
      return;
    }
    props.onEdit(props.todo.id, editedText.trim(), editedDueDate);
    setIsEditing(false);
  };

  // Cancel editing and revert to original values
  const handleCancel = () => {
    setEditedText(props.todo.text);
    setEditedDueDate(props.todo.dueDate);
    setIsEditing(false);
  };

  // Check if the todo is overdue
  const getDueDateStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    if (props.todo.dueDate && props.todo.dueDate < today && !props.todo.completed) {
      return '(Overdue)';
    }
    return '';
  };

  return (
    <li className={`todo-item ${props.todo.priority}`}>
      {/* Checkbox to mark as completed */}
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => props.onToggle(props.todo.id)}
      />

      {isEditing ? (
        <div>
          {/* Edit mode inputs */}
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
          {/* Display todo details */}
          <div className="meta">
            <span className={props.todo.completed ? 'completed' : ''}>
            {props.todo.text}
          </span>
          <span>
            | Priority: {props.todo.priority} |
            Category: {props.todo.category} |
            Due: {props.todo.dueDate} {getDueDateStatus()}
          </span>

          </div>
          {/* Edit button */}
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
