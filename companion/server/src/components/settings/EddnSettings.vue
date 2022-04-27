<template>
  <div class="content">
    <div class="row flex items-center text-md">
      <label class="flex items-center">
        <input type="checkbox" v-model="optin" class="form-checkbox" />
        <span class="ml-2">OPT in</span>
      </label>
    </div>
    <div class="row flex items-center text-md">
      <label class="flex items-center">
        <input type="checkbox" class="form-checkbox" :disabled="!optin" />
        <span class="ml-2">Send Journaldata</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optin: false,
    }
  },
}
</script>

<style></style>
