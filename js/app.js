import { state } from "./state.js";

import {
  loadMemory1,
  loadMemory2,
  loadMemory3,
  loadMemory4,
  loadMemory5,
  loadMemory6
} from "./interactions.js";


document.addEventListener('DOMContentLoaded', () => {
  const screenElements = document.querySelectorAll('.screen');

  function showScreen(index) {
    screenElements.forEach(screen => screen.classList.remove('active'));

    const screenName = state.screens[index];
    const nextScreen = document.querySelector(
      `.screen[data-screen="${screenName}"]`
    );

    if (nextScreen) {
      nextScreen.classList.add('active');
      state.currentScreenIndex = index;

      if (screenName === 'memory') {
        // 👇 CLAVE
        if (state.currentMemoryIndex === 0) {
          state.currentMemoryIndex = 1;
        }
        loadCurrentMemory();
      }

      if (screenName === "finalVideo") {
        const video = document.getElementById("final-video");
        const continueBtn = document.getElementById("final-video-continue");

        const playBtn = document.getElementById("video-play");
        const pauseBtn = document.getElementById("video-pause");

        const fullscreenBtn = document.getElementById("video-fullscreen");

        if (!video) return;

        video.pause();
        video.currentTime = 0;
        video.muted = false;

        continueBtn.classList.add("hidden");

        // Play manual
        playBtn.onclick = () => {
          video.play();
        };

        // Pause manual
        pauseBtn.onclick = () => {
          video.pause();
        };

        // 🎬 Pausar música completamente
        if (window.bgAudioControl?.isPlaying()) {
          window.bgAudioControl.pause();
          video.dataset.resumeMusic = "true";
        } else {
          video.dataset.resumeMusic = "false";
        }

        video.play().catch(() => {
          continueBtn.classList.remove("hidden");
        });

        video.onended = null;

        video.onended = () => {
          continueBtn.classList.remove("hidden");

          // 🎵 Reanudar música si estaba activa
          if (video.dataset.resumeMusic === "true") {
            window.bgAudioControl.play();
          }
        };

        fullscreenBtn.onclick = () => {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Safari
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen(); // IE
          }
        };
      }

    }
  }


    function loadCurrentMemory() {
        switch (state.currentMemoryIndex) {
            case 1:
                loadMemory1();
                break;
            case 2:
                loadMemory2();
                break;
            case 3:
                loadMemory3();
                break;
            case 4:
                loadMemory4();
                break;
            case 5:
                loadMemory5();
                break;
            case 6:
                loadMemory6();
                break;
        }
    }



  function nextScreen() {
    const currentScreen = state.screens[state.currentScreenIndex];

    if (currentScreen === "memory") {
        if (state.currentMemoryIndex < state.memories.length) {
        state.currentMemoryIndex++;
        loadCurrentMemory();
        return;
        } else {
        showScreen(state.currentScreenIndex + 1);
        return;
        }
    }

    if (state.currentScreenIndex < state.screens.length - 1) {
        showScreen(state.currentScreenIndex + 1);
    }
  }


  function restartExperience() {
    state.currentMemoryIndex = 0;
    showScreen(0);
    }


  document.addEventListener('click', (e) => {
    const action = e.target.dataset.action;

    if (!action) return;

    if (action === 'next') {
      nextScreen();
    }

    if (action === 'restart') {
      restartExperience();
    }
  });

  // Inicializar
  showScreen(0);
});
