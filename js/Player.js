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
            Number(pos.x.toFixed(0)) > 0 && pos.x <= game.width.toFixed(0)
					? pos.x
					: this.position.x,
			y:
            Number(pos.y.toFixed(0)) > 0 && pos.y <= game.height.toFixed(0)
					? pos.y
					: this.position.y,
		};
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
			Number(entity.x.toFixed(0)) == this.position.x &&
			entity.y.toFixed(0) == this.position.y
		);
	}
}
