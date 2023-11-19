<script setup lang="ts">
import { useRouter } from "vue-router";
import { errorText, inputURL, url } from "../commonState";

const router = useRouter();

const handleSubmitLink = () => {
  if (inputURL.value && inputURL.value.length > 2) {
    router.push({ name: "Proxy" });
    errorText.value = "";
    console.log(url.value);
  } else {
    errorText.value = "Invalid URL";
  }
};
</script>

<template>
  <div class="w-screen h-screen grid place-content-center">
    <div class="w-[500px] flex flex-col items-center gap-y-4">
      <div class="text-4xl font-bold text-center text-teal-400">
        <h1>WhySpace</h1>
      </div>
      <div class="form-control w-full">
        <input
          v-model="inputURL"
          class="input input-bordered input-secondary input-md w-full"
          type="text"
          placeholder="Enter URL..."
          @keyup.enter="handleSubmitLink"
        />
        <label v-if="errorText" class="label">
          <span class="label-text-alt text-red-500">{{ errorText }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
