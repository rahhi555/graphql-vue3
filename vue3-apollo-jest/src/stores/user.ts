import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): { user: { id?: number, name?: string  } } => {
    return {
      user: {
        id: undefined,
        name: undefined
      }
    }
  },

  getters: {
    currentUser: (state) => state.user,

    hasCurrentUser: (state) => (!!state.user.id && !!state.user.name)
  }
})