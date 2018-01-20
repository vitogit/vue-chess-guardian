<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div>
              <a href="/">
                <p class="title">Chess Guardian</p>
                <p class="subtitle">Answer chess positional questions</p>
              </a>
            </div>
            <div id="navbarMenu" class="navbar-menu">
              <div class="navbar-end"></div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns">
            <div class="column is-5">
              <Chessboard></Chessboard>
            </div>
            <div class="column is-7">
              <QuestionGame></QuestionGame>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-foot">
        <div class="container">
          <div class="has-text-centered">
            Made by <a href="http://vitomd.com">@vitomd</a> with <a href="https://vuejs.org/">Vue.js</a>
          </div>
        </div>
      </div>
    </section>
    <a href="https://github.com/vitogit/vue-chess-guardian"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>              </div>
  </div>


</template>

<script>
import Chessboard from './components/Chessboard'
import QuestionGame from './components/QuestionGame'
export default {
  name: 'App',
  components: {
    Chessboard,
    QuestionGame
  },
  data () {
    return {
      positions: ["r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19",
                  "5k2/ppp5/4P3/3R3p/6P1/1K2Nr2/PP3P2/8 b - - 1 32"
                ],
      positionNumber: 0
    }
  },
  methods: {
    start() {
      let fen = this.positions[this.positionNumber]
      this.$eventHub.$emit('load-fen', fen)
      this.positionNumber++
    }
  },
  mounted() {
    this.start();
  }

}
</script>

<style>
  #app {
    margin: 1vh;
  }
  .hero.is-fullheight {
    min-height: 95vh;
  }
</style>
