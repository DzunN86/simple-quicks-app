import api from "@/api/axios";

// fetch all tasks
export const fetchInbox = async () => {
  const response = await api.get("/chat");
  return response.data;
};