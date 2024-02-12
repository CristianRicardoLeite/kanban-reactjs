import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import api from '../../services/api';

function TaskTable({ tasks, onStatusChange }) {

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ["To Do", "Doing", "Ready"];
    return allStatuses.filter(status => status !== currentStatus);
  };


  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
      console.log(response.data);
      if (onStatusChange) onStatusChange(taskId, newStatus);
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  };

  const StatusDropdown = ({ currentStatus, taskId }) => {
    const options = getStatusOptions(currentStatus);
    return (
      <DropdownButton
        id={`dropdown-button-drop-${taskId}`}
        drop="down"
        variant="secondary"
        title={`${currentStatus}`}
      >
        {options.map((status, index) => (
          <Dropdown.Item
            key={index}
            eventKey={index}
            onClick={() => updateTaskStatus(taskId, status)}>
            {status}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {["To Do", "Doing", "Ready"].map((status, colIndex) => (
          <div key={colIndex} className="col">
            <h2>{status}</h2>
            <ul className="list-group">
              {tasks.filter(task => task.status === status).map(task => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {task.name} - {task.dueDate}
                  <StatusDropdown currentStatus={task.status} taskId={task.id} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskTable;
