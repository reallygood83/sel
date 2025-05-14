// Main.js - Core functionality for 마음 탐험대

// DOM Elements
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('main section');
const menuItems = document.querySelectorAll('.menu-item');
const aiCharacter = document.getElementById('ai-character-img');
const aiSpeechBubble = document.getElementById('ai-speech-bubble');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AI character
    initAICharacter();
    
    // Setup navigation
    setupNavigation();
    
    // Setup menu items click events
    setupMenuItems();
    
    // Load saved data
    loadUserData();
});

// Initialize AI character interactions
function initAICharacter() {
    aiCharacter.addEventListener('click', () => {
        if (aiSpeechBubble.style.display === 'block') {
            aiSpeechBubble.style.display = 'none';
        } else {
            aiSpeechBubble.style.display = 'block';
            showAIMessage(getRandomAIGreeting());
        }
    });

    // Show initial greeting after a delay
    setTimeout(() => {
        aiSpeechBubble.style.display = 'block';
        showAIMessage("안녕! 난 마음이야. 마음 탐험대에 온 걸 환영해! 무엇을 하고 싶은지 알려줘!");
        
        // Hide speech bubble after 5 seconds
        setTimeout(() => {
            aiSpeechBubble.style.display = 'none';
        }, 5000);
    }, 2000);
}

// Setup navigation between sections
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.add('hidden-section'));
            sections.forEach(section => section.classList.remove('active-section'));
            
            // Show the target section
            const targetId = link.id.replace('-nav', '-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden-section');
                targetSection.classList.add('active-section');
                
                // Show appropriate AI message based on section
                showSectionAIMessage(targetId);
            }
        });
    });
}

// Setup menu items click events
function setupMenuItems() {
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.id.replace('start-', '');
            const navLink = document.getElementById(`${targetId}-nav`);
            
            if (navLink) {
                navLink.click();
            }
        });
    });
}

// Show appropriate AI message based on current section
function showSectionAIMessage(sectionId) {
    let message = '';
    
    switch(sectionId) {
        case 'story-section':
            message = "마음 탐험가가 되어 다양한 상황에서 생각, 감정, 행동을 탐험해보자! 어떤 이야기를 선택할 거야?";
            break;
        case 'game-section':
            message = "생각 함정에 빠진 적 있니? 다양한 게임을 통해 생각 함정을 탈출하는 방법을 배워보자!";
            break;
        case 'journal-section':
            message = "마음 일기장에 오늘 있었던 일과 네 생각, 감정을 기록해보면 어떨까? 나는 네가 건강한 생각을 심을 수 있도록 도와줄게!";
            break;
        case 'profile-section':
            message = "여기서는 네가 얼마나 성장했는지 확인할 수 있어! 더 많은 활동을 하면 다양한 배지를 모을 수 있을 거야.";
            break;
        default:
            message = "궁금한 게 있으면 언제든지 물어봐!";
    }
    
    showAIMessage(message);
}

// Show AI character message
function showAIMessage(message) {
    aiSpeechBubble.innerHTML = `<p>${message}</p>`;
    aiSpeechBubble.style.display = 'block';
    
    // Hide speech bubble after 5 seconds
    setTimeout(() => {
        aiSpeechBubble.style.display = 'none';
    }, 8000);
}

// Random AI greetings
function getRandomAIGreeting() {
    const greetings = [
        "안녕! 무엇을 도와줄까?",
        "오늘 기분이 어때?",
        "새로운 활동을 해볼까?",
        "궁금한 게 있으면 물어봐!",
        "생각 함정에 빠졌다면 언제든 도와줄게!",
        "오늘도 멋진 하루 보내고 있니?"
    ];
    
    return greetings[Math.floor(Math.random() * greetings.length)];
}

// Utility function to get current date in YYYY-MM-DD format
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// Load user data from localStorage
function loadUserData() {
    // Set today's date for journal
    const journalDateInput = document.getElementById('journal-date');
    if (journalDateInput) {
        journalDateInput.value = getCurrentDate();
    }
    
    // Load journal entries
    loadJournalEntries();
    
    // Populate thought garden
    updateThoughtGarden();
}

// Save data to localStorage
function saveUserData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
}

// Get data from localStorage
function getUserData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting data:', error);
        return null;
    }
}

// Load journal entries from localStorage
function loadJournalEntries() {
    const journalEntries = getUserData('journalEntries') || [];
    const journalEntriesList = document.getElementById('journal-entries');
    
    if (journalEntriesList) {
        journalEntriesList.innerHTML = '';
        
        if (journalEntries.length === 0) {
            journalEntriesList.innerHTML = '<li>아직 일기가 없습니다. 첫 일기를 작성해보세요!</li>';
            return;
        }
        
        journalEntries.forEach((entry, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            li.innerHTML = `
                <strong>${entry.date}</strong> - 
                ${entry.emotion} ${entry.situation.substring(0, 30)}${entry.situation.length > 30 ? '...' : ''}
            `;
            
            li.addEventListener('click', () => viewJournalEntry(index));
            journalEntriesList.appendChild(li);
        });
    }
}

// View a specific journal entry
function viewJournalEntry(index) {
    const journalEntries = getUserData('journalEntries') || [];
    
    if (index >= 0 && index < journalEntries.length) {
        const entry = journalEntries[index];
        
        document.getElementById('journal-date').value = entry.date;
        document.getElementById('journal-situation').value = entry.situation;
        document.getElementById('journal-thought').value = entry.thought;
        document.getElementById('journal-action').value = entry.action;
        
        // Select the emotion
        document.querySelectorAll('.emotion').forEach(el => {
            el.classList.remove('selected');
            if (el.textContent === entry.emotion) {
                el.classList.add('selected');
            }
        });
        
        // Show AI feedback if available
        if (entry.aiFeedback) {
            document.getElementById('ai-feedback').innerHTML = `<p>${entry.aiFeedback}</p>`;
            document.getElementById('ai-feedback').style.display = 'block';
        }
    }
}

// Update thought garden visualization
function updateThoughtGarden() {
    const thoughtGarden = document.getElementById('thought-garden');
    
    if (thoughtGarden) {
        const journalEntries = getUserData('journalEntries') || [];
        const healthyThoughts = journalEntries.filter(entry => entry.isHealthyThought).length;
        
        // Simple visualization for prototype
        let gardenHTML = '';
        
        if (journalEntries.length === 0) {
            gardenHTML = '<div class="empty-garden">아직 심은 생각이 없어요. 마음 일기장에 건강한 생각을 기록해보세요!</div>';
        } else {
            gardenHTML = '<div class="garden-stats">전체 생각: ' + journalEntries.length + '개, 건강한 생각: ' + healthyThoughts + '개</div>';
            
            // Add flower visualization
            gardenHTML += '<div class="garden-flowers">';
            for (let i = 0; i < healthyThoughts; i++) {
                // Each flower is represented by an emoji at random positions
                const left = Math.floor(Math.random() * 80) + 10; // 10% to 90%
                const top = Math.floor(Math.random() * 80) + 10; // 10% to 90%
                gardenHTML += `<div class="flower" style="left: ${left}%; top: ${top}%;">🌼</div>`;
            }
            gardenHTML += '</div>';
        }
        
        thoughtGarden.innerHTML = gardenHTML;
    }
}

// Export functions for use in other modules
window.app = {
    showAIMessage,
    saveUserData,
    getUserData,
    loadJournalEntries,
    updateThoughtGarden
}; 