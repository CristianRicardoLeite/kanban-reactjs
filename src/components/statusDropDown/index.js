import { DropdownButton, Dropdown } from 'react-bootstrap';
import { updateTaskStatus } from '../../services/getData';
import { getVariantForStatus } from '@/src/utils/getVariantForStatus'

const StatusDropdown = ({ currentStatus, taskId, onStatusChange }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      onStatusChange(taskId, newStatus);
    } catch (error) {

    }
  };

  const variant = getVariantForStatus(currentStatus);

  return (
    <DropdownButton className='w-100' id={`dropdown-status-${taskId}`} title={currentStatus} variant={variant}>
      {["To Do", "Doing", "Ready"].filter(status => status !== currentStatus).map((status, index) => (
        <Dropdown.Item key={index} onClick={() => handleStatusChange(status)}>
          {status}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default StatusDropdown;
