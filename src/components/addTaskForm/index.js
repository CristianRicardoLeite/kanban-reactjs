'use client'

import { useState } from 'react';

import { Card, Button } from 'react-bootstrap';

function AddTaskForm({ onTaskAdded }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const taskData = {
    name: taskName,
    dueDate: dueDate,
    status: status
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      onTaskAdded(taskData);
      setTaskName('');
      setDueDate('');
      setStatus('To Do');
    } catch (error) {
      console.error("Falha ao adicionar tarefa:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="m-5 col-lg-6 d-flex justify-content-center">
      <Card.Body>
        <Card.Title>Adicionar Nova Tarefa</Card.Title>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">Nome da Tarefa</label>
            <input
              type="text"
              className="form-control"
              id="taskName"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Ready">Ready</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Data de Conclusão</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
            />
          </div>
          <Button variant="primary" type="submit" disabled={isSubmitting}>Adicionar Tarefa</Button>
        </form>
      </Card.Body>
    </Card>
  );
}

export default AddTaskForm;
