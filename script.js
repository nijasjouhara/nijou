/* =====================================================
   WEDDING INVITATION — COMPLETE SCRIPT
===================================================== */


/* =====================================================
   OPENING
===================================================== */

const opening =
    document.getElementById("opening");


function closeOpening(){

    if(opening){

        opening.classList.add("hide");

    }

}


/*
   Automatically hide opening after 3 seconds.
*/

setTimeout(
    closeOpening,
    3000
);


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("weddingMusic");

const musicBtn =
    document.getElementById("musicBtn");

const panelMusicBtn =
    document.getElementById("panelMusicBtn");

const volumeControl =
    document.getElementById("volumeControl");


let musicStarted = false;


/*
   Start music after user interaction.

   Browser autoplay policy requires
   a user interaction before audio can play.
*/

async function startMusic(){

    if(!music){

        return;

    }


    if(musicStarted){

        return;

    }


    try{

        music.volume = 0.55;

        await music.play();

        musicStarted = true;

        updateMusicButtons();

    }

    catch(error){

        console.log(
            "Music waiting for user interaction."
        );

    }

}


/*
   Synchronize both music buttons.
*/

function updateMusicButtons(){

    if(!music){

        return;

    }


    if(music.paused){

        if(musicBtn){

            musicBtn.innerHTML = "♪";

        }


        if(panelMusicBtn){

            panelMusicBtn.innerHTML = "▶";

        }

    }

    else{

        if(musicBtn){

            musicBtn.innerHTML = "❚❚";

        }


        if(panelMusicBtn){

            panelMusicBtn.innerHTML = "❚❚";

        }

    }

}


/*
   First pointer interaction.

   This handles:
   - Music
   - Opening close
   - Wake lock
*/

document.addEventListener(
    "pointerdown",
    function(){

        closeOpening();

        startMusic();

        requestWakeLock();

    },
    {
        passive:true
    }
);


/*
   Additional mobile touch support.
*/

document.addEventListener(
    "touchstart",
    function(){

        closeOpening();

        startMusic();

        requestWakeLock();

    },
    {
        passive:true
    }
);


/* =====================================================
   MAIN MUSIC BUTTON
===================================================== */

if(musicBtn){

    musicBtn.addEventListener(
        "click",
        function(event){

            event.stopPropagation();


            if(!music){

                return;

            }


            if(music.paused){

                music.play()
                    .then(
                        function(){

                            musicStarted = true;

                            updateMusicButtons();

                        }
                    )
                    .catch(
                        function(error){

                            console.log(error);

                        }
                    );

            }

            else{

                music.pause();

                updateMusicButtons();

            }

        }
    );

}


/* =====================================================
   MUSIC EVENTS
===================================================== */

if(music){

    music.addEventListener(
        "play",
        function(){

            musicStarted = true;

            updateMusicButtons();

        }
    );


    music.addEventListener(
        "pause",
        function(){

            updateMusicButtons();

        }
    );

}


/* =====================================================
   HERO SCROLL BUTTON
===================================================== */

const heroScroll =
    document.getElementById("heroScroll");


if(heroScroll){

    heroScroll.addEventListener(
        "click",
        function(event){

            event.stopPropagation();


            window.scrollBy({

                top:
                    window.innerHeight * 0.85,

                behavior:"smooth"

            });

        }
    );

}


/* =====================================================
   COUNTDOWN
===================================================== */


/*
   Wedding / Nikah:
   21 September 2026
   11:00 AM
   India Standard Time (+05:30)
*/

const weddingDate =
    new Date(
        "2026-09-21T11:00:00+05:30"
    ).getTime();


function updateCountdown(){

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if(
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ){

        return;

    }


    const now =
        new Date().getTime();


    let distance =
        weddingDate - now;


    /*
       Once the wedding time has passed,
       keep the countdown at zero.
    */

    if(distance < 0){

        distance = 0;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                distance /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                distance /
                1000
            ) % 60
        );


    daysElement.textContent =
        String(days)
            .padStart(2,"0");


    hoursElement.textContent =
        String(hours)
            .padStart(2,"0");


    minutesElement.textContent =
        String(minutes)
            .padStart(2,"0");


    secondsElement.textContent =
        String(seconds)
            .padStart(2,"0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


/*
   If IntersectionObserver is available,
   animate sections when they enter the screen.
*/

if("IntersectionObserver" in window){

    const observer =
        new IntersectionObserver(

            function(entries){

                entries.forEach(
                    function(entry){

                        if(
                            entry.isIntersecting
                        ){

                            entry.target
                                .classList
                                .add("show");

                        }

                    }
                );

            },

            {
                threshold:0.12
            }

        );


    revealElements.forEach(
        function(element){

            observer.observe(element);

        }
    );

}

else{

    /*
       Fallback for older browsers.
    */

    revealElements.forEach(
        function(element){

            element.classList.add("show");

        }
    );

}


/* =====================================================
   SCREEN WAKE LOCK
===================================================== */

let wakeLock = null;


async function requestWakeLock(){

    try{

        if(
            "wakeLock" in navigator
        ){

            wakeLock =
                await navigator
                    .wakeLock
                    .request("screen");


            /*
               If the browser releases the lock,
               clear the reference.
            */

            wakeLock.addEventListener(
                "release",
                function(){

                    wakeLock = null;

                }
            );

        }

    }

    catch(error){

        console.log(
            "Wake Lock unavailable."
        );

    }

}


/*
   Re-enable screen wake lock
   when the page becomes visible again.
*/

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.visibilityState ===
            "visible"
        ){

            requestWakeLock();

        }

    }
);


/* =====================================================
   AUTO SCROLL
===================================================== */


/*
   Auto-scroll is enabled by default.

   User interaction pauses it.
*/

let autoScrolling = true;

let resumeTimer = null;


/*
   Very slow scrolling speed.
*/

const scrollSpeed = 0.65;


/*
   Delay before automatic scrolling begins.
*/

const autoScrollStartDelay = 5000;


/*
   Resume after 4 seconds without interaction.
*/

const autoScrollResumeDelay = 4000;


/*
   Pause automatic scrolling.
*/

function pauseAutoScroll(){

    autoScrolling = false;


    clearTimeout(
        resumeTimer
    );


    resumeTimer =
        setTimeout(
            function(){

                /*
                   Only resume if the user
                   is still on the page.
                */

                if(
                    document.visibilityState ===
                    "visible"
                ){

                    autoScrolling = true;

                    requestAnimationFrame(
                        autoScroll
                    );

                }

            },
            autoScrollResumeDelay
        );

}


/* =====================================================
   USER INTERACTION EVENTS
===================================================== */

window.addEventListener(
    "touchstart",
    pauseAutoScroll,
    {
        passive:true
    }
);


window.addEventListener(
    "touchmove",
    pauseAutoScroll,
    {
        passive:true
    }
);


window.addEventListener(
    "wheel",
    pauseAutoScroll,
    {
        passive:true
    }
);


window.addEventListener(
    "pointerdown",
    pauseAutoScroll,
    {
        passive:true
    }
);


/*
   Keyboard scrolling also counts as
   manual interaction.
*/

window.addEventListener(
    "keydown",
    function(event){

        const keys = [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " "
        ];


        if(
            keys.includes(event.key)
        ){

            pauseAutoScroll();

        }

    }
);


/* =====================================================
   AUTOMATIC SCROLL LOOP
===================================================== */

function autoScroll(){

    /*
       Keep animation loop alive while paused.
    */

    if(!autoScrolling){

        requestAnimationFrame(
            autoScroll
        );

        return;

    }


    /*
       Calculate current and maximum scroll.
    */

    const current =
        window.scrollY;


    const maxScroll =
        document.documentElement
            .scrollHeight
        -
        window.innerHeight;


    /*
       Stop permanently at the bottom.
    */

    if(
        maxScroll <= 0
    ){

        requestAnimationFrame(
            autoScroll
        );

        return;

    }


    if(
        current >=
        maxScroll - 2
    ){

        autoScrolling = false;

        return;

    }


    /*
       Scroll very slowly.
    */

    window.scrollBy(
        0,
        scrollSpeed
    );


    requestAnimationFrame(
        autoScroll
    );

}


/*
   Wait before starting auto-scroll.
*/

setTimeout(
    function(){

        /*
           Don't start while the settings
           panel is open or page is hidden.
        */

        if(
            document.visibilityState ===
            "visible"
        ){

            autoScrolling = true;

            requestAnimationFrame(
                autoScroll
            );

        }

    },
    autoScrollStartDelay
);


/* =====================================================
   LANGUAGE SWITCHER
===================================================== */

const translations = {

    en: {

        settings:
            "Settings",

        language:
            "Language",

        theme:
            "Theme",

        music:
            "Music",

        madeWithLove:
            "MADE WITH LOVE",

        countdownLabel:
            "THE COUNTDOWN",

        countdownTitle:
            "Until Our Nikah",

        countdownDescription:
            "A beautiful day is approaching. We look forward to celebrating this blessed beginning with you.",

        joinUs:
            "JOIN US",

        specialDay:
            "Our Special Day",

        nikah:
            "Nikah",

        reception:
            "Reception",

        eventDate:
            "Monday · 21 September 2026",

        nikahTime:
            "11:00 AM",

        receptionTime:
            "4:00 PM",

        nikahPlace:
            "Chazhiyode Juma Masjid",

        receptionPlace:
            "Pleasent Auditorium<br>Pandikkad",

        openLocation:
            "Open Location",

        addReminder:
            "🔔 Add Reminder",

        beautifulBeginning:
            "A BEAUTIFUL BEGINNING",

        ourMoments:
            "Our Moments",

        presenceMatters:
            "YOUR PRESENCE MATTERS",

        confirmPresence:
            "Confirm Your Presence"

    },


    ml: {

        settings:
            "ക്രമീകരണങ്ങൾ",

        language:
            "ഭാഷ",

        theme:
            "തീം",

        music:
            "സംഗീതം",

        madeWithLove:
            "സ്നേഹത്തോടെ ഒരുക്കിയത്",

        countdownLabel:
            "കാത്തിരിപ്പ്",

        countdownTitle:
            "നമ്മുടെ നിക്കാഹിലേക്ക്",

        countdownDescription:
            "അനുഗ്രഹീതമായ ഈ പുതിയ തുടക്കത്തിനായി ഞങ്ങൾ കാത്തിരിക്കുന്നു. ഈ സന്തോഷദിനം നിങ്ങളോടൊപ്പം ആഘോഷിക്കാൻ ആഗ്രഹിക്കുന്നു.",

        joinUs:
            "ഞങ്ങളോടൊപ്പം ചേരുക",

        specialDay:
            "ഞങ്ങളുടെ വിശേഷദിനം",

        nikah:
            "നിക്കാഹ്",

        reception:
            "റിസപ്ഷൻ",

        eventDate:
            "തിങ്കൾ · 21 സെപ്റ്റംബർ 2026",

        nikahTime:
            "രാവിലെ 11:00",

        receptionTime:
            "വൈകിട്ട് 4:00",

        nikahPlace:
            "ചാഴിയോട് ജുമാ മസ്ജിദ്",

        receptionPlace:
            "പ്ലീസന്റ് ഓഡിറ്റോറിയം<br>പാണ്ടിക്കാട്",

        openLocation:
            "ലൊക്കേഷൻ കാണുക",

        addReminder:
            "🔔 റിമൈൻഡർ ചേർക്കുക",

        beautifulBeginning:
            "മനോഹരമായൊരു തുടക്കം",

        ourMoments:
            "ഞങ്ങളുടെ നിമിഷങ്ങൾ",

        presenceMatters:
            "നിങ്ങളുടെ സാന്നിധ്യം വിലപ്പെട്ടതാണ്",

        confirmPresence:
            "സാന്നിധ്യം സ്ഥിരീകരിക്കുക"

    },


    ar: {

        settings:
            "الإعدادات",

        language:
            "اللغة",

        theme:
            "المظهر",

        music:
            "الموسيقى",

        madeWithLove:
            "صُمِّمَ بِحُب",

        countdownLabel:
            "العد التنازلي",

        countdownTitle:
            "حتى نكاحنا",

        countdownDescription:
            "يقترب يوم جميل. نتطلع إلى الاحتفال معكم بهذه البداية المباركة.",

        joinUs:
            "انضموا إلينا",

        specialDay:
            "يومنا المميز",

        nikah:
            "النكاح",

        reception:
            "الاستقبال",

        eventDate:
            "الاثنين · 21 سبتمبر 2026",

        nikahTime:
            "11:00 صباحًا",

        receptionTime:
            "4:00 مساءً",

        nikahPlace:
            "مسجد جومعة تشازهيود",

        receptionPlace:
            "قاعة بليزنت<br>باندِكّاد",

        openLocation:
            "فتح الموقع",

        addReminder:
            "🔔 إضافة تذكير",

        beautifulBeginning:
            "بداية جميلة",

        ourMoments:
            "لحظاتنا",

        presenceMatters:
            "حضوركم يعني لنا الكثير",

        confirmPresence:
            "تأكيد الحضور"

    }

};


/* =====================================================
   SETTINGS ELEMENTS
===================================================== */

const settingsOpen =
    document.getElementById(
        "settingsOpen"
    );

const settingsClose =
    document.getElementById(
        "settingsClose"
    );

const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );

const settingsBackdrop =
    document.getElementById(
        "settingsBackdrop"
    );


/* =====================================================
   SETTINGS OPEN / CLOSE
===================================================== */

function openSettings(){

    if(settingsPanel){

        settingsPanel.classList.add(
            "show"
        );

    }


    if(settingsBackdrop){

        settingsBackdrop.classList.add(
            "show"
        );

    }


    /*
       Pause auto-scroll while
       settings are open.
    */

    autoScrolling = false;

}


function closeSettings(){

    if(settingsPanel){

        settingsPanel.classList.remove(
            "show"
        );

    }


    if(settingsBackdrop){

        settingsBackdrop.classList.remove(
            "show"
        );

    }


    /*
       Resume after normal delay.
    */

    pauseAutoScroll();

}


/* =====================================================
   SETTINGS BUTTON
===================================================== */

if(settingsOpen){

    settingsOpen.addEventListener(
        "click",
        function(event){

            event.stopPropagation();

            openSettings();

        }
    );

}


if(settingsClose){

    settingsClose.addEventListener(
        "click",
        function(event){

            event.stopPropagation();

            closeSettings();

        }
    );

}


if(settingsBackdrop){

    settingsBackdrop.addEventListener(
        "click",
        function(){

            closeSettings();

        }
    );

}


/* =====================================================
   ESCAPE TO CLOSE SETTINGS
===================================================== */

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape"
        ){

            closeSettings();

        }

    }
);


/* =====================================================
   LANGUAGE
===================================================== */

function applyLanguage(lang){

    const t =
        translations[lang] ||
        translations.en;


    /*
       Set HTML language.
    */

    document.documentElement.lang =
        lang;


    /*
       Arabic uses RTL.
    */

    document.documentElement.dir =
        lang === "ar"
            ? "rtl"
            : "ltr";


    /*
       Update all translated elements.
    */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(
            function(element){

                const key =
                    element.dataset.i18n;


                if(
                    t[key] !== undefined
                ){

                    element.innerHTML =
                        t[key];

                }

            }
        );


    /*
       Settings headings.
    */

    const settingsHeading =
        document.getElementById(
            "settingsHeading"
        );


    const languageLabel =
        document.getElementById(
            "languageLabel"
        );


    const themeLabel =
        document.getElementById(
            "themeLabel"
        );


    const musicLabel =
        document.getElementById(
            "musicLabel"
        );


    const madeWithLove =
        document.getElementById(
            "madeWithLove"
        );


    if(settingsHeading){

        settingsHeading.textContent =
            t.settings;

    }


    if(languageLabel){

        languageLabel.textContent =
            t.language;

    }


    if(themeLabel){

        themeLabel.textContent =
            t.theme;

    }


    if(musicLabel){

        musicLabel.textContent =
            t.music;

    }


    if(madeWithLove){

        madeWithLove.textContent =
            t.madeWithLove;

    }


    /*
       Highlight selected language.
    */

    document
        .querySelectorAll("[data-language]")
        .forEach(
            function(button){

                button.classList.toggle(
                    "active",
                    button.dataset.language ===
                    lang
                );

            }
        );


    /*
       Remember language.
    */

    localStorage.setItem(
        "weddingLanguage",
        lang
    );

}


/* =====================================================
   LANGUAGE BUTTONS
===================================================== */

document
    .querySelectorAll("[data-language]")
    .forEach(
        function(button){

            button.addEventListener(
                "click",
                function(event){

                    event.stopPropagation();


                    applyLanguage(
                        button.dataset.language
                    );

                }
            );

        }
    );


/*
   Load saved language.
*/

applyLanguage(
    localStorage.getItem(
        "weddingLanguage"
    ) || "en"
);


/* =====================================================
   THEME
===================================================== */

function applyTheme(theme){

    const root =
        document.documentElement;


    /*
       Dark theme.
    */

    if(theme === "dark"){

        root.style.setProperty(
            "--cream",
            "#171914"
        );


        root.style.setProperty(
            "--cream-light",
            "#211f19"
        );


        root.style.setProperty(
            "--dark-text",
            "#f3ead8"
        );


        root.style.setProperty(
            "--soft-text",
            "#b7ad9d"
        );

    }


    /*
       Light theme.
    */

    else if(theme === "light"){

        root.style.removeProperty(
            "--cream"
        );


        root.style.removeProperty(
            "--cream-light"
        );


        root.style.removeProperty(
            "--dark-text"
        );


        root.style.removeProperty(
            "--soft-text"
        );

    }


    /*
       System theme.

       Detect the device/browser
       color scheme.
    */

    else{

        root.style.removeProperty(
            "--cream"
        );


        root.style.removeProperty(
            "--cream-light"
        );


        root.style.removeProperty(
            "--dark-text"
        );


        root.style.removeProperty(
            "--soft-text"
        );

    }


    /*
       Highlight selected theme.
    */

    document
        .querySelectorAll("[data-theme]")
        .forEach(
            function(button){

                button.classList.toggle(
                    "active",
                    button.dataset.theme ===
                    theme
                );

            }
        );


    /*
       Remember theme.
    */

    localStorage.setItem(
        "weddingTheme",
        theme
    );

}


/* =====================================================
   SYSTEM THEME CHANGE
===================================================== */

const systemThemeQuery =
    window.matchMedia
        ? window.matchMedia(
            "(prefers-color-scheme: dark)"
        )
        : null;


if(systemThemeQuery){

    const savedTheme =
        localStorage.getItem(
            "weddingTheme"
        );


    if(
        savedTheme === "system" ||
        !savedTheme
    ){

        /*
           No custom variable override is
           required because system mode
           uses the default theme.
        */

        systemThemeQuery.addEventListener(
            "change",
            function(){

                if(
                    localStorage.getItem(
                        "weddingTheme"
                    ) === "system"
                ){

                    applyTheme("system");

                }

            }
        );

    }

}


/* =====================================================
   THEME BUTTONS
===================================================== */

document
    .querySelectorAll("[data-theme]")
    .forEach(
        function(button){

            button.addEventListener(
                "click",
                function(event){

                    event.stopPropagation();


                    applyTheme(
                        button.dataset.theme
                    );

                }
            );

        }
    );


/*
   Load saved theme.
*/

applyTheme(
    localStorage.getItem(
        "weddingTheme"
    ) || "system"
);


/* =====================================================
   PANEL MUSIC BUTTON
===================================================== */

if(panelMusicBtn){

    panelMusicBtn.addEventListener(
        "click",
        function(event){

            event.stopPropagation();


            if(!music){

                return;

            }


            if(music.paused){

                music.play()
                    .then(
                        function(){

                            musicStarted = true;

                            updateMusicButtons();

                        }
                    )
                    .catch(
                        function(error){

                            console.log(error);

                        }
                    );

            }

            else{

                music.pause();

                updateMusicButtons();

            }

        }
    );

}


/* =====================================================
   VOLUME CONTROL
===================================================== */

if(volumeControl){

    volumeControl.addEventListener(
        "input",
        function(){

            if(music){

                music.volume =
                    Number(
                        volumeControl.value
                    );

            }

        }
    );

}


/* =====================================================
   TOUCH BAARAKALLAH
===================================================== */

const touchBlessing =
    document.getElementById(
        "touchBlessing"
    );


let blessingTimer = null;


/* =====================================================
   CREATE TOUCH DECORATION
===================================================== */

function createTouchDecoration(
    x,
    y,
    symbol,
    type,
    driftX,
    driftY,
    rotate
){

    const heart =
        document.createElement(
            "span"
        );


    heart.className =
        "touch-heart " +
        type;


    heart.textContent =
        symbol;


    heart.style.left =
        x + "px";


    heart.style.top =
        y + "px";


    heart.style.setProperty(
        "--drift-x",
        driftX + "px"
    );


    heart.style.setProperty(
        "--drift-y",
        driftY + "px"
    );


    heart.style.setProperty(
        "--rotate",
        rotate + "deg"
    );


    /*
       Random gold / green appearance.
    */

    if(Math.random() > 0.45){

        heart.classList.add(
            "gold"
        );

    }

    else{

        heart.classList.add(
            "green"
        );

    }


    document.body.appendChild(
        heart
    );


    /*
       Remove after animation.
    */

    setTimeout(
        function(){

            heart.remove();

        },
        1600
    );

}


/* =====================================================
   SHOW TOUCH BLESSING
===================================================== */

function showTouchBlessing(
    x,
    y
){

    if(!touchBlessing){

        return;

    }


    clearTimeout(
        blessingTimer
    );


    /*
       Reset animation.
    */

    touchBlessing.classList.remove(
        "show"
    );


    void touchBlessing.offsetWidth;


    /*
       Position blessing.
    */

    touchBlessing.style.left =
        x + "px";


    touchBlessing.style.top =
        y + "px";


    touchBlessing.classList.add(
        "show"
    );


    /*
       Floating hearts.
    */

    createTouchDecoration(
        x,
        y,
        "♡",
        "heart",
        -62,
        -48,
        -15
    );


    createTouchDecoration(
        x,
        y,
        "♡",
        "heart",
        62,
        -50,
        15
    );


    /*
       Sparkles.
    */

    createTouchDecoration(
        x,
        y,
        "✦",
        "sparkle",
        -78,
        -8,
        -12
    );


    createTouchDecoration(
        x,
        y,
        "✦",
        "sparkle",
        78,
        -10,
        12
    );


    createTouchDecoration(
        x,
        y,
        "✧",
        "sparkle",
        -45,
        45,
        -8
    );


    createTouchDecoration(
        x,
        y,
        "✧",
        "sparkle",
        48,
        43,
        10
    );


    createTouchDecoration(
        x,
        y,
        "♡",
        "heart",
        -28,
        -70,
        -12
    );


    createTouchDecoration(
        x,
        y,
        "♡",
        "heart",
        30,
        -70,
        12
    );


    /*
       Hide main blessing.
    */

    blessingTimer =
        setTimeout(
            function(){

                touchBlessing.classList.remove(
                    "show"
                );

            },
            1650
        );

}


/* =====================================================
   TOUCH BLESSING EVENT
===================================================== */

document.addEventListener(
    "pointerdown",
    function(event){

        /*
           Don't trigger the Barakallah
           animation on controls.
        */

        if(
            event.target.closest("button") ||
            event.target.closest("a") ||
            event.target.closest("input") ||
            event.target.closest(".settings-panel")
        ){

            return;

        }


        showTouchBlessing(
            event.clientX,
            event.clientY
        );

    },
    {
        passive:true
    }
);


/* =====================================================
   PAGE LOAD SAFETY
===================================================== */

window.addEventListener(
    "load",
    function(){

        /*
           Make sure music controls
           start synchronized.
        */

        updateMusicButtons();


        /*
           Request wake lock once page
           has loaded, if supported.
        */

        if(
            document.visibilityState ===
            "visible"
        ){

            requestWakeLock();

        }

    }
);


/* =====================================================
   PAGE VISIBILITY
===================================================== */

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.visibilityState ===
            "hidden"
        ){

            /*
               Stop automatic scrolling while
               the page is not visible.
            */

            autoScrolling = false;

        }

        else{

            /*
               Restore normal auto-scroll behavior
               after the normal interaction delay.
            */

            pauseAutoScroll();


            requestWakeLock();

        }

    }
);
