<template>
  <div>
    <section class="hero" ref="question" v-if="status != 'end'">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{number}} -  {{question}}
          </h1>
        </div>
      </div>
    </section>
    <section class="hero" ref="answers">
      <div class="buttons is-centered" v-if="!showingResult">
        <span @click="verifyAnswer(answer)" class="button" v-for="answer in answers">
          {{ answer }}
        </span>
      </div>
      <div class="is-centered" v-if="showingResult">
        <article v-if="status == 'correct'" class="message is-success">
          <div class="message-header">
            <p>Correct</p>
          </div>
          <div class="message-body">
            Correct. The answer was <strong> {{this.correctAnswer}} </strong><br/>
            <span class="button" @click="nextQuestion"> Next question</span>
          </div>
        </article>
        <article v-if="status == 'incorrect'" class="message is-danger">
          <div class="message-header">
            <p>Incorrect</p>
          </div>
          <div class="message-body">
            Incorrect. The answer was <strong> {{this.correctAnswer}} </strong><br/>
            <span class="button" @click="nextQuestion"> Next question</span>
          </div>
        </article>
        <article v-if="status == 'end'" class="message is-info">
          <div class="message-header">
            <p>The end</p>
          </div>
          <div class="message-body">
            You got <strong> {{this.corrects}} </strong> correct answers in {{this.maxQuestions}} questions<br/>
            <span class="button" @click="startAgain"> Start Again</span>
          </div>
        </article>
      </div>
    </section>


  </div>
</template>

<script>
import { shuffle } from '../Util.js';

export default {
  name: 'QuestionGame',
  data () {
    return {
      number: 1,
      question: null,
      answers: [],
      correctAnswer: null,
      showingResult: false,
      status: null,
      corrects: 0,
      maxQuestions: 10,
      questionList: [
        {id:'legal_white', text:'How many legal moves white has?'},
        {id:'legal_black', text:'How many legal moves black has?'},
        {id:'checks_white', text:'How many checks moves white has?'},
        {id:'checks_black', text:'How many checks moves black has?'},
        {id:'threat_white', text:'How many capture moves white has?'},
        {id:'threat_black', text:'How many capture moves black has?'}
      ]
    }
  },
  methods: {
    randomQuestion(color) {
      color = color || 'white'
      let tempQuestions = this.questionList.filter(q => q.id.includes(color));
      return tempQuestions[Math.floor(Math.random()*tempQuestions.length)];
    },
    randomNumber(min, max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    randomAnswers(value) {
      let maxAnswers = 4
      let answers = []
      answers[0] = value
      while (answers.length < maxAnswers) {
        let randomNumber = this.randomNumber(value-6, value+6)
        if (randomNumber < 0) {
          randomNumber = 0
        }
        if(answers.indexOf(randomNumber) > -1) continue;
        answers[answers.length] = randomNumber;
      }
      return shuffle(answers)
    },
    start(game) {
      let questionObj = this.randomQuestion(game.color)
      this.question = questionObj.text
      let value = 0
      switch (questionObj.id) {
        case "legal_white":
          value = game.threats.legal_white
          break;
        case "legal_black":
          value = game.threats.legal_black
          break;
        case "checks_white":
          value = game.threats.checks_white
          break;
        case "checks_black":
          value = game.threats.checks_black
          break;
        case "threat_white":
          value = game.threats.threat_white
          break;
        case "threat_black":
          value = game.threats.threat_black
          break;
      }
      this.correctAnswer = value
      this.answers = this.randomAnswers(value)
    },
    verifyAnswer(answer) {

      if (answer == this.correctAnswer) {
        this.status = 'correct'
        this.corrects++
      } else {
        this.status = 'incorrect'
      }
      this.showingResult = true
      this.$eventHub.$emit('paint-threats')
    },
    nextQuestion() {
      this.correctAnswer = null
      this.showingResult = false
      this.status = null
      if (this.number >= this.maxQuestions) {
        this.endGame()
      } else {
        this.$eventHub.$emit('next-question')
      }

      this.number++

    },
    endGame() {
      this.showingResult = true
      this.status = 'end'
    },
    startAgain() {
      this.number= 1
      this.correctAnswer = null
      this.showingResult = false
      this.status = null
      this.corrects =  0
      this.$eventHub.$emit('start-again')
    }

  },
  created() {
    this.$eventHub.$on('game-changed', game => {
      this.start(game)
    })
  }
}
</script>
