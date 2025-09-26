document.addEventListener('DOMContentLoaded', () => {

    // --- Main Plant Data Object ---
    // This object contains all data needed for both the main page and detail pages.
    const plantData = [
        {
            id: 'neem',
            name: 'Neem Tree',
            image: 'https://images.unsplash.com/photo-1617196035154-6f2f84e4f6bb',
            climate: 'tropical',
            benefit: 'Natural pesticide, improves soil alkalinity.',
            details: {
                soil_benefits: 'Neem trees are excellent for soil conservation. Their deep roots help bind the soil, preventing erosion. The fallen leaves decompose to create a rich, nutrient-filled humus, improving soil fertility and structure over time.',
                uses: 'Known as the "village pharmacy" in India, nearly every part of the Neem tree has medicinal uses, including anti-bacterial, anti-fungal, and anti-inflammatory properties. Its oil is a key ingredient in organic pesticides and cosmetics.',
                growth: 'Thrives in tropical and semi-tropical climates with plenty of sunlight. It is highly drought-resistant once established and can grow in a wide range of poor, shallow, or even saline soils.',
                trivia: 'A single Neem tree can live for over 200 years and its shade can lower the ambient temperature by up to 10 degrees Celsius.'
            }
        },
        {
            id: 'mango',
            name: 'Mango Tree',
            image: 'https://images.unsplash.com/photo-1597848212624-a19eb35c1c73',
            climate: 'tropical',
            benefit: 'Provides dense shade, preventing soil from drying out.',
            details: {
                soil_benefits: 'The Mango tree\'s extensive root system helps to stabilize soil and prevent erosion. Its large canopy provides dense shade, which reduces soil temperature and moisture loss, creating a favorable microclimate for other undergrowth.',
                uses: 'Beyond its world-famous fruit, Mango wood is used for furniture and construction. In traditional medicine, its leaves, bark, and kernels are used to treat various ailments. The leaves are also used in religious ceremonies in India.',
                growth: 'Requires a frost-free tropical or subtropical climate. It prefers deep, well-drained soil and needs full sun to produce a good fruit yield. Watering should be regular during growth but reduced before flowering.',
                trivia: 'The Mango is the national fruit of India, Pakistan, and the Philippines, and the national tree of Bangladesh.'
            }
        },
        {
            id: 'bamboo',
            name: 'Bamboo',
            image: 'https://images.unsplash.com/photo-1563720222786-7f6f76d9d7cf',
            climate: 'tropical',
            benefit: 'Excellent for preventing soil erosion with its dense root system.',
            details: {
                soil_benefits: 'Bamboo is a champion of soil protection. Its intricate network of roots (rhizomes) creates a dense mat that holds topsoil in place, making it extremely effective for erosion control on slopes and riverbanks. It also improves soil drainage.',
                uses: 'One of the most versatile plants on Earth. Used for construction (scaffolding, bridges), culinary purposes (bamboo shoots), textiles (bamboo fabric), and paper production. It is a highly sustainable and fast-growing resource.',
                growth: 'Most bamboo species thrive in tropical and temperate climates with moist soil and partial shade to full sun. It is one of the fastest-growing plants in the world.',
                trivia: 'Some species of bamboo can grow up to 91 cm (36 inches) within a 24-hour period!'
            }
        },
        {
            id: 'oak',
            name: 'Oak Tree',
            image: 'https://images.unsplash.com/photo-1596139947990-9d750c66336e?q=80&w=400',
            climate: 'temperate',
            benefit: 'Supports biodiversity and its leaf litter enriches topsoil.',
            details: {
                soil_benefits: 'Oak trees have a profound positive impact on soil. Their deep taproots aerate the soil, while the decomposition of their tannin-rich leaves creates a valuable acidic humus layer, which benefits many woodland plants.',
                uses: 'Oak wood is highly prized for its strength and durability, used extensively in furniture making, flooring, and wine barrels. Acorns, the fruit of the oak, are an important food source for wildlife.',
                growth: 'Prefers full sun and deep, well-drained soil. They are slow-growing but incredibly long-lived, hardy trees that are staples of temperate forests worldwide.',
                trivia: 'An Oak tree can support over 500 different species of insects, birds, and other wildlife, making it a keystone species in its ecosystem.'
            }
        }
    ];

    // --- Interactive Plant Guide (Main Page) ---
    const climateSelect = document.getElementById('climate-select');
    const plantCardsContainer = document.getElementById('plant-cards-container');

    function displayPlantCards(filter) {
        plantCardsContainer.innerHTML = '';
        const filteredPlants = (filter === 'all') ? plantData : plantData.filter(plant => plant.climate === filter);
        
        filteredPlants.forEach(plant => {
            const cardHTML = `
                <a href="plant-detail.html?id=${plant.id}" class="plant-card-link">
                    <div class="plant-card">
                        <img src="${plant.image}" alt="${plant.name}">
                        <div class="plant-card-content">
                            <h3>${plant.name}</h3>
                            <p>${plant.benefit}</p>
                            <p class="benefit">Climate: ${plant.climate.charAt(0).toUpperCase() + plant.climate.slice(1)}</p>
                        </div>
                    </div>
                </a>
            `;
            plantCardsContainer.innerHTML += cardHTML;
        });
    }

    climateSelect.addEventListener('change', (e) => displayPlantCards(e.target.value));
    displayPlantCards('all'); // Initial display

    // --- Theme & Sound Toggles ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
            localStorage.setItem('theme', theme);
        });
    }
    const soundToggle = document.getElementById('sound-toggle');
    const natureSound = document.getElementById('nature-sound');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            if (natureSound.paused) {
                natureSound.play();
                soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                natureSound.pause();
                soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

    // --- All other sections' logic remains here for index.html ---
    // (Virtual Plantation, Event, Quiz, Pledge Wall)

    // --- Virtual Plantation ---
    const forestGrid = document.getElementById('forest-grid');
    const treeCounter = document.getElementById('tree-counter');
    if (forestGrid) {
        const totalPatches = 12 * 8;
        let plantedTrees = parseInt(localStorage.getItem('treeCount')) || 0;
        treeCounter.textContent = plantedTrees;
        
        for (let i = 0; i < totalPatches; i++) {
            const patch = document.createElement('div');
            patch.classList.add('soil-patch');
            forestGrid.appendChild(patch);
        }
        
        forestGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('soil-patch') && !e.target.classList.contains('planted')) {
                e.target.classList.add('planted');
                plantedTrees++;
                treeCounter.textContent = plantedTrees;
                localStorage.setItem('treeCount', plantedTrees);
            }
        });
    }

    // --- Community Event ---
    const countdownTimer = document.getElementById('countdown-timer');
    if (countdownTimer) {
        const eventDate = new Date("2025-10-05T09:00:00").getTime();
        const communityGoal = 500;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const eventPreContent = document.getElementById('event-pre-content');
        const eventPostContent = document.getElementById('event-post-content');
        
        const registrationForm = document.getElementById('event-registration-form');
        const participantList = document.getElementById('participant-list');
        const progressBar = document.getElementById('community-progress-bar');
        const progressText = document.getElementById('community-progress-text');

        let eventParticipants = JSON.parse(localStorage.getItem('eventParticipants')) || [];

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;
            if (distance < 0) {
                clearInterval(countdownInterval);
                eventPreContent.classList.add('hide');
                eventPostContent.classList.remove('hide');
                return;
            }
            daysEl.innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            hoursEl.innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            minutesEl.innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            secondsEl.innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
        };
        
        const displayParticipants = () => {
            participantList.innerHTML = '';
            let totalPledged = eventParticipants.reduce((sum, p) => sum + p.trees, 0);
            eventParticipants.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = `${p.name} <span>${p.trees} trees</span>`;
                participantList.appendChild(li);
            });
            const progressPercent = Math.min((totalPledged / communityGoal) * 100, 100);
            progressBar.style.width = `${progressPercent}%`;
            progressText.innerText = `${totalPledged} / ${communityGoal} trees pledged`;
        };

        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const participantName = document.getElementById('participant-name').value.trim();
            const treesPledged = parseInt(document.getElementById('trees-pledged').value);
            if (participantName && treesPledged > 0) {
                eventParticipants.push({ name: participantName, trees: treesPledged });
                localStorage.setItem('eventParticipants', JSON.stringify(eventParticipants));
                displayParticipants();
                registrationForm.reset();
            }
        });

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
        displayParticipants();

        // Reminder Banner
        const reminderBanner = document.getElementById('event-reminder-banner');
        const closeReminderBtn = document.getElementById('close-reminder-btn');
        const reminderClosed = localStorage.getItem('reminderClosed');
        const now = new Date().getTime();
        const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
        if (eventDate - now > 0 && eventDate - now < sevenDaysInMillis && reminderClosed !== 'true') {
            reminderBanner.classList.remove('hide');
        }
        closeReminderBtn.addEventListener('click', () => {
            reminderBanner.classList.add('hide');
            localStorage.setItem('reminderClosed', 'true');
        });
    }

    // --- Quiz ---
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const questionText = document.getElementById('question-text');
        const answerButtons = document.getElementById('answer-buttons');
        const quizResults = document.getElementById('quiz-results');
        const resultsTitle = document.getElementById('results-title');
        const resultsScore = document.getElementById('results-score');
        const restartQuizBtn = document.getElementById('restart-quiz-btn');
        let currentQuestionIndex, score;
        
        const quizQuestions = [
            { question: "Which of these is a primary cause of soil erosion?", answers: [{ text: 'Planting trees', correct: false }, { text: 'Deforestation', correct: true }] },
            { question: "What is the term for plowing along the contours of land?", answers: [{ text: 'Contour Farming', correct: true }, { text: 'Mulching', correct: false }] },
            { question: "Which type of soil is generally considered best for gardening?", answers: [{ text: 'Sandy', correct: false }, { text: 'Loamy', correct: true }] }
        ];

        const startQuiz = () => {
            currentQuestionIndex = 0;
            score = 0;
            quizResults.classList.add('hide');
            document.getElementById('question-container').classList.remove('hide');
            showQuestion();
        };

        const showQuestion = () => {
            answerButtons.innerHTML = '';
            const currentQuestion = quizQuestions[currentQuestionIndex];
            questionText.innerText = currentQuestion.question;
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                if (answer.correct) button.dataset.correct = true;
                button.addEventListener('click', selectAnswer);
                answerButtons.appendChild(button);
            });
        };

        const selectAnswer = (e) => {
            if (e.target.dataset.correct) score++;
            if (quizQuestions.length > currentQuestionIndex + 1) {
                currentQuestionIndex++;
                showQuestion();
            } else {
                showResults();
            }
        };

        const showResults = () => {
            document.getElementById('question-container').classList.add('hide');
            quizResults.classList.remove('hide');
            resultsScore.innerText = `You scored ${score} out of ${quizQuestions.length}!`;
            resultsTitle.innerText = score >= (quizQuestions.length / 2) ? "Congratulations, You’re a Soil Saver!" : "Keep learning to protect our soil!";
        };
        
        restartQuizBtn.addEventListener('click', startQuiz);
        startQuiz();
    }
    
    // --- Pledge Wall ---
    const pledgeForm = document.getElementById('pledge-form');
    if (pledgeForm) {
        const pledgeList = document.getElementById('pledge-list');
        let pledges = JSON.parse(localStorage.getItem('pledges')) || [];
        
        const displayPledges = () => {
            pledgeList.innerHTML = '';
            pledges.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${p.name} pledges:</strong> "${p.message}"`;
                pledgeList.prepend(li);
            });
        };
        
        pledgeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPledge = { name: document.getElementById('pledge-name').value.trim(), message: document.getElementById('pledge-message').value.trim() };
            if (newPledge.name && newPledge.message) {
                pledges.push(newPledge);
                localStorage.setItem('pledges', JSON.stringify(pledges));
                displayPledges();
                pledgeForm.reset();
            }
        });
        displayPledges();
    }
});
