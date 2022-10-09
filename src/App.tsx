import { useState } from "react";

import "./App.css";
import { add, remove, toggleCompleted } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchUser } from "./features/userSlice";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const [title, setTitle] = useState("");

  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(add(title));
    setTitle("");
  };

  const onDelete = (id: string) => {
    dispatch(remove(id));
  };

  const toggle = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  const currentUser = user.data && user.data.results[0];

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
          <li key={todo.id as string}>
            <button onClick={() => toggle(todo.id as string)}>
              {todo.completed ? "Mark not completed" : "Mark completed"}
            </button>
            <button onClick={() => onDelete(todo.id as string)}>Delete</button>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => dispatch(fetchUser())}>Fetch User</button>
        {user.loading && "Loading..."}
        {user.error && "error:" + user.error}
        {currentUser && (
          <div>
            Name: {currentUser.name.title} {currentUser.name.first}{" "}
            {currentUser.name.last}
            <br />
            Email: {currentUser.email}
            <br />
            Avatar: <img src={currentUser.picture.large} alt="Avatar" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
