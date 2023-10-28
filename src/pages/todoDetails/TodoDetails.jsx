import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useTodos } from "../../hooks/useTodos";

import "./TodoDetails.css";
export default function TodoDetails() {
  const navigate = useNavigate();

  const { todoId } = useParams();
  const [todo, setTodo] = useState();
  const { getTodoById, deleteTodo, isLoading, error } = useTodos();

  useEffect(() => {
    const fetchTodo = async () => {
      console.log("fetch todo is running");
      try {
        const json = await getTodoById(todoId);
        setTodo(json);
        console.json(json);
      } catch (error) {}
    };
    fetchTodo();
  }, [todoId]);

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      navigate("/home");
    } catch (error) {}
  };
  return (
    <div className="wrapper">
      {todo ? (
        <div>
          <div>
            <h3> Title</h3>
            <p>{todo.title}</p>
          </div>
          <div>
            <h3> Description</h3>
            <p>{todo.description}</p>
          </div>
          <div>
            <h3> Due date</h3>
            <p>{new Date(todo.dueDate).toDateString()}</p>
          </div>
          <div>
            <h3> Priority</h3>
            <p>{todo.priority}</p>
          </div>
          <div>
            <h3> Status</h3>
            <p>{todo.status}</p>
          </div>
          <div>
            <h3> Updated Date</h3>
            <p>
              {todo.updatedDate
                ? new Date(todo.updatedDate).toDateString()
                : "no updation"}
            </p>
          </div>
          <button
            className="btn-delete"
            onClick={() => {
              handleDelete(todo._id);
            }}
          >
            delete
          </button>
          <button
            onClick={() => {
              navigate(`/updateTodo/${todoId}`);
            }}
            className="btn"
          >
            update
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
