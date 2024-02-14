'use client'

import { useState, useEffect } from 'react';
import { fetchTasks, addTask, fetchTasksWithSearch, updateTaskStatus } from '../services/getData';

interface Task {
  id: string;
  name: string;
  status: string | null;
  dueDate: string;
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Erro ao buscar todas as tarefas:", error);
    }
  };

  const handleAddTask = async (taskData: Task) => {
    try {
      await addTask(taskData);
      fetchAllTasks();
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string | null) => {
    try {
      await updateTaskStatus(taskId, newStatus);

      const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
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

  const updateSearchHistory = async (updatedHistory: string[]) => {
    setSearchHistory(updatedHistory);
    if (updatedHistory.length > 0) {
      const lastSearchTerm = updatedHistory[updatedHistory.length - 1];
      handleSearch(lastSearchTerm);
    } else {
      fetchAllTasks();
    }
  };

  return { tasks, handleAddTask, handleStatusChange, handleSearch, updateSearchHistory, searchHistory };
}
