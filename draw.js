function setup() {

  rng = new rngBlock();
  blocks = [rng.block1, rng.block2, rng.block3, rng.block4, rng.block5, rng.block6, rng.block7];
  inAir = [];
  onGround = [];
  for (let gr = 0; gr < 20; gr++) {
    onGround.push([]);
  }
  slide = true;
  phase = 0;

  rand = rng.rand();
  blocks[rand]();

  createCanvas(200, 400);
  pixelDensity(2);
}

function draw() {

  background(200);
  collision = false;
  // малює лежачі блоки
  for (let j = 0; j < onGround.length; j++) {
    for (let b = 0; b < onGround[j].length; b++) {
      onGround[j][b].drawSquare();
    }
  }
  // перебирає падаючі блоки
  for (let i = 0; i < 4; i++) {
    //малює падаючі блоки
    inAir[i].drawSquare();
    //перевіряє чи блок доторкається до землі або іншого лежачого блока
    if (inAir[i].y == height - 20) {
      collision = true;
    } else {
      //перебирає всі лежачі блоки
      for (let j = 0; j < onGround.length; j++) {
        for (let b = 0; b < onGround[j].length; b++) {
          if (inAir[i].y == onGround[j][b].y - 20 && inAir[i].x == onGround[j][b].x) {
            collision = true;
          }
        }
      }
    }
    if (collision) {
      for (let j = 3; j > -1; j--) {
        onGround[inAir[j].y / 20].push(inAir[j]);
        inAir.pop();
      }

      rand = rng.rand();
      blocks[rand]();
      collision = false;
      phase = 0

      for (let j = 0; j < 20; j++) {
        if (onGround[j].length == 10) {

          for (let rev = j - 1; rev >= 0; rev--) {
            for (let b = 0; b < onGround[rev].length; b++) {
              onGround[rev][b].y += 20;
            }
          }
          onGround.splice(j, 1);
          onGround.unshift([]);
        }
      }
    }
    if (frameCount % 15 == 0) {
      inAir[i].y += 20;
    }
  }

  //при поразці
  if (onGround[0].length != 0) {
    onGround = [];
    for (let gr = 0; gr < 20; gr++) {
      onGround.push([]);
    }
  }

}

function keyPressed() {
  //при натисканні на стрілку вліво
  if (keyCode === LEFT_ARROW) {
    slide = true;
    //перебирає всі квадрати, які падають
    for (let i = 0; i < 4; i++) {
      empty = 0;
      for (let j = 0; j < onGround.length; j++) {
        if (onGround[j].length == 0) {
          empty++;
        }

        for (let b = 0; b < onGround[j].length; b++) {
          if ((inAir[i].y == onGround[j][b].y && inAir[i].x == onGround[j][b].x + 20) || inAir[i].x == 0) {
            slide = false;
          }
        }
      }

      if (empty == 20 && inAir[i].x == 0) {
        slide = false;
      }
    }
    if (slide) {
      for (let i = 0; i < 4; i++) {
        inAir[i].x -= 20;
      }
    }
  } else if (keyCode === RIGHT_ARROW) {
    slide = true;
    //перебирає всі квадрати, які падають
    for (let i = 0; i < 4; i++) {
      empty = 0;
      for (let j = 0; j < onGround.length; j++) {
        if (onGround[j].length == 0) {
          empty++;
        }
        for (let b = 0; b < onGround[j].length; b++) {
          if ((inAir[i].y == onGround[j][b].y && inAir[i].x == onGround[j][b].x - 20) || inAir[i].x == 180) {
            slide = false;
          }
        }
      }

      if (empty == 20 && inAir[i].x == 180) {
        slide = false;
      }
    }
    if (slide) {
      for (let i = 0; i < 4; i++) {
        inAir[i].x += 20;
      }
    }
  } else if (keyCode === SHIFT) {

    twist = [];

    empty = 0;
    validate1 = 0
    validate2 = 0

    switch (rand) {

      case 0:

        switch (phase) {

          case 0:
            twist.push(new Brick(inAir[1].x, inAir[1].y + 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y + 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y - 20));
            phase++;
            break;

          case 1:
            twist.push(new Brick(inAir[1].x - 20, inAir[1].y));
            twist.push(new Brick(inAir[1].x - 20, inAir[1].y - 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y));
            phase++;
            break;

          case 2:
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y + 20));
            phase++;
            break;

          case 3:
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y));
            phase++
            break
        }

        break

      case 1:

        switch (phase) {

          case 0:
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y + 20));
            phase++;
            break;

          case 1:
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y + 20));
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y));
            phase++;
            break;

          case 2:
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y + 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y + 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y - 20));
            phase++;
            break;

          case 3:
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y));
            phase++
            break
        }

        break

      case 2:

        switch (phase) {

          case 0:
            twist.push(new Brick(inAir[2].x, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y + 20));
            phase++;
            break;

          case 1:
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y + 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y));
            phase++;
            break;

          case 2:
            twist.push(new Brick(inAir[2].x, inAir[2].y + 20));
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y - 20));
            phase++;
            break;

          case 3:
            twist.push(new Brick(inAir[2].x - 20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y - 20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x + 20, inAir[2].y));
            phase++
            break
        }
        break

      case 3:

        switch (phase) {

          case 0:
            twist.push(new Brick(inAir[2].x+40, inAir[2].y));
            twist.push(new Brick(inAir[2].x+20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x-20, inAir[2].y));
            phase++;
            break;

          case 1:
            twist.push(new Brick(inAir[2].x, inAir[2].y-40));
            twist.push(new Brick(inAir[2].x, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y+20));
            phase++;
            break;

          case 2:
            twist.push(new Brick(inAir[2].x+40, inAir[2].y));
            twist.push(new Brick(inAir[2].x+20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x-20, inAir[2].y));
            phase++;
            break;

          case 3:
            twist.push(new Brick(inAir[2].x, inAir[2].y-40));
            twist.push(new Brick(inAir[2].x, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y+20));
            phase++
            break
        }
        break

      case 4:

        switch (phase) {

          case 0:
            twist = inAir
            phase++;
            break;

          case 1:
            twist = inAir
            phase++;
            break;

          case 2:
            twist = inAir
            phase++;
            break;

          case 3:
            twist = inAir
            phase++
            break
        }

        break

      case 5:

        switch (phase) {

          case 0:
            twist.push(new Brick(inAir[2].x-20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x+20, inAir[2].y));
            phase++;
            break;

          case 1:
            twist.push(new Brick(inAir[2].x+20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x+20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y+20));
            phase++;
            break;

          case 2:
            twist.push(new Brick(inAir[2].x-20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x+20, inAir[2].y));
            phase++;
            break;

          case 3:
            twist.push(new Brick(inAir[2].x+20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x+20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y+20));
            phase++
            break
        }

        break

      case 6:

        switch (phase) {

          case 0:
            twist.push(new Brick(inAir[2].x+20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x-20, inAir[2].y));
            phase++;
            break;

          case 1:
            twist.push(new Brick(inAir[2].x-20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x-20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y+20));
            phase++;
            break;

          case 2:
            twist.push(new Brick(inAir[2].x+20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x-20, inAir[2].y));
            phase++;
            break;

          case 3:
            twist.push(new Brick(inAir[2].x-20, inAir[2].y-20));
            twist.push(new Brick(inAir[2].x-20, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y));
            twist.push(new Brick(inAir[2].x, inAir[2].y+20));
            phase++
            break
        }

        break

    }

    for (let z = 0; z < 20; z++) {
      if (onGround[z].length == 0) {
        empty++;
      }
    }

    for (let i = 0; i < 4; i++) {


      if (twist[i].x >= 0 && twist[i].x < 200 && twist[i].y >= 0 && twist[i].y < 400) {
        if (empty == 20) {
          validate1++;

        } else {

          for (let j = 0; j < 20; j++) {
            for (let b = 0; b < onGround[j].length; b++) {

              if (twist[i].x != onGround[j][b].x || twist[i].y != onGround[j][b].y) {

                validate2++;
              }
            }
          }
          validate2 = validate2 % 4 + 1

        }
      }
    }

    if (validate1 == 4 || validate2 == 4) {
      inAir = twist;
    }

    phase = phase % 4

    if (inAir != twist) {
      if (phase == 0) {
        phase = 3
      } else {
        phase--
      }

    }
  }
  return false;
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }

  drawSquare() {
    fill(this.r, this.g, this.b);
    stroke(0);
    strokeWeight(3);
    square(this.x + 2, this.y + 2, 16);
    strokeWeight(0);
    fill(0);
    stroke(0);
    square(this.x + 7, this.y + 7, 6);
  }
}

class rngBlock {

  block1() {
    inAir.push(new Brick(100, 0));
    inAir.push(new Brick(100, 20));
    inAir.push(new Brick(80, 20));
    inAir.push(new Brick(60, 20));
  }

  block2() {
    inAir.push(new Brick(60, 0));
    inAir.push(new Brick(60, 20));
    inAir.push(new Brick(80, 20));
    inAir.push(new Brick(100, 20));
  }

  block3() {
    inAir.push(new Brick(80, 0));
    inAir.push(new Brick(60, 20));
    inAir.push(new Brick(80, 20));
    inAir.push(new Brick(100, 20));
  }

  block4() {
    inAir.push(new Brick(80, 0));
    inAir.push(new Brick(80, 20));
    inAir.push(new Brick(80, 40));
    inAir.push(new Brick(80, 60));
  }

  block5() {
    inAir.push(new Brick(80, 0));
    inAir.push(new Brick(100, 0));
    inAir.push(new Brick(80, 20));
    inAir.push(new Brick(100, 20));
  }

  block6() {
    inAir.push(new Brick(100, 0));
    inAir.push(new Brick(80, 20));
    inAir.push(new Brick(100, 20));
    inAir.push(new Brick(80, 40));
  }

  block7() {
    inAir.push(new Brick(80, 0));
    inAir.push(new Brick(80, 20));
    inAir.push(new Brick(100, 20));
    inAir.push(new Brick(100, 40));
  }

  rand() {
    return Math.round(random(-0.5, 6.49999));
  }
}