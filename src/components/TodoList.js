// src/components/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
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
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          startEditing={startEditing}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          submitEdit={submitEdit}
          cancelEdit={cancelEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
