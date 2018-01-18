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
    possibleMoves() {
      const dests = {};
      this.chess.SQUARES.forEach(s => {
        const ms = this.chess.moves({square: s, verbose: true});
        if (ms.length) dests[s] = ms.map(m => m.to);
      });
      return dests;
    },
    opponentMoves() {
      let originalPGN = this.game.pgn()

      let tokens = this.game.fen().split(' ')
      tokens[1] = tokens[1] === 'w' ? 'b' : 'w'
      this.game.load(tokens.join(' '))

      let moves = this.game.moves()

      this.game.load_pgn(originalPGN)

      return moves
    },
    toColor() {
      return (this.chess.turn() === 'w') ? 'white' : 'black';
    },
    paintThreats() {
      let moves = this.chess.moves({verbose: true});
      let threats = []
      moves.forEach(function(move) {
        if (move["captured"]) {
          threats.push({orig:move.from,dest:move.to, brush:'red'})
        }
        if (move["san"].includes("+")) {
          threats.push({orig:move.from, dest:move.to, brush:'blue'})
        }
      });
      this.board.setShapes(threats)
    },
    changeTurn() {
      return (orig, dest) => {
        this.chess.move({from: orig, to: dest});
        this.board.set({
          turnColor: this.toColor(),
          movable: {
            color: this.toColor(),
            dests: this.possibleMoves()
          }
        });
        this.paintThreats()
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
        dests: this.possibleMoves()
      }
    })
    this.board.set({
      movable: { events: { after: this.changeTurn() } }
    });
    this.paintThreats()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
