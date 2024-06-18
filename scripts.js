let startTime;
let interval;
let elapsedTime = 0;
let distractionIntervals = [];
let distractionStartTime;

// For if 30.0 is perfectly achieved
let randomWinningStatements = ["Amazing!", "You have achieved perfection.", "You win!", "Extremely low odds, and you managed to get it!"];

let randomLosingStatements = ["Close, but not quite!", "Might as well try again.", "Did you even bother to try?", "Good effort!"];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.querySelectorAll("#time-display, #wait-time-display").forEach(display => {
            display.innerText = (elapsedTime / 1000).toFixed(2);
        });
    }, 10);
}

function startDistractionTimer() {
    distractionStartTime = Date.now();
    setInterval(() => {
        const distractionElapsedTime = (Date.now() - distractionStartTime) / 1000;
        document.getElementById('incorrect-timer').innerText = distractionElapsedTime.toFixed(2);
    }, 10);
}

function startDistractions() {
    const distractionsContainer = document.getElementById('distractions');

    // Incorrect timer with a cheeky heading
    setTimeout(() => {
        const incorrectTimerHeading = document.createElement('h3');
        incorrectTimerHeading.innerText = "Is this time right? 🤔";
        distractionsContainer.appendChild(incorrectTimerHeading);

        const incorrectTimer = document.createElement('p');
        incorrectTimer.id = 'incorrect-timer';
        incorrectTimer.innerText = "0.00";
        distractionsContainer.appendChild(incorrectTimer);

        setTimeout(() => {
            incorrectTimer.style.opacity = 1;
            incorrectTimerHeading.style.opacity = 1;
        }, 100);

        startDistractionTimer();
    }, 5000);  // Show after 5 seconds

    // Start showing pop-up links
    distractionIntervals.push(setInterval(() => {
        const popupLink = document.createElement('a');
        popupLink.href = 'https://example.com';
        popupLink.target = '_blank';
        popupLink.innerText = 'Click me!';
        popupLink.className = 'popup-link';
        popupLink.style.top = `${Math.random() * window.innerHeight}px`;
        popupLink.style.left = `${Math.random() * window.innerWidth}px`;
        distractionsContainer.appendChild(popupLink);

        setTimeout(() => {
            popupLink.style.opacity = 1;
        }, 100);

        // Fade out and remove link after 5 seconds
        setTimeout(() => {
            popupLink.style.opacity = 0;
            setTimeout(() => {
                popupLink.remove();
            }, 1000);
        }, 5000);
    }, 5000));  // Show new link every 5 seconds

    // Start showing sliding images
    distractionIntervals.push(setInterval(() => {
        const slidingImage = document.createElement('img');
        slidingImage.src = 'https://via.placeholder.com/100';
        slidingImage.className = 'sliding-image';
        slidingImage.style.top = `${Math.random() * window.innerHeight}px`;
        slidingImage.style.left = '-100px';
        distractionsContainer.appendChild(slidingImage);

        setTimeout(() => {
            slidingImage.style.opacity = 1;
            slidingImage.style.transform = `translateX(${window.innerWidth + 100}px)`;
        }, 100);

        // Remove image after it slides across the screen
        setTimeout(() => {
            slidingImage.remove();
        }, 10000);  // 10 seconds for full slide duration
    }, 10000));  // Show new image every 10 seconds

    // Start moving text
    distractionIntervals.push(setInterval(() => {
        const movingText = document.createElement('div');
        movingText.className = 'moving-text';
        movingText.innerText = 'Look at me!';
        movingText.style.top = `${Math.random() * window.innerHeight}px`;
        movingText.style.left = `${Math.random() * window.innerWidth}px`;
        distractionsContainer.appendChild(movingText);

        setTimeout(() => {
            movingText.style.transform = `translateX(${Math.random() * 200 - 100}px) translateY(${Math.random() * 200 - 100}px)`;
        }, 100);

        // Remove moving text after 5 seconds
        setTimeout(() => {
            movingText.remove();
        }, 5000);
    }, 7000));  // Show new moving text every 7 seconds
}

function stopTimer() {
    clearInterval(interval);
    distractionIntervals.forEach(clearInterval);

    let measuredTime = (elapsedTime / 1000).toFixed(2);
    let marginOfError = Math.abs(measuredTime - 30).toFixed(2);
    let percentageError = ((marginOfError / 30) * 100).toFixed(2);

    // Display results
    if ((elapsedTime / 1000).toFixed(2) == 30.00) {
        document.getElementById('statement-display').innerText = getRandomWinningStatement();
    } else if ((elapsedTime / 1000).toFixed(2) > 30.00 || (elapsedTime / 1000).toFixed(2) < 30.00) {
        document.getElementById('statement-display').innerText = getRandomLosingStatement();
    }
    document.getElementById("result-display").innerText = `You held the button for ${measuredTime} seconds.`;
    document.getElementById("error-display").innerText = `Margin of error: ${marginOfError}s`;
    document.getElementById("percentage-display").innerText = `Percent error: ${percentageError}%`;

    // Transition to result-page
    showPage('result-page');
}

function holdDown() {
    startTimer();
    showPage('wait-page');
    startDistractions();

    setTimeout(() => {
        document.getElementById("wait-time-display").classList.add('hidden');
    }, 2000);  // Trigger the fade out after 2 seconds
}

function release() {
    stopTimer();
}

function restart() {
    elapsedTime = 0;
    document.querySelectorAll("#time-display, #wait-time-display").forEach(display => {
        display.innerText = "0.00";
        display.classList.remove('hidden');
    });
    showPage('start-page');
    document.getElementById('distractions').innerHTML = '';  // Clear distractions
}

function getRandomWinningStatement() {
    const randomIndex = Math.floor(Math.random() * randomWinningStatements.length);
    return randomWinningStatements[randomIndex];
}

function getRandomLosingStatement() {
    const randomIndex = Math.floor(Math.random() * randomLosingStatements.length);
    return randomLosingStatements[randomIndex];
}
