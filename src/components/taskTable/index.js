// components/TaskTable.js
function TaskTable({ tasks }) {

  const tasksToDo = tasks.filter(task => task.status === 'To Do');
  const tasksDoing = tasks.filter(task => task.status === 'Doing');
  const tasksReady = tasks.filter(task => task.status === 'Ready');

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2>To Do</h2>
          <ul className="list-group">
            {tasksToDo.map(task => (
              <li key={task.id} className="list-group-item">
                {task.task} - {task.dueDate}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2>Doing</h2>
          <ul className="list-group">
            {tasksDoing.map(task => (
              <li key={task.id} className="list-group-item">
                {task.task} - {task.dueDate}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2>Ready</h2>
          <ul className="list-group">
            {tasksReady.map(task => (
              <li key={task.id} className="list-group-item">
                {task.task} - {task.dueDate}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskTable;
