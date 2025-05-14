// Game.js - Thought Trap Escape Games for 마음 탐험대

// Game data
const games = {
    'game-1': {
        title: '쌍안경 생각',
        description: '좋은 점과 아쉬운 점을 균형 있게 찾는 보물찾기 게임',
        type: 'balanceGame',
        instruction: '지민이의 그림에서 좋은 점과 아쉬운 점을 찾아보세요. 균형 있게 찾을수록 점수가 높아져요!',
        scenario: `
            <p>지민이는 미술 시간에 그린 그림을 보고 있어요.</p>
            <p>그런데 지민이는 자꾸 그림의 아쉬운 점만 보이고 좋은 점은 잘 보이지 않아요.</p>
            <p>"색깔이 마음에 안 들어... 선도 삐뚤삐뚤하고... 다른 친구들은 더 잘 그렸는데..."</p>
            <p>지민이가 그림의 좋은 점과 아쉬운 점을 균형 있게 볼 수 있도록 도와주세요!</p>
        `,
        imageUrl: 'images/game1-scenario.png',
        content: {
            positivePoints: [
                '색이 밝고 선명해요',
                '독창적인 아이디어예요',
                '열심히 그린 게 보여요',
                '구도가 잘 잡혀 있어요',
                '세부 묘사가 잘 되어 있어요'
            ],
            negativePoints: [
                '선이 약간 삐뚤삐뚤해요',
                '색칠이 일부 영역에서 벗어났어요',
                '비율이 약간 맞지 않아요',
                '배경이 조금 단조로워요',
                '그림자 처리가 덜 되었어요'
            ]
        }
    },
    'game-2': {
        title: '흑백 생각',
        description: '다양한 중간 생각으로 무지개 다리를 완성하는 게임',
        type: 'rainbowBridgeGame',
        instruction: '완벽하게 성공하거나 완전히 실패한 것이 아니라, 여러 중간 생각들을 찾아 무지개 다리를 완성해보세요!',
        scenario: `
            <p>수호는 달리기 시합에서 1등을 하지 못했어요.</p>
            <p>"난 완전히 실패했어. 1등을 못했으니까 아무 소용 없어."</p>
            <p>수호는 1등 아니면 아무것도 아니라고 생각하고 있어요.</p>
            <p>흑백으로만 생각하지 않고, 다양한 색깔의 생각을 찾아 무지개 다리를 만들어보세요!</p>
        `,
        imageUrl: 'images/game2-scenario.png',
        content: {
            extremes: {
                black: '완전한 실패야. 1등이 아니면 의미 없어.',
                white: '언제나 모든 시합에서 1등을 해야만 해!'
            },
            rainbowThoughts: [
                '비록 1등은 아니지만 최선을 다했어',
                '다음에는 더 잘 할 수 있는 기회가 있어',
                '달리기를 통해 건강해지고 있어',
                '친구들과 함께 즐기는 것도 중요해',
                '이번 경험으로 더 성장할 수 있어',
                '나의 기록이 향상되고 있어'
            ]
        }
    },
    'game-3': {
        title: '먹구름 생각',
        description: '먹구름 뒤에 숨겨진 햇살을 찾는 게임',
        type: 'sunshineGame',
        instruction: '먹구름 생각 뒤에 숨겨진 햇살(긍정적인 면)을 찾아보세요!',
        scenario: `
            <p>소영이는 친구들과 놀기로 한 약속에 늦었어요.</p>
            <p>"친구들이 나에게 화가 났을 거야. 아마 더 이상 나랑 놀고 싶지 않을 거야. 모든 게 엉망이 됐어."</p>
            <p>소영이의 머릿속에는 부정적인 생각의 먹구름이 가득해요.</p>
            <p>먹구름 뒤에 숨겨진 햇살을 찾아 소영이를 도와주세요!</p>
        `,
        imageUrl: 'images/game3-scenario.png',
        content: {
            clouds: [
                '친구들이 나에게 화가 났을 거야',
                '더 이상 나랑 놀고 싶지 않을 거야',
                '약속에 늦은 내가 최악이야',
                '모든 게 엉망이 됐어',
                '이제 친구들과 관계가 나빠질 거야'
            ],
            sunshine: [
                '사과하면 친구들이 이해해줄 수 있어',
                '한 번의 실수가 모든 관계를 망치지는 않아',
                '지각한 이유를 설명하면 도움이 될 거야',
                '친구들도 가끔 실수할 수 있다는 걸 알고 있어',
                '이번 일을 통해 약속 시간의 중요성을 배웠어'
            ]
        }
    }
};

// Current game state
let currentGame = null;
let gameScore = 0;
let gameProgress = 0;

// Initialize game functionality
document.addEventListener('DOMContentLoaded', () => {
    // Setup game cards click events
    setupGameCards();
});

// Setup game cards click events
function setupGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.id;
            startGame(gameId);
        });
    });
}

// Start a game
function startGame(gameId) {
    // Reset game state
    gameScore = 0;
    gameProgress = 0;
    
    // Get game data
    currentGame = games[gameId];
    
    if (currentGame) {
        // Show game content
        const gameContent = document.getElementById('game-content');
        
        if (gameContent) {
            // Build game intro
            gameContent.innerHTML = `
                <div class="game-intro">
                    <h3>${currentGame.title}</h3>
                    <div class="game-scenario">
                        ${currentGame.scenario}
                    </div>
                    <div class="game-instruction">
                        <h4>게임 방법</h4>
                        <p>${currentGame.instruction}</p>
                    </div>
                    <button id="start-game-btn" class="primary-button">게임 시작하기</button>
                </div>
            `;
            
            // Setup start game button
            document.getElementById('start-game-btn').addEventListener('click', () => {
                // Show the actual game based on type
                switch(currentGame.type) {
                    case 'balanceGame':
                        showBalanceGame();
                        break;
                    case 'rainbowBridgeGame':
                        showRainbowBridgeGame();
                        break;
                    case 'sunshineGame':
                        showSunshineGame();
                        break;
                    default:
                        console.error('Unknown game type');
                }
                
                // Show AI character message
                window.app.showAIMessage(`${currentGame.title} 게임이 시작됐어! 생각의 함정을 찾아내고 탈출하는 방법을 배워보자!`);
            });
        }
    }
}

// Show balance game (쌍안경 생각)
function showBalanceGame() {
    const gameContent = document.getElementById('game-content');
    
    if (gameContent && currentGame) {
        // Shuffle points for randomness
        const positivePoints = shuffle([...currentGame.content.positivePoints]);
        const negativePoints = shuffle([...currentGame.content.negativePoints]);
        
        // Create game HTML
        gameContent.innerHTML = `
            <div class="balance-game">
                <h3>${currentGame.title}</h3>
                <div class="game-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="score">점수: <span id="game-score">0</span></div>
                </div>
                
                <div class="balance-container">
                    <div class="points-container">
                        <h4>좋은 점 찾기</h4>
                        <div class="positive-points" id="positive-points"></div>
                    </div>
                    
                    <div class="balance-scale">
                        <div class="scale-left" id="scale-left">
                            <div class="scale-count">0</div>
                        </div>
                        <div class="scale-center"></div>
                        <div class="scale-right" id="scale-right">
                            <div class="scale-count">0</div>
                        </div>
                    </div>
                    
                    <div class="points-container">
                        <h4>아쉬운 점 찾기</h4>
                        <div class="negative-points" id="negative-points"></div>
                    </div>
                </div>
                
                <div class="game-feedback" id="game-feedback"></div>
                
                <button id="finish-game-btn" class="primary-button" disabled>게임 완료</button>
            </div>
        `;
        
        // Add style for balance game
        const style = document.createElement('style');
        style.textContent = `
            .balance-game {
                padding: 20px;
            }
            
            .balance-container {
                display: flex;
                margin: 20px 0;
                gap: 20px;
            }
            
            .points-container {
                flex: 1;
                background: #f5f5f5;
                padding: 15px;
                border-radius: 10px;
            }
            
            .positive-points, .negative-points {
                min-height: 300px;
            }
            
            .point-item {
                background: white;
                padding: 10px;
                margin: 10px 0;
                border-radius: 5px;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .point-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 3px 5px rgba(0,0,0,0.1);
            }
            
            .balance-scale {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0 20px;
            }
            
            .scale-left, .scale-right {
                width: 120px;
                min-height: 150px;
                background: #e0e0e0;
                border-radius: 10px;
                padding: 10px;
                margin: 10px 0;
                position: relative;
            }
            
            .scale-count {
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-weight: bold;
                font-size: 20px;
            }
            
            .scale-center {
                width: 10px;
                height: 80px;
                background: #888;
                border-radius: 5px;
            }
            
            .selected-point {
                padding: 8px;
                margin: 8px 0;
                background: var(--primary-color);
                color: white;
                border-radius: 5px;
                font-size: 14px;
            }
            
            .game-feedback {
                background: #f0f7ff;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 5px solid var(--primary-color);
                display: none;
            }
        `;
        document.head.appendChild(style);
        
        // Populate points
        const positiveContainer = document.getElementById('positive-points');
        const negativeContainer = document.getElementById('negative-points');
        
        positivePoints.forEach((point, index) => {
            const pointItem = document.createElement('div');
            pointItem.classList.add('point-item');
            pointItem.dataset.type = 'positive';
            pointItem.dataset.index = index;
            pointItem.textContent = point;
            
            pointItem.addEventListener('click', () => selectPoint(pointItem, 'scale-left'));
            
            positiveContainer.appendChild(pointItem);
        });
        
        negativePoints.forEach((point, index) => {
            const pointItem = document.createElement('div');
            pointItem.classList.add('point-item');
            pointItem.dataset.type = 'negative';
            pointItem.dataset.index = index;
            pointItem.textContent = point;
            
            pointItem.addEventListener('click', () => selectPoint(pointItem, 'scale-right'));
            
            negativeContainer.appendChild(pointItem);
        });
        
        // Setup finish button
        document.getElementById('finish-game-btn').addEventListener('click', finishBalanceGame);
    }
}

// Select a point in balance game
function selectPoint(pointItem, targetId) {
    // Create a copy in the target container
    const targetContainer = document.getElementById(targetId);
    const type = pointItem.dataset.type;
    const index = pointItem.dataset.index;
    
    // Check if already selected
    if (document.querySelector(`.selected-point[data-type="${type}"][data-index="${index}"]`)) {
        return;
    }
    
    // Add to target
    const selectedPoint = document.createElement('div');
    selectedPoint.classList.add('selected-point');
    selectedPoint.dataset.type = type;
    selectedPoint.dataset.index = index;
    selectedPoint.textContent = pointItem.textContent;
    
    // Add remove functionality
    selectedPoint.addEventListener('click', () => {
        selectedPoint.remove();
        updateBalanceGameStatus();
    });
    
    targetContainer.appendChild(selectedPoint);
    updateBalanceGameStatus();
}

// Update balance game status
function updateBalanceGameStatus() {
    const leftCount = document.querySelectorAll('#scale-left .selected-point').length;
    const rightCount = document.querySelectorAll('#scale-right .selected-point').length;
    
    // Update counts
    document.querySelector('#scale-left .scale-count').textContent = leftCount;
    document.querySelector('#scale-right .scale-count').textContent = rightCount;
    
    // Calculate balance score (based on how close the counts are)
    const diff = Math.abs(leftCount - rightCount);
    const totalPoints = leftCount + rightCount;
    
    // Only calculate score if there are points selected
    if (totalPoints > 0) {
        // Perfect balance gives max score, imbalance reduces score
        const balanceScore = Math.max(0, 100 - (diff * 20));
        
        // More total points gives higher score
        const countScore = Math.min(100, totalPoints * 10);
        
        // Combine scores (balanced is more important than count)
        gameScore = Math.round((balanceScore * 0.7) + (countScore * 0.3));
        
        // Update score display
        document.getElementById('game-score').textContent = gameScore;
        
        // Update progress bar
        document.querySelector('.progress-fill').style.width = `${gameScore}%`;
        
        // Enable finish button if at least 3 points selected on each side
        document.getElementById('finish-game-btn').disabled = !(leftCount >= 3 && rightCount >= 3);
        
        // Show feedback based on balance
        if (diff <= 1 && totalPoints >= 6) {
            document.getElementById('game-feedback').style.display = 'block';
            document.getElementById('game-feedback').innerHTML = `
                <p>멋져요! 좋은 점과 아쉬운 점을 균형 있게 찾고 있어요. 이렇게 균형 잡힌 시각으로 바라보면 '쌍안경 생각' 함정에서 벗어날 수 있어요!</p>
            `;
        } else if (diff > 2) {
            document.getElementById('game-feedback').style.display = 'block';
            document.getElementById('game-feedback').innerHTML = `
                <p>좋은 점과 아쉬운 점의 균형이 조금 맞지 않아요. 더 균형 있게 찾아보면 어떨까요?</p>
            `;
        } else {
            document.getElementById('game-feedback').style.display = 'none';
        }
    } else {
        gameScore = 0;
        document.getElementById('game-score').textContent = gameScore;
        document.querySelector('.progress-fill').style.width = '0%';
        document.getElementById('finish-game-btn').disabled = true;
        document.getElementById('game-feedback').style.display = 'none';
    }
}

// Finish balance game
function finishBalanceGame() {
    const gameContent = document.getElementById('game-content');
    
    if (gameContent) {
        // Show results
        gameContent.innerHTML = `
            <div class="game-result">
                <h3>게임 결과</h3>
                
                <div class="result-summary">
                    <div class="result-score">
                        <div class="score-circle">
                            <span>${gameScore}</span>
                        </div>
                        <p>점수</p>
                    </div>
                    
                    <div class="result-message">
                        ${getBalanceGameResultMessage(gameScore)}
                    </div>
                </div>
                
                <div class="ai-analysis">
                    <h4>마음이의 생각</h4>
                    <p>'쌍안경 생각' 함정은 좋은 점은 작게 보고 나쁜 점은 크게 보는 생각이에요.</p>
                    <p>이런 함정에 빠지면 자신의 가치를 제대로 볼 수 없게 돼요.</p>
                    <p>좋은 점과 아쉬운 점을 균형 있게 바라보는 연습을 통해 더 현실적이고 건강한 생각을 할 수 있어요!</p>
                </div>
                
                <div class="result-buttons">
                    <button id="retry-game-btn" class="secondary-button">다시 도전하기</button>
                    <button id="exit-game-btn" class="primary-button">다른 게임 선택하기</button>
                </div>
            </div>
        `;
        
        // Add style for results
        const style = document.createElement('style');
        style.textContent = `
            .game-result {
                padding: 20px;
            }
            
            .result-summary {
                display: flex;
                gap: 30px;
                margin: 30px 0;
                align-items: center;
            }
            
            .result-score {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .score-circle {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: ${gameScore >= 80 ? 'var(--success-color)' : gameScore >= 50 ? 'var(--secondary-color)' : 'var(--highlight-color)'};
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .result-message {
                flex: 1;
                background: #f5f5f5;
                padding: 20px;
                border-radius: 10px;
            }
            
            .ai-analysis {
                background: #f0f7ff;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 5px solid var(--primary-color);
            }
            
            .result-buttons {
                display: flex;
                gap: 10px;
                margin-top: 20px;
                justify-content: center;
            }
            
            .secondary-button {
                background-color: #f5f5f5;
                color: var(--text-color);
                border: none;
                padding: 10px 20px;
                border-radius: var(--border-radius-sm);
                cursor: pointer;
                font-size: var(--font-sm);
                transition: background-color 0.3s ease;
            }
            
            .secondary-button:hover {
                background-color: #e0e0e0;
            }
        `;
        document.head.appendChild(style);
        
        // Setup buttons
        document.getElementById('retry-game-btn').addEventListener('click', () => {
            startGame('game-1');
        });
        
        document.getElementById('exit-game-btn').addEventListener('click', () => {
            gameContent.innerHTML = '<p>게임을 선택해주세요!</p>';
            currentGame = null;
        });
        
        // If score is good, unlock badge
        if (gameScore >= 80) {
            unlockBadge();
        }
        
        // Show AI character message
        window.app.showAIMessage("생각 함정을 탈출하는 방법을 배웠어! 좋은 점과 아쉬운 점을 균형 있게 보는 연습을 일상에서도 해보자!");
    }
}

// Get result message based on score
function getBalanceGameResultMessage(score) {
    if (score >= 90) {
        return `
            <h4>완벽한 균형 감각! 🌟</h4>
            <p>좋은 점과 아쉬운 점을 아주 균형 있게 찾았어요! 이런 균형 잡힌 시각은 현실을 정확하게 바라보는 데 큰 도움이 됩니다.</p>
        `;
    } else if (score >= 70) {
        return `
            <h4>훌륭한 균형 감각! 👍</h4>
            <p>좋은 점과 아쉬운 점을 꽤 균형 있게 찾았어요. 조금 더 연습하면 더 완벽해질 거예요!</p>
        `;
    } else if (score >= 50) {
        return `
            <h4>좋은 시도예요! 😊</h4>
            <p>균형을 맞추려고 노력했군요! 더 다양한 관점에서 생각하면 더 좋은 결과를 얻을 수 있을 거예요.</p>
        `;
    } else {
        return `
            <h4>균형 맞추기 연습이 필요해요 🌱</h4>
            <p>좋은 점과 아쉬운 점의 균형이 아직 맞지 않아요. 다시 도전해볼까요?</p>
        `;
    }
}

// Show rainbow bridge game (흑백 생각)
function showRainbowBridgeGame() {
    const gameContent = document.getElementById('game-content');
    
    if (gameContent) {
        // Basic game structure (for prototype)
        gameContent.innerHTML = `
            <div class="rainbow-game">
                <h3>${currentGame.title}</h3>
                <p>이 게임은 프로토타입 버전입니다. 실제 게임에서는 흑백 생각(양 극단)에서 다양한 중간 생각을 배치하여 무지개 다리를 만드는 게임이 구현될 예정입니다.</p>
                <button id="exit-game-btn" class="primary-button">돌아가기</button>
            </div>
        `;
        
        document.getElementById('exit-game-btn').addEventListener('click', () => {
            gameContent.innerHTML = '<p>게임을 선택해주세요!</p>';
            currentGame = null;
        });
    }
}

// Show sunshine game (먹구름 생각)
function showSunshineGame() {
    const gameContent = document.getElementById('game-content');
    
    if (gameContent) {
        // Basic game structure (for prototype)
        gameContent.innerHTML = `
            <div class="sunshine-game">
                <h3>${currentGame.title}</h3>
                <p>이 게임은 프로토타입 버전입니다. 실제 게임에서는 먹구름(부정적 생각) 뒤에 숨겨진 햇살(긍정적 생각)을 찾는 게임이 구현될 예정입니다.</p>
                <button id="exit-game-btn" class="primary-button">돌아가기</button>
            </div>
        `;
        
        document.getElementById('exit-game-btn').addEventListener('click', () => {
            gameContent.innerHTML = '<p>게임을 선택해주세요!</p>';
            currentGame = null;
        });
    }
}

// Unlock a badge
function unlockBadge() {
    // For this prototype, unlock the second badge (thought trap escape badge)
    const badges = document.querySelectorAll('.badge');
    
    if (badges.length >= 2 && badges[1].classList.contains('locked')) {
        setTimeout(() => {
            badges[1].classList.remove('locked');
            window.app.showAIMessage("축하해! 생각 함정 탈출가 배지를 획득했어! 생각 함정을 발견하고 탈출하는 능력이 늘고 있구나!");
        }, 3000);
    }
}

// Utility function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
} 