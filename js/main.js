import { Controller } from './Controller.js';
import { Game } from './Game.js';
import { Level } from './Level.js';
import { Player } from './Player.js';
import { maps } from './map.js';
import { btns, keys } from "./Movement.js";

window.game = new Game();
const game = window.game;

window.addEventListener('load', () => {
	game.start(new Level(maps[0]), new Player());
    const controller = new Controller({ keys, btns });
	controller.mapInputs();
});
window.addEventListener('resize', () => {
	game.resize();
});
