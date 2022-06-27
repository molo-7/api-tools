import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import strore from "./redux/strore";
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={strore}>
    <App />
  </Provider>
);
