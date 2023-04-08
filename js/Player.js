import { emojis } from './map.js';
export class Player {
	constructor(sprite = false, lives = 3) {
		this.position;
		this.sprite = sprite || emojis.PLAYER;
		this.lives = lives;
		this.maxLives = lives;
		this.context = game.context;
	}
	resetToSpawn() {
		this.position = game.currentLevel.playerSpawnPos;
	}
	getHurt() {
		--this.lives;
		this.resetToSpawn();
		game.ui.renderLives({
			count: this.lives,
			maxLives: this.maxLives,
		});

		if (this.lives <= 0) {
			game.gameOver();
			return;
		}
	}
	reachMeta() {
		console.log('NEXT LEVEL');
		game.nextLevel();
	}
	move(pos) {
		pos = {
			x: this.position.x + (pos.x || 0),
			y: this.position.y + (pos.y || 0),
		};
		this.position = {
			x:
				pos.x.toFixed(0) > 0 && pos.x <= game.width
					? pos.x
					: this.position.x,
			y:
				pos.y.toFixed(0) > 0 && pos.y <= game.height
					? pos.y
					: this.position.y,
		};
		console.log({
			pos: { x: pos.x.toFixed(0), y: pos.y.toFixed(0) },
			cell: game.currentLevel.cellSize.toFixed(0),
			player: this.position,
		});
	}
	render(sprite = false) {
		this.sprite = sprite || this.sprite;
		if (!this.context) throw Error('Need context to render');

		this.context.fillText(this.sprite, this.position.x, this.position.y);
	}
	onCollide() {
		const enemies = game.currentLevel.entities.enemies;
		const metas = game.currentLevel.entities.meta;
		enemies.forEach((enemy) => {
			if (this.collided(enemy)) {
				game.currentLevel.map[enemy.index.y][enemy.index.x] =
					'BOMB_COLLISION';
				this.getHurt();
				game.render();
			}
		});
		metas.forEach((meta) => {
			if (this.collided(meta)) this.reachMeta();
		});
	}
	collided(entity) {
		return (
			entity.x.toFixed(0) == this.position.x.toFixed(0) &&
			entity.y.toFixed(0) == this.position.y.toFixed(0)
		);
	}
}
