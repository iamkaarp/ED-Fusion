'use strict'

import { app, protocol, BrowserWindow, Menu, Tray, globalShortcut, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

import { fork } from 'child_process'

//import fs from 'fs'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

async function createWindow() {
  console.log(app.getPath('userData'))
  // Create the browser window.
  let isQuiting = false
  const win = new BrowserWindow({
    width: 1000,
    height: 940,
    icon: __dirname + '/assets/icons/logo.png',
    title: 'ED Fusion',
    //titleBarStyle: 'hidden',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools()
    }
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  if (!isDevelopment) {
    win.setResizable(false)
  }

  const tray = new Tray(__dirname + '/assets/icons/logo.png')
  tray.on('click', () => {
    win.show()
  })
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Open',
        click: function () {
          win.show()
        },
      },
      {
        label: 'Quit',
        click: function () {
          isQuiting = true
          app.quit()
        },
      },
    ]),
  )
  tray.setToolTip('ED Fusion')

  win.on('minimize', function (event) {
    event.preventDefault()
    //win.hide()
  })

  win.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault()
      //win.hide()
    }

    return false
  })

  ipcMain.on('HOME_PATH', () => {
    win.webContents.send('HOME_PATH', app.getPath('home'))
  })

  const controller = new AbortController()
  const { signal } = controller
  const child = fork(__dirname + '/binary/server.js', ['child'], signal)
  child.on('error', (err) => {
    console.log(err)
  })

  child.send('hello')
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  if (!isDevelopment && !process.env.IS_TEST) {
    globalShortcut.register('Control+Shift+I', () => {
      return false
    })
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
