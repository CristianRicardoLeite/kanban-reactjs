import { useState } from 'react';
import api from '../../services/api';
import { Card, Button } from 'react-bootstrap';

function AddTaskForm({ onTaskAdded }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/tasks', {
        name: taskName,
        dueDate: dueDate,
        status: 'To Do',
      });

      onTaskAdded(response.data.data);

      setTaskName('');
      setDueDate('');
    } catch (error) {
      console.error("Falha ao adicionar tarefa:", error);
    }
  };

  return (
    <Card className="m-5">
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
          <Button variant="primary" type="submit">Adicionar Tarefa</Button>
        </form>
      </Card.Body>
    </Card>
  );
}

export default AddTaskForm;
