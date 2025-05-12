import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => ({ isAuthenticated: false }),
  actions: {
    async login() {
      // LOGIN Fetch-reguest 
      this.isAuthenticated = true
    },
    logout() { 
      // LOGoUT Fetch-reguest 
      this.isAuthenticated = false
    },
    register() {
      // REGISTER Fetch-reguest 
    }
  }
})

export default useAuthStore