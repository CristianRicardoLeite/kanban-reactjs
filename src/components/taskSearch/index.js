import { useState } from 'react';
import { fetchTasksWithSearch } from '@/src/services/getData';
import TaskTable from '@/src/components/taskTable';

function TaskSearchAndUpdate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);

  const onUpdateTask = async () => {
    try {
      const searchedTasks = await fetchTasksWithSearch(searchTerm);
      console.log(searchedTasks)

      setTasks(searchedTasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar tarefa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={onUpdateTask}>Pesquisar</button>
      <TaskTable tasks={tasks} />
    </div>
  );
}

export default TaskSearchAndUpdate;
