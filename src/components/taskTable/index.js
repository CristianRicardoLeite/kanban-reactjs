import 'bootstrap/dist/css/bootstrap.min.css';

import StatusDropdown from '@/src/components/statusDropDown';

import getBackgroundColor from '@/src/utils/getBackground';
import { FaTrashAlt } from "react-icons/fa";




function TaskTable({ tasks, onStatusChange }) {


  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      onStatusChange(taskId, null);
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };


  return (
    <div className="container mt-5">
      <div className="row">
        {["To Do", "Doing", "Ready"].map((status, colIndex) => (
          <div key={colIndex} className="col">
            <h2>{status}</h2>
            <ul className="list-group">
              {tasks.filter(task => task.status === status).map(task => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: getBackgroundColor(task.status) }}>
                  {task.name} - {task.dueDate}
                  <StatusDropdown currentStatus={task.status} taskId={task.id} onStatusChange={onStatusChange} />
                  <FaTrashAlt style={{ cursor: 'pointer' }} />
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

// onClick={() => handleDeleteTask(task.id)}
