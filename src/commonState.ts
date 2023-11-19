import { computed, ref } from "vue";
import { getLink } from "./utils";

const inputURL = ref("");
const errorText = ref("");
const url = computed(() => getLink(inputURL.value));

export { inputURL, errorText, url };