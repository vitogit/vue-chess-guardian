<template>
  <div>
    <section class="hero" ref="question">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{question}}
          </h1>
        </div>
      </div>
    </section>
    <section class="hero" ref="answers">
      <div class="buttons is-centered">
        <span class="button" v-for="answer in answers">
          {{ answer }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'QuestionGame',
  data () {
    return {
      number: null,
      question: null,
      answers: [],
      questionList: [
        {id:'legal_white', text:'How many legal moves white has?'},
        {id:'legal_black', text:'How many legal moves black has?'},
        {id:'checks_white', text:'How many checks moves white has?'},
        {id:'checks_black', text:'How many checks moves black has?'},
        {id:'threat_white', text:'How many pieces is white threating?'},
        {id:'threat_black', text:'How many pieces is black threating?'}
      ]
    }
  },
  methods: {
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
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
      return this.shuffle(answers)
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
      this.answers = this.randomAnswers(value)
    }
  },
  created() {
    this.$eventHub.$on('game-changed', game => {
      console.log("game________",game)
      this.start(game)
    })
  }
}
</script>
