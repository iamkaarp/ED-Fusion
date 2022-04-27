/*import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import chokidar from 'chokidar'*/

/*import { readStatusFile, logFileUpdate, getLatestLogFile } from '../helpers/FileLoaders'
import { FlagsDecoder } from '../helpers/FlagsDecoder'*/

const { readStatusFile, logFileUpdate, getLatestLogFile } = require('../helpers/FileLoaders')
const { FlagsDecoder } = require('../helpers/FlagsDecoder')

const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')
const chokidar = require('chokidar')
const { app } = require('electron')
const fs = require('fs')
const { exec } = require('child_process')

const exp = express()
const server = createServer(exp)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

process.on('message', (m) => {
  console.log(m)
})

const settings = JSON.parse(
  fs.readFileSync(app.getPath('userData') + '\\settings.json', {
    encoding: 'utf8',
    flag: 'r',
  }),
)

exp.use(cors())
io.on('connection', (socket) => {
  console.log('a user connected')
  const eliteDir = 'C:\\Users\\joaki\\Saved Games\\Frontier Developments\\Elite Dangerous'
  let currentLogFile = getLatestLogFile(eliteDir)
  let config = logFileUpdate(`${eliteDir}\\${currentLogFile.file}`)
  let status = readStatusFile(`${eliteDir}\\Status.json`)
  socket.emit('config', config)
  chokidar
    .watch(eliteDir, {
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 250,
      },
    })
    .on('all', async (event, filePath) => {
      if (event === 'add') {
        if (filePath === `${eliteDir}/${currentLogFile.file}`) {
          currentLogFile = getLatestLogFile(eliteDir)
          config = logFileUpdate(`${eliteDir}/${currentLogFile.file}`)
          socket.emit('config', config)
        }

        if (filePath === `${eliteDir}\\Status.json`) {
          status = readStatusFile(`${eliteDir}\\Status.json`)
          socket.emit('status', status)
        }
      }
      if (event === 'change') {
        if (filePath === `${eliteDir}/${currentLogFile.file}`) {
          config = logFileUpdate(`${eliteDir}/${currentLogFile.file}`, true)
          socket.emit('config', config)
        }
        if (filePath === `${eliteDir}\\Status.json`) {
          status = readStatusFile(`${eliteDir}\\Status.json`)
          status.flagsDecoded = FlagsDecoder(status.Flags)
          socket.emit('status', status)
        }
      }
    })
  socket.on('hotkey', (data) => {
    console.log(data)
    const command = settings.keyboard[data.key].split('+').join(' ')
    console.log(command)
    exec(`${__dirname}\\binary\\keypresser.exe ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
    })
  })
})
server.listen(4545)

exp.get('/test', (req, res) => {
  res.send('ok')
})
