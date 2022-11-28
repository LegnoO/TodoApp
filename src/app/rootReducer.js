import { combineReducers } from "@reduxjs/toolkit";

import { TodoReducer } from "../features/TodoSlice";

const rootReducer = combineReducers({
  todo: TodoReducer,
});

export default rootReducer;
