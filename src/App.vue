<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" href="../">
                LOGO
              </a>
              <span class="navbar-burger burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenu" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active">
                  Home
                </a>
                <a class="navbar-item">
                  Examples
                </a>
                <a class="navbar-item">
                  Features
                </a>
                <a class="navbar-item">
                  Team
                </a>
                <a class="navbar-item">
                  Help
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <Chessboard></Chessboard>
            </div>
            <div class="column is-6 is-offset-1">
              <h1 class="title is-2">
                Superhero Scaffolding
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-foot">
        <div class="container">
          <div class="has-text-centered">
            Footer
          </div>
        </div>
      </div>
    </section> 
  </div>
</template>

<script>
import Chessboard from './components/Chessboard'

export default {
  name: 'App',
  components: {
    Chessboard
  }
}
</script>

<style>
  #app {

  }
</style>
