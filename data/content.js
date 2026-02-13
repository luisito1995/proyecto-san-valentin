export const CONTENT = {
  coupleName: "NOMBRE_PAREJA",

  welcomeMessage:
    "Todo lo que somos hoy está hecho de pequeños momentos que elegimos vivir juntos.",

  final: {
    video: "assets/video/final.mp4"
  }
};


export const memoriesContent = {
  1: {
    id: 1,
    title: "Donde todo empezó",
    intro:
      "Hay historias que no empiezan con una promesa, sino con una coincidencia.",
    narrative: `
      Si no hubiéramos coincidido en ese curso,
      quizás nunca nos habríamos conocido.

      Pero coincidimos.

      Y descubrimos que compartíamos más de lo esperado.
      Nada estaba completo todavía,
      pero las cosas empezaban a encajar.
    `,
    interaction: "puzzle",
    puzzle: {
      pieces: 4,
      images: [
        "assets/images/recuerdo1/puzzle-1.png",
        "assets/images/recuerdo1/puzzle-2.png",
        "assets/images/recuerdo1/puzzle-3.png",
        "assets/images/recuerdo1/puzzle-4.png"
      ],
      finalImage: "assets/images/recuerdo1/final.png"
    },
    revealText:
      "Nada empezó completo, pero decidimos quedarnos… y encajar.",
    continueLabel: "Continuar"
  },

  2: {
    id: 2,
    title: "Elegirte",
    intro: "No todo en la vida es automático. Algunas cosas se deciden.",
    narrative: `
      Hubo un momento en el que nada estaba escrito.
      Podía seguir como siempre, tomar otro camino,
      o simplemente no elegir.

      Pero incluso sin darme cuenta,
      ya te estaba eligiendo a ti.
    `,
    interaction: "choice",
    interactionData: {
      question: "Si tuviera que elegir de nuevo…",
      options: [
        {
          id: "past",
          text: "Seguir como antes",
          correct: false,
          feedback: "Eso ya no me hacía sentir completo."
        },
        {
          id: "you",
          text: "Elegirte a ti",
          correct: true
        },
        {
          id: "nothing",
          text: "No elegir nada",
          correct: false,
          feedback: "No elegir también es una forma de perder."
        }
      ]
    },
    revealText: `
      Y aún hoy, con todo lo que somos,
      te volvería a elegir sin dudarlo.
    `,
    revealImage: "assets/images/recuerdo2/final.png"
  },

  3: {
    id: 3,
    title: "Cuando te elegí",
    intro: "Hay decisiones que no se piensan dos veces.",
    narrative: `
  No fue un momento exacto.
  No hubo un día marcado en el calendario.

  Fue algo más simple.
  Y más fuerte.

  Un instante silencioso en el que supe
  que, pase lo que pase,
  te volvería a elegir.
    `,
    interaction: "choice",
    interactionData: {
      question: "Si tuviera que volver a elegir…",
      options: [
        {
          text: "Te elegiría sin pensarlo",
          revealText:
            "Porque incluso antes de entenderlo todo, ya sentía que eras tú."
        },
        {
          text: "Te elegiría siempre",
          revealText:
            "Porque después de todo lo vivido, sigo sabiendo que eres tú."
        }
      ]
    },
    revealImage: "assets/images/recuerdo3/final.png",
    revealText:
      "Y eso no ha cambiado. Ni cambiará."
  },

  4: {
    id: 4,
    title: "Cuando el silencio habló",
    intro: "No todo lo importante se dice en voz alta.",
    narrative: `
  Hubo momentos
  en los que no dijimos nada.

  Y aun así,
  todo estaba claro.

  Porque cuando el silencio es cómodo,
  es porque el corazón está en casa.
    `,
    interaction: "hold",
    interactionData: {
      instruction: "Mantén presionado un momento…",
      duration: 3000 // milisegundos
    },
    revealImage: "assets/images/recuerdo4/final.png",
    revealText:
      "Contigo, incluso el silencio se siente acompañado."
  },

  5: {
    id: 5,
    title: "Lo que somos hoy",
    intro: "No somos lo que fuimos. Somos lo que elegimos seguir siendo.",
    narrative: `
  Después de todo lo vivido,
  hay algo que permanece.

  No perfecto.
  No siempre fácil.

  Pero real.
  Y nuestro.
    `,
    interaction: "sequence",
    interactionData: {
      instruction: "Toca para continuar",
      steps: [
        "Somos un equipo.",
        "Somos apoyo incluso en silencio.",
        "Somos risa cuando el día pesa.",
        "Somos hogar."
      ]
    },
    revealImage: "assets/images/recuerdo5/final.png",
    revealText:
      "Y eso ya es muchísimo."
  },

  6: {
    id: 6,
    title: "Lo que viene",
    intro: "No sabemos exactamente cómo será.",
    narrative: `
    No sabemos qué caminos aparecerán.

    No sabemos qué pruebas vendrán.

    Pero sabemos algo más importante.

    Que seguiremos eligiéndonos.
    Incluso cuando no sea fácil.
    Incluso cuando haya dudas.

    Porque el amor no es suerte.
    Es decisión.
    `,
    interaction: "finalReveal",
    revealImage: "assets/images/recuerdo6/final.png",
    revealText: `
    Y mientras sigamos eligiéndonos,
    todo lo que venga
    valdrá la pena.
    `
  },

  // Recuerdo 2, 3, 4... irán aquí
};

