/* =====================================================
   WEDDING WEBSITE SCRIPT
   ASIF NIJAS FAIZY & JOUHARA FATHIMA
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const opening = document.getElementById("opening");

const music = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

const musicIcon = document.getElementById("musicIcon");

const heroScroll = document.querySelector(".hero-scroll");


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;

let musicStartedOnce = false;


/*
   Update music button appearance
*/

function updateMusicButton() {

  if (!musicBtn || !musicIcon) {
    return;
  }


  if (musicPlaying) {

    musicBtn.classList.add("playing");

    musicIcon.textContent = "❚❚";

    musicBtn.setAttribute(
      "aria-label",
      "Pause wedding music"
    );

    musicBtn.setAttribute(
      "title",
      "Pause music"
    );

  }

  else {

    musicBtn.classList.remove("playing");

    musicIcon.textContent = "♫";

    musicBtn.setAttribute(
      "aria-label",
      "Play wedding music"
    );

    musicBtn.setAttribute(
      "title",
      "Play music"
    );

  }

}


/*
   Start music

   Browser autoplay restrictions mean that music
   cannot be guaranteed to start without user interaction.

   This function is therefore called directly from
   user interaction whenever possible.
*/

async function startMusic() {

  if (!music) {
    return false;
  }


  if (!music.paused) {

    musicPlaying = true;

    musicStartedOnce = true;

    updateMusicButton();

    return true;

  }


  try {

    await music.play();

    musicPlaying = true;

    musicStartedOnce = true;

    updateMusicButton();

    return true;

  }

  catch (error) {

    /*
      Chrome may block playback if it does not consider
      the event a valid user gesture.

      We deliberately do not permanently disable music.
      Another touch can try again.
    */

    musicPlaying = false;

    updateMusicButton();

    console.log(
      "Music playback requires user interaction."
    );

    return false;

  }

}


/*
   Stop music
*/

function stopMusic() {

  if (!music) {
    return;
  }


  music.pause();

  musicPlaying = false;

  updateMusicButton();

}


/*
   Keep the state correct if the audio ends,
   pauses, or encounters an error.
*/

if (music) {

  music.addEventListener(
    "play",
    () => {

      musicPlaying = true;

      musicStartedOnce = true;

      updateMusicButton();

    }
  );


  music.addEventListener(
    "pause",
    () => {

      musicPlaying = false;

      updateMusicButton();

    }
  );


  music.addEventListener(
    "error",
    () => {

      musicPlaying = false;

      updateMusicButton();

      console.log(
        "Unable to load weddingmusic.mp3"
      );

    }
  );

}


/* =====================================================
   FIRST TOUCH ANYWHERE
===================================================== */


/*
   IMPORTANT:

   We use pointerdown instead of click.

   pointerdown happens immediately when the user
   touches the screen and is a user-initiated event.

   The listener is NOT once-only.

   This is intentional.

   If Chrome blocks the first attempt, another touch
   can try to start the music again.
*/

document.addEventListener(
  "pointerdown",
  (event) => {

    /*
      If music is already playing, there is nothing
      to do here.
    */

    if (musicPlaying) {
      return;
    }


    /*
      Try to start music immediately from the user's
      touch interaction.
    */

    startMusic();


  },
  {
    passive: true
  }
);


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicBtn) {

  musicBtn.addEventListener(
    "click",
    async (event) => {

      /*
        Prevent the document-level interaction logic
        from interfering with the button's toggle.
      */

      event.stopPropagation();


      if (musicPlaying) {

        stopMusic();

      }

      else {

        await startMusic();

      }

    }
  );

}


/* =====================================================
   OPENING SCREEN
===================================================== */

let openingClosed = false;


/*
   Close the opening screen
*/

function closeOpening() {

  if (openingClosed) {
    return;
  }


  openingClosed = true;


  if (opening) {

    opening.classList.add("hide");

  }

}


/*
   The opening screen closes automatically after
   3 seconds.
*/

setTimeout(
  () => {

    closeOpening();

  },
  3000
);


/*
   If the user touches the opening screen,
   close it immediately.

   The same touch is also a valid user interaction
   for starting the music.
*/

if (opening) {

  opening.addEventListener(
    "pointerdown",
    () => {

      closeOpening();

      startMusic();

    },
    {
      passive: true
    }
  );

}


/* =====================================================
   COUNTDOWN
===================================================== */


/*
   Wedding date:

   21 September 2026
   11:00 AM
   India Standard Time (+05:30)
*/

const weddingDate =
  new Date(
    "2026-09-21T11:00:00+05:30"
  ).getTime();


const DAY =
  24 * 60 * 60 * 1000;

const HOUR =
  60 * 60 * 1000;

const MINUTE =
  60 * 1000;

const SECOND =
  1000;


/*
   Countdown elements
*/

const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


/*
   Format numbers as 00, 01, 02...
*/

function pad(number) {

  return String(number).padStart(
    2,
    "0"
  );

}


/*
   Update countdown
*/

function updateCountdown() {

  const now =
    Date.now();


  let difference =
    weddingDate - now;


  /*
    Once the wedding time has arrived,
    show all zeroes.
  */

  if (difference <= 0) {

    difference = 0;

  }


  const days =
    Math.floor(
      difference / DAY
    );


  const hours =
    Math.floor(
      (difference % DAY) / HOUR
    );


  const minutes =
    Math.floor(
      (difference % HOUR) / MINUTE
    );


  const seconds =
    Math.floor(
      (difference % MINUTE) / SECOND
    );


  if (daysElement) {

    daysElement.textContent =
      pad(days);

  }


  if (hoursElement) {

    hoursElement.textContent =
      pad(hours);

  }


  if (minutesElement) {

    minutesElement.textContent =
      pad(minutes);

  }


  if (secondsElement) {

    secondsElement.textContent =
      pad(seconds);

  }

}


/*
   Run immediately
*/

updateCountdown();


/*
   Update every second
*/

setInterval(
  updateCountdown,
  1000
);


/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

}

else {

  /*
    Fallback for very old browsers.
  */

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =====================================================
   CONTINUOUS AUTO SCROLL
===================================================== */


/*
   Auto-scroll moves continuously instead of jumping
   from one section to another.

   0.75 pixels per animation frame is approximately
   45 pixels per second on a 60Hz screen.

   This is intentionally gentle and natural.
*/

let autoScroll = false;

const scrollSpeed = 0.75;

let resumeTimer = null;


/*
   Main auto-scroll loop
*/

function continuousAutoScroll() {

  if (autoScroll) {

    const documentHeight =
      document.documentElement.scrollHeight;

    const viewportHeight =
      window.innerHeight;

    const maxScroll =
      documentHeight -
      viewportHeight;

    const currentScroll =
      window.scrollY;


    /*
      Stop when we reach the bottom.
    */

    if (
      currentScroll <
      maxScroll - 2
    ) {

      window.scrollBy(
        0,
        scrollSpeed
      );

    }

    else {

      autoScroll = false;

    }

  }


  requestAnimationFrame(
    continuousAutoScroll
  );

}


/*
   Start animation loop
*/

requestAnimationFrame(
  continuousAutoScroll
);


/* =====================================================
   START AUTO SCROLL
===================================================== */


/*
   Wait slightly longer than the opening animation.

   This prevents auto-scroll from beginning while
   the opening screen is still visible.
*/

setTimeout(
  () => {

    autoScroll = true;

  },
  3400
);


/* =====================================================
   PAUSE AUTO SCROLL WHEN USER INTERACTS
===================================================== */

function pauseAutoScroll() {

  autoScroll = false;


  clearTimeout(
    resumeTimer
  );


  /*
    Resume after the user has stopped interacting
    for 4 seconds.
  */

  resumeTimer =
    setTimeout(
      () => {

        const maxScroll =
          document.documentElement.scrollHeight -
          window.innerHeight;


        if (
          window.scrollY <
          maxScroll - 10
        ) {

          autoScroll = true;

        }

      },
      4000
    );

}


/*
   Touch interaction
*/

window.addEventListener(
  "touchstart",
  pauseAutoScroll,
  {
    passive: true
  }
);


window.addEventListener(
  "touchmove",
  pauseAutoScroll,
  {
    passive: true
  }
);


/*
   Mouse wheel
*/

window.addEventListener(
  "wheel",
  pauseAutoScroll,
  {
    passive: true
  }
);


/*
   Desktop pointer interaction
*/

window.addEventListener(
  "mousedown",
  pauseAutoScroll,
  {
    passive: true
  }
);


/* =====================================================
   STOP AUTO SCROLL AT BOTTOM
===================================================== */

window.addEventListener(
  "scroll",
  () => {

    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;


    if (
      window.scrollY >=
      maxScroll - 5
    ) {

      autoScroll = false;

    }

  },
  {
    passive: true
  }
);


/* =====================================================
   HERO SCROLL BUTTON
===================================================== */

if (heroScroll) {

  heroScroll.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      /*
        Stop automatic scrolling while the user
        intentionally jumps to the countdown.
      */

      autoScroll = false;


      clearTimeout(
        resumeTimer
      );


      const countdownSection =
        document.getElementById(
          "countdown"
        );


      if (countdownSection) {

        countdownSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }


      /*
        Resume automatic scrolling after the
        smooth scroll has finished.
      */

      resumeTimer =
        setTimeout(
          () => {

            const maxScroll =
              document.documentElement.scrollHeight -
              window.innerHeight;


            if (
              window.scrollY <
              maxScroll - 10
            ) {

              autoScroll = true;

            }

          },
          4500
        );

    }
  );

}


/* =====================================================
   INITIAL MUSIC BUTTON STATE
===================================================== */

updateMusicButton();


/* =====================================================
   PAGE VISIBILITY
===================================================== */


/*
   If the user leaves the page and comes back,
   do not force music to restart automatically.

   Browser policies are strict about this.
*/

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden &&
      music &&
      !music.paused
    ) {

      /*
        We intentionally keep the music playing.
        The browser decides whether background
        playback is allowed.
      */

    }

  }
);
