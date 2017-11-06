import { KEYS } from './settings';
import './styles/game.css';
import Game from './partials/Game'

const game = new Game('game', 700, 256);

document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();
			}
			
		});
