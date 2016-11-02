import GameState from './GameState'
import Phaser from './Phaser'
import Scene from './Scene'

export default class Game extends Phaser.Game {
  constructor() {
    super({width: '100%', height: '100%', transparent: false, antialias: false})
    this._gameState = new GameState(this, new Scene())
  }

  /** @return {void} */
  init() {
    this.state.add('GameState', this._gameState, true)
  }
}