import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Titlebar.css";
const { ipcRenderer } = window.require("electron");

export default function Titlebar() {
  const location = useLocation();
  const [path, setPath] = useState("/");
  const workspace = useSelector((store) => store.workspace);
  let status = "";
  let title = "";

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  // status
  if (workspace.id) {
    status = `Workspace: ${workspace.name}`;
    title = `${workspace.name} - Api Tools`;
    if (workspace.route) status += ` - ${workspace.route}`;
  } else if (path === "/") {
    status = "Viewing: Home Page";
    title = "Api Tools";
  } else if (path === "/workspaces") {
    status = "Viewing: Workspaces";
    title = "Workspaces - Api Tools";
  } else if (path === "/history") {
    status = "Viewing: History";
    title = "History - Api Tools";
  }

  document.title = title;

  // handlers
  const minimizeHandler = () => ipcRenderer.send("minimizeWindowButton");
  const restoreHandler = () => ipcRenderer.send("restoreWindowButton");
  const closeHandler = () => ipcRenderer.send("closeWindowButton");

  return (
    <div id="titlebar" className="bg-titlebar relative z-50">
      <div className="flex justify-between items-center">
        <div className="pl-4 py-1 flex items-center select-none">
          <span className="font-medium text-xs text-white-900 font-['Indie_Flower']">
            API Tools
          </span>
        </div>

        {/* Workspace Name */}
        <div className="select-none text-center absolute w-[270px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white-700 text-ellipsis overflow-hidden text-xs whitespace-nowrap">
          {status}
        </div>

        <div id="actions" className="flex items-center justify-end">
          {/* Minimize */}
          <span
            className="px-3 py-2 transition-colors cursor-pointer hover:bg-white-200"
            onClick={minimizeHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </span>

          {/* Restore */}
          <span
            className="px-3 py-2.5 transition-colors cursor-pointer hover:bg-white-200"
            onClick={restoreHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-3 w-3 text-white-700"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M19,0H5A5,5,0,0,0,0,5V19a5,5,0,0,0,5,5H19a5,5,0,0,0,5-5V5A5,5,0,0,0,19,0Zm3,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3Z" />
            </svg>
          </span>

          {/* Close */}
          <span
            className="px-3 py-2 transition-colors cursor-pointer hover:bg-[#eb3232]"
            onClick={closeHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
