<template>
  <v-app id="main">
    <v-app-bar app color="grey darken-4">
      <v-tabs v-model="tab">
        <v-tab>Flight</v-tab>
        <v-tab>Combat</v-tab>
        <v-tab>Mining</v-tab>
        <v-tab>Exploration</v-tab>
        <v-tab>General</v-tab>
        <v-tab>EDDN</v-tab>
        <v-tab>Elite Dangerous</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <FlightControls />
        </v-tab-item>
        <v-tab-item>
          <CombatControls />
        </v-tab-item>
        <v-tab-item>
          <CombatControls />
        </v-tab-item>
        <v-tab-item>
          <CombatControls />
        </v-tab-item>
        <v-tab-item>
          <CombatControls />
        </v-tab-item>
        <v-tab-item>
          <EddnSettings />
        </v-tab-item>
        <v-tab-item>
          <EDSettings />
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import FlightControls from './components/settings/FlightControls.vue'
import CombatControls from './components/settings/CombatControls.vue'
import EddnSettings from './components/settings/EddnSettings.vue'
import EDSettings from './components/settings/EDSettings.vue'

export default {
  name: 'App',

  components: {
    FlightControls,
    CombatControls,
    EddnSettings,
    EDSettings,
  },

  data() {
    return {
      tab: null,
      items: ['Item One', 'Item Two', 'Item Three'],
    }
  },
}
</script>

<style lang="scss" scoped>
.content {
  @apply p-4;
}
</style>
