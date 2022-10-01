<script setup lang="ts">
import { NInput, NDatePicker, NSpace } from 'naive-ui'
// locale & dateLocale
import { dateZhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :date-locale="dateZhCN">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <n-space vertical>
      <n-input />
      <n-date-picker />
    </n-space>
  </n-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>