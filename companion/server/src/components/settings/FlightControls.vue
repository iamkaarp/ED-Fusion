<template>
  <div class="content">
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Deploy Heatsink"
        :function-to-bind="deployHeatsink"
        ref="deployHeatsink"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Silent Running"
        :function-to-bind="silentRunning"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Eninge Boost"
        :function-to-bind="eningeBoost"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Analysis Mode"
        :function-to-bind="analysisMode"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Landing Gear"
        :function-to-bind="landingGear"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Cargo Scoop"
        :function-to-bind="cargoScoop"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Night Vision"
        :function-to-bind="nightVision"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Hyperspace"
        :function-to-bind="hyperspace"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Super Cruise"
        :function-to-bind="superCruise"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Flight Throttle 0%"
        :function-to-bind="flightThrottle0"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Flight Throttle 25%"
        :function-to-bind="flightThrottle25"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Flight Throttle 50%"
        :function-to-bind="flightThrottle50"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Flight Throttle 75%"
        :function-to-bind="flightThrottle75"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Flight Throttle 100%"
        :function-to-bind="flightThrottle100"
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
      deployHeatsink: {
        name: 'deployHeatsink',
        current: '',
        new: '',
        set: false,
      },
      silentRunning: {
        name: 'silentRunning',
        current: '',
        new: '',
        set: false,
      },
      eningeBoost: {
        name: 'eningeBoost',
        current: '',
        new: '',
        set: false,
      },
      analysisMode: {
        name: 'analysisMode',
        current: '',
        new: '',
        set: false,
      },
      landingGear: {
        name: 'landingGear',
        current: '',
        new: '',
        set: false,
      },
      cargoScoop: {
        name: 'cargoScoop',
        current: '',
        new: '',
        set: false,
      },
      nightVision: {
        name: 'nightVision',
        current: '',
        new: '',
        set: false,
      },
      hyperspace: {
        name: 'hyperspace',
        current: '',
        new: '',
        set: false,
      },
      superCruise: {
        name: 'superCruise',
        current: '',
        new: '',
        set: false,
      },
      flightThrottle0: {
        name: 'flightThrottle0',
        current: '',
        new: '',
        set: false,
      },
      flightThrottle25: {
        name: 'flightThrottle25',
        current: '',
        new: '',
        set: false,
      },
      flightThrottle50: {
        name: 'flightThrottle50',
        current: '',
        new: '',
        set: false,
      },
      flightThrottle75: {
        name: 'flightThrottle75',
        current: '',
        new: '',
        set: false,
      },
      flightThrottle100: {
        name: 'flightThrottle100',
        current: '',
        new: '',
        set: false,
      },
      mouseEventListener: null,
    }
  },
  methods: {
    startListener(target) {
      if (this.currentListener || this.mouseEventListener) {
        this.stopListener({ name: this.currentListener })
      }
      this.currentListener = target.name
      this[target.name].set = true
      this[target.name].new = ''
      let lastKeyTime = Date.now()
      const elem = document.getElementById(target.name)
      this.mouseEventListener = elem.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
          this[target.name].new = 'MouseLeft'
        }

        if (e.button === 2) {
          this[target.name].new = 'MouseRight'
        }
      })
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
        this.buffer.sort((a, b) => {
          const types = [
            'ControlLeft',
            'ControlRight',
            'ShiftLeft',
            'ShiftRight',
            'AltLeft',
            'AltRight',
            'MetaLeft',
            'MetaRight',
          ]
          if (types.includes(a) && types.includes(b)) {
            return 0
          } else {
            return a > b ? 1 : -1
          }
        })
        this[target.name].new = this.buffer.join(' + ')
      })
    },
    saveListener(target) {
      this[target.name].current = this[target.name].new
      this.stopListener(target)
    },
    stopListener(target) {
      this[target.name].new = ''
      this[target.name].set = false
      document.removeEventListener('keyup', this.eventListener)
      document.removeEventListener('mouseup', this.mouseEventListener)
    },
  },
}
</script>

<style lang="scss" scoped>
.t-row {
  @apply pb-3 flex items-center text-base;
}
</style>
