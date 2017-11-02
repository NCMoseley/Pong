import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
// import Ball from './Ball';


export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
	
		this.gameElement = document.getElementById(this.element);
		this.board = new Board (this.width, this.height);

		this.boardgap = 10; 
		this.paddleWidth = 8;
		this.paddleHeight =56;

		// this.ball = new Ball(this.boardHeight, this.width/2, this.height/2, this.r);

		this.paddleOne = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			this.boardgap, 
			(this.height-this.paddleHeight)/2,
			KEYS.a,
			KEYS.z
		);

		this.paddleTwo = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			(this.width-this.boardgap-this.paddleWidth), 
			(this.height-this.paddleHeight)/2,
			KEYS.up,
			KEYS.down
		
		);
	}

	render() {
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');
		
		this.gameElement.appendChild(svg);

		this.board.render(svg);

		this.paddleOne.render(svg);
		this.paddleTwo.render(svg);

		// this.ball.render(svg);

	}

}
