import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "workspace",
  initialState: {
    name: "",
    api: {
      baseURL: "",
      version: null,
    },
    id: "",
    routes: [{}],
    lastVisited: null,
    currentRoute: "",
  },
  reducers: {
    setWorkspace: (state, { payload }) => payload,
    setCurrentRoute(state, { payload }) {
      state.currentRoute = payload;
    },
  },
});

export const { setWorkspace, setCurrentRoute } = slice.actions;
export default slice.reducer;
