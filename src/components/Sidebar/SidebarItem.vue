<script setup lang="ts">
import {useSidebarStore} from '@/stores/sidebar'
import {useRoute} from 'vue-router'
import {computed} from 'vue'

const sidebarStore = useSidebarStore()
const route = useRoute()

const props = defineProps(['item', 'index'])

const currentPage = computed(() => +route.params.id || 1)
const isActive = computed(() => currentPage.value === props.item.id)

interface SidebarItem {
  label: string
}

const handleItemClick = () => {
  const pageName = sidebarStore.page === props.item.label ? '' : props.item.label
  sidebarStore.page = pageName

  if (props.item.children) {
    return props.item.children.some((child: SidebarItem) => sidebarStore.selected === child.label)
  }
}
</script>

<template>
  <li>
    <router-link :to="item.route"
                 class="group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                 @click.prevent="handleItemClick"
                 :class="{'bg-graydark dark:bg-meta-4': isActive}"
    >
      {{ item.id }}. {{ item.label }}
    </router-link>
  </li>
</template>
