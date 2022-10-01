<script setup lang="ts">
import { computed, h, Ref, ref, VNode, VNodeChild } from "vue";
import { NLayoutHeader, NMenu, NAutoComplete } from "naive-ui";
import type { MenuGroupOption, AutoCompleteOption } from "naive-ui";
import { RouterLink, useRoute } from "vue-router";
const route = useRoute()
// const router = useRouter()

// const mobilePopoverRef = ref(null)
const renderMenuLabel = (option: any): VNode => {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label
  }
  return h(
    RouterLink,
    {
      to: option.path
    },
    { default: () => option.label }
  )
}

const isMobile = ref(false)
const isTablet = ref(false)


const menuOptions = computed(() => {
  return [
    {
      key: 'home',
      label: 'Home',
      path: '/'
    },
    {
      key: 'test',
      label: 'Test',
      path: '/imptest'
    },
    {
      key: 'player',
      label: 'Player',
      path: '/player'
    },
  ]
})
// const menuOptions = computed(() => [
//   {
//     key: 'home',
//     label: 'Home',
//     path: themeAndLocaleReg.exec(route.path)?.[0]
//   }
// ])
// const menuOptions: MenuOption[] = [
//   {
//     label: 'Home',
//     key: 'home',
//     path: '/'
//   }
// ]
const searchPattern = ref("")
const searchOptions = ref(["aa"])

type SearchValue = string

const handleSearch = (value: SearchValue) => {
  console.log(value)
}

const updateOptions = () => {

}

</script>
<template>
  <n-layout-header bordered class="nav">
    <!-- <n-text tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
      <img src="./assets/images/naivelogo.svg">
      <span v-if="!isMobile">Naive UI</span>
    </n-text> -->
    <div :style="!isMobile ? 'display: flex; align-items: center;' : ''">
      <div v-if="!(isMobile || isTablet)" class="nav-menu">
        <n-menu mode="horizontal" :options="menuOptions" :render-label="renderMenuLabel" />
      </div>
      <n-auto-complete v-model:value="searchPattern" :style="!isMobile ? 'width: 216px; margin-left: 24px' : undefined"
        placeholder="请输入歌曲名或歌手名" :options="searchOptions" clear-after-select blur-after-select @select="handleSearch" />
      <!-- TODO: add it -->
      <!-- template #suffix>
        <span style="color: var(--placeholder-color)">⌘ + K</span>
      </template -->
    </div>
    <!-- <n-popover v-if="isMobile || isTablet" ref="mobilePopoverRef" style="padding: 0; width: 288px"
      placement="bottom-end" display-directive="show" trigger="click">
      <template #trigger>
        <n-icon size="20" style="margin-left: 12px">
          <menu-outline />
        </n-icon>
      </template>
      <div style="overflow: auto; max-height: 79vh">
        <n-menu :value="mobileMenuValue" :options="mobileMenuOptions" :indent="18" :render-label="renderMenuLabel"
          @update:value="handleUpdateMobileMenu" />
      </div>
    </n-popover> -->
    <!-- <div v-else class="nav-end">
      <n-button size="small" quaternary class="nav-picker" @click="handleLocaleUpdate">
        {{ localeLabelMap[locale] }}
      </n-button>
      <n-button size="small" quaternary class="nav-picker" @click="handleThemeUpdate">
        {{ themeLabelMap[theme] }}
      </n-button>
      <n-button size="small" tag="a" quaternary class="nav-picker" :href="repoUrl" target="_blank">
        GitHub
      </n-button>
      <n-text class="nav-picker padded">
        {{ version }}
      </n-text>
      <n-button v-if="dev" size="small" quaternary class="nav-picker" @click="handleDisplayModeUpdate">
        {{ displayModeLabelMap[displayMode] }}
      </n-button>
      <n-button v-if="tusimple || dev" size="small" quaternary class="nav-picker" @click="handleConfigProviderUpdate">
        {{ cfgProviderLabelMap[configProviderName] }}
      </n-button>
    </div> -->
  </n-layout-header>
</template>
<style scoped>

</style>