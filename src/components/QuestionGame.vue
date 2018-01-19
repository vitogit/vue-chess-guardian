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
        {id:'checks_black', text:'How many checks moves white has?'},
        {id:'threat_white', text:'How many pieces is white threating?'},
        {id:'threat_black', text:'How many pieces is black threating?'}
      ]
    }
  }
  ,
  methods: {
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    randomQuestion() {
      return this.questionList[Math.floor(Math.random()*this.questionList.length)];
    },
    randomNumber(x){
      x = x || 10
      return Math.floor(Math.random() * x) + 1 
    },
    randomAnswers(value) {
      let answers = [value+this.randomNumber(value), value, this.randomNumber(value)+2 ]
      return this.shuffle(answers)
    },
    start() {
      let questionObj = this.randomQuestion()
      this.question = questionObj.text
      let value = 20
      this.answers = this.randomAnswers(value)
      switch (questionObj.id) {
        case "legal_white":
          break;
        case "legal_black":
          break;
        case "checks_white":
          break;
        case "checks_black":
          break;
        case "threat_white":
          break;
        case "threat_black":
          break;
      }
    }
  },
  mounted() {
    this.start()
  }
}
</script>
