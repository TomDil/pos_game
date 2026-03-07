// Состояние игры
const gameState = {
    currentScreen: 'screen-auth',
    playerPos: { x: 0, y: 0 },
    team: [],
    worldMap: []
};

// Переключение экранов
function goTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
    gameState.currentScreen = screenId;
}

// Генерация карты 10x10
function createGrid(containerId, clickHandler) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.onclick = () => clickHandler(x, y);
            container.appendChild(cell);
        }
    }
}

// Инициализация мира
function startGame() {
    goTo('screen-world');
    createGrid('world-grid', (x, y) => {
        console.log(`Клик по координатам мира: ${x}:${y}`);
        movePlayer(x, y);
    });
    updateMap();
}

function updateMap() {
    const cells = document.querySelectorAll('#world-grid .cell');
    cells.forEach(cell => {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        cell.classList.remove('player');
        
        if (x === gameState.playerPos.x && y === gameState.playerPos.y) {
            cell.classList.add('player');
            cell.innerText = '🛡️'; // Иконка игрока
        } else {
            cell.innerText = '';
        }
    });
}

function movePlayer(x, y) {
    // Простейшая логика перемещения (на 1 клетку)
    const dist = Math.abs(x - gameState.playerPos.x) + Math.abs(y - gameState.playerPos.y);
    if (dist === 1) {
        gameState.playerPos = { x, y };
        updateMap();
        
        // Шанс встретить врага 20%
        if (Math.random() < 0.2) {
            startBattle();
        }
    }
}

function startBattle() {
    goTo('screen-battle');
    createGrid('battle-grid', (x, y) => {
        console.log(`Атака в бою: ${x}:${y}`);
    });
    // Здесь будет логика расстановки бойцов и очередности ходов
}
