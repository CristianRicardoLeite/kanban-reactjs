// Supondo que StatusDropdown esteja em src/components/statusDropDown/index.js
import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { updateTaskStatus } from '../../services/getData';

const StatusDropdown = ({ currentStatus, taskId, onStatusChange }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      onStatusChange(taskId, newStatus);
    } catch (error) {

    }
  };

  return (
    <DropdownButton id={`dropdown-status-${taskId}`} title={currentStatus}>
      {["To Do", "Doing", "Ready"].filter(status => status !== currentStatus).map((status, index) => (
        <Dropdown.Item key={index} onClick={() => handleStatusChange(status)}>
          {status}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default StatusDropdown;
