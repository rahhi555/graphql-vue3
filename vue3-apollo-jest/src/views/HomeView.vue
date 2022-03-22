<template>
  <main>
    <PostVue v-if="hasCurrentUser" />
    <LoginVue v-else />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/user'

import PostVue from '../components/posts/Post.vue';
import LoginVue from '../components/authenticate/Login.vue';

const hasCurrentUser = computed(() => useUserStore().hasCurrentUser)
</script>