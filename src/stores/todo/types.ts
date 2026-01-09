export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  actions: {
    fetchTodos: () => Promise<void>;
    toggleTodo: (id: string) => void;
  };
}
