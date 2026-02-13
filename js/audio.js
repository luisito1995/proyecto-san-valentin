document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-audio');
  const toggleBtn = document.getElementById('audio-toggle');

  let isPlaying = false;

  // Volumen base romántico suave
  audio.volume = 0.35;

  function updateIcon() {
    toggleBtn.textContent = isPlaying ? '🔊' : '🔇';
  }

  function playAudio() {
    audio.play().then(() => {
      isPlaying = true;
      localStorage.setItem('bgMusic', 'on');
      updateIcon();
    }).catch(() => {});
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    localStorage.setItem('bgMusic', 'off');
    updateIcon();
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  });

  // Restaurar preferencia si ya activó antes
  const saved = localStorage.getItem('bgMusic');
  if (saved === 'on') {
    playAudio();
  }

  updateIcon();

  // 👉 Exponer control global para app.js
  window.bgAudioControl = {
    play: playAudio,
    pause: pauseAudio,
    isPlaying: () => isPlaying
  };
});
