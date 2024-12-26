import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTask, updateTask } from '../services/taskService';
import '../styles/TaskForm.css'
const TaskForm = ({ show, onClose, task }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Low',
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleSubmit = async () => {
    try {
      if (task) {
        await updateTask(task._id, formData);
      } else {
        await addTask(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
