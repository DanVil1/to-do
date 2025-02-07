// src/components/TodoItem.js
import React from 'react';

const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
  startEditing,
  editingId,
  editingText,
  setEditingText,
  submitEdit,
  cancelEdit,
}) => {
  return (
    <li className="todo-item">
      {editingId === todo.id ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={e => setEditingText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') submitEdit(todo.id);
              if (e.key === 'Escape') cancelEdit();
            }}
            autoFocus
          />
          <button onClick={() => submitEdit(todo.id)}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {todo.text}
          </span>
          <span className="created-at">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
          <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
