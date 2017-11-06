import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import PaddleAi from './PaddleAi';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.zelda = new Audio('./public/audio/04_-overworld.wav');
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		this.boardgap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.radius = 8;
		this.speed = 10;

		// Ball Instantiator
		this.ball = new Ball(this.radius, this.width, this.height);

		// Score Instantiator 
		this.scoreOne = new Score((this.width / 4), 30, 30);
		this.scoreTwo = new Score((this.width / 4 * 3), 30, 30);

		// Paddle Instantiator 
		this.paddleAi = new PaddleAi(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardgap,
			(this.height - this.paddleHeight) / 2,
			this.ball
		);

		this.paddleTwo = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardgap - this.paddleWidth),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down
		);

		// Event Listener for Pause, Theme music.  
		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause

			}
			if (event.key === KEYS.m) {
				this.zelda.play();
			}
		});

		// Event Listener for move PaddleTwo with mouse. 
		document.addEventListener('mousemove', event => {
			this.paddleTwo.y = (event.pageY / 3);
			this.paddleTwo.y = Math.min(this.paddleTwo.y - this.speed, 200);

		});
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.paddleAi.render(svg);
		this.paddleTwo.render(svg);
		this.scoreOne.render(svg, this.paddleAi.score);
		this.scoreTwo.render(svg, this.paddleTwo.score);
		this.ball.render(svg, this.paddleAi, this.paddleTwo);
	}

}
