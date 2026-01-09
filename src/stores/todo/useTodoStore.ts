import { todoStore } from "./todoStore";

// Mejor así para no importar dos cosas:
export const useTodoStore = () => {
  const todos = todoStore((state) => state.todos);
  const isLoading = todoStore((state) => state.isLoading);
  const error = todoStore((state) => state.error);
  const actions = todoStore((state) => state.actions);

  return { todos, isLoading, error, ...actions };
};
