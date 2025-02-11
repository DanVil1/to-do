import React, { useState, useEffect } from 'react';

const inputStyle = {
  backgroundColor: "#363636",
  padding: "0.5rem",
  borderRadius: "30px",
  border: "none",
  outline: "none",
  width: "150px",
  textAlign: "center",
  color: "#E0E0E0",
  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.2)",
};

const buttonStyle = {
  backgroundColor: "#f9f9f9",
  border: "none",
  borderRadius: "30px",
  padding: "0.5rem 1rem",
  cursor: "pointer",
};

const TaskDialog = ({ closeDialog, addTask, updateTask, editingTask }) => {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [color, setColor] = useState('green');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setProject(editingTask.project);
      setColor(editingTask.color);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || project.trim() === '') return;
    const taskData = { title, project, color };
    if (editingTask) {
      updateTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }
    closeDialog();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeDialog();
    }
  };

  return (
    <div className="dialog-overlay"  onClick={handleOverlayClick}>
      <div 
        className="dialog" 
        style={{ 
          background: "#2f2f2f", 
          borderRadius: "10px", 
          padding: "20px", 
          width: "400px", 
          maxWidth: "90%" 
        }}
      >
        <h2 style={{ color: "#E0E0E0", textAlign: "center" }}>
          {editingTask ? 'Edit Task' : 'Add Task'}
        </h2>
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem", 
            alignItems: "center" 
          }}
        >
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={inputStyle}
            placeholder="Title"
          />
          <input 
            type="text" 
            value={project} 
            onChange={(e) => setProject(e.target.value)} 
            required 
            style={inputStyle}
            placeholder="Project"
          />
          <select 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            style={inputStyle}
          >
            <option value="red">Urgent (Red)</option>
            <option value="yellow">Medium (Yellow)</option>
            <option value="green">Low (Green)</option>
          </select>
          <div 
            className="dialog-buttons" 
            style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "1rem" 
            }}
          >
            <button type="submit" style={buttonStyle}>
              {editingTask ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={closeDialog} style={buttonStyle}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDialog;
