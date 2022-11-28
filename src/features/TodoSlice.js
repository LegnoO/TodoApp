import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const testTodoList = [
  { id: "uuid()", content: "Hit the gym", checked: false },
  { id: "uuid()", content: "Meet George", checked: true },
  { id: "uuid()", content: "Play game", checked: false },
];

const todoList = JSON.parse(localStorage.getItem("storeTodoList"))
  ? JSON.parse(localStorage.getItem("storeTodoList"))
  : [];
  
const date = new Date();
	  
export const Todo = createSlice({
  name: "todo",
  initialState: {
    todoList,
  },
  reducers: {
    addTodo: (state, action) => {

      const newTodoList = {
        id: uuid(),
        content: action.payload.task,
        date:
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(),
        time:
          date.getHours() +
          ":" +
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) +
          ":" +
          (date.getSeconds() < 10
            ? "0" + date.getSeconds()
            : date.getSeconds()),
        checked: false,
      };
      state.todoList.push(newTodoList);

      localStorage.setItem("storeTodoList", JSON.stringify(state.todoList));
    },

    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter((item) => {
        return item.id !== action.payload;
      });

      const saveLocalStorage = JSON.stringify(state.todoList);
      localStorage.setItem("storeTodoList", saveLocalStorage);
    },

    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((item) => {
        return item.id === action.payload[0].id
          ? { ...item, content: action.payload[0].content }
          : { ...item };
      });

      const saveLocalStorage = JSON.stringify(state.todoList);
      localStorage.setItem("storeTodoList", saveLocalStorage);
    },

    checkTodo: (state, action) => {
      state.todoList = state.todoList.map((item) => {
        return item.id === action.payload
          ? { ...item, checked: !item.checked }
          : { ...item };
      });
      const saveLocalStorage = JSON.stringify(state.todoList);
      localStorage.setItem("storeTodoList", saveLocalStorage);
    },
  },
  extraReducers: {},
});

export const { addTodo, removeTodo, checkTodo, updateTodo } = Todo.actions;
export const TodoReducer = Todo.reducer;
