import Phaser from './Phaser'

export default class Scene {
  /** @return {number} */
  width() {
    return this._map.widthInPixels
  }

  /** @return {number} */
  height() {
    return this._map.heightInPixels
  }

  /** @return {Phaser.Group} */
  group() {
    return this._group
  }

  /** @arg {Game} game
      @return {void} */
  preload(game) { // eslint-disable-line class-methods-use-this
    const tileSize = 16
    game.load.tilemap('lvl', 'lvl.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.spritesheet('tileset', 'tileset.png', tileSize, tileSize)
  }

  /** @arg {Game} game
      @return {void} */
  create(game) {
    this._map = game.add.tilemap('lvl')
    this._map.addTilesetImage('tileset')
    const playerTileIndex = 0
    this._player = game.add.sprite(0, 0, 'tileset', playerTileIndex)

    const
      bg = this._map.createLayer('bg'),
      border = this._map.createLayer('border')

    bg.resizeWorld()
    game.world.setBounds(0, 0, this.width(), this.height())

    game.physics.arcade.enable(this._player)
    this._player.body.collideWorldBounds = true
    const lerp = .1
    game.camera.follow(this._player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, lerp,
      lerp)

    this._group = game.add.group()
    this._group.add(bg)
    this._group.add(border)
    this._group.add(this._player)
  }

  /** @arg {Game} game
      @return {void} */
  update(game) {
    this._player.body.velocity.x = 0
    this._player.body.velocity.y = 0

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this._player.body.velocity.x -= 50
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this._player.body.velocity.x += 50
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this._player.body.velocity.y -= 50
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this._player.body.velocity.y += 50
    }
  }
}