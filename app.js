// Parsing the JSON data
const quizData = {
    "quiz": {
        "q1": {
            "question": "Which one is correct team name in NBA?",
            "options": ["New York Bulls", "Los Angeles Kings", "Golden State Warriros", "Huston Rocket"],
            "answer": "Huston Rocket"
        },
        "q2": {
            "question": "'Namaste' is a traditional greeting in which Asian language?",
            "options": ["Hindi", "Mandarin", "Nepalese", "Thai"],
            "answer": "Hindi"
        },
        "q3": {
            "question": "The Spree river flows through which major European capital city?",
            "options": ["Berlin", "Paris", "Rome", "London"],
            "answer": "Berlin"
        },
        "q4": {
            "question": "Which famous artist had both a 'Rose Period' and a 'Blue Period'?",
            "options": ["Pablo Picasso", "Vincent van Gogh", "Salvador Dalí", "Edgar Degas"],
            "answer": "Pablo Picasso"
        }
    }
};

// Function to generate quiz HTML
function generateQuiz(quiz) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Clear any previous content

    Object.keys(quiz).forEach(key => {
        const questionData = quiz[key];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = questionData.question;
        questionElement.appendChild(questionTitle);

        questionData.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;

            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = key;
            optionInput.value = option;

            // Check if this was the user's previous answer
            const storedAnswer = localStorage.getItem(key);
            if (storedAnswer === option) {
                optionInput.checked = true;
            }

            optionLabel.insertBefore(optionInput, optionLabel.firstChild);
            questionElement.appendChild(optionLabel);
            questionElement.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(questionElement);
    });
}

// Store the selected answers in local storage and show correct answers
function submitQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const inputs = quizContainer.querySelectorAll('input[type="radio"]:checked');

    inputs.forEach(input => {
        localStorage.setItem(input.name, input.value);
    });

    alert('Your answers are being saved!');

    // Display the correct answers
    Object.keys(quizData.quiz).forEach(key => {
        const questionData = quizData.quiz[key];
        const correctAnswerText = document.createElement('p');
        correctAnswerText.textContent = `Correct answer: ${questionData.answer}`;
        const questionElement = document.querySelector(`input[name="${key}"]`).closest('.question');
        questionElement.appendChild(correctAnswerText);
    });
}

// Clear all answers and reset the quiz
function clearAnswers() {
    Object.keys(quizData.quiz).forEach(key => {
        localStorage.removeItem(key); // Remove each stored answer from local storage
    });

    generateQuiz(quizData.quiz); // Regenerate the quiz to clear selections and correct answers
    alert('Your answers will be cleared!');
}

// Initialize the quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    generateQuiz(quizData.quiz);
});
