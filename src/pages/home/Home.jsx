import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const { getAllTodos, isLoading, error } = useTodos();

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const json = await getAllTodos();
        setTodos(json);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchAllTodos();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="align-btn">
        <button onClick={() => navigate("/createTodo")} className="btn">
          Create Todo
        </button>
      </div>
      <div className="todo-list">
        {isLoading && <p>Loading...</p>}
        {!isLoading && todos && todos.length === 0 && (
          <p>No Todos yet! Add some.</p>
        )}
        {todos &&
          todos.map((todo) => (
            <Link
              key={todo._id}
              to={`/todoDetails/${todo._id}`}
              className="todo-link"
            >
              <div className="todo-heading">
                <h4>{todo.title}</h4>
                <p >Due by {new Date(todo.dueDate).toDateString()}</p>
              </div>
              <p className="truncate-paragraph">{todo.description}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
