/**
 * Main Application Logic for Birthday Website
 */

document.addEventListener('DOMContentLoaded', () => {
  const confetti = new ConfettiEngine('confetti-canvas');
  let audioCtx = null;

  // Initialize Web Audio synthesizer for celebratory sound effects
  function playSound(type) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (type === 'cheer') {
        // Festive arpeggio chime
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.15, audioCtx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + idx * 0.08);
          osc.stop(audioCtx.currentTime + idx * 0.08 + 0.7);
        });
      } else if (type === 'puff') {
        // Candle blow puff sound (noise-like oscillator)
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (type === 'pop') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
      }
    } catch (e) {
      console.log('Audio disabled or blocked by browser policies:', e);
    }
  }

  // Load Saved Data or fallback to Config
  let storedConfig = localStorage.getItem('birthday_site_config');
  let currentConfig = storedConfig ? JSON.parse(storedConfig) : BIRTHDAY_CONFIG;

  function renderPage() {
    // Populate Hero
    const recipientElements = document.querySelectorAll('.recipient-name');
    recipientElements.forEach(el => el.textContent = currentConfig.recipientName);

    const titleEl = document.getElementById('hero-title');
    if (titleEl) titleEl.textContent = currentConfig.heroTitle;

    const subtitleEl = document.getElementById('hero-subtitle');
    if (subtitleEl) subtitleEl.textContent = currentConfig.heroSubtitle;

    // Populate Gift Box Note
    const giftTitleEl = document.getElementById('gift-note-title');
    if (giftTitleEl) giftTitleEl.textContent = currentConfig.giftBoxMessage.title;

    const giftBodyEl = document.getElementById('gift-note-body');
    if (giftBodyEl) giftBodyEl.textContent = currentConfig.giftBoxMessage.body;

    const giftSigEl = document.getElementById('gift-note-signature');
    if (giftSigEl) giftSigEl.textContent = currentConfig.giftBoxMessage.signature;

    // Populate Cake Instructions
    const cakeHintEl = document.getElementById('cake-instruction');
    if (cakeHintEl) cakeHintEl.textContent = currentConfig.cakeMessage.instruction;

    // Render Memories Grid
    const memoriesContainer = document.getElementById('memories-grid');
    if (memoriesContainer && currentConfig.memories) {
      memoriesContainer.innerHTML = '';
      currentConfig.memories.forEach((mem, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
          <div class="memory-card-cover" style="background: ${mem.gradient}">
            <span class="memory-tag">${mem.tag || 'Memory'}</span>
            <div class="memory-icon">🌟</div>
          </div>
          <div class="memory-card-body">
            <h3>${mem.title}</h3>
            <p>${mem.caption}</p>
          </div>
        `;
        memoriesContainer.appendChild(card);
      });
    }

    renderWishes();
  }

  // Wishes / Guestbook logic
  function getWishes() {
    const saved = localStorage.getItem('birthday_wishes_list');
    return saved ? JSON.parse(saved) : currentConfig.initialWishes;
  }

  function saveWishes(wishes) {
    localStorage.setItem('birthday_wishes_list', JSON.stringify(wishes));
  }

  function renderWishes() {
    const wishesContainer = document.getElementById('wishes-wall');
    if (!wishesContainer) return;

    const wishes = getWishes();
    wishesContainer.innerHTML = '';

    wishes.forEach((wish, idx) => {
      const card = document.createElement('div');
      card.className = `wish-card ${wish.color || 'card-peach'}`;
      card.innerHTML = `
        <div class="wish-header">
          <span class="wish-sender">💌 ${wish.sender}</span>
          <button class="btn-delete-wish" data-index="${idx}" title="Delete wish">×</button>
        </div>
        <p class="wish-text">"${wish.message}"</p>
      `;
      wishesContainer.appendChild(card);
    });

    // Delete wish event handler
    wishesContainer.querySelectorAll('.btn-delete-wish').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        const currentList = getWishes();
        currentList.splice(index, 1);
        saveWishes(currentList);
        renderWishes();
      });
    });
  }

  // Add Wish Form Submission
  const wishForm = document.getElementById('new-wish-form');
  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderInput = document.getElementById('wish-author');
      const messageInput = document.getElementById('wish-content');
      const colorSelect = document.getElementById('wish-color');

      const sender = senderInput.value.trim();
      const message = messageInput.value.trim();
      const color = colorSelect ? colorSelect.value : 'card-peach';

      if (sender && message) {
        const wishes = getWishes();
        wishes.unshift({ sender, message, color });
        saveWishes(wishes);
        renderWishes();

        senderInput.value = '';
        messageInput.value = '';

        playSound('pop');
        confetti.burst(window.innerWidth / 2, window.innerHeight * 0.7, 40);
      }
    });
  }

  // Interactive Celebrate Button in Hero
  const heroCelebrateBtn = document.getElementById('btn-celebrate');
  if (heroCelebrateBtn) {
    heroCelebrateBtn.addEventListener('click', (e) => {
      const rect = heroCelebrateBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      playSound('cheer');
      confetti.burst(x, y, 120);
    });
  }

  // Interactive Birthday Cake & Candles
  const candleFlame = document.getElementById('candle-flame');
  const cakeSection = document.getElementById('cake-container');
  let candleBlown = false;

  if (cakeSection) {
    cakeSection.addEventListener('click', () => {
      if (!candleBlown) {
        candleBlown = true;
        if (candleFlame) {
          candleFlame.classList.add('extinguished');
        }
        const cakeHintEl = document.getElementById('cake-instruction');
        if (cakeHintEl) {
          cakeHintEl.innerHTML = currentConfig.cakeMessage.blownMessage;
          cakeHintEl.classList.add('wish-celebration');
        }

        playSound('puff');
        setTimeout(() => {
          playSound('cheer');
          confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 160);
        }, 200);
      } else {
        // Relight option
        candleBlown = false;
        if (candleFlame) {
          candleFlame.classList.remove('extinguished');
        }
        const cakeHintEl = document.getElementById('cake-instruction');
        if (cakeHintEl) {
          cakeHintEl.textContent = currentConfig.cakeMessage.instruction;
          cakeHintEl.classList.remove('wish-celebration');
        }
        playSound('pop');
      }
    });
  }

  // Interactive Gift Box Modal
  const giftBox = document.getElementById('gift-box-interactive');
  const giftModal = document.getElementById('gift-modal');
  const closeModalBtn = document.getElementById('close-gift-modal');

  if (giftBox && giftModal) {
    giftBox.addEventListener('click', () => {
      giftModal.classList.add('active');
      playSound('cheer');
      confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 140);
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        giftModal.classList.remove('active');
      });
    }

    giftModal.addEventListener('click', (e) => {
      if (e.target === giftModal) {
        giftModal.classList.remove('active');
      }
    });
  }

  // Quick Live Customizer Modal
  const customizeBtn = document.getElementById('btn-open-customizer');
  const customizerModal = document.getElementById('customizer-modal');
  const closeCustomizerBtn = document.getElementById('close-customizer-modal');
  const customizerForm = document.getElementById('customizer-form');

  if (customizeBtn && customizerModal) {
    customizeBtn.addEventListener('click', () => {
      document.getElementById('cust-name').value = currentConfig.recipientName || '';
      document.getElementById('cust-title').value = currentConfig.heroTitle || '';
      document.getElementById('cust-subtitle').value = currentConfig.heroSubtitle || '';
      document.getElementById('cust-gift-title').value = currentConfig.giftBoxMessage.title || '';
      document.getElementById('cust-gift-body').value = currentConfig.giftBoxMessage.body || '';
      customizerModal.classList.add('active');
    });

    if (closeCustomizerBtn) {
      closeCustomizerBtn.addEventListener('click', () => {
        customizerModal.classList.remove('active');
      });
    }

    if (customizerForm) {
      customizerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentConfig.recipientName = document.getElementById('cust-name').value.trim() || 'Birthday Star';
        currentConfig.heroTitle = document.getElementById('cust-title').value.trim() || 'Happy Birthday! 🎉';
        currentConfig.heroSubtitle = document.getElementById('cust-subtitle').value.trim() || '';
        currentConfig.giftBoxMessage.title = document.getElementById('cust-gift-title').value.trim() || '';
        currentConfig.giftBoxMessage.body = document.getElementById('cust-gift-body').value.trim() || '';

        localStorage.setItem('birthday_site_config', JSON.stringify(currentConfig));
        renderPage();
        customizerModal.classList.remove('active');
        playSound('cheer');
        confetti.burst(window.innerWidth / 2, window.innerHeight / 3, 100);
      });
    }
  }

  // Initial Render
  renderPage();

  // Initial subtle welcome burst after load
  setTimeout(() => {
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.35, 60);
  }, 600);
});
