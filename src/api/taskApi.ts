
import {getClientApi} from "./apiClient";


// Fetch tasks from the server
export const getTasks = async (familyCode: string, userId?: string, role?: string) => {
  const apiClient = await getClientApi();
  const response = await apiClient.get("/tasks", {params:{familyCode, userId, role}});
  return response.data;
};

// Create a new task
export const createNewTask = async (taskData: any) => {
  const apiClient = await getClientApi();
  const response = await apiClient.post("/tasks", taskData);
  return response.data;
}

// Update an existing task
export const updateTask = async (id: string, taskData: any) => {
  const apiClient = await getClientApi();
  const response = await apiClient.put(`/tasks/${id}`, taskData);
  return response.data;
};

//verify task
export const verifyTask = async (id: string) => {
  const apiClient = await getClientApi();
  const response = await apiClient.put(`/tasks/${id}/verify`);
  return response.data;
};
// Delete a task
export const deleteTask = async (id: string) => {
  const apiClient = await getClientApi();
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
}; 
//add comment
export const addComment = async (taskId: string, comment: any) => {
  const apiClient = await getClientApi();
  const response = await apiClient.post(`/tasks/${taskId}/comments`, comment)
  return response.data
}

//claim task
export const claimTask = async (taskId: string, userId: string) => {
  const apiClient = await getClientApi();
  const response = await apiClient.post(`/tasks/${taskId}/claim`, {userId})
  return response.data
}

