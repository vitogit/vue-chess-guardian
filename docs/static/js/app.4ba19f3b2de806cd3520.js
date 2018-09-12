webpackJsonp([1],{"/KV2":function(t,e){},"2b0C":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),a=s("c/Tr"),r=s.n(a),n=s("7t+N"),o=s.n(n),c=s("4jZ1"),p=s.n(c),l=s("j5Cr");s("2b0C");function h(t){for(var e=t.length-1;e>0;e--){var s=Math.floor(Math.random()*(e+1)),i=[t[s],t[e]];t[e]=i[0],t[s]=i[1]}return t}var u={name:"QuestionGame",data:function(){return{number:1,question:null,answers:[],correctAnswer:null,showingResult:!1,status:null,corrects:0,maxQuestions:10,questionList:[{id:"legal_white",text:"How many legal moves white has?"},{id:"legal_black",text:"How many legal moves black has?"},{id:"checks_white",text:"How many checks moves white has?"},{id:"checks_black",text:"How many checks moves black has?"},{id:"threat_white",text:"How many capture moves white has?"},{id:"threat_black",text:"How many capture moves black has?"}]}},methods:{randomQuestion:function(t){t=t||"white";var e=this.questionList.filter(function(e){return e.id.includes(t)});return e[Math.floor(Math.random()*e.length)]},randomNumber:function(t,e){return Math.floor(Math.random()*(e-t+1)+t)},randomAnswers:function(t){var e=[];for(e[0]=t;e.length<4;){var s=this.randomNumber(t-6,t+6);s<0&&(s=0),e.indexOf(s)>-1||(e[e.length]=s)}return h(e)},start:function(t){var e=this.randomQuestion(t.color);this.question=e.text;var s=0;switch(e.id){case"legal_white":s=t.threats.legal_white;break;case"legal_black":s=t.threats.legal_black;break;case"checks_white":s=t.threats.checks_white;break;case"checks_black":s=t.threats.checks_black;break;case"threat_white":s=t.threats.threat_white;break;case"threat_black":s=t.threats.threat_black}this.correctAnswer=s,this.answers=this.randomAnswers(s)},verifyAnswer:function(t){t==this.correctAnswer?(this.status="correct",this.corrects++):this.status="incorrect",this.showingResult=!0,this.$eventHub.$emit("paint-threats")},nextQuestion:function(){this.correctAnswer=null,this.showingResult=!1,this.status=null,this.number>=this.maxQuestions?this.endGame():this.$eventHub.$emit("next-question"),this.number++},endGame:function(){this.showingResult=!0,this.status="end"},startAgain:function(){this.number=1,this.correctAnswer=null,this.showingResult=!1,this.status=null,this.corrects=0,this.$eventHub.$emit("start-again")}},created:function(){var t=this;this.$eventHub.$on("game-changed",function(e){t.start(e)})}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["end"!=t.status?s("section",{ref:"question",staticClass:"hero"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container"},[s("h1",{staticClass:"title"},[t._v("\n          "+t._s(t.number)+" -  "+t._s(t.question)+"\n        ")])])])]):t._e(),t._v(" "),s("section",{ref:"answers",staticClass:"hero"},[t.showingResult?t._e():s("div",{staticClass:"buttons is-centered"},t._l(t.answers,function(e){return s("span",{staticClass:"button",on:{click:function(s){t.verifyAnswer(e)}}},[t._v("\n        "+t._s(e)+"\n      ")])})),t._v(" "),t.showingResult?s("div",{staticClass:"is-centered"},["correct"==t.status?s("article",{staticClass:"message is-success"},[t._m(0),t._v(" "),s("div",{staticClass:"message-body"},[t._v("\n          Correct. The answer was "),s("strong",[t._v(" "+t._s(this.correctAnswer)+" ")]),s("br"),t._v(" "),s("span",{staticClass:"button",on:{click:t.nextQuestion}},[t._v(" Next question")])])]):t._e(),t._v(" "),"incorrect"==t.status?s("article",{staticClass:"message is-danger"},[t._m(1),t._v(" "),s("div",{staticClass:"message-body"},[t._v("\n          Incorrect. The answer was "),s("strong",[t._v(" "+t._s(this.correctAnswer)+" ")]),s("br"),t._v(" "),s("span",{staticClass:"button",on:{click:t.nextQuestion}},[t._v(" Next question")])])]):t._e(),t._v(" "),"end"==t.status?s("article",{staticClass:"message is-info"},[t._m(2),t._v(" "),s("div",{staticClass:"message-body"},[t._v("\n          You got "),s("strong",[t._v(" "+t._s(this.corrects)+" ")]),t._v(" correct answers in "+t._s(this.maxQuestions)+" questions"),s("br"),t._v(" "),s("span",{staticClass:"button",on:{click:t.startAgain}},[t._v(" Start Again")])])]):t._e()]):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"message-header"},[e("p",[this._v("Correct")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"message-header"},[e("p",[this._v("Incorrect")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"message-header"},[e("p",[this._v("The end")])])}]},P=s("VU/8")(u,m,!1,null,null,null).exports,w={props:{title:String,message:String,type:String,inputAttrs:{type:Object,default:function(){}},onConfirm:{type:Function,default:function(){}},onCancel:{type:Function,default:function(){}}},data:function(){return{prompt:this.inputAttrs.value||"",isActive:!1,validationMessage:"",selectedMonth:"",selectedYear:""}},methods:{confirm:function(){var t=this;if(void 0!==this.$refs.input&&!this.$refs.input.checkValidity())return this.validationMessage=this.$refs.input.validationMessage,void this.$nextTick(function(){return t.$refs.input.select()});this.onConfirm({username:this.prompt,year:this.selectedYear,month:this.selectedMonth}),this.$parent.close()},cancel:function(){var t=this;this.onCancel.apply(null,arguments),setTimeout(function(){t.$parent.close()},150)}},mounted:function(){var t=this;this.isActive=!0,this.$nextTick(function(){t.hasInput?t.$refs.input.focus():t.$refs.confirmButton.focus()})},created:function(){this.months=["January","February","March","April","May","June","July","August","September","October","November","December"],this.years=[];var t=new Date;this.selectedYear=t.getFullYear(),this.selectedMonth=t.getMonth()+1;for(var e=this.selectedYear;e>this.selectedYear-10;e--)this.years.push(e)}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dialog"},[s("div",{staticClass:"modal-card animation-content"},[t.title?s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v(t._s(t.title))])]):t._e(),t._v(" "),s("section",{staticClass:"modal-card-body",class:{"is-titleless":!t.title}},[s("div",{staticClass:"media"},[s("div",{staticClass:"media-content"},[s("p",{domProps:{innerHTML:t._s(t.message)}}),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},["checkbox"===t.inputAttrs.type?s("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.prompt,expression:"prompt"}],ref:"input",staticClass:"input",class:{"is-danger":t.validationMessage},attrs:{required:"",type:"checkbox"},domProps:{checked:Array.isArray(t.prompt)?t._i(t.prompt,null)>-1:t.prompt},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.confirm(e):null},change:function(e){var s=t.prompt,i=e.target,a=!!i.checked;if(Array.isArray(s)){var r=t._i(s,null);i.checked?r<0&&(t.prompt=s.concat([null])):r>-1&&(t.prompt=s.slice(0,r).concat(s.slice(r+1)))}else t.prompt=a}}},"input",t.inputAttrs,!1)):"radio"===t.inputAttrs.type?s("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.prompt,expression:"prompt"}],ref:"input",staticClass:"input",class:{"is-danger":t.validationMessage},attrs:{required:"",type:"radio"},domProps:{checked:t._q(t.prompt,null)},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.confirm(e):null},change:function(e){t.prompt=null}}},"input",t.inputAttrs,!1)):s("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.prompt,expression:"prompt"}],ref:"input",staticClass:"input",class:{"is-danger":t.validationMessage},attrs:{required:"",type:t.inputAttrs.type},domProps:{value:t.prompt},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.confirm(e):null},input:function(e){e.target.composing||(t.prompt=e.target.value)}}},"input",t.inputAttrs,!1))]),t._v(" "),s("p",{staticClass:"help is-danger"},[t._v(t._s(t.validationMessage))])]),t._v(" "),s("div",{staticClass:"level is-marginless"},[s("div",{staticClass:"level-item"},[s("h4",{staticClass:"has-text-centered datepicker-month level-item"},[s("b-field",{attrs:{grouped:""}},[s("b-select",{attrs:{"aria-label":"Select Month"},model:{value:t.selectedMonth,callback:function(e){t.selectedMonth=e},expression:"selectedMonth"}},t._l(t.months,function(e,i){return s("option",{key:i+1,domProps:{value:i+1}},[t._v("\n                      "+t._s(e)+"\n                    ")])})),t._v(" "),s("b-select",{attrs:{"aria-label":"Select Year"},model:{value:t.selectedYear,callback:function(e){t.selectedYear=e},expression:"selectedYear"}},t._l(t.years,function(e){return s("option",{key:e,domProps:{value:e}},[t._v("\n                      "+t._s(e)+"\n                    ")])}))],1)],1)])])])])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-light",on:{click:t.cancel}},[t._v("\n          Default positions\n      ")]),t._v(" "),s("button",{ref:"confirmButton",staticClass:"button is-primary",class:t.type,on:{click:t.confirm}},[t._v("\n          Ok\n      ")])])])])},staticRenderFns:[]},b=s("VU/8")(w,v,!1,null,null,null).exports,d={name:"App",components:{chessboard:l.chessboard,QuestionGame:P,StartModal:b},data:function(){return{currentPosition:{},showThreats:!1,positionNumber:0,started:!1,isStartModalActive:!0,positionInfo:{}}},methods:{nextQuestion:function(){var t=this.positions[this.positionNumber];this.currentPosition=t,this.positionNumber++},start:function(t){t&&t.username?this.positions=this.getPositions(t):this.positions=[{fen:"5rr1/3nqpk1/p3p2p/Pp1pP1pP/2pP1PN1/2P1Q3/2P3P1/R4RK1 b - f3 0 28",white:"Last7Samurai",black:"Hikaru",url:"https://www.chess.com/live/game/2483343862"},{fen:"r4rk1/pp1b3p/6p1/8/3NpP2/1P4P1/P2K3P/R6R w - - 0 22",white:"Hikaru",black:"Last7Samurai",url:"https://www.chess.com/live/game/2483349305"},{fen:"r2q1r2/1b2p1k1/4Pbp1/p2PNp2/1pQ5/6P1/P4PB1/3RR1K1 w - - 3 28",white:"Last7Samurai",black:"Hikaru",url:"https://www.chess.com/live/game/2483352923"},{fen:"r4rk1/pb3pqp/1p1p4/4pPpQ/2PpP3/3P2P1/P3R1BP/5RK1 b - - 1 22",white:"Last7Samurai",black:"Hikaru",url:"https://www.chess.com/live/game/2483361027"},{fen:"2r3k1/5p2/p4rp1/4q2p/8/4P2P/PR3PP1/1Q1R2K1 w - h6 0 28",white:"Hikaru",black:"Last7Samurai",url:"https://www.chess.com/live/game/2483366100"},{fen:"3r1r2/4ppkp/1p4p1/1Nn5/1p2P3/P2n1PP1/3N2KP/1R1R4 w - - 0 23",white:"Last7Samurai",black:"Hikaru",url:"https://www.chess.com/live/game/2483373030"},{fen:"2r1r1k1/qb2ppbp/p5p1/PpPp4/1P2n3/2N1P1P1/1B2QPBP/R1R3K1 b - - 0 20",white:"Hikaru",black:"Last7Samurai",url:"https://www.chess.com/live/game/2483377659"},{fen:"8/p2k4/1p3npp/5p2/8/6P1/PP2P1BP/6K1 w - - 0 27",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2485413336"},{fen:"1r1q1rk1/4ppbp/2np1np1/1bp2P2/p3P1P1/2PP2NP/P2Q2B1/1RBN1RK1 w - - 1 18",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2485419520"},{fen:"8/p7/1p1k2p1/2p2p1p/2P1r2P/3K2P1/PP3R2/8 w - - 2 31",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2485426201"},{fen:"2r5/5rkp/1p3pp1/p1qBpP2/P6P/1P2R3/2P2QPK/4R3 b - - 0 28",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2485433072"},{fen:"r1b2rk1/ppqn2bp/2pp1np1/4Pp2/1PP5/P4NP1/1BQ1PPBP/RN3RK1 b - - 0 12",white:"Yaacovn",black:"Hikaru",url:"https://www.chess.com/live/game/2485447441"},{fen:"8/6k1/1n2B1p1/pp4P1/3P1N2/7P/P1P2K2/r7 b - - 3 47",white:"Hikaru",black:"Yaacovn",url:"https://www.chess.com/live/game/2485450256"},{fen:"6k1/pp3b1p/8/8/2PP1p2/1P2pP2/P3K1BP/8 b - - 1 31",white:"Yaacovn",black:"Hikaru",url:"https://www.chess.com/live/game/2485458166"},{fen:"3r2k1/p3qpp1/1p5p/1b1p4/3P4/1P4P1/P4PBP/4R1K1 w - - 0 23",white:"Hikaru",black:"Yaacovn",url:"https://www.chess.com/live/game/2485465203"},{fen:"4k3/p1r1bp2/1p2pnp1/2p4p/P7/2P2BP1/1P2RPK1/3R4 b - - 14 39",white:"Yaacovn",black:"Hikaru",url:"https://www.chess.com/live/game/2485469216"},{fen:"1k1r3r/1pq3p1/p1p1bp1p/4p3/PP2P3/2PP1QPP/6BK/R2R4 b - - 0 24",white:"Hikaru",black:"joppie2",url:"https://www.chess.com/live/game/2488494743"},{fen:"1r6/5pbk/1n1p2p1/3P1p1p/2pP3P/8/1PPNNPP1/R5K1 b - - 3 29",white:"joppie2",black:"Hikaru",url:"https://www.chess.com/live/game/2488504103"},{fen:"6k1/2rnr1pp/p4p2/1ppR4/8/BP5P/P1P2KP1/3R4 b - - 7 24",white:"Hikaru",black:"joppie2",url:"https://www.chess.com/live/game/2488512939"},{fen:"1b1r2nr/p4p1p/1p2pkpq/1B1p4/3P1P2/Q1N3P1/PP3P1P/R4RK1 w - - 1 18",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488523569"},{fen:"8/1r3bkp/5pp1/2Rp4/B7/6P1/4PP1P/5K2 b - - 5 29",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488532393"},{fen:"q3kb1r/p1p2pp1/1pn2n2/3p4/4P3/2N3P1/PPP1PP2/R1BQNRK1 w k d6 0 12",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488541860"},{fen:"2b1r1k1/1p2pp2/p2p2p1/q2P3p/7P/1P2Q1P1/P3PPB1/R5K1 w - - 0 21",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488548660"},{fen:"6k1/5p1p/R3p1p1/p1p1P3/P1PnB3/5PPK/P3r2P/8 b - - 2 28",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488556991"},{fen:"4b1B1/p5B1/3k3p/2p2p1P/1bP2P2/4K3/8/8 w - - 2 42",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488565554"},{fen:"3q1rk1/2pp1p1p/rp6/nN3p2/P5pP/6P1/2PPPPN1/b2Q1RK1 w - - 0 16",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488575659"},{fen:"r5k1/1q2pp1p/3pb1p1/P7/1P2P3/4QPP1/2r1B2P/1R2R1K1 b - - 0 30",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488581102"},{fen:"r2q1rk1/pbp3bp/1pn3p1/3n1p2/4p3/1PNP2P1/PB2PPBP/R1Q1NRK1 w - - 0 13",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488591156"},{fen:"2rr4/p4pk1/4pnp1/P1Nbq2p/1P2p3/4Q2P/4BPP1/2RR2K1 b - - 1 27",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488595511"},{fen:"3R4/3P2k1/6N1/5K2/5P2/7p/3r4/4b3 w - - 1 55",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488604912"},{fen:"r3n1k1/1q1b1pbp/3p2pB/1p1Pp3/nP2P1P1/2rB1NNP/3Q1P2/1R3RK1 w - - 13 23",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488616954"},{fen:"3r3k/6bp/1p4p1/pNp2Q2/P1Pp4/6P1/4RP1P/6K1 b - - 0 31",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488625541"},{fen:"1r1q1rk1/1p2pp1p/p2p2p1/3P4/PP1Q2b1/8/5PBP/R3R1K1 w - - 0 19",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488636277"},{fen:"8/1k3p2/rpqb3p/r1pNp1pP/PpP1P1P1/1Q1P1P2/R5K1/R7 w - - 22 45",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488643246"},{fen:"1q2r1k1/p4rp1/1p1Qp2p/3bP3/1P2p2B/P1R4P/5PP1/4R1K1 b - - 1 29",white:"Hikaru",black:"JSPrepz",url:"https://www.chess.com/live/game/2488702547"},{fen:"3r1r2/2q1nppk/p4n1p/1p3P2/3N4/P3B2P/2BQ1PPb/1R3R1K b - - 2 24",white:"JSPrepz",black:"Hikaru",url:"https://www.chess.com/live/game/2488713831"},{fen:"1r3rk1/5ppp/2p1b1n1/p1NpP3/P3pPq1/1PQ1P3/1B4PP/2KR2R1 w - - 1 21",white:"Hikaru",black:"JSPrepz",url:"https://www.chess.com/live/game/2488722658"},{fen:"1rk4r/p2nQRpp/1p2P3/2qp4/8/2Pp2N1/PP4PP/5R1K b - - 2 26",white:"JSPrepz",black:"Hikaru",url:"https://www.chess.com/live/game/2488731083"},{fen:"r4r1k/pNqn3p/1pn2bp1/1B6/P2p2QP/2P2N2/1P3PP1/R1B2RK1 b - - 0 20",white:"Andreikka",black:"Hikaru",url:"https://www.chess.com/live/game/2488752832"},{fen:"8/p1p2kpp/6N1/2PP4/1P1N1p2/8/3q2PP/4RK2 b - - 0 39",white:"Hikaru",black:"Andreikka",url:"https://www.chess.com/live/game/2488761667"},{fen:"2r2r2/pb1qppkp/1p1p2p1/5P2/3NP2P/1P1P4/P3Q1P1/2R2RK1 b - h3 0 20",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488983909"},{fen:"r1q1kb2/1p3pp1/1ppp1n2/2n1p3/P3P3/2NP1N2/1Q2KP1P/R5R1 b q - 4 18",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2488991798"},{fen:"5rk1/pp1n1p1p/1q1p2p1/8/3QP3/6PP/PPr2PB1/3RR1K1 w - - 3 19",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2488999738"},{fen:"3r1rk1/2pq3p/pp3bpQ/5p2/3P4/1B4P1/PP3P1P/R3R1K1 b - - 3 20",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2489006051"},{fen:"1r1q1rk1/4npb1/4b1pp/2Q5/p2p4/P2P1NP1/1P2PPBP/2R2RK1 w - - 1 19",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2489017882"},{fen:"4rrk1/2nnq1pp/1p2pb2/pPp5/2PpNP2/P2P2P1/1B2Q1KP/R3NR2 b - f3 0 19",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2489024990"},{fen:"r3k2r/p3ppb1/1q1p2p1/3P4/bPpn3p/P6P/1B1Q1PP1/R2B1RK1 w kq - 0 19",white:"Maitreia",black:"Hikaru",url:"https://www.chess.com/live/game/2489032047"},{fen:"8/p4k1p/1pn1p2P/2p2p1R/P1P3p1/1P2P3/5PP1/2bB1K2 w - - 2 32",white:"Hikaru",black:"Maitreia",url:"https://www.chess.com/live/game/2489039170"}],this.positions.length<10?this.promptAgain():(this.positionNumber=0,this.positions=h(this.positions),this.nextQuestion())},getPositions:function(t){var e=t.username,s=t.year,i=t.month;i=("00"+i).slice(-2),e=(e=e||"hikaru").replace(/\s/g,"").toLowerCase(),this.$toast.open("Pulling positions from: "+e);var a=[];o.a.ajax({method:"GET",url:"https://api.chess.com/pub/player/"+e+"/games/"+s+"/"+i,async:!1,success:function(t){a=t.games.slice(0,50)},error:function(t){console.log("Something wrong with ajax:",t)}});var n=[],c=new p.a;return a.forEach(function(t){c.load_pgn(t.pgn);var e=Math.round(c.history().length/2);if(!(c.history().length<40)){r()(Array(e),function(){return c.undo()});var s={fen:c.fen(),white:t.white.username,black:t.black.username,url:t.url};n.push(s)}}),n},promptAgain:function(){this.genericPrompt({title:"ERROR",message:"There are not enough games ("+this.positions.length+") from the selected user and month. You need at least 10. Select another chess.com user or month.",type:"is-danger"})},prompt:function(){this.genericPrompt({title:"What's your chess.com username?",message:"It will pull random positions from the games played in the selected month for the selected user "})},genericPrompt:function(t){var e=this,s=t.title,i=t.message,a=t.type;this.$modal.open({parent:this,component:b,hasModalCard:!0,props:{title:s,message:i,inputAttrs:{placeholder:"e.g. hikaru",maxlength:20},type:a,onConfirm:function(t){return e.start(t)},onCancel:function(){return e.start()}}})},showInfo:function(t){this.positionInfo=t,this.$eventHub.$emit("game-changed",{color:this.positionInfo.turn,threats:this.positionInfo})}},mounted:function(){this.prompt()},created:function(){var t=this;this.positions=[],this.$eventHub.$on("paint-threats",function(){t.showThreats=!0}),this.$eventHub.$on("next-question",function(){t.showThreats=!1,t.nextQuestion()}),this.$eventHub.$on("start-again",function(){t.showThreats=!1,t.positionNumber=0,t.positions=h(t.positions),t.nextQuestion()})}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("section",{staticClass:"hero is-fullheight"},[t._m(0),t._v(" "),s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container has-text-centered"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-5"},[s("chessboard",{attrs:{fen:t.currentPosition.fen,showThreats:t.showThreats},on:{onMove:t.showInfo}}),t._v(" "),s("div",{staticClass:"has-centered-text"},[t._v("\n              "+t._s(t.currentPosition.white)+" VS "+t._s(t.currentPosition.black)+" "),s("br"),s("a",{attrs:{href:t.currentPosition.url}},[t._v("View game in chess.com")])])],1),t._v(" "),s("div",{staticClass:"column is-7"},[s("QuestionGame")],1)])])]),t._v(" "),t._m(1)]),t._v(" "),t._m(2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"hero-head"},[s("nav",{staticClass:"navbar"},[s("div",{staticClass:"container"},[s("div",[s("a",{attrs:{href:"/"}},[s("p",{staticClass:"title"},[t._v("Chess Guardian (beta)")]),t._v(" "),s("p",{staticClass:"subtitle"},[t._v("Answer Chess technical questions from your own positions to improve board vision.")])]),t._v(" "),s("p",{staticClass:"subtitle"},[t._v("Inspired by this article "),s("a",{attrs:{href:"https://www.chess.com/blog/danheisman/the-amazing-power-of-board-vision"}},[t._v("The Amazing Power of Board Vision")]),t._v(" by Dan Heisman")])]),t._v(" "),s("div",{staticClass:"navbar-menu",attrs:{id:"navbarMenu"}},[s("div",{staticClass:"navbar-end"})])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hero-foot"},[e("div",{staticClass:"container"},[e("div",{staticClass:"has-text-centered"},[this._v("\n          Made by "),e("a",{attrs:{href:"http://vitomd.com"}},[this._v("@vitomd")]),this._v(" with "),e("a",{attrs:{href:"https://vuejs.org/"}},[this._v("Vue.js")]),this._v(" | Check all my "),e("a",{attrs:{href:"http://vitomd.com/blog/projects/"}},[this._v("chess related projects")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{href:"https://github.com/vitogit/vue-chess-guardian"}},[e("img",{staticStyle:{position:"absolute",top:"0",right:"0",border:"0"},attrs:{src:"https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67",alt:"Fork me on GitHub","data-canonical-src":"https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"}})])}]};var k=s("VU/8")(d,f,!1,function(t){s("jtIY")},null,null).exports,g=s("O3Oo"),_=s.n(g);s("/KV2");i.default.use(_.a),i.default.config.productionTip=!1,i.default.prototype.$eventHub=new i.default,window.vm=new i.default({el:"#app",components:{App:k},template:"<App/>"})},jtIY:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.4ba19f3b2de806cd3520.js.map