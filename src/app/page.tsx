'use client'

import useTasks from '../hooks/useTasks';
import TaskTable from '../components/TaskTable';
import AddTaskForm from '../components/AddTaskForm';
import TaskSearch from '../components/TaskSearch';
import Header from '@/src/components/header';

function TaskManager() {
  const { tasks, handleAddTask, handleSearch, handleStatusChange, updateSearchHistory } = useTasks();

  return (
    <div>
      <Header />
      <TaskSearch onSearch={handleSearch} onUpdateSearchHistory={updateSearchHistory} />
      <TaskTable tasks={tasks} onStatusChange={handleStatusChange} />
      <AddTaskForm onTaskAdded={handleAddTask} />
    </div>
  );
}

export default TaskManager;
