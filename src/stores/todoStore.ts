import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {Todo, TodoState} from "../types/types";

const MOCK_API = import.meta.env.VITE_API_URL;

export const todoStore = create<TodoState>()(
  devtools(
    (set, get) => ({
      todos: [],
      isLoading: false,
      error: null,

      // actions
      actions: {
        fetchTodos: async () => {
          set({ isLoading: true }); // set loading to true

          try {
            const res = await fetch(MOCK_API);
            const data: Todo[] = await res.json();

            set({ todos: data, isLoading: false });
          } catch (error) {
            set({error: `Something went wrong ${error}`, isLoading: false})
          }
        },
      },
    }),
    { name: "todoStore" } // este devTools conecta este middleware con Redux Tools ext en chrome
  )
);

// hook for actions
export const useTodoStore = () => todoStore((state) => state.actions);