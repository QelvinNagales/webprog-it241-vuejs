<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])
const errorMessage = ref(null) // Added for debugging

async function getInstruments() {
  try {
    const { data, error } = await supabase.from('instruments').select()
    
    if (error) {
      console.error('Supabase error:', error.message)
      errorMessage.value = error.message
    } else {
      instruments.value = data
    }
  } catch (err) {
    console.error('System error:', err)
    errorMessage.value = "Failed to connect to Supabase."
  }
}

onMounted(() => {
   getInstruments()
})
</script>

<template>
  <div v-if="errorMessage" style="color: red;">
    Error: {{ errorMessage }}
  </div>
  <ul v-else-if="instruments.length > 0">
    <li v-for="instrument in instruments" :key="instrument.id">
      {{ instrument.name }}
    </li>
  </ul>
  <p v-else>No instruments found or loading...</p>
</template>