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
import {defaultPositions} from './PositionData.js'
import StartModal from './components/StartModal'

export default {
  name: 'App',
  components: {
    Chessboard,
    QuestionGame,
    StartModal
  },
  data () {
    return {
      positions: [],
      positionNumber: 0,
      started: false,
      isStartModalActive: true
    }
  },
  methods: {
    nextQuestion() {
      let position = this.positions[this.positionNumber]
      this.$eventHub.$emit('load-position', position)
      this.positionNumber++
    },
    start(username){ //TODO improve this method
      let positions = []
      if (username) {
        this.positions = this.getPositions(username)
      } else {
        this.positions = defaultPositions()
      }
      if (this.positions.length < 10 ) {
        this.promptAgain()
      } else {
        this.positionNumber = 0
        this.positions = shuffle(this.positions)
        this.nextQuestion()
      }
    },
    getPositions(username){ //TODO refactor this big method and make it async
      // let isLoading = this.$loading.open() //TODO fix. this is not working
      username = username || 'hikaru'
      username = username.replace(/\s/g, '').toLowerCase()

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
        let middlegame = Math.round(loadedGame.history().length / 2)
        if (loadedGame.history().length < 40) {
          return // skip this and go to next game if is too short (40 halfmoves)
        }
        Array.from(Array(middlegame), () => loadedGame.undo()) //go back to middlegame
        let p = {fen: loadedGame.fen(), white: game.white.username, black: game.black.username, url: game.url}
        positions.push(p)
      })
      console.log("positions.length________",positions.length)
      // isLoading.close()

      return positions
    },
    promptAgain() {
      this.genericPrompt({
        title: 'ERROR',
        message: 'There are not enough games from the selected user. Select another chess.com user.',
        type:'is-danger'
      })
    },
    prompt() {
      this.genericPrompt({
        title: `What's your chess.com username?`,
        message: 'It will pull random positions from the games of the selected chess.com user from December of 2017.'
      }) 
    }, 
    genericPrompt({title, message, type}) {
      this.$modal.open({
        parent: this,
        component: StartModal,
        hasModalCard: true,
        props: {
          title: title,
          message: message,
          inputAttrs: {
            placeholder: 'e.g. hikaru',
            maxlength: 20
          },
          type: type,
          onConfirm: (value) => this.start(value),
          onCancel: () => this.start()
        }
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
      this.positionNumber = 0
      this.positions = shuffle(this.positions)
      this.nextQuestion()
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
