import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import TaskForm from './TaskForm';
import { getTasks, deleteTask } from '../services/taskService';
import '../styles/TaskList.css'
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleFormClose = () => {
    setEditTask(null);
    setShowForm(false);
    fetchTasks();
  };

  return (
    <>
      <Button className="my-3" onClick={() => setShowForm(true)}>
        Add Task
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(task)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(task._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <TaskForm
          show={showForm}
          onClose={handleFormClose}
          task={editTask}
        />
      )}
    </>
  );
};

export default TaskList;
