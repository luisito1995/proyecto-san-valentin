import { memoriesContent } from "../data/content.js";

export function loadMemory1() {
  const memory = memoriesContent[1];

  const memoryText = document.getElementById("memory-text");
  memoryText.style.display = "block";
  memoryText.style.opacity = "1";

  // ❌ NO borres el HTML base
  // memoryText.innerHTML = "";

  // Título
  document.getElementById("memory-title").innerText = memory.title;

  // Intro
  document.getElementById("memory-intro").innerText = memory.intro;

  // Narrativa
  const narrativeContainer = document.getElementById("memory-narrative");
  narrativeContainer.innerHTML = "";

  memory.narrative
    .trim()
    .split("\n\n")
    .forEach(paragraph => {
      const p = document.createElement("p");
      p.innerText = paragraph.trim();
      narrativeContainer.appendChild(p);
    });

  // Interacción
  const interactionContainer = document.getElementById("memory-interaction");
  interactionContainer.innerHTML = "";

  // Ocultar continuar
  const nextBtn = document.getElementById("memory-next");
  nextBtn.classList.add("hidden");

  // 👉 Botón Empezar (controlado)
  let startBtn = document.getElementById("start-memory");

  if (!startBtn) {
    startBtn = document.createElement("button");
    startBtn.id = "start-memory";
    startBtn.className = "primary-btn";
    startBtn.innerText = "Empezar";
    memoryText.appendChild(startBtn);
  }

  startBtn.onclick = () => {
    memoryText.style.opacity = "0";

    setTimeout(() => {
      startBtn.remove();
      memoryText.style.display = "none";

      createPuzzle(memory, interactionContainer);
    }, 400);
  };
}


export function loadMemory2() {
  const memory = memoriesContent[2];

  // 👉 ACTUALIZAR TEXTO BASE
  document.getElementById("memory-title").innerText = memory.title;
  document.getElementById("memory-intro").innerText = memory.intro;
  
  const interactionContainer =
    document.getElementById("memory-interaction");
  const revealContainer =
    document.getElementById("memory-interaction"); // si reveal vive ahí
  const continueBtn =
    document.getElementById("memory-next");

  interactionContainer.innerHTML = "";
  revealContainer.innerHTML = "";
  continueBtn.disabled = true;
  continueBtn.classList.remove("visible");

  const question = document.createElement("p");
  question.classList.add("choice-question");
  question.textContent = memory.interactionData.question;

  const optionsWrapper = document.createElement("div");
  optionsWrapper.classList.add("choice-options");

  let interactionCompleted = false;

  memory.interactionData.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("choice-btn");
    btn.textContent = option.text;

    btn.addEventListener("click", () => {
      if (interactionCompleted) return;

      if (option.correct) {
        interactionCompleted = true;

        btn.classList.add("correct");

        showReveal(memory, revealContainer, continueBtn);
      } else {
        btn.classList.add("incorrect");

        if (option.feedback) {
          const feedback = document.createElement("p");
          feedback.classList.add("choice-feedback");
          feedback.textContent = option.feedback;
          interactionContainer.appendChild(feedback);
        }

        setTimeout(() => {
          btn.classList.remove("incorrect");
        }, 1200);
      }
    });

    optionsWrapper.appendChild(btn);
  });

  interactionContainer.appendChild(question);
  interactionContainer.appendChild(optionsWrapper);
}

export function loadMemory3() {
  const memory = memoriesContent[3];

  // 👉 ACTUALIZAR TEXTO BASE
  document.getElementById("memory-title").innerText = memory.title;
  document.getElementById("memory-intro").innerText = memory.intro;

  const interactionContainer =
    document.getElementById("memory-interaction");
  const continueBtn =
    document.getElementById("memory-next");

  interactionContainer.innerHTML = "";
  continueBtn.classList.add("hidden");

  const question = document.createElement("p");
  question.classList.add("choice-question");
  question.textContent = memory.interactionData.question;

  const optionsWrapper = document.createElement("div");
  optionsWrapper.classList.add("choice-options");

  let interactionCompleted = false;

  memory.interactionData.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("choice-btn");
    btn.textContent = option.text;

    btn.addEventListener("click", () => {
      if (interactionCompleted) return;
      interactionCompleted = true;

      // Limpiar opciones suavemente
      optionsWrapper.style.opacity = "0";

      setTimeout(() => {
        optionsWrapper.remove();

        // Imagen
        if (memory.revealImage) {
          const img = document.createElement("img");
          img.src = memory.revealImage;
          img.classList.add("reveal-image");
          interactionContainer.appendChild(img);
        }

        // Texto revelación (según opción)
        const text = document.createElement("p");
        text.classList.add("reveal-text");
        text.textContent = option.revealText;

        interactionContainer.appendChild(text);

        // Texto final común
        const finalText = document.createElement("p");
        finalText.classList.add("reveal-text");
        finalText.textContent = memory.revealText;

        interactionContainer.appendChild(finalText);

        continueBtn.classList.remove("hidden");
      }, 400);
    });

    optionsWrapper.appendChild(btn);
  });

  interactionContainer.appendChild(question);
  interactionContainer.appendChild(optionsWrapper);
}

export function loadMemory4() {
  const memory = memoriesContent[4];

  // 👉 ACTUALIZAR TEXTO BASE
  document.getElementById("memory-title").innerText = memory.title;
  document.getElementById("memory-intro").innerText = memory.intro;

  const interactionContainer =
    document.getElementById("memory-interaction");
  const continueBtn =
    document.getElementById("memory-next");

  interactionContainer.innerHTML = "";
  continueBtn.classList.add("hidden");

  const instruction = document.createElement("p");
  instruction.classList.add("hold-instruction");
  instruction.textContent = memory.interactionData.instruction;

  const holdBtn = document.createElement("button");
  holdBtn.classList.add("hold-btn");
  holdBtn.textContent = "Mantener";

  const progress = document.createElement("div");
  progress.classList.add("hold-progress");

  const progressBar = document.createElement("div");
  progressBar.classList.add("hold-progress-bar");

  progress.appendChild(progressBar);

  interactionContainer.appendChild(instruction);
  interactionContainer.appendChild(holdBtn);
  interactionContainer.appendChild(progress);

  let holdTimeout;
  let completed = false;

  const startHold = () => {
    if (completed) return;

    progressBar.style.transition = `width ${memory.interactionData.duration}ms linear`;
    progressBar.style.width = "100%";

    holdTimeout = setTimeout(() => {
      completed = true;
      showHoldReveal(memory, interactionContainer, continueBtn);
    }, memory.interactionData.duration);
  };

  const cancelHold = () => {
    if (completed) return;

    clearTimeout(holdTimeout);
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
  };

  holdBtn.addEventListener("mousedown", startHold);
  holdBtn.addEventListener("touchstart", startHold);

  holdBtn.addEventListener("mouseup", cancelHold);
  holdBtn.addEventListener("mouseleave", cancelHold);
  holdBtn.addEventListener("touchend", cancelHold);
}

export function loadMemory5() {
  const memory = memoriesContent[5];

  // 👉 ACTUALIZAR TEXTO BASE
  document.getElementById("memory-title").innerText = memory.title;
  document.getElementById("memory-intro").innerText = memory.intro;

  const interactionContainer =
    document.getElementById("memory-interaction");
  const continueBtn =
    document.getElementById("memory-next");

  interactionContainer.innerHTML = "";
  continueBtn.classList.add("hidden");

  const instruction = document.createElement("p");
  instruction.classList.add("sequence-instruction");
  instruction.textContent = memory.interactionData.instruction;

  const sequenceBox = document.createElement("div");
  sequenceBox.classList.add("sequence-box");

  const text = document.createElement("p");
  text.classList.add("sequence-text");
  text.textContent = memory.interactionData.steps[0];

  sequenceBox.appendChild(text);

  interactionContainer.appendChild(instruction);
  interactionContainer.appendChild(sequenceBox);

  let index = 0;

  sequenceBox.addEventListener("click", () => {
    index++;

    if (index < memory.interactionData.steps.length) {
      text.classList.add("fade-out");

      setTimeout(() => {
        text.textContent = memory.interactionData.steps[index];
        text.classList.remove("fade-out");
        text.classList.add("fade-in");
      }, 250);

      setTimeout(() => {
        text.classList.remove("fade-in");
      }, 500);
    } else {
      showSequenceReveal(memory, interactionContainer, continueBtn);
    }
  });
}

export function loadMemory6() {
  const memory = memoriesContent[6];

  // 👉 ACTUALIZAR TEXTO BASE
  document.getElementById("memory-title").innerText = memory.title;
  document.getElementById("memory-intro").innerText = memory.intro;

  const interactionContainer =
    document.getElementById("memory-interaction");
  const continueBtn =
    document.getElementById("memory-next");

  interactionContainer.innerHTML = "";
  continueBtn.classList.add("hidden");

  // Imagen final
  const image = document.createElement("img");
  image.src = memory.revealImage;
  image.classList.add("reveal-image");
  image.style.opacity = "0";

  interactionContainer.appendChild(image);

  // Texto final
  const text = document.createElement("p");
  text.classList.add("reveal-text");
  text.textContent = memory.revealText.trim();
  text.style.opacity = "0";

  interactionContainer.appendChild(text);

  // Animación progresiva
  setTimeout(() => {
    image.style.opacity = "1";
  }, 500);

  setTimeout(() => {
    text.style.opacity = "1";
  }, 1200);

  setTimeout(() => {
    continueBtn.classList.remove("hidden");
  }, 2000);
}



  function createPuzzle(memory, container) {
    const puzzleWrapper = document.createElement("div");
    puzzleWrapper.classList.add("puzzle-grid");
    puzzleWrapper.dataset.type = "puzzle";

    let completedPieces = 0;
    const totalPieces = memory.puzzle.pieces;

    memory.puzzle.images.forEach((src, index) => {
      const piece = document.createElement("img");
      piece.src = src;
      piece.classList.add("puzzle-piece");

      piece.addEventListener("click", () => {
        if (piece.classList.contains("placed")) return;

        piece.classList.add("placed");
        completedPieces++;

        if (completedPieces === totalPieces) {
          onPuzzleCompleted(memory);
        }
      });

      puzzleWrapper.appendChild(piece);
    });

    container.appendChild(puzzleWrapper);
  }

  function onPuzzleCompleted(memory) {
    const interaction = document.getElementById("memory-interaction");

    // ❌ Eliminar puzzle
    const puzzle = interaction.querySelector('[data-type="puzzle"]');
    if (puzzle) {
      puzzle.style.opacity = "0";
      setTimeout(() => puzzle.remove(), 400);
    }

    // 🖼️ Imagen final
    const finalImage = document.createElement("img");
    finalImage.src = memory.puzzle.finalImage;
    finalImage.classList.add("memory-final-image");
    finalImage.style.opacity = "0";

    interaction.appendChild(finalImage);

    // ✨ Mostrar imagen suavemente
    setTimeout(() => {
      finalImage.style.opacity = "1";
    }, 500);

    // 📝 Texto revelación
    const reveal = document.createElement("p");
    reveal.classList.add("reveal-text");
    reveal.innerText = memory.revealText;

    setTimeout(() => {
      interaction.appendChild(reveal);
      document
        .getElementById("memory-next")
        .classList.remove("hidden");
    }, 900);
  }

  function showReveal(memory, revealContainer, continueBtn) {
    revealContainer.innerHTML = "";

    if (memory.revealImage) {
      const img = document.createElement("img");
      img.src = memory.revealImage;
      img.classList.add("reveal-image");
      revealContainer.appendChild(img);
    }

    const text = document.createElement("p");
    text.classList.add("reveal-text");
    text.textContent = memory.revealText;

    revealContainer.appendChild(text);

    continueBtn.disabled = false;
    continueBtn.classList.add("visible");
  }

  function showHoldReveal(memory, container, continueBtn) {
    container.innerHTML = "";

    if (memory.revealImage) {
      const img = document.createElement("img");
      img.src = memory.revealImage;
      img.classList.add("reveal-image");
      container.appendChild(img);
    }

    const text = document.createElement("p");
    text.classList.add("reveal-text");
    text.textContent = memory.revealText;

    container.appendChild(text);

    continueBtn.classList.remove("hidden");
  }

  function showSequenceReveal(memory, container, continueBtn) {
    container.innerHTML = "";

    if (memory.revealImage) {
      const img = document.createElement("img");
      img.src = memory.revealImage;
      img.classList.add("reveal-image");
      container.appendChild(img);
    }

    const text = document.createElement("p");
    text.classList.add("reveal-text");
    text.textContent = memory.revealText;

    container.appendChild(text);

    continueBtn.classList.remove("hidden");
  }

  function restartExperience() {
    const video = document.getElementById("final-video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    state.currentMemoryIndex = 0;
    showScreen(0);
  }





  /* const startBtn = document.getElementById('start-video-btn');
  const videoWrapper = document.getElementById('video-wrapper');
  const video = document.getElementById('final-video');

  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    videoWrapper.style.display = 'block';
    video.play();
  });

  video.addEventListener('ended', () => {
    text.textContent =
      'El futuro no es una promesa. Es una decisión que seguimos tomando. Y hoy, volveríamos a elegirnos.';
    nextBtn.classList.remove('hidden');
  });
 */

