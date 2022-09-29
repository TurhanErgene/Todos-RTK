import { useState } from "react";

import "./App.css";
import { add } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(add(title));
    setTitle("");
  };

  return (
    <div className="App">
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <button onClick={onSave}>Save</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id as string}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
