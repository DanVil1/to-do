// src/components/TodoInput.js
import React from 'react';

const TodoInput = ({ newTodo, setNewTodo, addTodo }) => {
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="Add a new to‑do..."
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

export default TodoInput;
