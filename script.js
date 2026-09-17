/* =====================================================
   WEDDING INVITATION
   COMPLETE JAVASCRIPT
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
   Automatically close opening after 3 seconds.
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


/* =====================================================
   START MUSIC
===================================================== */

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


/* =====================================================
   MUSIC BUTTON SYNC
===================================================== */

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


/* =====================================================
   FIRST USER INTERACTION
===================================================== */

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
   HERO SCROLL
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


/* =====================================================
   VISIBILITY / WAKE LOCK
===================================================== */

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

let autoScrolling = true;

let resumeTimer = null;


const scrollSpeed =
    0.65;


const autoScrollStartDelay =
    5000;


const autoScrollResumeDelay =
    4000;


/* =====================================================
   PAUSE AUTO SCROLL
===================================================== */

function pauseAutoScroll(){

    autoScrolling = false;


    clearTimeout(
        resumeTimer
    );


    resumeTimer =
        setTimeout(
            function(){

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
   USER SCROLL / TOUCH
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
   AUTO SCROLL LOOP
===================================================== */

function autoScroll(){

    if(!autoScrolling){

        requestAnimationFrame(
            autoScroll
        );

        return;

    }


    const current =
        window.scrollY;


    const maxScroll =
        document.documentElement
            .scrollHeight
        -
        window.innerHeight;


    if(maxScroll <= 0){

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


    window.scrollBy(
        0,
        scrollSpeed
    );


    requestAnimationFrame(
        autoScroll
    );

}


/* =====================================================
   START AUTO SCROLL
===================================================== */

setTimeout(
    function(){

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
   TRANSLATIONS
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
   OPEN SETTINGS
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


    autoScrolling = false;

}


/* =====================================================
   CLOSE SETTINGS
===================================================== */

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


    pauseAutoScroll();

}


/* =====================================================
   SETTINGS EVENTS
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
   ESCAPE KEY
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
   APPLY LANGUAGE
===================================================== */

function applyLanguage(lang){

    const t =
        translations[lang] ||
        translations.en;


    document.documentElement.lang =
        lang;


    document.documentElement.dir =
        lang === "ar"
            ? "rtl"
            : "ltr";


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


    localStorage.setItem(
        "weddingTheme",
        theme
    );

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


applyTheme(
    localStorage.getItem(
        "weddingTheme"
    ) || "system"
);


/* =====================================================
   PANEL MUSIC
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
   VOLUME
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
   TOUCH BARAKALLAH
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


    setTimeout(
        function(){

            heart.remove();

        },
        1600
    );

}


/* =====================================================
   SHOW TOUCH BARAKALLAH
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


    touchBlessing.classList.remove(
        "show"
    );


    void touchBlessing.offsetWidth;


    touchBlessing.style.left =
        x + "px";


    touchBlessing.style.top =
        y + "px";


    touchBlessing.classList.add(
        "show"
    );


    /*
       Small surrounding decorations.
    */

    createTouchDecoration(
        x,
        y,
        "♡",
        "heart",
        -38,
        -30,
        -15
    );


    createTouchDecoration(
        x,
        y,
        "♡",
        "heart",
        38,
        -32,
        15
    );


    createTouchDecoration(
        x,
        y,
        "✦",
        "sparkle",
        -50,
        -5,
        -12
    );


    createTouchDecoration(
        x,
        y,
        "✦",
        "sparkle",
        50,
        -7,
        12
    );


    createTouchDecoration(
        x,
        y,
        "✧",
        "sparkle",
        -30,
        30,
        -8
    );


    createTouchDecoration(
        x,
        y,
        "✧",
        "sparkle",
        32,
        29,
        10
    );


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
           Don't show Barakallah on
           buttons, links, inputs or settings.
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
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    function(){

        updateMusicButtons();

        requestWakeLock();

    }
);


/* =====================================================
   VISIBILITY / AUTO SCROLL
===================================================== */

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.visibilityState ===
            "hidden"
        ){

            autoScrolling = false;

        }

        else{

            pauseAutoScroll();

            requestWakeLock();

        }

    }
);
