import {SVG_NS} from '../settings';
import Ball from './Ball';

export default class PaddleAI {

  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    
    this.speed = 10;
    this.score = 0;
  }
// Begin AI

     function(PaddleAI) {
  if (((ball.x < this.left) && (ball.dx < 0)) ||
      ((ball.x > this.right) && (ball.dx > 0))) {
    this.stopMovingUp();
    this.stopMovingDown();
    return;
  }

  this.predict(ball, dt);

  if (this.prediction) {
    if (this.prediction.y < (0 + this.height/2 - 5)) {
      this.stopMovingDown();
      this.moveUp();
    }
    else if (this.prediction.y > (200 - this.height/2 + 5)) {
      this.stopMovingUp();
      this.moveDown();
    }
    else {
      this.stopMovingUp();
      this.stopMovingDown();
    }
  }

 predict: function(ball) {
  // only re-predict if the ball changed direction, or its been some amount of time since last prediction
  if (this.prediction &&
      ((this.prediction.dx * ball.dx) > 0) &&
      ((this.prediction.dy * ball.dy) > 0) &&
      (this.prediction.since < 1.0)) {
    this.prediction.since += dt;
    return;
  }

  var pt  = Pong.Helper.ballIntercept(ball, {left: this.left, right: this.right, top: -10000, bottom: 10000}, ball.dx * 10, ball.dy * 10);
  if (pt) {
    var t = this.minY + ball.radius;
    var b = this.maxY + this.height - ball.radius;

    while ((pt.y < t) || (pt.y > b)) {
      if (pt.y < t) {
        pt.y = t + (t - pt.y);
      }
      else if (pt.y > b) {
        pt.y = t + (b - t) - (pt.y - b);
      }
    }
    this.prediction = pt;
  }
  else {
    this.prediction = null;
  }

  if (this.prediction) {
    this.prediction.since = 0;
    this.prediction.dx = ball.dx;
    this.prediction.dy = ball.dy;
    this.prediction.radius = ball.radius;
    this.prediction.exactX = this.prediction.x;
    this.prediction.exactY = this.prediction.y;
    var closeness = (ball.dx < 0 ? ball.x - this.right : this.left - ball.x) / this.pong.width;
    var error = this.level.aiError * closeness;
    this.prediction.y = this.prediction.y + Game.random(-error, error);
  }
}   
}

// coordinates(x, y, width, height) {
//   let leftX = x;
//   let rightX = x + width;
//   let topY = y;
//   let bottomY = y + height;
//   return {leftX, rightX, topY, bottomY};
// } 

//     up(){
//         // get max number 
//         // either 0 or the y position minus the speeed
//      this.y = Math.max(this.y - this.speed, 0);
//     }
    
//     down(){
//         //  get min number 
//         // either height of the board minus the paddle or the y position plus the speeed
//      this.y = Math.min(this.y + this.speed, this.boardHeight-this.height);
//     }


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
