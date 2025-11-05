import { defineStore } from 'pinia'
import { getProfile, logout as apiLogout } from '@/js/services/api/userApi'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null
    }),

    actions: {
        setAuth(status) {
            this.isAuthenticated = status
        },

        setUser(userData) {
            this.user = userData 
        },

        async checkAuth(){
            try {
                const data = await getProfile()
                this.setUser(data.user)
                this.setAuth(true)
            } catch (err) {
                this.setAuth(false)
                this.setUser(null)
            }
        },

        async logout() {
            try {
                await apiLogout()
            } finally {
                this.setAuth(false)
                this.setUser(null)
            }
        }
    }
})