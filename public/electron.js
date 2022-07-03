const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const workspaceModel = require("./models/workspaces.model");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 420,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: "#141414",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, "icon.ico"),
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Main Window Control Buttons
ipcMain.on("minimizeWindowButton", () => mainWindow.minimize());
ipcMain.on("restoreWindowButton", () =>
  mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize()
);
ipcMain.on("closeWindowButton", () => app.quit());

// Datastore
ipcMain.handle("createWorkspaceRequest", async (event, data) => {
  try {
    const workspaceDoc = await workspaceModel.findOne({
      name: new RegExp(`^${data.name}$`, "i"),
    }); // case-insensitive search

    if (workspaceDoc)
      return {
        notAvailable: true,
        ...workspaceDoc,
      };

    return await workspaceModel.create(data);
  } catch (error) {
    console.error(console.error);
  }
});

ipcMain.handle("getWorkspaceRequest", async (event, id) => {
  try {
    const workspace = await workspaceModel.getById(id);
    return workspace;
  } catch (error) {
    console.error(error);
  }
});
