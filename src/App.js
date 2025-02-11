import React, { useState, useEffect } from 'react';
import Column from './components/Column';
import TaskDialog from './components/TaskDialog';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      project: taskData.project,
      color: taskData.color, 
      status: 'todo',      
      createdAt: new Date().toISOString(),
      startTime: null,
      endTime: null,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(tasks.map(task => {
      if (task.id.toString() === taskId) {
        if (task.status === 'todo' && newStatus === 'in-progress') {
          return { ...task, status: newStatus, startTime: new Date().toISOString() };
        } else if (task.status === 'in-progress' && newStatus === 'finished') {
          return { ...task, status: newStatus, endTime: new Date().toISOString() };
        }
        return task;
      }
      return task;
    }));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const openNewTaskDialog = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEditTaskDialog = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
  };

  const tasksTodo = tasks.filter(task => task.status === 'todo');
  const tasksInProgress = tasks.filter(task => task.status === 'in-progress');
  const tasksFinished = tasks.filter(task => task.status === 'finished');

  return (
    <div className="App">
      <h1>Daily Board</h1>
      <div className="board">
        <Column 
          title="To Do" 
          tasks={tasksTodo} 
          onDrop={(e) => handleDrop(e, 'todo')}
          onDragOver={onDragOver}
          openEditTaskDialog={openEditTaskDialog}
          deleteTask={deleteTask}
        >
          <button className="add-task-button" onClick={openNewTaskDialog}>+</button>
        </Column>
        <Column 
          title="On Progress" 
          tasks={tasksInProgress} 
          onDrop={(e) => handleDrop(e, 'in-progress')}
          onDragOver={onDragOver}
          openEditTaskDialog={openEditTaskDialog}
          deleteTask={deleteTask}
        />
        <Column 
          title="Finished" 
          tasks={tasksFinished} 
          onDrop={(e) => handleDrop(e, 'finished')}
          onDragOver={onDragOver}
          openEditTaskDialog={openEditTaskDialog}
          deleteTask={deleteTask}
        />
      </div>
      {dialogOpen && (
        <TaskDialog 
          closeDialog={closeDialog}
          addTask={addTask}
          updateTask={updateTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}

export default App;
