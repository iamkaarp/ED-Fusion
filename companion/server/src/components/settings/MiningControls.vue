<template>
  <div class="content">
    <div class="row flex items-center text-md">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Flight Assist"
        :function-to-bind="flightAssist"
      />
    </div>
  </div>
</template>

<script>
import KeybindSetter from '../KeybindSetter.vue'

export default {
  components: {
    KeybindSetter,
  },
  emits: ['saveBind', 'startBind', 'stopBind'],
  data() {
    return {
      buffer: [],
      eventListener: null,
      currentListener: null,
      flightAssist: {
        name: 'flightAssist',
        current: '',
        new: '',
        set: false,
      },
    }
  },
  methods: {
    startListener(target) {
      if (this.currentListener) {
        this.stopListener({ name: this.currentListener })
      }
      this.currentListener = target.name
      this[target.name].set = true
      let lastKeyTime = Date.now()
      this.eventListener = document.addEventListener('keyup', (e) => {
        if (e.repeat) {
          return
        }
        const currentTime = Date.now()

        if (currentTime - lastKeyTime > 500) {
          this.buffer = []
        }
        const key =
          e.code.search('Key') === 0 ? e.code.replace('Key', '').toLocaleLowerCase() : e.code
        if (this.buffer.indexOf(key) === -1) {
          this.buffer.push(key)
        }
        lastKeyTime = currentTime
        this[target.name].new = this.buffer.reverse().join('+')
      })
    },
    saveListener(target) {
      this[target.name].current = this[target.name].new
      this[target.name].new = ''
      this[target.name].set = false
      document.removeEventListener('keyup', this.eventListener)
    },
    stopListener(target) {
      console.log(target)
      this[target.name].new = ''
      this[target.name].set = false
      document.removeEventListener('keyup', this.eventListener)
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  @apply pb-3;
}
</style>
