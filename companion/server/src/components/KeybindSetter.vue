<template>
  <div class="w-full flex">
    <div class="w-2/6">{{ header }}</div>
    <div class="w-4/6 flex">
      <div
        :id="functionToBind.name"
        class="bg-real-grey p-2 select-none"
        :class="functionToBind.set ? 'w-5/6 mr-2' : 'w-full'"
        @click="hasEventListener"
      >
        <span v-if="functionToBind.set && functionToBind.new === ''"> Listening </span>
        <span v-else-if="functionToBind.set && functionToBind.new !== ''">
          {{ functionToBind.new }}
        </span>
        <span v-else>
          {{ functionToBind.current !== '' ? functionToBind.current : 'Not set' }}
        </span>
      </div>
      <div v-if="functionToBind.set" class="flex w-2/6">
        <button
          class="bg-blue-500 hover:bg-blue-700 p-2 w-1/2 mr-2 text-neutral-900"
          @click="$emit('stopBind', functionToBind)"
        >
          Cancel
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 p-2 w-1/2 text-neutral-900"
          @click="$emit('saveBind', functionToBind)"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
    functionToBind: {
      type: Object,
      required: true,
    },
  },
  methods: {
    hasEventListener() {
      if (!this.functionToBind.set) {
        this.$emit('startBind', this.functionToBind)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bg-real-grey {
  background: #404040;
}
</style>
