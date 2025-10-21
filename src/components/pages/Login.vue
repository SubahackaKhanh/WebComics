<template>
    <div class="login-container">
        <div class="login-form">
            <h1>Login</h1>
            
            <div class="login-input">
                <input class="user-input" placeholder="username"/>
                <input class="pass-input" type="password" placeholder="password"/>
            </div>

            <div class="login-buttons">
                <router-link to="/" class="nav-btn home-btn">Home</router-link>
                <router-link to="/signup" class="nav-btn signup-btn">SignUp</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped src="@/css/pages/login.css"></style>