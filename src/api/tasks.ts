import api from "@/api/axios";
import { Task } from "@/types";

// fetch all tasks
export const fetchTasks = async () => {
  const response = await api.get("/task");
  return response.data;
};

// Create initial task
export const createTask = async () => {
  const response = await api.post("/task", {
    title:"",
    dateline: "",
    description: "",
    tags: [],
    status: false,
    type: "",
  });
  return response.data;
};

// delete task
export const deleteTask = async (id: string) => {
  const response = await api.delete(`/task/${id}`);
  return response.data;
};

// update task
export const updateTask = async ({ id, task }: { id: string; task: Task }) => {
  const response = await api.put<Task>(`/task/${id}`, task);
  return response.data;
};