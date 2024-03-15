<template>
  <div
      class="o-grid-sorter"
      :class="[sortDirection]"
      @click="toggleSorting"
  >
    <slot />
    <ArrowUpwardSharpIcon class="sort-arrow" height="24px" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ArrowUpwardSharpIcon from '../Images/ArrowUpwardSharpIcon.vue'

const CONST_DIRS = {
  asc: 'asc',
  desc: 'desc'
}

const props = defineProps({
  prop: {
    type: String,
    required: true
  },
  sortString: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:sortString'])

const toggleSorting = () => {
  if (!sortDirection.value) return changeSorting(CONST_DIRS.asc)
  if (sortDirection.value === CONST_DIRS.asc) return changeSorting(CONST_DIRS.desc)
  if (sortDirection.value === CONST_DIRS.desc) return changeSorting(CONST_DIRS.asc)
}

const changeSorting = (dir: string) => {
  emit('update:sortString', `${props.prop}:${dir}`)
}

const sortDirection = computed(() => {
  if (!props.sortString || !props.sortString.includes(props.prop)) return null
  if (props.sortString.includes(CONST_DIRS.asc)) return CONST_DIRS.asc
  if (props.sortString.includes(CONST_DIRS.desc)) return CONST_DIRS.desc
})
</script>

<style scoped>
.o-grid-sorter {
  @apply flex flex-row gap-1 items-center cursor-pointer;

}

.o-grid-sorter .sort-arrow {
  @apply text-transparent;
}

.o-grid-sorter.asc .sort-arrow,
.o-grid-sorter.desc .sort-arrow {
  @apply text-neutral-300;
}

.o-grid-sorter.desc .sort-arrow {
  @apply rotate-180;
}

</style>