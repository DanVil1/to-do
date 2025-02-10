import React from 'react';

const TaskItem = ({ task, openEditTaskDialog, deleteTask }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const getDuration = () => {
    if (task.startTime && task.endTime) {
      const start = new Date(task.startTime);
      const end = new Date(task.endTime);
      const diffMs = end - start;
      const diffMins = Math.round(diffMs / 60000);
      return `${diffMins} min`;
    }
    return null;
  };

  return (
    <div 
      className="task-item" 
      draggable 
      onDragStart={handleDragStart}
      style={{ borderLeft: `5px solid ${task.color}` }}
    >
      <div className="task-content" onClick={() => openEditTaskDialog(task)}>
        <h3>{task.title}</h3>
        <p>{task.project}</p>
        {task.status === 'in-progress' && task.startTime && (
          <p className="time-info">Started: {new Date(task.startTime).toLocaleTimeString()}</p>
        )}
        {task.status === 'finished' && task.endTime && (
          <p className="time-info">
            Completed: {new Date(task.endTime).toLocaleTimeString()} 
            {getDuration() && ` (Duration: ${getDuration()})`}
          </p>
        )}
      </div>
      <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
