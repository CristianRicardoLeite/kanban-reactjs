'use client'


import { useState, useEffect } from 'react';
import TaskTable from '../components/TaskTable';
import AddTaskForm from '../components/AddTaskForm';
import Header from '@/src/components/header'

import api from '../services/api'

interface Task {
  id: string;
  name: string;
  status: string;
  dueDate: string;
}

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        if (Array.isArray(response.data.data)) {
          setTasks(response.data.data);
        } else {
          console.error("Formato de dados inesperado:", response.data);
        }
      } catch (error) {
        console.error("Falha ao buscar tarefas:", error);
      }
    };

    fetchTasks()
  }, [])

  const handleStatusChange = (taskId: string, newStatus: string) => {

    const updatedTasks = tasks.map((task: Task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([...tasks, newTask]);
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
