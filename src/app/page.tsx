'use client'

import { useState, useEffect } from 'react';
import TaskTable from '../components/taskTable';
import AddTaskForm from '../components/AddTaskForm';
import TaskSearch from '../components/taskSearch'
import Header from '@/src/components/header'

import { fetchTasks, addTask } from '../services/getData'



interface Task {
  id: string;
  name: string;
  status: string;
  dueDate: string;
}

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);;

  useEffect(() => {
    async function loadAllTasks() {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    loadAllTasks();
  }, []);

  const handleStatusChange = (taskId: string, newStatus: string | null) => {
    if (newStatus === null) {
      setTasks(tasks.filter(task => task.id !== taskId));
    } else {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleAddTask = async (newTaskData: Task) => {
    try {
      await addTask(newTaskData);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
    }
  };

  return (
    <div>
      <Header />
      {/* <TaskSearch /> */}
      <TaskTable tasks={tasks} onStatusChange={handleStatusChange} />
      <AddTaskForm onTaskAdded={handleAddTask} />
    </div>
  );
}

export default TaskManager;
