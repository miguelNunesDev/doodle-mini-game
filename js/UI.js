import { emojis } from './map.js';

export class UI {
	constructor({ livesUI, timeUI, bestTimeUI }) {
		this.livesUI = livesUI;
		this.timeUI = timeUI;
        this.bestTimeUI = bestTimeUI;
		this.lives;
        this.bestTime = 999;
	}
	renderLives(data) {
		let livesIcons = '';
		for (let index = 1; index <= data.maxLives; index++) {
			livesIcons +=
				index <= data.count ? `${emojis.LIVE} ` : `${emojis.BROKEN} `;
		}
        console.log('renderLives');
		this.livesUI.innerHTML = livesIcons;
	}
    renderBestTime () {
        this.bestTimeUI.innerHTML = this.bestTime;
    }
	renderTime(data) {
		this.timeUI.innerHTML = data;
	}
	render() {
        const bindedRender = this.render.bind(this)
		requestAnimationFrame(bindedRender);
        // this.renderLives(this.lives);
        this.renderTime(this.time);
	}
	setTimer(time = 0) {
        this.clearTimer();
		this.time = time;
		this.timer = setInterval(() => {
			++this.time;
			console.log(this.time);
		}, 1000);
	}
	clearTimer() {
		clearInterval(this.timer);
		this.timer = null;
	}
}
