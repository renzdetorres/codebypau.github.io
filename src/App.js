import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // All TODO items
  const [nextId, setNextId] = useState(1); // Unique ID for next TODO
  const [searchText, setSearchText] = useState(''); // Search filter text
  const [filter, setFilter] = useState('All');

  // Load todos from localStorage on page load
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedNextId = localStorage.getItem('nextId');

    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedNextId) setNextId(parseInt(savedNextId, 10));
  }, []);

  // Save todos to localStorage when state changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('nextId', nextId.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [todos, nextId]);

  // Add a new todo
  const addTodo = ({ text, priority, category, dueDate }) => {
    const newTodo = {
      id: nextId,
      text,
      priority,
      category,
      dueDate,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
  };

  // Toggle completed status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    if (window.confirm('Do you want to delete this Todo?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Edit an existing todo
  const editTodo = (id, newText, newDueDate) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, dueDate: newDueDate } : todo
    ));
    alert('Successfully updated!');
  };

  // Filter todos based on search text and sort by priority
  const getFilteredTodos = () => {
    let filtered = [...todos];

    if (searchText) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filter === 'Active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'Completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filter === 'Overdue') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(todo => todo.dueDate && todo.dueDate < today && !todo.completed);
    }

    const priorities = { High: 1, Medium: 2, Low: 3 };
    return filtered.sort((a, b) => priorities[a.priority] - priorities[b.priority]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My TODO App</h1>
      </header>
      <main>
        <div className="container">
          {/* Form to add a new todo */}
          <AddTodoForm onAddTodo={addTodo} />

          {/* Search filter */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search TODOs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          {/* Show message if no todos */}
          {todos.length === 0 ? (
            <p className="no-todos">No TODOs yet. Add one above!</p>
          ) : (
            <ul className="todo-list">
              {getFilteredTodos().map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>
          )}

          {/* Stats */}
          <div className="todo-stats">
            <p>
              Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
