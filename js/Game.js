export class Game {
	constructor() {
		/**
		 * @type {HTMLCanvasElement}
		 */
		this.canvas = document.querySelector('#canvas');
		this.context = this.canvas.getContext('2d');
		this.currentLevel;
		this.player;
		this.gridSize;
	}
	getCanvasSize() {
		// Return the smallest value of the screen
		const wH = window.innerHeight;
		const wW = window.innerWidth;
		const size = 0.75;
		const gameSize = wW < wH ? wW : wH;
		return gameSize * size;
	}
	start(level, player) {
		this.currentLevel = level;
		// LEVEL
		this.currentLevel.parseMap();
		this.player = player;
		this.player.position = this.currentLevel.playerSpawnPos;
		this.resize();
		this.render();
	}
	resize() {
		this.canvasSize = this.getCanvasSize();
		this.width = this.canvasSize;
		this.height = this.canvasSize;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		// LEVEL
		this.currentLevel.cellSize =
			this.canvasSize / this.currentLevel.gridSize;
		this.currentLevel.context = this.context;
		this.render();
	}
	render() {
		this.clear();
		this.currentLevel.render();
        this.player.onCollide();
		this.player.render();
	}
	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	}
}
