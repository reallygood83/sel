// Story.js - Interactive Storytelling for 마음 탐험대

// Story data
const stories = {
    'story-1': {
        title: '친구의 물건',
        description: '친구가 내 물건을 허락 없이 만졌을 때...',
        scenes: [
            {
                id: 'start',
                content: `
                    <div class="story-scene">
                        <h3>친구의 물건</h3>
                        <p>오늘은 평소와 같은 학교 수업이 끝나고, 민수는 잠시 화장실에 다녀오기 위해 자리를 비웠어.</p>
                        <p>그런데 교실로 돌아왔을 때, 짝꿍인 지훈이가 민수의 필통을 열어 색연필을 꺼내 쓰고 있었어.</p>
                        <p>지훈이는 민수에게 미리 허락을 구하지 않았고, 민수는 자신의 물건을 남이 마음대로 만지는 것을 불편해했어.</p>
                        <p><strong>이때 민수의 마음은 어땠을까?</strong></p>
                    </div>
                `,
                choices: [
                    { text: '계속하기', next: 'emotion-choice' }
                ]
            },
            {
                id: 'emotion-choice',
                content: `
                    <div class="story-scene">
                        <h3>어떤 감정이 들었을까요?</h3>
                        <p>지훈이가 허락 없이 민수의 필통을 사용하는 것을 보고 민수는 어떤 감정을 느꼈을까요?</p>
                    </div>
                `,
                choices: [
                    { text: '화남 😡', next: 'thought-angry', emotion: 'angry' },
                    { text: '속상함 😢', next: 'thought-sad', emotion: 'sad' },
                    { text: '당황스러움 😲', next: 'thought-surprised', emotion: 'surprised' }
                ]
            },
            {
                id: 'thought-angry',
                content: `
                    <div class="story-scene">
                        <h3>화가 났어요 😡</h3>
                        <p>민수는 화가 났어요. 이런 상황에서 민수는 어떤 생각을 했을까요?</p>
                    </div>
                `,
                choices: [
                    { text: '"지훈이는 나를 무시하는 걸까?"', thought: 'negative', next: 'action-angry-negative' },
                    { text: '"내 물건을 함부로 만지면 안 되는데!"', thought: 'neutral', next: 'action-angry-neutral' },
                    { text: '"지훈이도 색연필이 필요했나 보다."', thought: 'positive', next: 'action-angry-positive' }
                ]
            },
            {
                id: 'thought-sad',
                content: `
                    <div class="story-scene">
                        <h3>속상했어요 😢</h3>
                        <p>민수는 속상했어요. 이런 상황에서 민수는 어떤 생각을 했을까요?</p>
                    </div>
                `,
                choices: [
                    { text: '"지훈이는 내 마음을 전혀 이해 못해."', thought: 'negative', next: 'action-sad-negative' },
                    { text: '"물어보고 써줬으면 좋았을 텐데..."', thought: 'neutral', next: 'action-sad-neutral' },
                    { text: '"지훈이가 급해서 그랬나 보다."', thought: 'positive', next: 'action-sad-positive' }
                ]
            },
            {
                id: 'thought-surprised',
                content: `
                    <div class="story-scene">
                        <h3>당황스러웠어요 😲</h3>
                        <p>민수는 당황스러웠어요. 이런 상황에서 민수는 어떤 생각을 했을까요?</p>
                    </div>
                `,
                choices: [
                    { text: '"지훈이는 항상 이럴 거야."', thought: 'negative', next: 'action-surprised-negative' },
                    { text: '"왜 허락도 없이 쓰지?"', thought: 'neutral', next: 'action-surprised-neutral' },
                    { text: '"한 번쯤은 실수할 수도 있지."', thought: 'positive', next: 'action-surprised-positive' }
                ]
            },
            {
                id: 'action-angry-negative',
                content: `
                    <div class="story-scene">
                        <h3>어떻게 행동할까요?</h3>
                        <p>민수는 화가 나서 "지훈이는 나를 무시하는 걸까?" 라고 생각했어요.</p>
                        <p>이런 상황에서 민수는 어떻게 행동하면 좋을까요?</p>
                    </div>
                `,
                choices: [
                    { text: '큰 소리로 "내 물건 왜 마음대로 만져?" 라고 소리친다.', action: 'negative', next: 'result-negative' },
                    { text: '"다음부터는 미리 물어봐 줄래?" 라고 차분히 말한다.', action: 'positive', next: 'result-positive' },
                    { text: '아무 말도 하지 않고 지훈이의 물건을 가져다 쓴다.', action: 'neutral', next: 'result-neutral' }
                ]
            },
            // Other action scene combinations would be defined here with similar structure
            // For brevity, I'll include just the first one and the result scenes
            
            {
                id: 'result-negative',
                content: `
                    <div class="story-scene result-scene">
                        <h3>결과</h3>
                        <p>민수가 큰 소리로 화를 내자, 지훈이는 놀라서 당황했어요. 교실의 다른 친구들도 둘을 쳐다보았고, 분위기가 어색해졌어요.</p>
                        <p>지훈이는 "미안, 급해서 그랬어..." 라고 작은 목소리로 말했지만, 둘 사이에 약간의 거리감이 생겼어요.</p>
                        <div class="ai-analysis">
                            <h4>마음이의 생각</h4>
                            <p>화가 날 때는 감정이 행동을 지배하기 쉬워. 하지만 감정을 그대로 표현하면 관계가 나빠질 수 있어.</p>
                            <p>화가 나더라도 차분하게 자신의 마음을 표현하는 것이 좋은 방법이야. "나는 ~할 때 ~라고 느껴" 라는 방식으로 말하면 상대방이 더 잘 이해할 수 있어!</p>
                            <p>혹시 "하나 보고 열을 아는 생각" 함정에 빠진 건 아닐까? 한 가지 행동으로 "지훈이가 나를 무시한다"라고 단정 짓는 것은 섣부른 판단일 수 있어.</p>
                        </div>
                    </div>
                `,
                choices: [
                    { text: '다시 시작하기', next: 'start' },
                    { text: '다른 이야기 선택하기', next: 'exit' }
                ]
            },
            {
                id: 'result-neutral',
                content: `
                    <div class="story-scene result-scene">
                        <h3>결과</h3>
                        <p>민수는 아무 말도 하지 않고 지훈이의 물건을 가져다 썼어요. 지훈이는 민수가 자기 물건을 쓰는 것을 보고 의아해했어요.</p>
                        <p>"민수야, 왜 내 물건을 쓰는 거야?" 라고 지훈이가 물었고, 민수는 "너도 내 것 썼잖아." 라고 대답했어요. 둘 사이에 약간의 오해가 생겼어요.</p>
                        <div class="ai-analysis">
                            <h4>마음이의 생각</h4>
                            <p>다른 사람의 행동을 똑같이 따라 하는 것은 문제를 해결하는 좋은 방법이 아닐 수 있어.</p>
                            <p>자신의 감정과 생각을 솔직하게 표현하는 것이 오해를 줄이는 첫 번째 단계야. "나는 내 물건을 허락 없이 쓰면 속상해"라고 말하는 것이 더 효과적일 수 있어.</p>
                            <p>혹시 "너 때문이야 생각" 함정에 빠진 건 아닐까? 상대방의 행동에 똑같이 대응하기보다는 문제를 대화로 해결하는 방법을 찾아보자!</p>
                        </div>
                    </div>
                `,
                choices: [
                    { text: '다시 시작하기', next: 'start' },
                    { text: '다른 이야기 선택하기', next: 'exit' }
                ]
            },
            {
                id: 'result-positive',
                content: `
                    <div class="story-scene result-scene">
                        <h3>결과</h3>
                        <p>민수는 차분하게 "다음부터는 미리 물어봐 줄래?" 라고 지훈이에게 말했어요.</p>
                        <p>지훈이는 미안한 표정을 지으며 "미안해, 다음부터는 꼭 물어볼게!" 라고 답했어요. 두 사람은 서로의 마음을 이해하게 되었고, 관계가 더 좋아졌어요.</p>
                        <div class="ai-analysis">
                            <h4>마음이의 생각</h4>
                            <p>정말 훌륭해! 화가 나는 상황에서도 차분하게 자신의 마음을 표현했네.</p>
                            <p>감정을 인식하고, 생각을 정리한 후, 적절한 방법으로 표현하는 것은 건강한 의사소통의 기본이야.</p>
                            <p>이렇게 자신의 감정을 조절하고 상대방을 존중하는 방식으로 소통하면 관계가 더 단단해질 수 있어!</p>
                        </div>
                    </div>
                `,
                choices: [
                    { text: '다시 시작하기', next: 'start' },
                    { text: '다른 이야기 선택하기', next: 'exit' }
                ]
            },
            {
                id: 'exit',
                content: `
                    <div class="story-scene">
                        <h3>이야기 선택하기</h3>
                        <p>다른 이야기를 선택해볼까요?</p>
                    </div>
                `,
                choices: []
            }
        ]
    },
    'story-2': {
        title: '시험 결과',
        description: '시험을 생각보다 못 봤을 때...',
        scenes: [
            {
                id: 'start',
                content: `
                    <div class="story-scene">
                        <h3>시험 결과</h3>
                        <p>오늘은 수학 시험 결과가 나오는 날이에요. 서연이는 이번 시험을 위해 열심히 공부했어요.</p>
                        <p>하지만 시험지를 받아보니 생각보다 점수가 낮았어요. 서연이는 실망했어요.</p>
                        <p><strong>이때 서연이의 마음은 어땠을까?</strong></p>
                    </div>
                `,
                choices: [
                    { text: '계속하기', next: 'emotion-choice' }
                ]
            },
            {
                id: 'emotion-choice',
                content: `
                    <div class="story-scene">
                        <h3>어떤 감정이 들었을까요?</h3>
                        <p>시험 결과를 보고 서연이는 어떤 감정을 느꼈을까요?</p>
                    </div>
                `,
                choices: [
                    { text: '실망스러움 😔', next: 'thought-disappointed', emotion: 'disappointed' },
                    { text: '부끄러움 😳', next: 'thought-ashamed', emotion: 'ashamed' },
                    { text: '화남 😡', next: 'thought-angry', emotion: 'angry' }
                ]
            }
            // Additional scenes would be defined here similar to story-1
            // For brevity, I've included just the beginning structure
        ]
    },
    'story-3': {
        title: '선생님의 칭찬',
        description: '칭찬을 받았는데 어색할 때...',
        scenes: [
            {
                id: 'start',
                content: `
                    <div class="story-scene">
                        <h3>선생님의 칭찬</h3>
                        <p>지원이는 미술 시간에 열심히 그림을 그렸어요. 선생님이 교실을 돌아다니며 학생들의 그림을 보고 계셨어요.</p>
                        <p>선생님이 지원이의 그림을 보시더니 "와, 지원이가 정말 창의적인 그림을 그렸구나! 모두 지원이의 그림을 한번 보세요." 라고 크게 칭찬하셨어요.</p>
                        <p>갑작스러운 칭찬에 지원이는 어색함을 느꼈어요.</p>
                        <p><strong>이때 지원이의 마음은 어땠을까?</strong></p>
                    </div>
                `,
                choices: [
                    { text: '계속하기', next: 'emotion-choice' }
                ]
            },
            {
                id: 'emotion-choice',
                content: `
                    <div class="story-scene">
                        <h3>어떤 감정이 들었을까요?</h3>
                        <p>선생님의 칭찬을 듣고 지원이는 어떤 감정을 느꼈을까요?</p>
                    </div>
                `,
                choices: [
                    { text: '부끄러움 😳', next: 'thought-embarrassed', emotion: 'embarrassed' },
                    { text: '기쁨 😊', next: 'thought-happy', emotion: 'happy' },
                    { text: '불안함 😟', next: 'thought-anxious', emotion: 'anxious' }
                ]
            }
            // Additional scenes would be defined here similar to story-1
            // For brevity, I've included just the beginning structure
        ]
    }
};

// Current story and scene state
let currentStory = null;
let currentScene = null;

// Initialize story functionality
document.addEventListener('DOMContentLoaded', () => {
    // Setup story cards click events
    setupStoryCards();
});

// Setup story cards click events
function setupStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('click', () => {
            const storyId = card.id;
            startStory(storyId);
        });
    });
}

// Start a story
function startStory(storyId) {
    // Get story data
    currentStory = stories[storyId];
    
    if (currentStory) {
        // Show story content
        const storyContent = document.getElementById('story-content');
        
        if (storyContent) {
            // Start with the first scene
            showScene('start');
            
            // Show AI character message
            window.app.showAIMessage(`이야기가 시작됐어! ${currentStory.title} 이야기에서 생각, 감정, 행동이 어떻게 연결되는지 살펴보자!`);
        }
    }
}

// Show a scene
function showScene(sceneId) {
    if (currentStory) {
        // Find the scene
        const scene = currentStory.scenes.find(s => s.id === sceneId);
        
        if (scene) {
            currentScene = scene;
            
            // Get story content element
            const storyContent = document.getElementById('story-content');
            
            if (storyContent) {
                // Show scene content
                storyContent.innerHTML = scene.content;
                
                // Add choice buttons
                const choicesDiv = document.createElement('div');
                choicesDiv.classList.add('story-choices');
                
                scene.choices.forEach(choice => {
                    const button = document.createElement('button');
                    button.textContent = choice.text;
                    button.classList.add('story-choice-btn');
                    
                    button.addEventListener('click', () => {
                        // If the choice is to exit, return to story selection
                        if (choice.next === 'exit') {
                            const storyContent = document.getElementById('story-content');
                            storyContent.innerHTML = '<p>이야기를 선택해주세요!</p>';
                            currentStory = null;
                            currentScene = null;
                            return;
                        }
                        
                        // Handle emotion, thought, or action selection
                        if (choice.emotion) {
                            saveStoryChoice('emotion', choice.emotion);
                        }
                        
                        if (choice.thought) {
                            saveStoryChoice('thought', choice.thought);
                            
                            // Show AI feedback on thought patterns
                            if (choice.thought === 'negative') {
                                window.app.showAIMessage("음... 그런 생각을 하면 기분이 더 안 좋아질 수 있어. 다른 관점에서도 생각해 볼까?");
                            } else if (choice.thought === 'positive') {
                                window.app.showAIMessage("멋진 생각이야! 긍정적인 관점에서 상황을 바라보니 해결책도 보이지?");
                            }
                        }
                        
                        if (choice.action) {
                            saveStoryChoice('action', choice.action);
                        }
                        
                        // Go to next scene
                        showScene(choice.next);
                    });
                    
                    choicesDiv.appendChild(button);
                });
                
                storyContent.appendChild(choicesDiv);
                
                // If this is a result scene, update progress and badges
                if (scene.id.startsWith('result')) {
                    updateStoryProgress(scene.id);
                }
            }
        }
    }
}

// Save story choice to track user's path
function saveStoryChoice(type, value) {
    // For a complete app, you might want to save these choices
    // For this prototype, we'll just log them
    console.log(`Story choice: ${type} = ${value}`);
}

// Update story progress
function updateStoryProgress(resultId) {
    // For a complete app, you would update user's progress
    // For this prototype, we'll just update badges if it's a positive result
    if (resultId === 'result-positive') {
        // Get the story explorer badge
        const badge = document.querySelector('.badge');
        
        if (badge && badge.classList.contains('locked')) {
            // Unlock the badge after a delay
            setTimeout(() => {
                badge.classList.remove('locked');
                window.app.showAIMessage("축하해! 스토리 탐험가 배지를 획득했어! 건강한 생각과 행동의 연결고리를 찾았구나!");
            }, 2000);
        }
    }
} 