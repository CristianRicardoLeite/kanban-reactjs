import 'bootstrap/dist/css/bootstrap.min.css';

import TaskTable from '../components/taskTable';

export default function Home() {

  const fetchedTasks = [
    { id: 1, task: "Task 1", status: "To Do", dueDate: "2023-01-01" },
    { id: 2, task: "Task 2", status: "Doing", dueDate: "2023-02-01" },
    { id: 3, task: "Task 3", status: "Ready", dueDate: "2023-03-01" },
  ];

  return (
    <div>
      <TaskTable tasks={fetchedTasks} />
    </div>
  );
}
