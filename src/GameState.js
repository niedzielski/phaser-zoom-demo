import Phaser from './Phaser'

export default class GameState extends Phaser.State {
  /** @arg {Game} game
      @arg {Scene} scene */
  constructor(game, scene) {
    super(game)
    this._game = game
    this._scene = scene
  }

  /** @arg {Game} game
      @return {void} */
  preload(game) {
    super.preload(game)
    game.stage.backgroundColor = '#00f'
    this._scene.preload(game)
  }

  /** @arg {Game} game
      @return {void} */
  create(game) {
    super.create(game)
    this._scene.create(game)

    this.onWindowResize()
    window.addEventListener('resize', () => this.onWindowResize())
  }

  /** @arg {Game} game
      @return {void} */
  update(game) {
    super.update(game)
    this._scene.update(game)
  }

  /** @arg {Game} game
      @return {void} */
  render(game) {
    super.render(game)
    const x = 0, y = 10
    game.debug.cameraInfo(game.camera, x, y)
  }

  /** @return {void} */
  onWindowResize() {
    console.log('onWindowResize') // eslint-disable-line no-console

    this._game.scale.setGameSize(window.innerWidth, window.innerHeight)

    // scale to half the height of the scene
    // eslint-disable-next-line no-unused-vars
    const scale = window.innerHeight / (this._scene.height() / 2)

    // --- uncomment method ---
    // this.aMethodScaleCam(scale)
    // this.bMethodScaleGroup(scale)
    // this.cMethodScaleWorld(scale)
  }

  // scene is off screen
  aMethodScaleCam(scale) {
    const plane = new Phaser.Rectangle()
    plane.setTo(-this._scene.width() / 2, -this._scene.height() / 2,
      this._scene.width(), this._scene.height())

    this._game.world.setBounds(plane.x, plane.y, plane.width, plane.height)
    this._game.camera.scale.x = scale
    this._game.camera.scale.y = scale
    this._game.camera.bounds.x = plane.x * scale
    this._game.camera.bounds.y = plane.y * scale
    this._game.camera.bounds.width = plane.width * scale
    this._game.camera.bounds.height = plane.height * scale
  }

  // camera and world bounds are incorrect
  /** @arg {number} scale
      @return {void} */
  bMethodScaleGroup(scale) {
    this._scene.group().scale.x = scale
    this._scene.group().scale.y = scale
  }

  // camera bounds are incorrect
  /** @arg {number} scale
      @return {void} */
  cMethodScaleWorld(scale) {
    this._game.world.scale.set(scale)
  }
}