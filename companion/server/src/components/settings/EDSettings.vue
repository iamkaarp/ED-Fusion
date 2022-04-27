<template>
  <div>
    {{ homePath + edLogPath }}
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data() {
    return {
      homePath: '',
      edLogPath: '\\Saved Games\\Frontier Developments\\Elite Dangerous',
    }
  },
  mounted() {
    //this.homePath = remote.app.getPath('home')
    ipcRenderer.send('HOME_PATH')
    ipcRenderer.on('HOME_PATH', (event, path) => {
      console.log(path)
      this.homePath = path
    })
  },
}
</script>

<style></style>
