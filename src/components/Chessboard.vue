<template>
  <div  class="blue merida">
    <div ref="board" class="cg-board-wrap"></div> </br>
    <div>{{white}} VS {{black}} <br><a :href="url">View game in chess.com</a></div>
  </div>
</template>

<script>
import Chess from 'chess.js'
import { Chessground }  from 'chessground';
import { uniques } from '../Util.js';

export default {
  name: 'Chessboard',
  data () {
    return {
      game: null,
      board: null,
      white: '',
      black: '',
      url: ''
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
        threats.push({orig:move.to, brush:'yellow'})

        if (move["captured"]) {
          threats.push({orig:move.from, dest:move.to, brush:'red'})
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
    countThreats(color) {
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

      threats['legal_'+color] = uniques(moves.map(x => x.from+x.to)).length //promotions count as 4 moves. This remove those duplicates moves.
      threats['checks_'+color] = checks;
      threats['threat_'+color] = captures;
      return threats
    },
    loadFen(fen) {
      this.game = new Chess(fen);

      this.board = Chessground(this.$refs.board, {
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
    this.$eventHub.$on('load-position', (position) => {
      this.white = position.white
      this.black = position.black
      this.url = position.url
      this.loadFen(position.fen)
      let color = this.toColor()
      let threats = this.countThreats(color)
      this.$eventHub.$emit('game-changed', {color:color, threats: threats})
    })
  }
}
</script>

<style>
  .blue .cg-board-wrap {
    margin: 0 auto;
  }
</style>
