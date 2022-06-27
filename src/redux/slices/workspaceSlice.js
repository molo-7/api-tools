import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "workspace",
  initialState: {
    name: "",
    id: "",
    route: "",
  },
  reducers: {
    updateWorkspace(state, { payload }) {
      state = payload;
    },
    setRoute(state, { payload }) {
      state.route = payload;
    },
  },
});

export default slice.reducer;
