import { useState, useEffect } from "react";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";

import "./UpdateTodo.css";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const statuses = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

export default function UpdateTodo() {
  const navigate = useNavigate();
  const { todoId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const [formError, setFormError] = useState(null);

  const { getTodoById, updateTodo, isLoading, error } = useTodos();

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const todoDetails = await getTodoById(todoId);
        setTitle(todoDetails.title);
        setDescription(todoDetails.description);
        setPriority(priorities.find((p) => p.value === todoDetails.priority));
        setStatus(statuses.find((s) => s.value === todoDetails.status));

        const isoDate = "2023-10-13T00:00:00.000Z";
        const dateObj = new Date(isoDate);
        const formattedDate = dateObj.toISOString().split("T")[0];
        setDueDate(formattedDate);
      } catch (error) {
        // Handle error or set appropriate feedback
      }
    };
    fetchTodoDetails();
  }, [todoId]);

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
      await updateTodo(todoId, {
        title,
        description,
        dueDate,
        priority: priority.value,
        status: status.value,
      });
      navigate("/home");
    } catch (error) {
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Update Todo</h2>
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
          value={priority}
          onChange={(option) => setPriority(option)}
          options={priorities}
        />
      </label>
      <label>
        <span>Status:</span>
        <Select
          value={status}
          onChange={(option) => setStatus(option)}
          options={statuses}
        />
      </label>

      <button className="btn">Update Todo</button>
    </form>
  );
}
