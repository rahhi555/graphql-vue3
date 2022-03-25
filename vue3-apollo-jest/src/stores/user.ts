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
    setUser(data: LoginMutation) {
      localStorage.setItem('token', data.login!.token)
      const { id, name, email } = data.login!.user
      this.user = { id, name, email }
    }
  }
});
