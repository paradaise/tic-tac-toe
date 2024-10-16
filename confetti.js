function createConfetti(numConfetti) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);
  
    for (let i = 0; i < numConfetti; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      confettiContainer.appendChild(confetti);
    }
  }
  
  function showConfetti() {
    const confettiElements = document.querySelectorAll('.confetti');
    confettiElements.forEach(confetti => {
      confetti.style.display = 'block';
    });
  }
  
  function hideConfetti() {
    const confettiElements = document.querySelectorAll('.confetti');
    confettiElements.forEach(confetti => {
      confetti.style.display = 'none';
    });
  }