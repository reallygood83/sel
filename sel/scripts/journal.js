// Journal.js - Journal functionality for 마음 탐험대

document.addEventListener('DOMContentLoaded', () => {
    // Setup emotion selector
    setupEmotionSelector();
    
    // Setup save journal button
    setupSaveJournal();
});

// Setup emotion selector
function setupEmotionSelector() {
    const emotions = document.querySelectorAll('.emotion');
    
    emotions.forEach(emotion => {
        emotion.addEventListener('click', () => {
            // Remove selected class from all emotions
            emotions.forEach(e => e.classList.remove('selected'));
            
            // Add selected class to clicked emotion
            emotion.classList.add('selected');
        });
    });
}

// Setup save journal button
function setupSaveJournal() {
    const saveButton = document.getElementById('save-journal');
    
    if (saveButton) {
        saveButton.addEventListener('click', saveJournalEntry);
    }
}

// Save journal entry
function saveJournalEntry() {
    // Get form values
    const date = document.getElementById('journal-date').value;
    const situation = document.getElementById('journal-situation').value;
    const thought = document.getElementById('journal-thought').value;
    const action = document.getElementById('journal-action').value;
    
    // Get selected emotion
    const selectedEmotion = document.querySelector('.emotion.selected');
    const emotion = selectedEmotion ? selectedEmotion.textContent : '😐';
    
    // Validate form
    if (!date || !situation || !thought || !action) {
        alert('모든 항목을 입력해주세요!');
        return;
    }
    
    // Create journal entry
    const journalEntry = {
        date,
        situation,
        thought,
        action,
        emotion,
        timestamp: new Date().getTime(),
        isHealthyThought: false, // Default value, will be updated by AI analysis
        aiFeedback: ''
    };
    
    // Analyze thought patterns using simplified AI logic
    const aiAnalysis = analyzeThought(thought);
    journalEntry.aiFeedback = aiAnalysis.feedback;
    journalEntry.isHealthyThought = aiAnalysis.isHealthy;
    
    // Show AI feedback
    showAIFeedback(aiAnalysis.feedback);
    
    // Save journal entry
    saveJournalEntryToStorage(journalEntry);
    
    // Update UI
    resetJournalForm();
    window.app.loadJournalEntries();
    window.app.updateThoughtGarden();
    
    // Show AI character message
    window.app.showAIMessage('일기를 저장했어! 생각을 잘 기록하는 것은 감정을 이해하는 첫 걸음이야!');
}

// Analyze thought patterns (simplified AI logic for prototype)
function analyzeThought(thought) {
    // Convert to lowercase and normalize Korean
    const normalizedThought = thought.toLowerCase();
    
    // Define thought patterns to detect (simplified)
    const thoughtPatterns = [
        {
            name: '쌍안경 생각',
            keywords: ['최악', '끔찍', '다 망', '절대로', '아무것도', '항상', '결코', '절대'],
            feedback: '혹시 "쌍안경 생각" 함정에 빠진 건 아닐까? 좋은 점은 작게 보고 나쁜 점은 크게 보고 있는 것 같아. 균형 있게 생각해보면 어떨까?',
            isHealthy: false
        },
        {
            name: '흑백 생각',
            keywords: ['완벽', '실패', '성공', '무조건', '전부', '아예', '무조건'],
            feedback: '"흑백 생각" 함정을 발견했어! 세상은 흑백만 있는 게 아니라 다양한 색깔이 있어. 중간 생각도 있다는 걸 기억해!',
            isHealthy: false
        },
        {
            name: '먹구름 생각',
            keywords: ['안 좋은 것만', '나쁜 것만', '우울', '슬프', '힘들', '괴로', '못해'],
            feedback: '"먹구름 생각" 함정을 발견했어! 구름 뒤에는 항상 해가 있다는 걸 기억해. 좋은 면도 찾아보자!',
            isHealthy: false
        },
        {
            name: '점쟁이 생각',
            keywords: ['어차피', '~할 거', '항상 그래', '늘 그래', '뻔해', '안 될 거', '못 할 거'],
            feedback: '"점쟁이 생각" 함정에 빠진 것 같아! 미래는 아무도 알 수 없어. 다양한 가능성을 열어두는 게 어떨까?',
            isHealthy: false
        },
        {
            name: '다 내 탓 생각',
            keywords: ['내 잘못', '다 내 탓', '내가 책임', '내 실수', '내가 못해서'],
            feedback: '"다 내 탓 생각" 함정을 발견했어! 모든 일이 너의 잘못이 아니야. 상황에는 여러 요인이 있다는 걸 기억해!',
            isHealthy: false
        },
        {
            name: '너 때문이야 생각',
            keywords: ['네 잘못', '너 때문', '쟤가', '걔가', '남 탓'],
            feedback: '"너 때문이야 생각" 함정에 빠진 것 같아! 다른 사람만 탓하기보다는 내가 할 수 있는 부분을 생각해보면 어떨까?',
            isHealthy: false
        },
        {
            name: '나 홀로 생각',
            keywords: ['나만', '아무도 없', '혼자', '이해 못', '아무도 모'],
            feedback: '"나 홀로 생각" 함정을 발견했어! 너는 혼자가 아니야. 주변에 너를 도와줄 사람들이 있다는 걸 기억해!',
            isHealthy: false
        },
        {
            name: '하나 보고 열을 아는 생각',
            keywords: ['항상 그래', '언제나 그래', '또 그래', '맨날', '매번'],
            feedback: '"하나 보고 열을 아는 생각" 함정을 발견했어! 한 가지 일로 모든 것을 판단하면 놓치는 부분이 많아. 더 넓게 생각해보자!',
            isHealthy: false
        },
        {
            name: '건강한 생각',
            keywords: ['노력', '도전', '성장', '배움', '발전', '가능성', '균형', '이해', '공감', '긍정', '희망', '감사', '기쁨'],
            feedback: '멋진 건강한 생각이야! 이런 생각은 네 마음의 정원에 예쁜 꽃을 피울 거야. 계속 이런 생각을 키워나가자!',
            isHealthy: true
        }
    ];
    
    // Check for thought patterns
    for (const pattern of thoughtPatterns) {
        for (const keyword of pattern.keywords) {
            if (normalizedThought.includes(keyword)) {
                return {
                    patternName: pattern.name,
                    feedback: pattern.feedback,
                    isHealthy: pattern.isHealthy
                };
            }
        }
    }
    
    // Default response if no patterns matched
    return {
        patternName: '일반적인 생각',
        feedback: '네 생각을 잘 기록했구나! 생각을 글로 표현하는 것은 감정을 이해하는 데 큰 도움이 돼.',
        isHealthy: true
    };
}

// Show AI feedback
function showAIFeedback(feedback) {
    const aiFeedbackElement = document.getElementById('ai-feedback');
    
    if (aiFeedbackElement) {
        aiFeedbackElement.innerHTML = `<p>${feedback}</p>`;
        aiFeedbackElement.style.display = 'block';
    }
}

// Save journal entry to localStorage
function saveJournalEntryToStorage(entry) {
    // Get existing entries
    const journalEntries = window.app.getUserData('journalEntries') || [];
    
    // Add new entry
    journalEntries.push(entry);
    
    // Sort by timestamp (newest first)
    journalEntries.sort((a, b) => b.timestamp - a.timestamp);
    
    // Save to localStorage
    window.app.saveUserData('journalEntries', journalEntries);
}

// Reset journal form
function resetJournalForm() {
    document.getElementById('journal-situation').value = '';
    document.getElementById('journal-thought').value = '';
    document.getElementById('journal-action').value = '';
    
    // Reset emotion selection
    document.querySelectorAll('.emotion').forEach(e => e.classList.remove('selected'));
    
    // Set date to today
    document.getElementById('journal-date').value = getCurrentDate();
}

// Get current date (YYYY-MM-DD format)
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
} 