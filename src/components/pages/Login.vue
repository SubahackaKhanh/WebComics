<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Login</h1>

      <div class="login-input">
        <input
          class="user-input"
          placeholder="UserName or Email"
          v-model="identifier"
        />
        <input
          class="pass-input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <div class="login-buttons">
        <router-link to="/" class="nav-btn home-btn">Home</router-link>
        <router-link to="/signup" class="nav-btn signup-btn">SignUp</router-link>
        <button class="nav-btn signup-btn" @click="handleLogin">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/js/services/api/userApi"; // Import từ userApi.js

export default {
  data() {
    return {
      identifier: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.identifier, this.password);
        alert(response.message); // Thông báo đăng nhập thành công
        this.$router.push("/"); // Chuyển hướng đến trang chủ
      } catch (error) {
        this.error = error.message || "Đăng nhập thất bại";
      }
    },
  },
};
</script>

<style scoped src="@/css/pages/login.css"></style>