<script setup lang="ts">
import { computed } from 'vue';
// theme & locale & dateLocale
import { lightTheme, darkTheme, useOsTheme, zhCN, dateZhCN } from 'naive-ui'
// components
import { NGlobalStyle, NThemeEditor, NLoadingBarProvider, NMessageProvider, NNotificationProvider, NDialogProvider } from 'naive-ui'
import TabBar from "./components/TabBar.vue"
import { useRoute } from 'vue-router';
const route = useRoute()
const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : lightTheme))
</script>

<template>
  <n-config-provider preflight-style-disabled :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <component :is="false ? 'div' : NThemeEditor" :style="'right: 18px; bottom: 24px;'">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-dialog-provider>
              <n-layout>
                <tab-bar />
                <RouterView v-slot="{ Component, route }">
                  <KeepAlive>
                    <Transition :name="route.meta.transition + '' || 'slide-right'">
                      <component :is="Component" />
                    </Transition>
                  </KeepAlive>
                </RouterView>
              </n-layout>
            </n-dialog-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-loading-bar-provider>
      <n-global-style />
    </component>
  </n-config-provider>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
  position: absolute !important;
  left: 0;
  right: 0;
  top: var(--n-item-height, 42px);
  bottom: 0;
  z-index: 1;
}

.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 1;
  transform: translateY(100%);
}

.slide-left-leave-to,
.slide-right-leave-to {
  opacity: 0.3;
}
</style>
