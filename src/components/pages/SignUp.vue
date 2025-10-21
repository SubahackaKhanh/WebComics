<template>
  <div class="signup-container">
    <div class="signup-form">
      <h1>SignUp</h1>

      <div class="signup-input">
        <input class="user-input" placeholder="username" />
        <input class="pass-input" type="password" placeholder="password" id="1"/>
        <input class="pass-input" type="password" placeholder="confirm password" id="2"/>
      </div>

      <div class="signup-buttons">
        <router-link to="/" class="nav-btn home-btn">Home</router-link>
        <router-link to="/login" class="nav-btn login-btn">Login</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/css/pages/signup.css"></style>