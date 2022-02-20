<script setup lang="ts">
import { useAllPostsQuery, useCreatePostMutation, useUpdatePostMutation } from "@/generated/graphql";
import { useResult } from "@vue/apollo-composable";
import { reactive, ref } from "vue";

const { result } = useAllPostsQuery();
const posts = useResult(result)
const modalFlags = reactive({
  isCreate: false,
  isUpdate: false,
});
</script>

<template>
  <section class="hero has-background-grey-light is-small">
    <div class="hero-body columns">
      <p class="title column">本棚</p>
      <button class="column button is-primary is-one-fifth" style="line-height: 1px">新規追加</button>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div v-for="post in posts" class="card">
        <div class="card-content is-flex is-flex-direction-column is-align-items-center">
          <h1 class="title">{{ post.title }}</h1>
          <h2 class="subtitle">{{ post.author }}</h2>
        </div>
        <div class="card-footer">
          <button class="button card-footer-item is-success" @click="modalFlags.isCreate = true">編集する</button>
          <button class="button card-footer-item is-danger" @click="modalFlags.isUpdate = true">削除する</button>
        </div>
      </div>
    </div>
  </section>
</template>