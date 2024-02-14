'use client'

import { useState, useEffect } from 'react';
import TaskTable from '../components/taskTable';
import AddTaskForm from '../components/AddTaskForm';
import TaskSearch from '../components/taskSearch';
import Header from '@/src/components/header';

import { fetchTasks, addTask, fetchTasksWithSearch } from '../services/getData';

interface Task {
  id: string;
  name: string;
  status: string;
  dueDate: string;
}

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    loadAllTasks();
  }, []);

  async function loadAllTasks() {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  }

  const handleStatusChange = (taskId: string, newStatus: string | null) => {
    if (newStatus === null) {
      setTasks(tasks.filter(task => task.id !== taskId));
    } else {
      const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task);
      setTasks(updatedTasks);
    }
  };

  const handleAddTask = async (newTaskData: Task) => {
    try {
      await addTask(newTaskData);
      loadAllTasks();
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const fetchedTasks = await fetchTasksWithSearch(searchTerm);
      setTasks(fetchedTasks);
      setSearchHistory(prevHistory => [...prevHistory, searchTerm]);
    } catch (error) {
      console.error("Erro ao buscar tarefas com o termo:", error);
    }
  };

  const onUpdateSearchHistory = async (updatedHistory: string[]) => {
    setSearchHistory(updatedHistory);
    if (updatedHistory.length > 0) {
      const lastSearchTerm = updatedHistory[updatedHistory.length - 1];
      const fetchedTasks = await fetchTasksWithSearch(lastSearchTerm);
      setTasks(fetchedTasks);
    } else {
      loadAllTasks();
    }
  };

  return (
    <div>
      <Header />
      <TaskSearch onSearch={handleSearch} onUpdateSearchHistory={onUpdateSearchHistory} />
      <TaskTable tasks={tasks} onStatusChange={handleStatusChange} />
      <AddTaskForm onTaskAdded={handleAddTask} />
    </div>
  );
}

export default TaskManager;
