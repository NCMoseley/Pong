import { SVG_NS, KEYS } from '../settings';

export default class PaddleAi {

  constructor(boardHeight, width, height, x, y, ball) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ball = ball;
    this.speed = 2;
    this.score = 0;
    window.setInterval((function () {
    this.chasepaddle();
    }).bind(this), 10);
    document.addEventListener('keydown', event => {
			if (event.key === KEYS.f) {
        this.speed = (this.speed+.5);
      }
			if (event.key === KEYS.g) {
        this.speed = (this.speed = 1);
			}
    });
  }
  //  Ai Component
  chasepaddle() {
    if (this.ball.y <= this.y) {
      this.up();
    } else if (this.ball.y >= this.y) {
      this.down();
    }
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return { leftX, rightX, topY, bottomY };
  }

  up() {
    this.y = Math.max(this.y - this.speed, 0);
  }
  down() {
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
  }

  render(svg) {

    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', '#ffffff');
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    rect.setAttributeNS(null, 'rx', 4);
    rect.setAttributeNS(null, 'ry', 4);
    svg.appendChild(rect);

  }
} 
