import React, { useState } from 'react';
import './AddTodoForm.css'; // Styles for the form

function AddTodoForm(props) {
  // Local state to store the new TODO details
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default priority
  const [category, setCategory] = useState('General'); // Default category
  const [dueDate, setDueDate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation — check if all fields are filled
    if (
      inputText.trim() === '' ||
      priority.trim() === '' ||
      category.trim() === '' ||
      dueDate.trim() === ''
    ) {
      alert('Please fill in all fields before adding a TODO.');
      return;
    }

    // Pass the new TODO up to the parent (App component)
    props.onAddTodo({
      text: inputText.trim(),
      priority,
      category,
      dueDate,
    });

    // Reset form fields
    setInputText('');
    setPriority('');
    setCategory('');
    setDueDate('');
    alert('Successfully added!');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className='input-wrapper'>
        {/* Text input for TODO description */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <label className={inputText ? "filled" : ""}>Enter a new TODO</label>

        {/* Priority dropdown */}
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Category dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>

        {/* Due date picker */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <button type="submit" className="add-btn">
        Add TODO
      </button>
    </form>
  );
}

export default AddTodoForm;
