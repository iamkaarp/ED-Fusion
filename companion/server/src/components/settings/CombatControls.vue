<template>
  <div class="content">
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Flight Assist"
        :function-to-bind="flightAssist"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Select Target Ahead"
        :function-to-bind="selectTargetAhead"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Cycle Next Target"
        :function-to-bind="cycleNextTarget"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Cycle Previous Ship"
        :function-to-bind="cyclePreviousShip"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Cycle Next Hostile Target"
        :function-to-bind="cycleNextHostileTarget"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Cycle Previous Hostile Ship"
        :function-to-bind="cyclePreviousHostileShip"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Cycle Next Subsystem"
        :function-to-bind="cycleNextSubsystem"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Cycle Previous Subsystem"
        :function-to-bind="cyclePreviousSubsystem"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Highest Threat"
        :function-to-bind="highestThreat"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Deploy/Retract Hardpoints"
        :function-to-bind="deployHardpoints"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Shield Cell"
        :function-to-bind="shieldCell"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Charge ECM"
        :function-to-bind="chargeECM"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Next Fire Group"
        :function-to-bind="nextFireGroup"
      />
    </div>
    <div class="t-row">
      <KeybindSetter
        @startBind="startListener"
        @stopBind="stopListener"
        @saveBind="saveListener"
        header="Previous Fire Group"
        :function-to-bind="previousFireGroup"
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
      selectTargetAhead: {
        name: 'selectTargetAhead',
        current: '',
        new: '',
        set: false,
      },
      cycleNextTarget: {
        name: 'cycleNextTarget',
        current: '',
        new: '',
        set: false,
      },
      cyclePreviousShip: {
        name: 'cyclePreviousShip',
        current: '',
        new: '',
        set: false,
      },
      cycleNextHostileTarget: {
        name: 'cycleNextHostileTarget',
        current: '',
        new: '',
        set: false,
      },
      cyclePreviousHostileShip: {
        name: 'cyclePreviousHostileShip',
        current: '',
        new: '',
        set: false,
      },
      cycleNextSubsystem: {
        name: 'cycleNextSubsystem',
        current: '',
        new: '',
        set: false,
      },
      cyclePreviousSubsystem: {
        name: 'cyclePreviousSubsystem',
        current: '',
        new: '',
        set: false,
      },
      highestThreat: {
        name: 'highestThreat',
        current: '',
        new: '',
        set: false,
      },
      deployHardpoints: {
        name: 'depoyHardpoints',
        current: '',
        new: '',
        set: false,
      },
      shieldCell: {
        name: 'shieldCell',
        current: '',
        new: '',
        set: false,
      },
      chargeECM: {
        name: 'chargeECM',
        current: '',
        new: '',
        set: false,
      },
      nextFireGroup: {
        name: 'nextFireGroup',
        current: '',
        new: '',
        set: false,
      },
      previousFireGroup: {
        name: 'previousFireGroup',
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
