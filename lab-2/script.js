document.getElementById('fortune-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const mood = document.getElementById('mood').value;
    const color = document.getElementById('color').value;
    const breakfast = document.getElementById('breakfast').value;
    const wakeup = document.getElementById('lateWake').value;

    // Simulate fortune calculation based on selections
    const fortunePercentage = calculateFortune(mood, color, breakfast, wakeup);

    // Display the result
    displayFortune(fortunePercentage);
});

// Function to simulate fortune calculation
function calculateFortune(mood, color, breakfast, wakeup) {
    // Simple mock calculation based on input values
    let score = 0;

    // Mood weighting
    if (mood === 'happy') score += 30;
    if (mood === 'excited') score += 40;
    if (mood === 'neutral') score += 20;
    if (mood === 'sad') score += 10;

    // Color weighting
    if (color === 'red') score += 20;
    if (color === 'blue') score += 15;
    if (color === 'green') score += 25;
    if (color === 'black') score += 10;

    // Breakfast weighting
    if (breakfast === 'eggs') score += 20;
    if (breakfast === 'cereal') score += 15;
    if (breakfast === 'toast') score += 10;
    if (breakfast === 'nothing') score += 5;

    // Wakeup time weighting
    wakeup ? score += 5 : score += 20;

    // Normalize to a percentage
    return Math.min(score, 100);
}

// Function to display the fortune
function displayFortune(percentage) {
    const fortuneText = getFortuneText(percentage);
    document.getElementById('fortune-text').textContent = `Your fortune is ${percentage}%. ${fortuneText}`;
    document.getElementById('result').classList.remove('hidden');
}

// Function to get fortune text based on percentage
function getFortuneText(percentage) {
    if (percentage >= 90) return "You're going to have an amazing day!";
    if (percentage >= 80) return "Things are looking great for you!";
    if (percentage >= 70) return "You will have a good day!";
    if (percentage >= 60) return "Your day will be quite positive.";
    if (percentage >= 50) return "An average day ahead.";
    if (percentage >= 40) return "There might be some challenges.";
    if (percentage >= 30) return "Stay cautious today.";
    if (percentage >= 20) return "It could be a tough day.";
    if (percentage >= 10) return "Prepare for some difficulties.";
    return "Today might be very challenging, stay strong!";
}
