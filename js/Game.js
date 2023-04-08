import { Level } from './Level.js';
import { maps } from './map.js';

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
		this.ui;
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
		this.player = player;
		this.player.resetToSpawn();
		this.resize();
		this.ui.setTimer();
		const gameData = JSON.parse(localStorage.getItem('gameData'));
		if (gameData) {
			console.log({ gameData });
			this.loadData(gameData);
		}
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
		this.currentLevel = new Level(maps, this.currentLevel.index);
		this.player.resetToSpawn();
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
	winGame() {
		alert(`Has ganado! Tu tiempo: ${this.ui.time}`);
		this.ui.bestTime =
			this.ui.time < this.ui.bestTime ? this.ui.time : this.ui.bestTime;

		this.restartGame();
	}
	nextLevel() {
		const i = ++this.currentLevel.index;
		if (!maps[i]) {
			this.winGame();
		}
		this.currentLevel = new Level(maps, i);
		this.player.resetToSpawn();
		this.render();
		this.saveData();
	}
	gameOver() {
		alert('Has perdido');
		this.restartGame();
	}
	restartGame() {
		this.currentLevel = new Level(maps, 0);
		this.player.resetToSpawn();
		this.player.lives = 3;
		this.render();
		this.ui.setTimer();
		this.ui.renderLives({
			count: 3,
			maxLives: 3,
		});
		this.ui.renderBestTime();
		this.saveData();
	}
	saveData() {
		const data = {
			levelIndex: this.currentLevel.index,
			lives: this.player.lives,
			time: this.ui.time,
			bestTime: this.ui.bestTime,
		};
		localStorage.setItem('gameData', JSON.stringify(data));
	}
	loadData({ levelIndex, lives, time, bestTime }) {
		this.currentLevel = new Level(maps, levelIndex);
		this.player.resetToSpawn();
		this.player.lives = lives;
		this.ui.setTimer(time);
		this.ui.bestTime = bestTime;
	}
}
