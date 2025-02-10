import React, { useState, useEffect } from 'react';

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

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </label>
          <label>
            Project:
            <input 
              type="text" 
              value={project} 
              onChange={(e) => setProject(e.target.value)} 
              required 
            />
          </label>
          <label>
            Priority:
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="red">Urgent (Red)</option>
              <option value="yellow">Medium (Yellow)</option>
              <option value="green">Low (Green)</option>
            </select>
          </label>
          <div className="dialog-buttons">
            <button type="submit">{editingTask ? 'Update' : 'Create'}</button>
            <button type="button" onClick={closeDialog}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDialog;
