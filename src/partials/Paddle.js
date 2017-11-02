import {SVG_NS} from '../settings';


export default class Paddle {

  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch(event.key) {

        case up: 
          this.up();
          break;

        case down: 
          this.down();
          break;
    }
    
    });
    
  }
    up(){
        // get max number 
        // either 0 or the y position minus the speeed
     this.y = Math.max(this.y - this.speed, 0);
    }
    
    down(){
        //  get min number 
        // either height of the board minus the paddle or the y position plus the speeed
     this.y = Math.min(this.y + this.speed, this.boardHeight-this.height);
    }


   render(svg) {
     let rect = document.createElementNS(SVG_NS,'rect');

        rect.setAttributeNS(null, 'width', this.width);
		rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'fill', '#ffffff' );
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);
        rect.setAttributeNS(null, 'rx', 4);
        rect.setAttributeNS(null, 'ry', 4);

        svg.appendChild(rect);


   }


} 
