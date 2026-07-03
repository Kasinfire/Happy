const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const colors = [
  "#CF3538", 
  "#BB35CF", 
  "#2AABB8", 
  "#D9895B", 
];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = randomRange(20, 20);
    this.color = colors[Math.floor(randomRange(0, colors.length))];
    const angle = randomRange(0, Math.PI * 2);
    const speed = randomRange(4, 18); 

    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    this.rotation = randomRange(0, Math.PI * 2);
    this.rotationSpeed = randomRange(-0.2, 0.2);
    this.gravity = 0.3;
    this.drag = 0.02;
  }
  update() {
    this.velocity.x -= this.velocity.x * this.drag;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.rotation += this.rotationSpeed;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    ctx.restore();
  }
}

let particles = [];

function launchConfetti(originX, originY, count = 60) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(originX, originY));
  }
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  particles = particles.filter((p) => p.y < canvas.height + 20);
  requestAnimationFrame(animate);
}
animate();

window.launchConfetti = launchConfetti;
