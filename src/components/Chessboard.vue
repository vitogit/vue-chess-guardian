game<template>
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
      this.game.SQUARES.forEach(s => {
        const ms = this.game.moves({square: s, verbose: true});
        if (ms.length) dests[s] = ms.map(m => m.to);
      });
      return dests;
    },
    opponentMoves() {
      let originalPGN = this.game.pgn()
      let tokens = this.game.fen().split(' ')
      tokens[1] = tokens[1] === 'w' ? 'b' : 'w'
      tokens = tokens.join(' ')
      let valid = this.game.load(tokens)
      if (valid){
        let moves = this.game.moves({verbose: true})
        this.game.load_pgn(originalPGN)
        return moves
      } else {
        return []
      }
    },
    toColor() {
      return (this.game.turn() === 'w') ? 'white' : 'black';
    },
    paintThreats() {
      let moves = this.game.moves({verbose: true});
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
        this.game.move({from: orig, to: dest});
        this.board.set({
          turnColor: this.toColor(),
          movable: {
            color: this.toColor(),
            dests: this.possibleMoves()
          }
        });
      };
    },
    countThreats(color) { //TODO refactor this
      let threats = {}
      let captures = 0
      let checks = 0
      let moves = this.game.moves({verbose: true})
      if (color != this.toColor()) {
        moves = this.opponentMoves()
      }

      if (moves.length == 0) {
        return null // It´s an invalid position
      }

      moves.forEach(function(move) {
        if (move["captured"]) {
          captures++;
        }
        if (move["san"].includes("+")) {
          checks++;
        }
      });

      threats['legal_'+color] = moves.length;
      threats['checks_'+color] = checks;
      threats['threat_'+color] = captures;
      return threats
    },
    loadFen(fen) {
      this.game = new Chess(fen);

      this.board  = Chessground(this.$refs.board, {
        fen: fen,
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
    }
  },
  created() {
    this.$eventHub.$on('paint-threats', () => {
      this.paintThreats()
    })
    this.$eventHub.$on('load-fen', (fen) => {
      this.loadFen(fen)
      let color = this.toColor()
      let threats = this.countThreats(color)
      this.$eventHub.$emit('game-changed', {color:color, threats: threats})
    })
  }
}
</script>
