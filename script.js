// --- 1. EXISTING FUNCTIONS ---

// Create Floating Hearts Background
function createHearts() {
  const container = document.getElementById('heartContainer');
  const count = 30; 

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 20 + 15;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(heart);
  }
}

// Music Player Logic
const musicBtn = document.getElementById('musicBtn');
const audio = document.getElementById('bgMusic');

musicBtn.addEventListener('click', function() {
  if (audio.paused) {
    audio.play().catch(e => alert("Please interact with the document first or check audio file path!"));
    musicBtn.textContent = '⏸ Pause Music';
  } else {
    audio.pause();
    musicBtn.textContent = '🎵 Play Music';
  }
});

// Surprise Button Logic
document.getElementById('surpriseBtn').addEventListener('click', function() {
  const reveal = document.getElementById('reveal');
  reveal.style.display = 'block';
  confettiEffect();
  reveal.scrollIntoView({behavior: "smooth", block: "center"});
});

// Confetti Generator
function confettiEffect() {
  const colors = ['#ff3366', '#ffccd5', '#ffffff', '#ffd700'];
  for(let i=0; i<60; i++) {
    const c = document.createElement('div');
    c.style.position = 'fixed'; 
    c.style.zIndex = '999';
    c.style.left = Math.random() * 100 + 'vw'; 
    c.style.top = '-10px';
    c.style.width = '8px'; 
    c.style.height = '8px';
    c.style.backgroundColor = colors[Math.floor(Math.random() * 4)];
    c.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

// Lightbox Logic
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close-lightbox');
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(img => {
  img.addEventListener('click', function() {
    lightboxOverlay.style.display = 'flex';
    lightboxImg.src = this.src; 
  });
});

closeBtn.addEventListener('click', function() {
  lightboxOverlay.style.display = 'none';
});

lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) {
        lightboxOverlay.style.display = 'none';
    }
});

// --- 2. UPDATED FEATURE: ACCURATE LOVING YOU SINCE TIMER ---

// !!! CHANGE THIS DATE TO YOUR RELATIONSHIP START DATE !!!
// Format: YYYY-MM-DDT00:00:00
const startDate = new Date("2020-08-05T00:00:00"); 

function updateTimer() {
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Adjust for negative seconds
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    // Adjust for negative minutes
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    // Adjust for negative hours
    if (hours < 0) {
        hours += 24;
        days--;
    }

    // Adjust for negative days (Check previous month's days)
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }

    // Adjust for negative months
    if (months < 0) {
        months += 12;
        years--;
    }
    
    const html = `
        <div class="timer-box"><span class="timer-val">${years}</span><span class="timer-label">Years</span></div>
        <div class="timer-box"><span class="timer-val">${months}</span><span class="timer-label">Months</span></div>
        <div class="timer-box"><span class="timer-val">${days}</span><span class="timer-label">Days</span></div>
        <div class="timer-box"><span class="timer-val">${hours}</span><span class="timer-label">Hours</span></div>
        <div class="timer-box"><span class="timer-val">${minutes}</span><span class="timer-label">Mins</span></div>
        <div class="timer-box"><span class="timer-val">${seconds}</span><span class="timer-label">Secs</span></div>
    `;
    
    const timerEl = document.getElementById('loveTimer');
    if(timerEl) timerEl.innerHTML = html;
}

setInterval(updateTimer, 1000);
updateTimer(); // Run immediately

// --- 3. NEW FEATURE: REASONS GENERATOR ---
const reasons = [
    "Your smile that takes away all tension 😊",
    "Your anger that only lasts for 5 minutes 😡❤️",
    "The way you support me in everything 🤝",
    "Your childlike behavior 👶",
    "Your late-night conversations 🌙",
    "How you take care of the smallest details ✨",
    "You calling me 'crazy' 😂",
    "Just because you are here, everything is beautiful ❤️"
];

const reasonBtn = document.getElementById('reasonBtn');
if(reasonBtn) {
    reasonBtn.addEventListener('click', function() {
        const display = document.getElementById('reasonDisplay');
        const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
        
        // Fade out effect
        display.style.opacity = 0;
        setTimeout(() => {
            display.textContent = `"${randomReason}"`;
            display.style.opacity = 1;
        }, 300);
    });
}

// --- 4. NEW FEATURE: CAKE BLOWING ---
const blowCandlesBtn = document.getElementById('blowCandlesBtn');
if(blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', function() {
        const candles = document.querySelectorAll('.candle');
        let allBlown = true;
        
        candles.forEach(candle => {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blown');
                allBlown = false;
            }
        });

        if (!allBlown) {
            // First time blowing
            this.textContent = "🎉 Yaaay! Happy Birthday! 🎉";
            confettiEffect(); // Trigger confetti
            // Play music if not playing
            if (audio.paused) {
                 audio.play().catch(() => console.log("Audio requires interaction"));
                 musicBtn.textContent = '⏸ Pause Music';
            }
        }
    });
}

// --- 5. NEW FEATURE: OPEN WHEN LOGIC ---
const letters = {
    sad: "Whenever you are sad, just remember that I am always with you. Your smile is my favorite thing. Please smile? 🥺❤️",
    happy: "Seeing your happiness gives me all the happiness in the world. Always keep smiling like this! You glow differently when you are happy! ✨",
    miss: "I miss you more! Just a little more wait, and then we will be together. Until then, take this virtual hug 🤗!",
    fight: "Sorry baby! I made a mistake. Fights happen because there is love. Please forgive me? I love you the most! ❤️🌹"
};

function openLetter(mood) {
    const contentDiv = document.getElementById('letterContent');
    
    // Animation reset
    contentDiv.style.opacity = 0;
    
    setTimeout(() => {
        contentDiv.innerHTML = `<p style="font-size: 1.1rem; line-height: 1.6;">${letters[mood]}</p>`;
        contentDiv.style.opacity = 1;
    }, 300);
}

// Initialize Hearts
createHearts();