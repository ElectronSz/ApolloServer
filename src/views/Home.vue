<template>
  <div class="home">
    <People/> 
  </div>
</template>

<script>
// @ is an alias to /src
import People from '@/components/People.vue'

export default {
  name: 'Home',
  components: {
    People
  }
}
</script>
