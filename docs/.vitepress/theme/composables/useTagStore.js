import { ref } from "vue";

const selectedTag = ref(null);

export function useTagStore() {
  return {
    selectedTag,
    selectTag(tag) {
      selectedTag.value = tag;
    },
  };
}
