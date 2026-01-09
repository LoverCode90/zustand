import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer"; // 👈 Importamos Immer, no olvidar instalar este paquete.
import type { Todo, TodoState } from "./types";

const MOCK_API = import.meta.env.VITE_API_URL;

export const todoStore = create<TodoState>()(
  // devtools middiwarw
  devtools(
    // Immer: este middleware te permite mutar el estado de forma facil, usando push = ect.
    immer((set) => ({
      todos: [],
      isLoading: false,
      error: null,

      // actions
      actions: {
        fetchTodos: async () => {
          set({ isLoading: true }); // set loading to true

          try {
            const res = await fetch(MOCK_API);

            if (!res.ok) {
              const textError = await res.text(); // Captura el "Over rate limit"
              throw new Error(textError || "API Failed");
            }

            const data: Todo[] = await res.json();
            set({ todos: data, isLoading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Unknown error",
              isLoading: false,
            });
          }
        },

        toggleTodo: (id: string) => {
          set((state) => {
            // mutamos el estado sin nececidad de hacer copia con ...spread
            const todo = state.todos.find((t) => t.id === id);

            if (todo) {
              todo.completed = !todo.completed;
            }
          });
        },
      },
    })),
    { name: "todoStore" } // este devTools conecta este middleware con Redux Tools ext en chrome
  )
);
