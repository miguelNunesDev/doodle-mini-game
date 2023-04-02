import { emojis } from './map.js';
export class Level {
	constructor(rawMap) {
		/**
		 * @type {String}
		 */
		this.rawMap = rawMap;
		this.context = game.context;
		this.cellSize;
		this.gridSize;
		this.playerSpawnPos;
		this.offset = 0;
		this.entities = {
			enemies: [],
			meta: [],
		};
	}
	parseMap() {
		const row = this.rawMap.trim().split('\n');
		this.gridSize = row.length;
		this.cellSize = game.getCanvasSize() / this.gridSize;
		const cols = row.map((row) => row.trim().split(''));
		cols.forEach((row, i) => {
			const cellY = (i + 1) * this.cellSize - this.offset * 0.5;
			row.forEach((col, i) => {
				const cellX = (i + 1) * this.cellSize - this.offset * 0.5;
				this.saveEntitiesStatus(col, { x: cellX, y: cellY }, i);
			});
		});
		this.map = cols;
	}
	render() {
		if (!this.context) throw Error('Need context to render');
		this.context.textAlign = 'end';
		this.context.font = `${this.cellSize - this.offset}px Arial`;
		this.map.forEach((row, i) => {
			const cellY = (i + 1) * this.cellSize - this.offset * 0.5;
			row.forEach((col, i) => {
				const cellX = (i + 1) * this.cellSize - this.offset * 0.5;
				this.context.fillText(emojis[col], cellX, cellY);
			});
		});
	}
	saveEntitiesStatus(col, pos, i) {
		switch (col) {
			case 'O':
				this.playerSpawnPos = pos;
				console.log(this.playerSpawnPos);
				break;
			case 'X':
				this.entities.enemies.push({ ...pos, i: i });
				break;
			case 'I':
				this.entities.meta.push({ ...pos, i: i });
			default:
				break;
		}
	}
}
