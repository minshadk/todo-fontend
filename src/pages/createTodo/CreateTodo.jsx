import { useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom"; 

import { useTodos } from "../../hooks/useTodos";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const stautes = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

export default function CreateTodo() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStauts] = useState("");

  const [formError, setFormError] = useState(null);

  const { createTodo, isLoading, error } = useTodos();

  const formatDate = (dateToFormat) => {
    // Format the date  to "YYYY-MM-DD HH:mm")
    const formattedDate = `${dateToFormat.getFullYear()}-${(
      dateToFormat.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateToFormat
      .getDate()
      .toString()
      .padStart(2, "0")} ${dateToFormat
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateToFormat
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!priority) {
      setFormError("Please select a todo priority");
      return;
    }
    if (!status) {
      setFormError("Please select a todo status");
      return;
    }

    try {
      await createTodo(
        title,
        description,
        dueDate,
        priority.value,
        status.value
      );
      navigate("/home");
    } catch (error) {}
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create Todo </h2>
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Todo description:</span>
        <textarea
          type="text"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label>
        <span>Due date:</span>
        <input
          type="date"
          required
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
      </label>
      <label>
        <span>Priority:</span>
        <Select
          onChange={(option) => setPriority(option)}
          options={priorities}
        />
      </label>
      <label>
        <span>Stauts:</span>
        <Select onChange={(option) => setStauts(option)} options={stautes} />
      </label>

      <button className="btn">Create Todo</button>
      <div></div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
