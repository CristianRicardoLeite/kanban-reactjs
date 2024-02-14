import 'bootstrap/dist/css/bootstrap.min.css';

import StatusDropdown from '@/src/components/statusDropDown';

import getBackgroundColor from '@/src/utils/getBackground';

import { deleteTask } from '@/src/services/getData';
import { FaTrashAlt } from "react-icons/fa";
import { Card } from 'react-bootstrap';




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
          <div key={colIndex} className="col" >
            <h2 className='d-flex justify-content-center rounded' style={{ backgroundColor: getBackgroundColor(status) }}>{status}</h2>
            <ul className="list-group">
              {
                Array.isArray(tasks) && tasks.filter(task => task.status === status).map(task => (
                  <div className='my-3 w-100'>
                    <Card key={task.id} className="list-group-item d-flex flex-row bd-highlight mb-3 justify-content-around" >
                      <div className='col flex-grow-1'>
                        <h2>{task.name}</h2>
                        <h4>{task.dueDate}</h4>
                      </div>
                      <div className='d-flex flex-column mb-3 justify-content-end align-items-end' style={{ height: "100px" }}>
                        <FaTrashAlt onClick={() => handleDeleteTask(task.id)} style={{ cursor: 'pointer', height: "50px", marginBottom: "20px" }} />
                        <StatusDropdown currentStatus={task.status} taskId={task.id} onStatusChange={onStatusChange} />
                      </div>
                    </Card>
                  </div>
                ))
              }
            </ul>
          </div>
        ))
        }
      </div >
    </div >
  );
}

export default TaskTable;


