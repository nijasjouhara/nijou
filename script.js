/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
  new Date('2026-09-21T11:00:00+05:30').getTime();

function tick() {

  const now = Date.now();

  const d = Math.max(
    0,
    weddingDate - now
  );

  const day = 86400000;
  const hour = 3600000;
  const min = 60000;

  document.getElementById('days').textContent =
    String(
      Math.floor(d / day)
    ).padStart(2, '0');

  document.getElementById('hours').textContent =
    String(
      Math.floor((d % day) / hour)
    ).padStart(2, '0');

  document.getElementById('minutes').textContent =
    String(
      Math.floor((d % hour) / min)
    ).padStart(2, '0');

  document.getElementById('seconds').textContent =
    String(
      Math.floor((d % min) / 1000)
    ).padStart(2, '0');
}

tick();

setInterval(
  tick,
  1000
);


/* =====================================================
   LOADER
===================================================== */

window.addEventListener(
  'load',
  () => {

    setTimeout(
      () => {

        const loader =
          document.getElementById('loader');

        if (loader) {
          loader.classList.add('hide');
        }

      },
      900
    );

  }
);


/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const io =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'visible'
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll('.reveal')
  .forEach(
    el => io.observe(el)
  );


/* =====================================================
   WEDDING MUSIC
===================================================== */

const music =
  document.getElementById('bgMusic');

const btn =
  document.getElementById('musicBtn');


let musicStarted = false;


/* -----------------------------------------------------
   START MUSIC
----------------------------------------------------- */

function startMusic() {

  if (!music) {
    return;
  }

  if (!music.paused) {
    musicStarted = true;
    return;
  }


  const playPromise =
    music.play();


  if (playPromise !== undefined) {

    playPromise
      .then(() => {

        musicStarted = true;

        if (btn) {
          btn.classList.add('playing');
          btn.innerHTML =
            '♫ <span>Pause</span>';
        }

      })
      .catch(() => {

        /*
          Chrome may block playback until
          another user interaction happens.

          We intentionally keep listening for
          the next touch.
        */

        musicStarted = false;

      });

  }

}


/* -----------------------------------------------------
   STOP MUSIC
----------------------------------------------------- */

function stopMusic() {

  if (!music) {
    return;
  }

  music.pause();

  musicStarted = false;

  if (btn) {

    btn.classList.remove(
      'playing'
    );

    btn.innerHTML =
      '♫ <span>Music</span>';

  }

}


/* =====================================================
   PLAY MUSIC WHEN USER TOUCHES ANYWHERE
===================================================== */

/*
   IMPORTANT:

   Do NOT use { once: true }.

   If Chrome rejects the first attempt,
   the next touch will try again.
*/

document.addEventListener(
  'touchstart',
  () => {

    if (!musicStarted) {
      startMusic();
    }

  },
  {
    passive: true
  }
);


document.addEventListener(
  'pointerdown',
  () => {

    if (!musicStarted) {
      startMusic();
    }

  },
  {
    passive: true
  }
);


document.addEventListener(
  'click',
  () => {

    if (!musicStarted) {
      startMusic();
    }

  }
);


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (btn) {

  btn.addEventListener(
    'click',
    event => {

      event.stopPropagation();

      if (!music) {
        return;
      }

      if (music.paused) {

        startMusic();

      } else {

        stopMusic();

      }

    }
  );

}
