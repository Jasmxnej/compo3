<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
    event: Event
    id: String
}>()

const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const edit = () => {
  // Update the message in the store
  store.updateMessage('The data has been updated successfully')

  // Set a timeout to clear the message after 5 seconds
  setTimeout(() => {
    store.resetMessage()
  }, 5000)

  // Navigate to the passengers list
  router.push({ name: 'event-list-view', params: { id: props.event.id } })
}
</script>

<template>
   <p>Edit here</p>
   <button @click="edit">Edit</button>
</template>
