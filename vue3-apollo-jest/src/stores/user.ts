import { defineStore } from "pinia";
import { User, LoginMutation } from '../generated/graphql'

type OptionalUser = {[K in keyof User]?: User[K]}

export const useUserStore = defineStore("user", {
  state: (): { user: OptionalUser } => {
    return {
      user: {
        id: undefined,
        name: undefined,
        email: undefined,
      },
    };
  },

  getters: {
    currentUser: (state) => state.user,

    hasCurrentUser: (state) => !!state.user.id && !!state.user.name,
  },

  actions: {
    login(data: LoginMutation) {
      sessionStorage.setItem('token', data.login!.token)
      this.setUser(data.login!.user)
    },

    setUser(user: OptionalUser) {
      const { id, name, email } = user
      this.user = { id, name, email }
    }
  }
});
