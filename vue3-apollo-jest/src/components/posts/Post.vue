<script setup lang="ts">
import { useAllPostsQuery, useCreatePostMutation, AllPostsQuery } from "../../generated/graphql";
import { useResult } from "@vue/apollo-composable";
import { reactive } from "vue";
import ModalBase from "../shared/ModalBase.vue";
import PostInput from "./PostInput.vue";
import HelloWorld from "../HelloWorld.vue";

const { result, document } = useAllPostsQuery();

const posts = useResult(result);

const modalFlags = reactive({
  isCreate: false,
  isUpdate: false,
});

const createValues = reactive({
  title: "",
  author: "",
});
const { mutate: createPost  } = useCreatePostMutation(() => ({
  variables: {
    title: createValues.title,
    author: createValues.author
  },
  update: (cache, result) => {
    const cacheData = cache.readQuery<AllPostsQuery>({ query: document.value })!
    const deepCopiedChacheData = JSON.parse(JSON.stringify(cacheData)) as AllPostsQuery
    const { post } = result!.data!.postCreate!
    deepCopiedChacheData.posts?.push(post)
    cache.writeQuery<AllPostsQuery>({ query: document.value, data: deepCopiedChacheData })
    createValues.title = ''
    createValues.author = ''
    modalFlags.isCreate = false
  }
}))

const updateValues = reactive({
  title: "",
  author: "",
});
const openUpdateModal = (post: { title: string, author: string }) => {
  updateValues.title = post.title
  updateValues.author = post.author
  modalFlags.isUpdate = true
}
</script>

<template>
  <section class="hero has-background-grey-light is-small">
    <div class="hero-body columns">
      <p class="title column">本棚</p>
      <button class="column button is-primary is-one-fifth" style="line-height: 1px" @click="modalFlags.isCreate = true">新規追加</button>
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
          <button class="button card-footer-item is-success" @click="openUpdateModal(post)">編集する</button>
          <button class="button card-footer-item is-danger">削除する</button>
        </div>
      </div>
    </div>
  </section>

  <ModalBase :is-modal-visible="modalFlags.isCreate" @close="modalFlags.isCreate = false">
    <template #header>
      <h1>本棚に追加する</h1>
    </template>

    <template #content>
      <!-- <PostInput v-model:title="createValues.title" v-model:author="createValues.author" /> -->
    </template>

    <template #footer>
      <button class="button is-primary card-footer-item" @click="createPost()">追加</button>
      <button class="button card-footer-item" @click="modalFlags.isCreate = false">クリア</button>
    </template>
  </ModalBase>

  <ModalBase :is-modal-visible="modalFlags.isUpdate" @close="modalFlags.isUpdate = false">
    <template #header>
      <h1>本棚を更新する</h1>
    </template>

    <template #content>
      <!-- <PostInput v-model:title="updateValues.title" v-model:author="updateValues.author" /> -->
    </template>

    <template #footer>
      <button class="button is-primary card-footer-item">更新</button>
      <button class="button card-footer-item" @click="modalFlags.isUpdate = false">クリア</button>
    </template>
  </ModalBase> 

  <HelloWorld :msg="createValues.title"/>
</template>
