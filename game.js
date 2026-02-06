// RPG Game Engine implementation

// Initialize canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player;
let enemies = [];
let gameObjects = [];

// Player class
class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.level = 1;
        this.health = 100;
        this.attack = 10;
        this.experience = 0;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    levelUp() {
        this.level++;
        this.health += 20;
        this.attack += 5;
    }
    gainExperience(exp) {
        this.experience += exp;
        if (this.experience >= 100) {
            this.levelUp();
            this.experience = 0;
        }
    }
}

// Enemy class
class Enemy {
    constructor(x, y, health) {
        this.x = x;
        this.y = y;
        this.health = health;
    }
    moveTowards(player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            this.x += dx / distance;
            this.y += dy / distance;
        }
    }
    attack(player) {
        player.health -= 5;
    }
}

// Initialize game
function initGame() {
    player = new Player('Hero', 50, 50);
    enemies.push(new Enemy(100, 100, 50));
    gameObjects.push(player);
    gameObjects.push(...enemies);
}

// Render game
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const obj of gameObjects) {
        ctx.fillRect(obj.x, obj.y, 10, 10);
    }
}

// Game loop
function gameLoop() {
    render();
    requestAnimationFrame(gameLoop);
}

// Event listeners for player movement
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp': player.move(0, -5); break;
        case 'ArrowDown': player.move(0, 5); break;
        case 'ArrowLeft': player.move(-5, 0); break;
        case 'ArrowRight': player.move(5, 0); break;
    }
});

// Start the game
initGame();
gameLoop();