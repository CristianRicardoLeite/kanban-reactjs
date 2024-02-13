import api from '../services/api'

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    if (Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error("Formato de dados inesperado:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Falha ao buscar tarefas:", error);
    return [];
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o status da tarefa:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar a tarefa:", error);
    throw error;
  }
};