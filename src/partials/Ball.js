import { SVG_NS } from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.ping = new Audio('public/sounds/pong-01.wav');
        this.ping2 = new Audio('public/sounds/pong-03.wav');
        this.ping3 = new Audio('http://www.sa-matra.net/sounds/starwars/Blaster-Imperial.wav');
       
        this.reset();
    }
    // Starting Position for ball
    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
    // Adjust this variable to control ball speed. 
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision(paddleOne, paddleTwo) {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if(hitLeft){
          this.goal(paddleTwo);
          this.direction = -1;
          this.ping3.play();

        }else if(hitRight){
          this.goal(paddleOne);
          this.direction = 1;
          this.ping3.play();

        }else if(hitTop || hitBottom){
          this.vy = -this.vy;
          this.ping2.play();

        }
    }
    paddleCollision(paddleOne, paddleTwo){
       if (this.vx > 0){
         let paddle = paddleTwo.coordinates(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
         let {leftX, topY, bottomY} = paddle;

        if(
           this.x + this.radius >= leftX
           // right hand paddle is full viewport height
           && this.y >= topY
           && this.y <= bottomY 
        ) {
            this.vx = -this.vx;
            this.ping.play();

        }
         
       } else {
         let paddle = paddleOne.coordinates(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
         let {rightX, topY, bottomY} = paddle;

         if(
           this.x - this.radius <= rightX
           && this.y >= topY
           && this.y <= bottomY 
        ) {
            this.vx = -this.vx;
             this.ping.play();

        }
       }

    }

    goal(player){
          player.score++;
           this.reset();
         
    }

    render(svg, paddleOne, paddleTwo) {
        this.y += this.vy;
        this.x += this.vx;

        this.wallCollision(paddleOne, paddleTwo);
        this.paddleCollision(paddleOne,paddleTwo);

        let ball = document.createElementNS(SVG_NS, 'circle');
        ball.setAttributeNS(null, 'fill', '#adff2f');
        ball.setAttributeNS(null, 'r', this.radius);
        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);
        ball.setAttributeNS(null, 'stroke', 'yellow');
        svg.appendChild(ball);

    }

} 
