import { HashRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";

// components
import Titlebar from "./components/Window/Titlebar";
import Sidebar from "./components/Window/Sidebar";
import NavigationDetails from "./components/Window/NavigationDetails";

// pages
import HomePage from "./pages/Home";
import HistoryPage from "./pages/History";
import WorkspacesPage from "./pages/workspaces";
import WorkspaceWrapper from "./pages/workspaces/workspace/Wrapper";
import WorkspacePage from "./pages/workspaces/workspace";

export default function App() {
  return (
    <HashRouter>
      <Titlebar />
      <main id="main" className={`${classes.main} flex w-full`}>
        <Sidebar />
        {/* Content */}
        <div className="bg-[#202225] w-full rounded-tl-xl">
          <NavigationDetails />
          <Routes>
            <Route index={true} element={<HomePage />} />
            <Route path="workspaces">
              <Route index={true} element={<WorkspacesPage />}></Route>
              <Route path=":id" element={<WorkspaceWrapper />}>
                <Route index={true} element={<WorkspacePage />}></Route>
                {/* <Route path=":routeName" element={} /> */}
                {/* <Route path="history" element={} /> */}
              </Route>
            </Route>
            <Route path="history" element={<HistoryPage />} />
          </Routes>
        </div>
      </main>
    </HashRouter>
  );
}
