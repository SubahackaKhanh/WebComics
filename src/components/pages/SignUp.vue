<template>
  <div class="signup-container">
    <div class="signup-form">
      <h1>SignUp</h1>

      <div class="signup-input">
        <input
          class="user-input"
          name="username"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="user-input"
          name="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="pass-input"
          type="password"
          placeholder="Password"
          name="password"
          v-model="password"
        />
        <input
          class="pass-input"
          type="password"
          placeholder="Confirm Password"
          name="ConfirmPassword"
          v-model="confirmPassword"
        />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <div class="signup-buttons">
        <router-link to="/" class="nav-btn home-btn">Home</router-link>
        <router-link to="/login" class="nav-btn login-btn">Login</router-link>
        <button class="nav-btn signup-btn" @click="handleSignup">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { signup } from "@/js/services/api/userApi"; // Import from userApi.js

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await signup(
          this.username,
          this.email,
          this.password,
          this.confirmPassword
        );
        alert(response.message); // success alert
        this.$router.push("/login"); // nav to login
      } catch (error) {
        this.error = error.message || "SignUp Fail";
      }
    },
  },
};
</script>

<style scoped src="@/css/pages/signup.css"></style>