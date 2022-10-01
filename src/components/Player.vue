<script setup lang="ts">
import { useThemeVars, NProgress } from 'naive-ui';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { timeString } from "../utils/utils";

const theme = useThemeVars()
console.log(theme.value)
const player = reactive({
  type: "page",
  color: theme.value.textColor1
})
const song = reactive({
  cover: "//p4.music.126.net/vVNZDKMKb6mMEXxNljaA_g==/109951165274426604.jpg",
  url: "//music.163.com/song/media/outer/url?id=1982706733",
  nowTime: "0: 00",
  endTime: "0: 00"
})


const route = useRoute();
const { path } = route;
const percentage = ref(0)

const audio = ref();
const audioControl = ref();
let audioContent: HTMLAudioElement = ref(audio.value).value;
let { currentTime, duration } = audioContent

onMounted(() => {
  audioContent = ref(audio.value).value;
  audioContent.addEventListener("canplaythrough", () => {
    /* 音频可以播放；如果权限允许则播放 */
    console.log(audioContent.currentTime, audioContent.duration)
    song.endTime = timeString(duration)
    audioContent.play();
  });

  // audioContent.addEventListener("")


})

// console.log(route.path)
watch(
  () => path,
  (path) => {
    console.log(route)
    if (path != "/player") return player.type = "bar";
    return player.type = "page"
  },
  { immediate: true }
);
// watch(
//   () => currentTime,
//   (time) => {
//     song.nowTime = timeString(time)
//   },
//   { immediate: true }
// );

const update: any = (paused: any, ended = false) => {
  // var audio = this.$refs.audio;
  const flash = audioControl.value;
  // console.log(audio, flash);
  if (ended == true) {
    // return this.getMusic();
    return
  }
  if (paused) {
    flash?.style.setProperty("animation-play-state", "paused", "");
  } else {
    flash?.style.setProperty("animation-play-state", "running", "");
  }
}
</script>
<template>
  <div>
    <div class="player-bar" v-if="player.type == 'bar'">
      <img class="song-cover" :src="song.cover" alt="">
      <n-progress class="process-bar" type="line" rail-style="height:5px;" :percentage="percentage">
        <div class="song-title">路过人间-郁可唯</div>
        <div class="song-time">
          <span>0: 00</span>
          <span>{{song.nowTime}} / {{song.endTime}}</span>
          <!-- <span>{{audioContent?.currentTime || "0: 00"}}</span>
          <span>{{audioContent.duration}}</span> -->
        </div>
      </n-progress>
    </div>
    <div class="player-page" v-else>
      <n-progress class="process-circle" type="circle" :offset-degree="180" :stroke-width="1" :percentage="percentage">
        <img ref="audioControl" class="song-cover" :src="song.cover" alt="" @click="">
      </n-progress>
    </div>
    <audio ref="audio" class="song-content" controls :src="song.url" crossorigin="anonymous" autoplay
      @ended="update(false, true)" @pause="update(true)" @play="update(false)" @error="update(false, true)">
    </audio>

  </div>
</template>
<style scoped>
.player-bar {
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 5%;
  bottom: 0;
  width: 100vw;
  background-color: #2222;
  height: 70px;

}

.song-cover {
  display: inline-block;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

.player-bar .song-cover {
  width: 50px;
  margin-inline-end: 14px;
}


.process-bar {
  width: calc(85% - 64px);
}

.process-bar :deep(.n-progress-content) {
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: repeat(2, 1fr); */
}

.process-bar :deep(.n-progress-custom-content) {
  position: absolute;
  bottom: 150%;
  margin: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.process-bar .song-title {
  grid-row: 0;
}

.process-bar .song-time>span {
  position: absolute;
  left: 0;
  top: 135%;
}

.process-bar .song-time>span:nth-child(2) {
  left: unset;
  right: 0;
}

.player-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-page .process-circle {
  width: 25em;
}

.player-page .song-cover {
  width: 15em;
  box-shadow: #000 0 0 0 2em, #999 -1px 1px 0 2.05em,
    #000 0 0 0 2.3em, #999 1px -1px 0 2.35em,
    #000 0 0 0 2.6em, #999 -1px 1px 0 2.65em,
    #000 0 0 0 2.9em, #999 1px -1px 0 2.95em,
    #000 0 0 0 3.2em, #999 0 0 0 3.25em,
    #000 0 0 0 3.5em;
  /* box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px; */
  animation: go;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-play-state: paused;
}

@keyframes go {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}
</style>