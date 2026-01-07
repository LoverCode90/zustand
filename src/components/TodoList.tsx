import { useEffect } from "react";
import { todoStore, useTodoStore } from "../stores/todoStore";

export default function TodoList() {
  const tasks = todoStore((state) => state.todos);
  const isLoading = todoStore((state) => state.isLoading);
  const error = todoStore((state) => state.error);
  const { fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [tasks]);

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
      {tasks.map((task) => (
        <li key={task.id} className="px-5 py-2 rounded w-full bg-neutral-800">
          <span className="text-white">{task.text}</span>
          <span
            className={`px-4 py-1.5 rounded ${
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
