<template>
    <h1 class="mt-4 is-size-3 has-text-centered">ログイン</h1>

    <div class="field">
      <label class="label">メールアドレス</label>
      <div class="control">
        <input class="input" type="text" placeholder="メールアドレス" v-model="loginValues.email">
      </div>
    </div>

    <div class="field">
      <label class="label">パスワード</label>
      <div class="control">
        <input class="input" type="password" placeholder="パスワード" v-model="loginValues.password">
      </div>
    </div>

  <div class="field has-text-centered">
    <div class="control">
      <button class="button is-link" @click="loginMutation()">ログイン</button>
    </div>
  </div>

  <div class="notification is-danger">
    {{error}}
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useLoginMutation } from '../../generated/graphql'

const loginValues = reactive({ email: '', password: '' })
const { mutate: loginMutation, error } = useLoginMutation(() => ({
  variables: {
    email: loginValues.email,
    password: loginValues.password
  },
  update: (_, result) => {
    console.log(result.data?.login)
  } 
}))
</script>