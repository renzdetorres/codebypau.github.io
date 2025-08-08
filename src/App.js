import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem'; // Import the todo item component
import AddTodoForm from './AddTodoForm'; // Import the form component
import './App.css'; // App styles

function App() {
  // State to hold all TODO items
  const [todos, setTodos] = useState([]);

  // State to track the next unique ID for new TODOs
  const [nextId, setNextId] = useState(1);
  const [searchText, setSearchText] = useState('');

  // Load todos and ID from localStorage when the app loads
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedNextId = localStorage.getItem('nextId');

    if (savedTodos) {
      // If todos exist in localStorage, use them
      setTodos(JSON.parse(savedTodos));
    }

    if (savedNextId) {
      // Load saved nextId
      setNextId(parseInt(savedNextId, 10));
    }
  }, []); // Runs only once on mount

  // Save todos to localStorage every time they change
  // Save nextId to localStorage when it changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('nextId', nextId.toString());
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [todos, nextId]);

  // Add a new todo item
  const addTodo = ({text, dueDate}) => {
    const newTodo = {
      id: nextId, // Use the current nextId
      text: text,
      dueDate: dueDate,
      completed: false
    };
    setTodos([...todos, newTodo]); // Append the new todo
    setNextId(nextId + 1); // Increment the ID for next use
  };

  // Toggle completed status for a specific todo
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo by filtering it out
  const deleteTodo = (id) => {
    if(window.confirm('Do you want to delete this Todo?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Edit a todo's text
  const editTodo = (id, newText, newDueDate) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, dueDate: newDueDate} : todo
    ));
    alert('Succesfully updated!')
  };

  const getFilteredTodos = () => {
    let filtered = [...todos];

    if (searchText) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered.sort(() => {
      const priorities = { };
      return priorities;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My TODO App</h1>
      </header>
      <main>
        <div className="container">
          {/* Form to add a new todo, passing down the addTodo function */}
          <AddTodoForm onAddTodo={addTodo} />
          <div className="filters">
            <input
              type="text"
              placeholder="Search TODOs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {/* Display a message if no todos exist */}
          {todos.length === 0 ? (
            <p className="no-todos">No TODOs yet. Add one above!</p>
          ) : (
            <ul className="todo-list">
              {/* Render each todo using TodoItem component */}
              {getFilteredTodos().map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo} // Toggle checkbox
                  onDelete={deleteTodo} // Delete button
                  onEdit={editTodo}     // Edit functionality
                />
              ))}
            </ul>
          )}

          {/* Show total and completed todos */}
          <div className="todo-stats">
            <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
