export class Controller {
	constructor({ keys, btns }) {
		/**
		 * @type {Array}
		 */
		this.btns = btns;
		/**
		 * @type {Array}
		 */
		this.keys = keys;
	}
	mapInputs() {
		const btns = this.btns;
		const keys = this.keys;

		if (keys) {
			document.addEventListener('keypress', (e) => {
				console.log(`${e.key} pressed`);
				keys.forEach((key) => {
					if (key.input == e.key) {
						key.action();
					}
				});
			});
		}

		if (btns) {
			btns.forEach((btn) => {
				const button = document.querySelector('#' + btn.input);
				if (!button) return;
				button.addEventListener('click', (e) => {
					e.preventDefault();
					console.log('Clicked btn');
					btn.action();
				});
			});
		}
	}
	addInput({ btn = false, key = false }) {
		if (btn) this.btns.push(btn);
		if (key) this.keys.push(key);
	}
}
