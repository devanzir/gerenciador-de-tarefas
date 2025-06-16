import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("Todas");

 
  useEffect(() => {
    fetch("http://localhost:8000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);


  const handleCreate = () => {
    fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status: "pendente" }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTitle("");
        setDescription("");
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() =>
      setTasks(tasks.filter((task) => task.id !== id))
    );
  };

  const handleComplete = (task) => {
    fetch(`http://localhost:8000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: "concluída" }),
    }).then(() =>
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
    fetch(`http://localhost:8000/api/tasks/${editingTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
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
          <button
            className="btn btn-save"
            onClick={handleSave}
            type="button"
          >
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
        {filteredTasks.length === 0 ? (
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.71 7.04a2.5 2.5 0 00-1.79-1.79 9.961 9.961 0 00-3.72 3.72L12 14l1.19-1.19a2.5 2.5 0 00-3.72-3.72 2.5 2.5 0 00-1.79 1.79L8.56 12l-1.79 1.79a2.5 2.5 0 003.72 3.72L12 18.41l1.79-1.79a2.5 2.5 0 003.72-3.72L16.71 12l1.79-1.79z" />
                  </svg>
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                  title="Excluir"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.5 4.304-9.5 9.5s4.115 9.5 9.5 9.5 9.5-4.304 9.5-9.5-4.115-9.5-9.5-9.5zm0 16c-4.69 0-8.5-3.868-8.5-8.5S7.31 5.5 12 5.5s8.5 3.868 8.5 8.5-3.868 8.5-8.5 8.5zm0-14.5c-3.59 0-6.5-2.91-6.5-6.5S8.41 0 12 0s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z" clipRule="evenodd" />
                  </svg>
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