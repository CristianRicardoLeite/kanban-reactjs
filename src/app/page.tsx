'use client'

import { useState, useEffect } from 'react';
import TaskTable from '../components/TaskTable';
import AddTaskForm from '../components/AddTaskForm';
import Header from '@/src/components/header'

import { deleteTask as deleteTaskService } from '../services/getData';
import { fetchTasks } from '../services/getData'



interface Task {
  id: string;
  name: string;
  status: string | null;
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

  const handleTaskAdded = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div>
      <Header />
      <TaskTable tasks={tasks} onStatusChange={handleStatusChange} />
      <AddTaskForm onTaskAdded={handleTaskAdded} />
    </div>
  );
}

export default TaskManager;
