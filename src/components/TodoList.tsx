import { useEffect } from "react";
import { useTodoStore } from "../stores/todo/useTodoStore";

export default function TodoList() {
  const { todos, isLoading, error, fetchTodos, toggleTodo } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) {
    return (
      <p className="font-md text-blue-600 px-5 py-2 rounded bg-neutral-900 mx-auto mt-8">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="font-md text-red-600 px-5 py-2 rounded bg-neutral-900 mx-auto mt-8">
        {error}
      </p>
    );
  }
  return (
    <ul className="mx-auto flex flex-col gap-4 max-w-sm">
      {todos.map((task) => (
        <li
          key={task.id}
          className="px-5 py-2 rounded w-full bg-neutral-800 flex items-center justify-between gap-5"
          onClick={() => toggleTodo(task.id)}
        >
          <span className="text-white">{task.text}</span>
          <span
            className={`px-4 py-1 rounded ${
              task.completed
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-neutral-900"
            }`}
          >
            {task.completed ? "completed" : "pending"}
          </span>
        </li>
      ))}
    </ul>
  );
}
