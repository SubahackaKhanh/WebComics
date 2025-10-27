<template>
  <div class="signup-container">
    <div class="signup-form">
      <h1>SignUp</h1>

      <div class="signup-input">
        <input class="user-input" name="username" placeholder="Username" />
        <input class="user-input" name="email" placeholder="Email" />
        <input class="pass-input" type="password" placeholder="password" name="password"/>
        <input class="pass-input" type="password" placeholder="confirm password" name="ConfirmPassword"/>
      </div>

      <div class="signup-buttons">
        <router-link to="/" class="nav-btn home-btn">Home</router-link>
        <router-link to="/login" class="nav-btn login-btn">Login</router-link>
        <button class="nav-btn signup-btn">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/css/pages/signup.css"></style>