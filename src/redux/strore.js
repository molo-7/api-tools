import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./slices/workspaceSlice";

export default configureStore({
  reducer: {
    workspace: workspaceReducer,
  },
});
