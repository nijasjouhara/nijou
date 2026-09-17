/* =========================================================
   WEDDING WEBSITE — COMPLETE SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const opening = document.getElementById("opening");

    const weddingMusic = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");
    const musicIcon = document.getElementById("musicIcon");

    const heroScroll = document.getElementById("heroScroll");

    const weddingVideo = document.getElementById("weddingVideoPlayer");

    const countdownDays = document.getElementById("days");
    const countdownHours = document.getElementById("hours");
    const countdownMinutes = document.getElementById("minutes");
    const countdownSeconds = document.getElementById("seconds");

    const settingsTrigger = document.getElementById("settingsTrigger");
    const settingsPanel = document.getElementById("settingsPanel");
    const settingsClose = document.getElementById("settingsClose");

    const themeButton = document.getElementById("themeButton");

    const languageButtons =
        document.querySelectorAll(".language-button");

    const touchBlessing =
        document.getElementById("touchBlessing");


    /* =====================================================
       OPENING SCREEN
    ====================================================== */

    let openingClosed = false;

    function closeOpening() {

        if (openingClosed || !opening) {
            return;
        }

        openingClosed = true;

        opening.classList.add("hide");

        startMusic();
        startWeddingVideo();
    }


    /* Close automatically after 3 seconds */

    setTimeout(function () {
        closeOpening();
    }, 3000);


    /* Close on first interaction */

    document.addEventListener(
        "pointerdown",
        function () {
            closeOpening();
        },
        {
            passive: true,
            once: true
        }
    );


    /* =====================================================
       MUSIC
    ====================================================== */

    let musicStarted = false;


    function updateMusicButton() {

        if (!weddingMusic || !musicIcon) {
            return;
        }

        if (!weddingMusic.paused) {
            musicIcon.textContent = "♫";
        } else {
            musicIcon.textContent = "♪";
        }
    }


    function startMusic() {

        if (!weddingMusic) {
            return;
        }

        weddingMusic.volume = 0.55;

        const playPromise = weddingMusic.play();

        if (playPromise !== undefined) {

            playPromise
                .then(function () {

                    musicStarted = true;

                    updateMusicButton();

                })
                .catch(function () {

                    /*
                       Browser autoplay policy may block
                       music until the user interacts.
                    */

                    updateMusicButton();

                });

        } else {

            musicStarted = true;

            updateMusicButton();

        }
    }


    function pauseMusic() {

        if (!weddingMusic) {
            return;
        }

        weddingMusic.pause();

        updateMusicButton();
    }


    function toggleMusic() {

        if (!weddingMusic) {
            return;
        }

        if (weddingMusic.paused) {

            startMusic();

        } else {

            pauseMusic();

        }
    }


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMusic();

            }
        );

    }


    /*
       Start music after the first user interaction.
       This helps with mobile browser autoplay restrictions.
    */

    document.addEventListener(
        "pointerdown",
        function () {

            if (!musicStarted) {
                startMusic();
            }

        },
        {
            passive: true
        }
    );


    if (weddingMusic) {

        weddingMusic.addEventListener(
            "play",
            updateMusicButton
        );

        weddingMusic.addEventListener(
            "pause",
            updateMusicButton
        );

    }


    /* =====================================================
       HERO SCROLL BUTTON
    ====================================================== */

    if (heroScroll) {

        heroScroll.addEventListener(
            "click",
            function () {

                window.scrollBy({
                    top: window.innerHeight * 0.85,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       COUNTDOWN
    ====================================================== */

    const weddingDate =
        new Date("2026-09-21T11:00:00+05:30");


    function updateCountdown() {

        const now = new Date();

        const difference =
            weddingDate.getTime() - now.getTime();


        if (difference <= 0) {

            if (countdownDays) {
                countdownDays.textContent = "00";
            }

            if (countdownHours) {
                countdownHours.textContent = "00";
            }

            if (countdownMinutes) {
                countdownMinutes.textContent = "00";
            }

            if (countdownSeconds) {
                countdownSeconds.textContent = "00";
            }

            return;
        }


        const totalSeconds =
            Math.floor(difference / 1000);


        const days =
            Math.floor(totalSeconds / 86400);


        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        if (countdownDays) {
            countdownDays.textContent =
                String(days).padStart(2, "0");
        }

        if (countdownHours) {
            countdownHours.textContent =
                String(hours).padStart(2, "0");
        }

        if (countdownMinutes) {
            countdownMinutes.textContent =
                String(minutes).padStart(2, "0");
        }

        if (countdownSeconds) {
            countdownSeconds.textContent =
                String(seconds).padStart(2, "0");
        }

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       REVEAL ANIMATION
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       SCREEN WAKE LOCK
    ====================================================== */

    let wakeLock = null;


    async function requestWakeLock() {

        if (!("wakeLock" in navigator)) {
            return;
        }

        try {

            wakeLock =
                await navigator.wakeLock.request("screen");

        } catch (error) {

            console.log(
                "Screen Wake Lock unavailable."
            );

        }

    }


    async function releaseWakeLock() {

        if (!wakeLock) {
            return;
        }

        try {

            await wakeLock.release();

        } catch (error) {

            console.log(
                "Wake Lock release failed."
            );

        }

        wakeLock = null;

    }


    /*
       Try to keep the screen awake while the page
       is being viewed.
    */

    requestWakeLock();


    /*
       Re-request wake lock when the user returns
       to the page.
    */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState === "visible"
            ) {

                requestWakeLock();

            } else {

                releaseWakeLock();

            }

        }
    );


    /* =====================================================
       WEDDING VIDEO
       FILE: save_the_date.mp4
    ====================================================== */

    function startWeddingVideo() {

        if (!weddingVideo) {
            return;
        }


        /*
           Muted autoplay is more likely to be
           permitted by mobile browsers.
        */

        weddingVideo.muted = true;

        weddingVideo.setAttribute(
            "muted",
            ""
        );

        weddingVideo.setAttribute(
            "playsinline",
            ""
        );


        const playPromise =
            weddingVideo.play();


        if (playPromise !== undefined) {

            playPromise
                .then(function () {

                    console.log(
                        "Wedding video playing."
                    );

                })
                .catch(function () {

                    /*
                       If autoplay is blocked,
                       the next user interaction will
                       try again.
                    */

                    console.log(
                        "Wedding video waiting for user interaction."
                    );

                });

        }

    }


    function pauseWeddingVideo() {

        if (!weddingVideo) {
            return;
        }

        weddingVideo.pause();

    }


    /*
       Initial attempt
    */

    startWeddingVideo();


    /*
       Try again after user interaction.
       This is especially useful on mobile browsers.
    */

    document.addEventListener(
        "pointerdown",
        function () {

            startWeddingVideo();

        },
        {
            passive: true
        }
    );


    /*
       When page becomes hidden, pause video.
       When page becomes visible again, resume it.
    */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                !weddingVideo
            ) {
                return;
            }


            if (
                document.visibilityState === "visible"
            ) {

                startWeddingVideo();

            } else {

                pauseWeddingVideo();

            }

        }
    );


    /*
       If video encounters a temporary playback
       problem, try again after interaction.
    */

    if (weddingVideo) {

        weddingVideo.addEventListener(
            "error",
            function () {

                console.log(
                    "Unable to load wedding video."
                );

            }
        );

    }


    /* =====================================================
       SLOW AUTO SCROLL
    ====================================================== */

    let autoScrollEnabled = true;

    let autoScrollStarted = false;

    let userInteracting = false;

    let resumeTimer = null;

    let autoScrollAnimation = null;


    /*
       Speed in pixels per frame.
       Kept intentionally slow.
    */

    const AUTO_SCROLL_SPEED = 0.65;


    function isAtBottom() {

        const scrollPosition =
            window.innerHeight +
            window.scrollY;


        const pageHeight =
            document.documentElement.scrollHeight;


        return (
            scrollPosition >=
            pageHeight - 3
        );

    }


    function stopAutoScroll() {

        autoScrollEnabled = false;

        if (autoScrollAnimation) {

            cancelAnimationFrame(
                autoScrollAnimation
            );

            autoScrollAnimation = null;

        }

    }


    function autoScrollStep() {

        if (
            !autoScrollEnabled ||
            userInteracting
        ) {

            autoScrollAnimation = null;

            return;

        }


        if (isAtBottom()) {

            stopAutoScroll();

            return;

        }


        window.scrollBy(
            0,
            AUTO_SCROLL_SPEED
        );


        autoScrollAnimation =
            requestAnimationFrame(
                autoScrollStep
            );

    }


    function startAutoScroll() {

        if (
            autoScrollStarted ||
            !autoScrollEnabled
        ) {
            return;
        }

        autoScrollStarted = true;

        autoScrollAnimation =
            requestAnimationFrame(
                autoScrollStep
            );

    }


    function pauseAutoScroll() {

        userInteracting = true;


        if (autoScrollAnimation) {

            cancelAnimationFrame(
                autoScrollAnimation
            );

            autoScrollAnimation = null;

        }


        if (resumeTimer) {

            clearTimeout(
                resumeTimer
            );

        }


        /*
           Resume after 4 seconds without interaction.
        */

        resumeTimer =
            setTimeout(
                function () {

                    userInteracting = false;

                    if (
                        !isAtBottom()
                    ) {

                        autoScrollEnabled = true;
                        autoScrollStarted = false;

                        startAutoScroll();

                    }

                },
                4000
            );

    }


    /*
       Start automatic scrolling after
       the visitor has had time to view the opening.
    */

    setTimeout(
        function () {

            if (
                !isAtBottom()
            ) {

                startAutoScroll();

            }

        },
        5000
    );


    /*
       Touch / pointer interaction pauses
       automatic scrolling.
    */

    document.addEventListener(
        "touchstart",
        function (event) {

            /*
               Do not treat video interaction
               as a page scroll interaction.
            */

            if (
                event.target.closest(
                    ".wedding-video"
                )
            ) {
                return;
            }


            pauseAutoScroll();

        },
        {
            passive: true
        }
    );


    /*
       Wheel scrolling pauses auto-scroll.
    */

    window.addEventListener(
        "wheel",
        function () {

            pauseAutoScroll();

        },
        {
            passive: true
        }
    );


    /*
       Keyboard interaction pauses auto-scroll.
    */

    window.addEventListener(
        "keydown",
        function () {

            pauseAutoScroll();

        }
    );


    /*
       If the user manually scrolls to the bottom,
       stop automatic scrolling.
    */

    window.addEventListener(
        "scroll",
        function () {

            if (isAtBottom()) {

                stopAutoScroll();

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       LANGUAGE
    ====================================================== */

    languageButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    languageButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const selectedLanguage =
                        button.dataset.lang;


                    document.documentElement
                        .setAttribute(
                            "lang",
                            selectedLanguage
                        );


                    /*
                       The current website content remains
                       in its original language. This setting
                       prepares the interface for language
                       switching without breaking the layout.
                    */

                    try {

                        localStorage.setItem(
                            "weddingLanguage",
                            selectedLanguage
                        );

                    } catch (error) {

                        console.log(
                            "Language preference could not be saved."
                        );

                    }

                }
            );

        }
    );


    /*
       Restore saved language button state.
    */

    try {

        const savedLanguage =
            localStorage.getItem(
                "weddingLanguage"
            );


        if (savedLanguage) {

            languageButtons.forEach(
                function (button) {

                    button.classList.toggle(
                        "active",
                        button.dataset.lang ===
                        savedLanguage
                    );

                }
            );


            document.documentElement
                .setAttribute(
                    "lang",
                    savedLanguage
                );

        }

    } catch (error) {

        console.log(
            "Saved language unavailable."
        );

    }


    /* =====================================================
       SETTINGS PANEL
    ====================================================== */

    function openSettings() {

        if (!settingsPanel) {
            return;
        }

        settingsPanel.classList.add(
            "open"
        );

        settingsPanel.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeSettings() {

        if (!settingsPanel) {
            return;
        }

        settingsPanel.classList.remove(
            "open"
        );

        settingsPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (settingsTrigger) {

        settingsTrigger.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                if (
                    settingsPanel &&
                    settingsPanel.classList.contains(
                        "open"
                    )
                ) {

                    closeSettings();

                } else {

                    openSettings();

                }

            }
        );

    }


    if (settingsClose) {

        settingsClose.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                closeSettings();

            }
        );

    }


    /*
       Clicking outside settings closes it.
    */

    document.addEventListener(
        "click",
        function (event) {

            if (!settingsPanel) {
                return;
            }


            if (
                settingsPanel.classList.contains(
                    "open"
                )
            ) {

                if (
                    !settingsPanel.contains(
                        event.target
                    ) &&
                    !settingsTrigger.contains(
                        event.target
                    )
                ) {

                    closeSettings();

                }

            }

        }
    );


    /* =====================================================
       THEME
    ====================================================== */

    let darkTheme = false;


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                darkTheme = !darkTheme;

                document.body.classList.toggle(
                    "dark-theme",
                    darkTheme
                );


                try {

                    localStorage.setItem(
                        "weddingTheme",
                        darkTheme
                            ? "dark"
                            : "light"
                    );

                } catch (error) {

                    console.log(
                        "Theme preference could not be saved."
                    );

                }

            }
        );

    }


    /*
       Restore theme preference.
    */

    try {

        const savedTheme =
            localStorage.getItem(
                "weddingTheme"
            );


        if (savedTheme === "dark") {

            darkTheme = true;

            document.body.classList.add(
                "dark-theme"
            );

        }

    } catch (error) {

        console.log(
            "Saved theme unavailable."
        );

    }


    /* =====================================================
       BARAKALLAH TOUCH EFFECT
    ====================================================== */

    function createFloatingHeart(
        x,
        y
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.className =
            "floating-heart";


        const symbols = [
            "♡",
            "✦",
            "✧",
            "⋆"
        ];


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.left =
            x + "px";


        heart.style.top =
            y + "px";


        document.body.appendChild(
            heart
        );


        setTimeout(
            function () {

                heart.remove();

            },
            1900
        );

    }


    function createBlessingEffect(
        x,
        y
    ) {

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const offsetX =
                (Math.random() - 0.5) *
                50;


            const offsetY =
                (Math.random() - 0.5) *
                25;


            createFloatingHeart(
                x + offsetX,
                y + offsetY
            );

        }

    }


    if (touchBlessing) {

        touchBlessing.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const rect =
                    touchBlessing.getBoundingClientRect();


                createBlessingEffect(
                    rect.left +
                    rect.width / 2,

                    rect.top
                );

            }
        );

    }


    /*
       General touch blessing effect.
       Buttons, links, settings and video are excluded.
    */

    document.addEventListener(
        "pointerdown",
        function (event) {

            if (
                event.target.closest("button") ||
                event.target.closest("a") ||
                event.target.closest("input") ||
                event.target.closest(".settings-panel") ||
                event.target.closest(".wedding-video")
            ) {

                return;

            }


            /*
               Very subtle effect on normal
               page interaction.
            */

            createBlessingEffect(
                event.clientX,
                event.clientY
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       VIDEO LOAD CHECK
    ====================================================== */

    if (weddingVideo) {

        weddingVideo.addEventListener(
            "loadedmetadata",
            function () {

                console.log(
                    "Wedding video loaded successfully."
                );

            }
        );

    }


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    updateMusicButton();

    requestWakeLock();

    startWeddingVideo();

});
