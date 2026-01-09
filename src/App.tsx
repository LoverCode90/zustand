import Counter from "./components/Counter";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-center font-bold text-2xl">Hello React World</h1>
      <Counter />
      {/* <TodoList /> */}
    </div>
  );
}

export default App;
