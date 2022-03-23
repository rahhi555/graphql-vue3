import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): { user: { id: number | null; name: string | null; email: string | null } } => {
    return {
      user: {
        id: null,
        name: null,
        email: null,
      },
    };
  },

  getters: {
    currentUser: (state) => state.user,

    hasCurrentUser: (state) => !!state.user.id && !!state.user.name,
  },
});
