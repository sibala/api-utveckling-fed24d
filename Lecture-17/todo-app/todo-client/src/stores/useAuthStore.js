import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => ({ isAuthenticated: false }),
  actions: {
    async login() {
      // LOGIN Fetch-request 
      this.isAuthenticated = true
    },
    logout() { 
      // LOGoUT Fetch-request 
      this.isAuthenticated = false
    },
    register() {
      // REGISTER Fetch-request 
    }
  }
})

export default useAuthStore