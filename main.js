class Game {
	constructor() {
		/**
		 * @type {HTMLCanvasElement}
		 */
		this.canvas = document.querySelector('#game');
		this.context = this.canvas.getContext('2d');
		this.resize();
	}
	getCanvasSize() {
		// Return the smallest value of the screen
		const wH = window.innerHeight;
		const wW = window.innerWidth;
		const mod = 0.75;
		const gameSize = wW < wH ? wW : wH;
		return gameSize * mod;
	}
	start() {
		this.render();
	}
	resize() {
		this.canvasSize = this.getCanvasSize();
		this.cellSize = this.canvasSize * 0.1;
		this.width = this.canvasSize;
		this.height = this.canvasSize;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.render();
	}
	render() {
		const canvas = this.canvas;
		const context = this.context;
		// context.fillRect(0,0,100,100);
		// context.clearRect(50, 50, 50, 50);
		context.fillStyle = 'red';
		context.font = `${this.cellSize}px arial`;
		context.fillText(emojis.X, 50, 150);
	}
}
const game = new Game();

window.addEventListener('load', () => {
	game.start();
});
window.addEventListener('resize', () => {
	game.resize();
	console.log(game.cellSize);
});
