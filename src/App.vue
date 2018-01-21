<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div>
              <a href="/">
                <p class="title">Chess Guardian (beta)</p>
                <p class="subtitle">Answer chess positional questions from your own games.</p>
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
import { shuffle } from './Util.js'
import jQuery from 'jquery'
import Chess from 'chess.js'

export default {
  name: 'App',
  components: {
    Chessboard,
    QuestionGame
  },
  data () {
    return {
      positions: [
        // {fen:'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19', white:'nn', black:'nn', url:'https://www.chess.com/daily/game/29076790'},
        // {fen:'5k2/ppp5/4P3/3R3p/6P1/1K2Nr2/PP3P2/8 b - - 1 32', white:'nn', black:'nn', url:'https://www.chess.com/daily/game/29076790'},
        // {fen:'r1bq1rk1/5ppp/5b2/p3p3/3p4/1B6/PPP1QPPP/RN1R2K1 w - - 0 14', white:'nn', black:'nn', url:'https://www.chess.com/daily/game/29076790'},
        // {fen:'rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq b6 0 10', white:'nn', black:'nn', url:'https://www.chess.com/daily/game/29076790'}

      ],
      // positions: ["r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19",
      //             "5k2/ppp5/4P3/3R3p/6P1/1K2Nr2/PP3P2/8 b - - 1 32",
      //             "r1bq1rk1/5ppp/5b2/p3p3/3p4/1B6/PPP1QPPP/RN1R2K1 w - - 0 14",
      //             "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq b6 0 10"
      //           ],
      positionNumber: 0
    }
  },
  methods: {
    nextQuestion() {
      let position = this.positions[this.positionNumber]
      console.log("position.fen",position.fen)
      this.$eventHub.$emit('load-fen', position.fen)
      this.positionNumber++
    },
    start(username){
      let loading = this.$loading.open()

      this.positions = this.getPositions(username)
      if (this.positions.length < 10 ) {
        console.log("no games found or not enough games, choose another username or date")
        this.promptAgain()
      } else {
        this.positionNumber = 0
        this.positions = shuffle(this.positions)
        this.nextQuestion();
      }

      loading.close()
    },
    getPositions(username){ //TODO refactor this big method and make it async
      username = username || 'hikaru'
      console.log("username",username)
      this.$toast.open(`Pulling positions from: ${username}`)
      let games = []
      jQuery.ajax({
          method: 'GET',
          url: 'https://api.chess.com/pub/player/'+username+'/games/2017/12',
          async: false,
          success: function (data) {
              games = data.games.slice(0,50) //get 50 games
          },
          error: function (error) {
              console.log('Something wrong with ajax:', error);
          }
      });
      let positions = []
      let loadedGame = new Chess()
      games.forEach(game => {
        loadedGame.load_pgn(game.pgn)
        if (loadedGame.history().length < 40) {
          return // skip this and go to next game if is too short (40 halfmoves)
        }
        Array.from(Array(30), () => loadedGame.undo()) //go back 30 halfmoves
        let p = {fen: loadedGame.fen(), white: game.white.username, black: game.black.username, url: game.url}
        positions.push(p)
      })
      return positions
    },
    promptAgain() { //TODO DRY prompts
      this.$dialog.prompt({
          title: `What's your chess.com username?`,
          message: `There are not enough games from the selected user. Select another.`,
          inputAttrs: {
              placeholder: 'e.g. MagnusCarlsen, hikaru',
              maxlength: 20
          },
          type: 'is-danger',
          cancelText: 'Default positions',
          onConfirm: (value) => this.start(value),
          onCancel: () => this.start()
      })
    },
    prompt() {
      this.$dialog.prompt({
          title: `What's your chess.com username?`,
          message: `It will pull random positions from the games of the selected chess.com user from December of 2017.`,
          inputAttrs: {
              placeholder: 'e.g. MagnusCarlsen, hikaru',
              maxlength: 20
          },
          cancelText: 'Default positions',
          onConfirm: (value) => this.start(value),
          onCancel: () => this.start()
      })
    }
  },

  mounted(){
    this.prompt()
  },
  created() {
    this.$eventHub.$on('next-question', () => {
      this.nextQuestion()
    })
    this.$eventHub.$on('start-again', () => {
      this.start()
    })
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
