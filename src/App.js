import React from 'react';
import { Container } from 'react-bootstrap';
import TaskList from './components/TaskList';
import './App.css'
function App() {
  return (
    <Container>
      <h1 className="mt-4">Task Tracker</h1>
      <TaskList />
    </Container>
  );
}

export default App;
