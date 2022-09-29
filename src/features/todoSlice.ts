import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface Todo {
  id: String;
  title: String;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<String>) => {
      const newTodo = {
        id: v4() as string,
        title: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    remove: () => {},
  },
});

export default todoSlice.reducer;
export const { add, remove } = todoSlice.actions;
