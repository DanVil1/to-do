import React from 'react';
import TaskItem from './TaskItem';

const Column = ({ title, tasks, onDrop, onDragOver, openEditTaskDialog, deleteTask, children }) => {
  return (
    <div className="column" onDrop={onDrop} onDragOver={onDragOver}>
      <h2>{title}</h2>
      {children}
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          openEditTaskDialog={openEditTaskDialog}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default Column;
