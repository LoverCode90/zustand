import { create } from "zustand";
import { persist } from "zustand/middleware";

interface testState {
  count: number;
  title: string;

  // forma Pro de organizar. Separar datos de acciones
  actions: {
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    updateTitle: (newTitle: string) => void;
  };
}

//* (set): funcion callback que me servira para actualizar el estado mas adelante
export const counterStore = create<testState>()(
  //TODO: Middleware persist guarda tus datos en local-storage tan solo con elvolver la funcion set
  // TODO: Es como tener una base de datos. Solo usarla en datos que realmente nevcesiten ser guadados
  persist(
    (set) => ({
      count: 0,
      title: "Counter Example",
    
      // se usa set como callback si el nuevo valor depende el anterior
      actions: {
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        // se devulve directo sin callback si el valor anterior no importa
        reset: () => set({ count: 0 }),
    
        updateTitle(newTitle) {
          set(() => ({ title: newTitle }));
        },
      },
    }), {name: "counter-storage"}
  )
);

//TODO: Para evitar re-render se crea un hook que se encargue de extraer solo las actions
export const useCounterActions = () => counterStore((state) => state.actions);
