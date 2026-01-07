import { counterStore, useCounterActions } from "../stores/testStore";
import React, { useEffect } from "react";
import Button from "./ui/Button";

export default function Counter() {
  const title = counterStore((state) => state.title)
  const count = counterStore((state) => state.count); // la forma mas eficiente pero verbosa de extraer el estado del store
  const { increment, decrement, reset, updateTitle } = useCounterActions(); // Aqui se extraen de un hook personalizado

  const checkCountLimit = () => {
    // la forma de obtener el estado(una prop) fuera de un store. con getState()
    const currentCount = counterStore.getState().count;

    /** * @important INMUTABILIDAD EN ZUSTAND
     * No usar '=' (ej. state.count = 10). La mutación directa rompe los re-renders.
     * setState() mezcla (merges) el objeto enviado con el estado actual de forma segura.
     */
    if (currentCount > 10) {
      counterStore.setState({ count: 10 });
    } else if (currentCount < 0) {
      counterStore.setState({ count: 0 });
    }
  };

  useEffect(() => {
    checkCountLimit();
  }, [count]);

  return (
    <div className="bg-neutral-800 max-w-md mx-auto mt-8 p-6 rounded">
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <p className="text-center text-gray-300 mt-3">Counter: {count}</p>

      <div className="flex items-center gap-6 mt-6">
        <Button label="Decrement" onClick={decrement} />
        <Button label="Increment" onClick={increment} />
        <Button label="Reset" onClick={reset} bgColor="bg-rose-600" />
      </div>

      <input
        type="text"
        className="p-2 rounded text-white mx-auto mt-3"
        placeholder="Type a title..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          updateTitle(e.currentTarget.value)
        }}
      />
    </div>
  );
}
