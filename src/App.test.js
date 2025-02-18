import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const simulateDrop = (dropTarget, taskId) => {
  const dataTransfer = {
    getData: jest.fn(() => String(taskId)),
  };
  fireEvent.drop(dropTarget, { dataTransfer });
};

describe('Task Management Board', () => {
  test('renders board with three columns', () => {
    render(<App />);
    expect(screen.getByText(/To Do/i)).toBeInTheDocument();
    expect(screen.getByText(/On Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Finished/i)).toBeInTheDocument();
  });

  test('opens the task dialog when clicking the Add Task button', () => {
    render(<App />);
    const addTaskButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addTaskButton);
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test('creates a new task and shows it in the To Do column', async () => {
    render(<App />);
    const addTaskButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addTaskButton);

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText('Project'), { target: { value: 'Test Project' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'red' } });
    
    // Click Create
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));
    
    // Wait for the task to appear
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
    
    // Verify it appears in the To Do column
    const todoColumn = screen.getByText(/To Do/i).closest('.column');
    expect(todoColumn).toHaveTextContent('Test Task');
  });

  test('restricts illegal task moves: from "todo" cannot go directly to "finished"', async () => {
    render(<App />);
    // Create a new task
    const addTaskButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addTaskButton);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Illegal Move Task' } });
    fireEvent.change(screen.getByPlaceholderText('Project'), { target: { value: 'Test Project' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'green' } });
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Illegal Move Task')).toBeInTheDocument();
    });
    
    // Get the task element and its id
    const taskElement = screen.getByText('Illegal Move Task').closest('.task-item');
    const taskId = taskElement.getAttribute('data-task-id');
    
    // Identify the Finished column element
    const finishedColumn = screen.getByText(/Finished/i).closest('.column');
    
    // Simulate dropping the task into the Finished column (illegal move)
    simulateDrop(finishedColumn, taskId);
    
    // Verify the task still appears in the To Do column (illegal move prevented)
    const todoColumn = screen.getByText(/To Do/i).closest('.column');
    expect(todoColumn).toHaveTextContent('Illegal Move Task');
  });

  test('allows valid transitions: from "todo" to "in-progress" and then to "finished"', async () => {
    render(<App />);
    // Create a new task
    const addTaskButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addTaskButton);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Valid Move Task' } });
    fireEvent.change(screen.getByPlaceholderText('Project'), { target: { value: 'Test Project' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'yellow' } });
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Valid Move Task')).toBeInTheDocument();
    });
    
    // Get the task element and its id
    const taskElement = screen.getByText('Valid Move Task').closest('.task-item');
    const taskId = taskElement.getAttribute('data-task-id');
    
    // Move from "todo" to "in-progress"
    const inProgressColumn = screen.getByText(/On Progress/i).closest('.column');
    simulateDrop(inProgressColumn, taskId);
    
    await waitFor(() => {
      const updatedInProgress = screen.getByText(/On Progress/i).closest('.column');
      expect(updatedInProgress).toHaveTextContent('Valid Move Task');
    });
    
    // Now move from "in-progress" to "finished"
    const finishedColumn = screen.getByText(/Finished/i).closest('.column');
    simulateDrop(finishedColumn, taskId);
    
    await waitFor(() => {
      const updatedFinished = screen.getByText(/Finished/i).closest('.column');
      expect(updatedFinished).toHaveTextContent('Valid Move Task');
    });
  });
});
