// Profile.js - Profile functionality for 마음 탐험대

document.addEventListener('DOMContentLoaded', () => {
    // Setup profile functionality
    setupProfilePage();
});

// Setup profile page
function setupProfilePage() {
    // Update thought garden visualization
    window.app.updateThoughtGarden();
    
    // Check and update AI message based on progress
    updateAIMessage();
}

// Update AI message based on user progress
function updateAIMessage() {
    const profileAIMessage = document.getElementById('profile-ai-message');
    const journalEntries = window.app.getUserData('journalEntries') || [];
    const unlockedBadges = document.querySelectorAll('.badge:not(.locked)').length;
    
    if (profileAIMessage) {
        let message = '';
        
        if (journalEntries.length === 0 && unlockedBadges === 1) {
            // New user
            message = "마음 탐험대에 온 것을 환영해! 아직 많은 활동을 해보지 않았지만, 앞으로의 성장이 기대돼! 마음 일기장에 생각과 감정을 기록해보면 어떨까?";
        } else if (journalEntries.length > 0 && journalEntries.length < 3) {
            // Beginning user
            message = "마음 일기장에 첫 기록을 남겼구나! 생각과 감정을 기록하는 것은 자기 이해의 첫 걸음이야. 더 많은 활동을 해보면 어떨까?";
        } else if (journalEntries.length >= 3 && unlockedBadges < 3) {
            // Intermediate user
            message = "꾸준히 기록하고 있는 모습이 멋져! 이제 생각 함정 탈출 게임에 도전해보는 건 어떨까? 다양한 생각의 함정을 발견하고 탈출하는 방법을 배울 수 있을 거야!";
        } else if (unlockedBadges >= 2) {
            // Advanced user
            message = "정말 대단해! 생각 함정을 발견하고 건강한 생각으로 바꾸는 능력이 많이 성장했어. 앞으로도 계속 마음 탐험을 이어나가자!";
        } else {
            // Default message
            message = "마음 탐험을 통해 너의 생각과 감정, 행동이 어떻게 연결되어 있는지 알아가고 있구나. 앞으로도 함께 성장해보자!";
        }
        
        profileAIMessage.innerHTML = `<p>${message}</p>`;
    }
}

// Calculate user stats
function calculateUserStats() {
    const journalEntries = window.app.getUserData('journalEntries') || [];
    const healthyThoughts = journalEntries.filter(entry => entry.isHealthyThought).length;
    const totalThoughts = journalEntries.length;
    const healthyThoughtPercentage = totalThoughts > 0 ? Math.round((healthyThoughts / totalThoughts) * 100) : 0;
    
    return {
        totalJournalEntries: totalThoughts,
        healthyThoughts,
        healthyThoughtPercentage
    };
}

// Update badges based on user progress
function updateBadges() {
    const stats = calculateUserStats();
    const badges = document.querySelectorAll('.badge');
    
    // Emotion Master Badge (unlock if user has at least 5 journal entries)
    if (stats.totalJournalEntries >= 5 && badges.length >= 2) {
        badges[1].classList.remove('locked');
    }
    
    // Thought Trap Escape Badge (unlock if user has completed at least 3 games with good scores)
    // Note: For prototype, this is handled in the game.js when user completes a game with high score
    
    // Growth Champion Badge (unlock if user has at least 10 entries with 70%+ healthy thoughts)
    if (stats.totalJournalEntries >= 10 && stats.healthyThoughtPercentage >= 70 && badges.length >= 3) {
        badges[2].classList.remove('locked');
    }
} 