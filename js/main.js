import { Controller } from './Controller.js';
import { Game } from './Game.js';
import { Level } from './Level.js';
import { Player } from './Player.js';
import { maps } from './map.js';
import { btns, keys } from './Movement.js';
import { UI } from './UI.js';

window.game = new Game();
const game = window.game;
const livesUI = document.querySelector('#lives');
const timeUI = document.querySelector('#time');
const bestTimeUI = document.querySelector('#bestTime');
context.fillRect;

window.addEventListener('load', () => {
	game.ui = new UI({ livesUI, timeUI, bestTimeUI });
	game.controller = new Controller({ keys, btns });
	game.controller.mapInputs();

	game.start(new Level(maps, 0), new Player());
	game.ui.lives = {
		count: game.player.lives,
		maxLives: game.player.maxLives,
	};
    console.log(game.ui.lives);
    game.render();
	game.ui.render();
	game.ui.renderLives(game.ui.lives);
	game.ui.renderBestTime();
});
window.addEventListener('resize', () => {
	game.resize();
});
