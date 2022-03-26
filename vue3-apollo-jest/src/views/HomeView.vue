<template>
  <main class="container">
    <PostVue v-if="hasCurrentUser" />
    <LoginVue v-else />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useUserStore } from '../stores/user'
import { useCurrentUserQuery } from '../generated/graphql'

import PostVue from '../components/posts/Post.vue';
import LoginVue from '../components/authenticate/Login.vue';

const hasCurrentUser = computed(() => useUserStore().hasCurrentUser)
onMounted(async () => {
  const token = sessionStorage.getItem('token')
  if(token) {
    const { onResult } = useCurrentUserQuery()
    onResult(({data}) => {
      useUserStore().setUser(data.currentUser!)
    })
  }
})
</script>