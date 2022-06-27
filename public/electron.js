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
ipcMain.on("createWorkspaceRequest", (e, workspaceData) => {
  workspaceModel
    .findOne({ name: new RegExp(`^${workspaceData.name}$`, "i") }) // case-insensitive search
    .then((document) => {
      if (document)
        mainWindow.webContents.send("workspaceCreate", {
          notAvailable: true,
          ...document,
        });
      else return workspaceModel.create(workspaceData);
    })
    .then((document) =>
      mainWindow.webContents.send("workspaceCreate", document)
    )
    .catch(console.error);
});
