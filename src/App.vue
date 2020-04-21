<template>
  <div id="app">
    <header class="header">
      <router-link :to="{ name: 'home' }">
        <img class="header-logo" src="@/assets/logo.svg" title="Task Manager" alt="Task Manager" />
      </router-link>
      <router-link class="header-title" title="Task Manager" :to="{ name: 'home' }">Task Manager</router-link>
    </header>
    <router-view />
    <footer class="footer">Made with ❤</footer>
  </div>
</template>

<style>
@font-face {
  font-family: Raleway;
  src: url('assets/Raleway-Light.woff') format('woff');
}
@font-face {
  font-family: Imprima;
  src: url('assets/Imprima-Regular.woff') format('woff');
}
* {
  box-sizing: border-box;
}
::placeholder {
  color: #7fdca2;
  opacity: 0.6;
}
body,
html {
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: #7fdca2;
}
#app {
  height: 100%;
  padding: 1rem;
  padding-bottom: 0;
  display: grid;
  gap: 1rem;
  grid-template-rows: auto 1fr auto;
}
.header {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.header-logo {
  height: 4rem;
  vertical-align: middle;
}
.header-title {
  color: #0d4221;
  font: bold 2rem Raleway;
  text-decoration: none;
}
.footer {
  padding-bottom: 1rem;
  color: #0d4221;
  text-align: center;
  font: 1rem Raleway;
}
@media only screen and (max-width: 768px) {
  html {
    font-size: 20px;
  }
  .header {
    gap: 0.5rem;
  }
  .header-logo {
    height: 2rem;
    vertical-align: middle;
  }
  .header-title {
    color: #0d4221;
    font: bold 1.25rem Raleway;
    text-decoration: none;
  }
  .footer {
    font-size: 0.8rem;
  }
}
</style>
