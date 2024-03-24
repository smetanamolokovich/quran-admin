<template>
  {{formattedTimestamp}}
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {format, isToday} from 'date-fns'
import { ru } from 'date-fns/locale'

const props = defineProps({
  timestamp: {type: [String, Date], default: null},
  isToday: {type: Boolean, default: false},
  showSeconds: {type: Boolean, default: false},
  onlyDate: {type: Boolean, default: false},
  onlyTime: {type: Boolean, default: false},
})

const formattedTimestamp = computed(() => {
  if (!props.timestamp) return '-'

  const date = new Date(props.timestamp)

  if (props.isToday && isToday(date)) {
    return getTodayText(date)
  }

  let dateFormat = !props.showSeconds ? 'PPp' : 'PPpp'

  if (props.onlyDate) {
    dateFormat = 'PP'
  } else if (props.onlyTime) {
    dateFormat = props.showSeconds ? 'p' : 'pp'
  }

  return format(date, dateFormat, {locale: ru})
})

const getTodayText = (date: Date | string) => {
  const timeFormat = props.showSeconds ? 'p' : 'pp'
  return format(date, `сегодня, ${timeFormat}`, {locale: ru})
}
</script>

<style scoped>

</style>