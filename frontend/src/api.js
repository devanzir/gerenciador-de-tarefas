
const API_URL = "http://localhost:8000/api/tasks";

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.data;
};

export const createTask = async (title, description) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, status: "pendente" }),
  });
  return await response.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const completeTask = async (task) => {
  await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, status: "concluída" }),
  });
};

export const updateTask = async (id, title, description) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  return await response.json();
};
