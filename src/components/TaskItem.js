import React from 'react';
import { FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, openEditTaskDialog, deleteTask }) => {
  if (!task) return null;

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
      data-task-id={task.id}
      draggable
      onDragStart={handleDragStart}
      style={{
        backgroundColor: "#1f1f1f",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "grab",
        color: "#ffffff",
        borderLeft: `5px solid ${task?.color || "#1f1f1f"}`,
      }}
    >
      <div
        className="task-content"
        onClick={() => openEditTaskDialog(task)}
        style={{ flexGrow: 1, textAlign: "left" }}
      >
        <h3 style={{ margin: "0 0 5px 0" }}>{task.title}</h3>
        <p style={{ margin: "2px 0", fontSize: "14px" }}>{task.project}</p>
        {task.status === 'in-progress' && task.startTime && (
          <p className="time-info" style={{ fontSize: "12px", color: "#cccccc" }}>
            Started: {new Date(task.startTime).toLocaleTimeString()}
          </p>
        )}
        {task.status === 'finished' && task.endTime && (
          <p className="time-info" style={{ fontSize: "12px", color: "#cccccc" }}>
            Completed: {new Date(task.endTime).toLocaleTimeString()}
            {getDuration() && ` (Duration: ${getDuration()})`}
          </p>
        )}
      </div>
      <button
        className="delete-button"
        onClick={() => deleteTask(task.id)}
        style={{
          backgroundColor: "#f9f9f9",
          border: "none",
          borderRadius: "50%",
          padding: "5px",
          cursor: "pointer",
          color: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskItem;
