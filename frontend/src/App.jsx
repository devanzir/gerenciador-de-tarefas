import React, { useState, useEffect } from "react";
import "./App.css";
import {
  fetchTasks,
  createTask,
  deleteTask,
  completeTask,
  updateTask,
} from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => console.error("Erro ao buscar tarefas:", err));
  }, []);

  const handleCreate = () => {
    createTask(title, description).then((newTask) => {
      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
    });
  };

  const handleDelete = (id) => {
    deleteTask(id).then(() =>
      setTasks(tasks.filter((task) => task.id !== id))
    );
  };

  const handleComplete = (task) => {
    completeTask(task).then(() =>
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, status: "concluída" } : t
        )
      )
    );
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
  };

  const handleSave = () => {
    updateTask(editingTask.id, title, description).then((updatedTask) => {
      setTasks(
        tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        )
      );
      setTitle("");
      setDescription("");
      setEditingTask(null);
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Todas") return true;
    if (filter === "Pendentes") return task.status !== "concluída";
    if (filter === "Concluídas") return task.status === "concluída";
    return false;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>Suas Tarefas</h1>
      </header>

      <div className="filters">
        <button
          className={`filter-btn ${filter === "Todas" ? "active" : ""}`}
          onClick={() => setFilter("Todas")}
        >
          Todas
        </button>
        <button
          className={`filter-btn ${filter === "Pendentes" ? "active" : ""}`}
          onClick={() => setFilter("Pendentes")}
        >
          Pendentes
        </button>
        <button
          className={`filter-btn ${filter === "Concluídas" ? "active" : ""}`}
          onClick={() => setFilter("Concluídas")}
        >
          Concluídas
        </button>
      </div>

      <form className="task-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Título da tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editingTask ? (
          <button className="btn btn-save" onClick={handleSave} type="button">
            Salvar
          </button>
        ) : (
          <button
            className="btn btn-add"
            onClick={handleCreate}
            disabled={!title.trim() || !description.trim()}
            type="button"
          >
            Adicionar
          </button>
        )}
      </form>

      <div className="task-list">
        {Array.isArray(filteredTasks) && filteredTasks.length === 0 ? (
          <p className="no-tasks">Nenhuma tarefa encontrada.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.status === "concluída"}
                  onChange={() => handleComplete(task)}
                />
                <span className={task.status === "concluída" ? "completed" : ""}>
                  {task.title}
                </span>
              </div>
              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(task)}
                  title="Editar"
                >
                  ✏️
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
