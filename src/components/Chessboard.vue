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
  props: ['fen']
  ,
  methods: {
    toDests() {
      const dests = {};
      this.chess.SQUARES.forEach(s => {
        const ms = this.chess.moves({square: s, verbose: true});
        if (ms.length) dests[s] = ms.map(m => m.to);
      });
      return dests;
    },

    toColor() {
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
    }
  },  
  mounted() {
    this.chess = new Chess(this.fen);

    this.board  = Chessground(this.$refs.board, {
      fen: this.chess.fen(),
      turnColor: this.toColor(),
      movable: {
        color: this.toColor(),
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
