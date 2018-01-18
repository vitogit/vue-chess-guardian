<template>
  <div  class="blue merida">
    <div ref="board" class="cg-board-wrap"></div>
  </div>  
</template>

<script>
import Chess from 'chess.js'
import { Chessground }  from 'chessground';
export default {
  name: 'Chessboard',
  data () {
    return {
      game: null,
      board: null
    }
  },
  methods: {
    toDests() {
      const dests = {};
      console.log("this.chess________",this.chess)
      this.chess.SQUARES.forEach(s => {
        const ms = this.chess.moves({square: s, verbose: true});
        if (ms.length) dests[s] = ms.map(m => m.to);
      });
      console.log("dests________",dests)
      return dests;
    },

    toColor(simplyColor) {
      return (this.chess.turn() === 'w') ? 'white' : 'black';
    },
    changeTurn() {
      return (orig, dest) => {
        this.chess.move({from: orig, to: dest});
        this.board.set({
          turnColor: this.toColor(),
          movable: {
            color: this.toColor(),
            dests: this.toDests()
          }
        });
      };
    },
    updateStatus() {
      // var status = '';
      // 
      // var moveColor = 'White';
      // if (game.turn() === 'b') {
      //   moveColor = 'Black';
      // }
      // 
      // // checkmate?
      // if (game.in_checkmate() === true) {
      //   status = 'Game over, ' + moveColor + ' is in checkmate.';
      // }
      // 
      // // draw?
      // else if (game.in_draw() === true) {
      //   status = 'Game over, drawn position';
      // }
      // 
      // // game still on
      // else {
      //   status = moveColor + ' to move';
      // 
      //   // check?
      //   if (game.in_check() === true) {
      //     status += ', ' + moveColor + ' is in check';
      //   }
      // }
      // 
      // statusEl.html(status);
      // fenEl.html(game.fen());
      // pgnEl.html(game.pgn());
    }
  },  
  mounted() {
    this.chess = new Chess();
    this.board  = Chessground(this.$refs.board, {
      movable: {
        color: 'white',
        free: false,
        dests: this.toDests()
      }
    })
    this.board.set({
      movable: { events: { after: this.changeTurn() } }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
