const keys = [
	{
		input: 'w',
		action: () => {
			game.player.move({
				y: -game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
	{
		input: 'a',
		action: () => {
			game.player.move({
				x: -game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
	{
		input: 's',
		action: () => {
			game.player.move({
				y: game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
	{
		input: 'd',
		action: () => {
			game.player.move({
				x: game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
];
const btns = [
	{
		input: 'up',
		action: () => {
			game.player.move({
				y: -game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
	{
		input: 'down',
		action: () => {
			game.player.move({
				y: game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
	{
		input: 'left',
		action: () => {
			game.player.move({
				x: -game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
	{
		input: 'right',
		action: () => {
			game.player.move({
				x: game.currentLevel.cellSize - game.currentLevel.offset * 0.5,
			});
			game.render();
		},
	},
];

export {btns,keys}