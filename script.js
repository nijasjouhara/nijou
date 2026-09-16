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
   Opening automatically disappears
   after 3 seconds.
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


let musicStarted = false;


/*
   First touch anywhere on the page
   attempts to start the music.
*/

async function startMusic(){

    if(musicStarted){

        return;

    }


    try{

        music.volume = 0.55;

        await music.play();

        musicStarted = true;

        musicBtn.innerHTML = "❚❚";

    }

    catch(error){

        console.log(
            "Music waiting for user interaction."
        );

    }

}


/*
   FIRST TOUCH / CLICK ANYWHERE
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
   Extra support for mobile touch.
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


/*
   Music button.
*/

musicBtn.addEventListener(
    "click",
    function(event){

        event.stopPropagation();


        if(music.paused){

            music.play()
                .then(function(){

                    musicStarted = true;

                    musicBtn.innerHTML =
                        "❚❚";

                })
                .catch(function(error){

                    console.log(error);

                });

        }

        else{

            music.pause();

            musicBtn.innerHTML = "♪";

        }

    }
);


/*
   Keep button synchronized.
*/

music.addEventListener(
    "play",
    function(){

        musicBtn.innerHTML = "❚❚";

    }
);


music.addEventListener(
    "pause",
    function(){

        musicBtn.innerHTML = "♪";

    }
);


/* =====================================================
   HERO SCROLL
===================================================== */

document
    .getElementById("heroScroll")
    .addEventListener(
        "click",
        function(event){

            event.stopPropagation();

            window.scrollBy({

                top:
                    window.innerHeight * .85,

                behavior:"smooth"

            });

        }
    );


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date(
        "2026-09-21T11:00:00+05:30"
    ).getTime();


function updateCountdown(){

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
            (distance /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (distance /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (distance /
            1000) % 60
        );


    document.getElementById("days")
        .textContent =
        String(days)
            .padStart(2,"0");


    document.getElementById("hours")
        .textContent =
        String(hours)
            .padStart(2,"0");


    document.getElementById("minutes")
        .textContent =
        String(minutes)
            .padStart(2,"0");


    document.getElementById("seconds")
        .textContent =
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
            threshold:.12
        }

    );


revealElements.forEach(
    function(element){

        observer.observe(element);

    }
);


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

        }

    }

    catch(error){

        console.log(
            "Wake Lock unavailable."
        );

    }

}


/*
   Re-enable when page becomes visible.
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

let autoScrolling = true;

let resumeTimer = null;


/*
   Slow continuous scrolling.
*/

const scrollSpeed = 0.65;


/*
   Pause when visitor interacts.
*/

function pauseAutoScroll(){

    autoScrolling = false;


    clearTimeout(
        resumeTimer
    );


    /*
       Resume after 4 seconds
       without interaction.
    */

    resumeTimer =
        setTimeout(
            function(){

                autoScrolling = true;

            },
            4000
        );

}


/*
   Manual touch / scrolling
*/

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


/*
   Pointer interaction.
*/

window.addEventListener(
    "pointerdown",
    pauseAutoScroll,
    {
        passive:true
    }
);


/*
   Automatic scrolling loop.
*/

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


    /*
       Stop permanently at bottom.
    */

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


/*
   Wait 5 seconds before
   automatic scrolling starts.
*/

setTimeout(
    function(){

        autoScrolling = true;

        requestAnimationFrame(
            autoScroll
        );

    },
    5000
);


/* =====================================================
   LANGUAGE SWITCHER
===================================================== */

const translations={

    en:{

        settings:"Settings",

        language:"Language",

        theme:"Theme",

        music:"Music",

        madeWithLove:"MADE WITH LOVE",

        countdownLabel:"THE COUNTDOWN",

        countdownTitle:"Until Our Nikah",

        countdownDescription:
            "A beautiful day is approaching. We look forward to celebrating this blessed beginning with you.",

        joinUs:"JOIN US",

        specialDay:"Our Special Day",

        nikah:"Nikah",

        reception:"Reception",

        eventDate:
            "Monday · 21 September 2026",

        nikahTime:"11:00 AM",

        receptionTime:"4:00 PM",

        nikahPlace:
            "Chazhiyode Juma Masjid",

        receptionPlace:
            "Pleasent Auditorium<br>Pandikkad",

        openLocation:"Open Location",

        addReminder:"🔔 Add Reminder",

        beautifulBeginning:
            "A BEAUTIFUL BEGINNING",

        ourMoments:"Our Moments",

        presenceMatters:
            "YOUR PRESENCE MATTERS",

        confirmPresence:
            "Confirm Your Presence"

    },

    ml:{

        settings:"ക്രമീകരണങ്ങൾ",

        language:"ഭാഷ",

        theme:"തീം",

        music:"സംഗീതം",

        madeWithLove:
            "സ്നേഹത്തോടെ ഒരുക്കിയത്",

        countdownLabel:"കാത്തിരിപ്പ്",

        countdownTitle:
            "നമ്മുടെ നിക്കാഹിലേക്ക്",

        countdownDescription:
            "അനുഗ്രഹീതമായ ഈ പുതിയ തുടക്കത്തിനായി ഞങ്ങൾ കാത്തിരിക്കുന്നു. ഈ സന്തോഷദിനം നിങ്ങളോടൊപ്പം ആഘോഷിക്കാൻ ആഗ്രഹിക്കുന്നു.",

        joinUs:
            "ഞങ്ങളോടൊപ്പം ചേരുക",

        specialDay:
            "ഞങ്ങളുടെ വിശേഷദിനം",

        nikah:"നിക്കാഹ്",

        reception:"റിസപ്ഷൻ",

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

    ar:{

        settings:"الإعدادات",

        language:"اللغة",

        theme:"المظهر",

        music:"الموسيقى",

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

        nikah:"النكاح",

        reception:"الاستقبال",

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


const settingsOpen =
    document.getElementById("settingsOpen");

const settingsClose =
    document.getElementById("settingsClose");

const settingsPanel =
    document.getElementById("settingsPanel");

const settingsBackdrop =
    document.getElementById("settingsBackdrop");


function openSettings(){

    settingsPanel.classList.add("show");

    settingsBackdrop.classList.add("show");

}


function closeSettings(){

    settingsPanel.classList.remove("show");

    settingsBackdrop.classList.remove("show");

}


settingsOpen.addEventListener(
    "click",
    e=>{

        e.stopPropagation();

        openSettings();

    }
);


settingsClose.addEventListener(
    "click",
    closeSettings
);


settingsBackdrop.addEventListener(
    "click",
    closeSettings
);


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
            el=>{

                const k =
                    el.dataset.i18n;


                if(
                    t[k] !== undefined
                ){

                    el.innerHTML =
                        t[k];

                }

            }
        );


    document.getElementById(
        "settingsHeading"
    ).textContent =
        t.settings;


    document.getElementById(
        "languageLabel"
    ).textContent =
        t.language;


    document.getElementById(
        "themeLabel"
    ).textContent =
        t.theme;


    document.getElementById(
        "musicLabel"
    ).textContent =
        t.music;


    document.getElementById(
        "madeWithLove"
    ).textContent =
        t.madeWithLove;


    document
        .querySelectorAll("[data-language]")
        .forEach(
            b=>
                b.classList.toggle(
                    "active",
                    b.dataset.language === lang
                )
        );


    localStorage.setItem(
        "weddingLanguage",
        lang
    );

}


document
    .querySelectorAll("[data-language]")
    .forEach(
        b=>
            b.addEventListener(
                "click",
                e=>{

                    e.stopPropagation();

                    applyLanguage(
                        b.dataset.language
                    );

                }
            )
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

    const r =
        document.documentElement;


    if(theme === "dark"){

        r.style.setProperty(
            "--cream",
            "#171914"
        );

        r.style.setProperty(
            "--cream-light",
            "#211f19"
        );

        r.style.setProperty(
            "--dark-text",
            "#f3ead8"
        );

        r.style.setProperty(
            "--soft-text",
            "#b7ad9d"
        );

    }

    else{

        r.style.removeProperty(
            "--cream"
        );

        r.style.removeProperty(
            "--cream-light"
        );

        r.style.removeProperty(
            "--dark-text"
        );

        r.style.removeProperty(
            "--soft-text"
        );

    }


    document
        .querySelectorAll("[data-theme]")
        .forEach(
            b=>
                b.classList.toggle(
                    "active",
                    b.dataset.theme === theme
                )
        );


    localStorage.setItem(
        "weddingTheme",
        theme
    );

}


document
    .querySelectorAll("[data-theme]")
    .forEach(
        b=>
            b.addEventListener(
                "click",
                e=>{

                    e.stopPropagation();

                    applyTheme(
                        b.dataset.theme
                    );

                }
            )
    );


applyTheme(
    localStorage.getItem(
        "weddingTheme"
    ) || "system"
);


/* =====================================================
   PANEL MUSIC
===================================================== */

const panelMusicBtn =
    document.getElementById(
        "panelMusicBtn"
    );


const volumeControl =
    document.getElementById(
        "volumeControl"
    );


panelMusicBtn.addEventListener(
    "click",
    e=>{

        e.stopPropagation();


        if(music.paused){

            music.play()
                .then(
                    ()=>{

                        musicStarted = true;

                        panelMusicBtn.innerHTML =
                            "❚❚";

                        musicBtn.innerHTML =
                            "❚❚";

                    }
                )
                .catch(
                    ()=>{}
                );

        }

        else{

            music.pause();

            panelMusicBtn.innerHTML =
                "▶";

            musicBtn.innerHTML =
                "♪";

        }

    }
);


volumeControl.addEventListener(
    "input",
    ()=>
        music.volume =
            Number(
                volumeControl.value
            )
);


music.addEventListener(
    "play",
    ()=>
        panelMusicBtn.innerHTML =
            "❚❚"
);


music.addEventListener(
    "pause",
    ()=>
        panelMusicBtn.innerHTML =
            "▶"
);


/* =====================================================
   TOUCH BAARAKALLAH
===================================================== */

const touchBlessing =
    document.getElementById(
        "touchBlessing"
    );


let blessingTimer = null;


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
        "touch-heart "+
        type;


    heart.textContent =
        symbol;


    heart.style.left =
        x+"px";


    heart.style.top =
        y+"px";


    heart.style.setProperty(
        "--drift-x",
        driftX+"px"
    );


    heart.style.setProperty(
        "--drift-y",
        driftY+"px"
    );


    heart.style.setProperty(
        "--rotate",
        rotate+"deg"
    );


    /*
      Gold / Green colour
    */

    if(Math.random() > .45){

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
        ()=>{
            heart.remove();
        },
        1600
    );

}


function showTouchBlessing(
    x,
    y
){

    clearTimeout(
        blessingTimer
    );


    /*
      Reset main Barakallah pill
    */

    touchBlessing.classList.remove(
        "show"
    );


    void touchBlessing.offsetWidth;


    touchBlessing.style.left =
        x+"px";


    touchBlessing.style.top =
        y+"px";


    touchBlessing.classList.add(
        "show"
    );


    /*
      Same type of arrangement
      as the reference image
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


    blessingTimer =
        setTimeout(
            ()=>{
                touchBlessing.classList.remove(
                    "show"
                );
            },
            1650
        );

}


document.addEventListener(
    "pointerdown",
    e=>{

        /*
          Don't trigger when pressing
          buttons, links or settings.
        */

        if(
            e.target.closest("button") ||
            e.target.closest("a") ||
            e.target.closest("input") ||
            e.target.closest(".settings-panel")
        ){

            return;

        }


        showTouchBlessing(
            e.clientX,
            e.clientY
        );

    },
    {
        passive:true
    }
);