<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { inputURL, url } from "../commonState";

const webRef = ref<HTMLIFrameElement | null>(null);
const webTitle = ref("");
const iframeLoading = ref(true);
const router = useRouter();

onMounted(() => {
  if (!webRef.value) return;
  webRef.value.onload = () => {
    if (!webRef.value) return;
    iframeLoading.value = false;
    webTitle.value =
      webRef.value.contentWindow?.document.title ||
      // @ts-expect-error
      webRef.value.contentWindow?.__uv$location.toString() ||
      "";
  };
});

const handleClose = () => {
  router.push({ name: "Home" });
  inputURL.value = "";
};
</script>

<template>
  <div class="h-[45px] p-2 px-4 flex justify-between">
    <div class="font-semibold text-lg">{{ webTitle }}</div>
    <div>
      <button
        class="btn btn-ghost btn-sm rounded-btn"
        @click="webRef?.contentWindow?.location.reload()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 50 50"
        >
          <path
            d="M 25 2 A 2.0002 2.0002 0 1 0 25 6 C 35.517124 6 44 14.482876 44 25 C 44 35.517124 35.517124 44 25 44 C 14.482876 44 6 35.517124 6 25 C 6 19.524201 8.3080175 14.608106 12 11.144531 L 12 15 A 2.0002 2.0002 0 1 0 16 15 L 16 4 L 5 4 A 2.0002 2.0002 0 1 0 5 8 L 9.5253906 8 C 4.9067015 12.20948 2 18.272325 2 25 C 2 37.678876 12.321124 48 25 48 C 37.678876 48 48 37.678876 48 25 C 48 12.321124 37.678876 2 25 2 z"
          ></path>
        </svg>
      </button>
      <button
        class="btn btn-ghost btn-error btn-sm rounded-btn"
        @click="handleClose"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 50 50"
        >
          <path
            d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  <div class="w-screen h-[calc(100vh-45px)] grid grid-flow-col place-content-center" v-if="iframeLoading">
    <span v-for="item in 4" :key="item" class="loading loading-ball loading-md" />
  </div>
  <iframe
    v-show="!iframeLoading"
    id="webIframe"
    :src="url"
    class="w-screen h-[calc(100vh-45px)]"
    title="web"
    ref="webRef"
  ></iframe>
</template>
