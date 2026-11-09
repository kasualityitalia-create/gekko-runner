/**
 * Gekko Runner - The Reverse Chroma Runner
 * Kasuality Arcade - 100% Client-Side, Zero Dipendenze
 * Conforme agli standard WCAG 2.2 AAA & APCA
 */

(function () {
    'use strict';

    // -------------------------------------------------------------------------
    // FALLBACK SICURO PER SOUND ENGINE (Previene blocchi offline se audio.js tarda)
    // -------------------------------------------------------------------------
    if (!window.soundEngine) {
        window.soundEngine = {
            muted: false,
            init: function () {},
            resume: function () {},
            toggleMute: function () { this.muted = !this.muted; return this.muted; },
            playJump: function () {},
            playSlide: function () {},
            playSpray: function () {},
            playColorSplash: function () {},
            playMilestone: function () {},
            playGameOver: function () {}
        };
    }

    // -------------------------------------------------------------------------
    // DIZIONARIO MULTILINGUA I18N (5 LINGUE: IT, EN, ES, FR, DE)
    // -------------------------------------------------------------------------
    const I18N = {
        it: {
            title: "GEKKO CHROMA RUNNER",
            subtitle: "The Reverse Chroma Runner",
            introDesc: "Il mondo è in bianco e nero: riaccendilo a colpi di bomboletta spray!",
            jumpTitle: "▲  SALTO",
            jumpHeadline: "Salta e Colora al volo",
            jumpDesk: "• Barra Spaziatrice o Freccia Su",
            jumpMob: "• 1 Tocco sullo schermo su mobile",
            jumpTip: "✦ Salta vicino agli stencil per dipingerli!",
            duckTitle: "▼  CHINATI",
            duckHeadline: "Scivola sotto i Droni",
            duckDesk: "• Freccia Giù o Doppio Spazio veloce",
            duckMob: "• Doppio Tocco o Swipe Giù su mobile",
            duckTip: "✦ Dimezza l'altezza per passare sotto i droni!",
            startPrompt: "► PREMI LA BARRA SPAZIATRICE O TOCCA PER GIOCARE ◄",
            gameOver: "G A M E   O V E R",
            statsScore: "Punti Totali",
            statsPainted: "Muri Colorati",
            statsCombo: "Record Combo",
            restartPrompt: "PREMI SPAZIO O TOCCA PER RIGIOCARE",
            hudPainted: "MURI COLORATI",
            hudCombo: "COMBO",
            colorHit: "+50 COLOR!",
            comboHit: "+{pts} COMBO x{combo}!",
            footerCommands: "Comandi:",
            footerJumpDesk: "Salta",
            footerDuckDesk: "Chinati",
            footerTouch: "Touch:",
            footerJumpMob: "Salta",
            footerDuckMob: "Chinati",
            footerTip: "La bomboletta colora automaticamente gli stencil in volo!",
            ariaThemeDark: "Attiva modalità scura",
            ariaThemeLight: "Attiva modalità chiara",
            ariaSoundOn: "Attiva audio",
            ariaSoundOff: "Disattiva audio",
            srStart: "Partita avviata. Gekko corre verso sinistra.",
            srPainted: "Muro dipinto! Più 50 punti colore.",
            srMilestone: "Traguardo 100 punti raggiunto!",
            srGameOver: "Partita terminata. Punti totali: {score}."
        },
        en: {
            title: "GEKKO CHROMA RUNNER",
            subtitle: "The Reverse Chroma Runner",
            introDesc: "A dull black and white world: bring it to life with vibrant spray paint!",
            jumpTitle: "▲  JUMP",
            jumpHeadline: "Jump & Paint on the fly",
            jumpDesk: "• Spacebar or Up Arrow",
            jumpMob: "• 1 Tap on screen on mobile",
            jumpTip: "✦ Jump near stencils to spray paint them!",
            duckTitle: "▼  DUCK",
            duckHeadline: "Slide under airborne Drones",
            duckDesk: "• Down Arrow or quick Double Space",
            duckMob: "• Double Tap or Swipe Down on mobile",
            duckTip: "✦ Cuts height in half to slide under drones!",
            startPrompt: "► PRESS SPACEBAR OR TAP TO PLAY ◄",
            gameOver: "G A M E   O V E R",
            statsScore: "Total Score",
            statsPainted: "Painted Walls",
            statsCombo: "Max Combo",
            restartPrompt: "PRESS SPACE OR TAP TO REPLAY",
            hudPainted: "PAINTED WALLS",
            hudCombo: "COMBO",
            colorHit: "+50 COLOR!",
            comboHit: "+{pts} COMBO x{combo}!",
            footerCommands: "Controls:",
            footerJumpDesk: "Jump",
            footerDuckDesk: "Duck",
            footerTouch: "Touch:",
            footerJumpMob: "Jump",
            footerDuckMob: "Duck",
            footerTip: "The spray can automatically colors airborne stencils!",
            ariaThemeDark: "Switch to dark mode",
            ariaThemeLight: "Switch to light mode",
            ariaSoundOn: "Unmute sound",
            ariaSoundOff: "Mute sound",
            srStart: "Game started. Gekko runs towards the left.",
            srPainted: "Wall painted! Plus 50 color points.",
            srMilestone: "100 points milestone reached!",
            srGameOver: "Game over. Total score: {score}."
        },
        es: {
            title: "GEKKO CHROMA RUNNER",
            subtitle: "The Reverse Chroma Runner",
            introDesc: "El mundo es en blanco y negro: ¡devuélvele la vida con pintura en aerosol!",
            jumpTitle: "▲  SALTAR",
            jumpHeadline: "Salta y Pinta al vuelo",
            jumpDesk: "• Barra Espaciadora o Flecha Arriba",
            jumpMob: "• 1 Toque en pantalla táctil",
            jumpTip: "✦ ¡Salta cerca de las plantillas para pintarlas!",
            duckTitle: "▼  AGACHARSE",
            duckHeadline: "Deslízate bajo los Drones",
            duckDesk: "• Flecha Abajo o Doble Espacio rápido",
            duckMob: "• Doble Toque o Deslizar Abajo en móvil",
            duckTip: "✦ ¡Reduce tu altura a la mitad para esquivar drones!",
            startPrompt: "► PULSA LA BARRA ESPACIADORA O TOCA PARA JUGAR ◄",
            gameOver: "G A M E   O V E R",
            statsScore: "Puntos Totales",
            statsPainted: "Muros Pintados",
            statsCombo: "Récord Combo",
            restartPrompt: "PULSA ESPACIO O TOCA PARA VOLVER A JUGAR",
            hudPainted: "MUROS PINTADOS",
            hudCombo: "COMBO",
            colorHit: "¡+50 COLOR!",
            comboHit: "¡+{pts} COMBO x{combo}!",
            footerCommands: "Controles:",
            footerJumpDesk: "Saltar",
            footerDuckDesk: "Agacharse",
            footerTouch: "Táctil:",
            footerJumpMob: "Saltar",
            footerDuckMob: "Agacharse",
            footerTip: "¡El aerosol pinta automáticamente las plantillas en el aire!",
            ariaThemeDark: "Activar modo oscuro",
            ariaThemeLight: "Activar modo claro",
            ariaSoundOn: "Activar sonido",
            ariaSoundOff: "Desactivar sonido",
            srStart: "Partida iniciada. Gekko corre hacia la izquierda.",
            srPainted: "¡Muro pintado! Más 50 puntos de color.",
            srMilestone: "¡Hito de 100 puntos alcanzado!",
            srGameOver: "Juego terminado. Puntos totales: {score}."
        },
        fr: {
            title: "GEKKO CHROMA RUNNER",
            subtitle: "The Reverse Chroma Runner",
            introDesc: "Le monde est en noir et blanc : redonnez-lui vie à coups de spray coloré !",
            jumpTitle: "▲  SAUTER",
            jumpHeadline: "Sautez et Peignez au vol",
            jumpDesk: "• Barre d'Espace ou Flèche Haut",
            jumpMob: "• 1 Touche sur l'écran tactile",
            jumpTip: "✦ Sautez près des pochoirs pour les peindre !",
            duckTitle: "▼  SE BAISSER",
            duckHeadline: "Glissez sous les Drones",
            duckDesk: "• Flèche Bas ou Double Espace rapide",
            duckMob: "• Double Touche ou Glisser vers le Bas",
            duckTip: "✦ Réduit votre hauteur de moitié pour éviter les drones !",
            startPrompt: "► APPUYEZ SUR ESPACE OU TOUCHEZ POUR JOUER ◄",
            gameOver: "G A M E   O V E R",
            statsScore: "Score Total",
            statsPainted: "Murs Peints",
            statsCombo: "Record Combo",
            restartPrompt: "APPUYEZ SUR ESPACE OU TOUCHEZ POUR REJOUER",
            hudPainted: "MURS PEINTS",
            hudCombo: "COMBO",
            colorHit: "+50 COULEUR !",
            comboHit: "+{pts} COMBO x{combo} !",
            footerCommands: "Commandes:",
            footerJumpDesk: "Sauter",
            footerDuckDesk: "Se baisser",
            footerTouch: "Tactile:",
            footerJumpMob: "Sauter",
            footerDuckMob: "Se baisser",
            footerTip: "La bombe colore automatiquement les pochoirs en plein vol !",
            ariaThemeDark: "Activer le mode sombre",
            ariaThemeLight: "Activer le mode clair",
            ariaSoundOn: "Activer le son",
            ariaSoundOff: "Couper le son",
            srStart: "Partie commencée. Gekko court vers la gauche.",
            srPainted: "Mur peint ! Plus 50 points de couleur.",
            srMilestone: "Étape de 100 points atteinte !",
            srGameOver: "Fin de partie. Score total : {score}."
        },
        de: {
            title: "GEKKO CHROMA RUNNER",
            subtitle: "The Reverse Chroma Runner",
            introDesc: "Die Welt ist schwarz-weiß: Bring Farbe ins Spiel mit der Spraydose!",
            jumpTitle: "▲  SPRINGEN",
            jumpHeadline: "Springen und im Flug sprühen",
            jumpDesk: "• Leertaste oder Pfeil nach oben",
            jumpMob: "• 1 Tippen auf den Bildschirm",
            jumpTip: "✦ Springe in die Nähe der Schablonen, um sie zu besprühen!",
            duckTitle: "▼  DUCKEN",
            duckHeadline: "Unter Drohnen durchrutschen",
            duckDesk: "• Pfeil nach unten oder schnelles Doppelleertaste",
            duckMob: "• Doppeltippen oder nach unten wischen",
            duckTip: "✦ Halbiert die Höhe, um fliegenden Drohnen auszuweichen!",
            startPrompt: "► LEERTASTE DRÜCKEN ODER TIPPEN ZUM STARTEN ◄",
            gameOver: "G A M E   O V E R",
            statsScore: "Gesamtpunkte",
            statsPainted: "Bemalte Wände",
            statsCombo: "Rekord-Combo",
            restartPrompt: "LEERTASTE DRÜCKEN ODER TIPPEN ZUM NEUSTART",
            hudPainted: "BEMALTE WÄNDE",
            hudCombo: "COMBO",
            colorHit: "+50 FARBE!",
            comboHit: "+{pts} COMBO x{combo}!",
            footerCommands: "Steuerung:",
            footerJumpDesk: "Springen",
            footerDuckDesk: "Ducken",
            footerTouch: "Touch:",
            footerJumpMob: "Springen",
            footerDuckMob: "Ducken",
            footerTip: "Die Spraydose färbt Schablonen in der Luft automatisch ein!",
            ariaThemeDark: "Dunkelmodus aktivieren",
            ariaThemeLight: "Hellmodus aktivieren",
            ariaSoundOn: "Ton einschalten",
            ariaSoundOff: "Ton stummschalten",
            srStart: "Spiel gestartet. Gekko läuft nach links.",
            srPainted: "Wand bemalt! Plus 50 Farbpunkte.",
            srMilestone: "100-Punkte-Meilenstein erreicht!",
            srGameOver: "Spiel vorbei. Gesamtpunkte: {score}."
        }
    };

    // Rilevamento automatico lingua browser
    const browserLang = (navigator.language || 'it').toLowerCase();
    let currentLang = 'it';
    if (browserLang.startsWith('en')) currentLang = 'en';
    else if (browserLang.startsWith('es')) currentLang = 'es';
    else if (browserLang.startsWith('fr')) currentLang = 'fr';
    else if (browserLang.startsWith('de')) currentLang = 'de';
    else currentLang = 'it';

    // Aggiorna l'attributo lang del documento (WCAG 3.1.2)
    document.documentElement.lang = currentLang;

    const t = I18N[currentLang];

    // Riferimenti DOM
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const muteBtn = document.getElementById('muteBtn');
    const themeBtn = document.getElementById('themeBtn');
    const brandLink = document.getElementById('brandLink');
    const statusEl = document.getElementById('gameStatus');

    // Funzione Live Region per Screen Reader (WCAG 1.1.1 e 4.1.3)
    function announce(msg) {
        if (statusEl) {
            statusEl.textContent = '';
            setTimeout(() => { statusEl.textContent = msg; }, 50);
        }
    }

    // Traduzione etichette HTML nel footer
    const lblControls = document.getElementById('lblControls');
    const lblJumpDesk = document.getElementById('lblJumpDesk');
    const lblDuckDesk = document.getElementById('lblDuckDesk');
    const lblTouch = document.getElementById('lblTouch');
    const lblJumpMob = document.getElementById('lblJumpMob');
    const lblDuckMob = document.getElementById('lblDuckMob');
    const lblSprayTip = document.getElementById('lblSprayTip');

    if (lblControls) lblControls.textContent = t.footerCommands;
    if (lblJumpDesk) lblJumpDesk.textContent = t.footerJumpDesk;
    if (lblDuckDesk) lblDuckDesk.textContent = t.footerDuckDesk;
    if (lblTouch) lblTouch.textContent = t.footerTouch;
    if (lblJumpMob) lblJumpMob.textContent = t.footerJumpMob;
    if (lblDuckMob) lblDuckMob.textContent = t.footerDuckMob;
    if (lblSprayTip) lblSprayTip.textContent = t.footerTip;

    // Routing link multilingua brand Kasuality
    if (brandLink) {
        if (currentLang === 'it') brandLink.href = 'https://www.kasuality.com/';
        else brandLink.href = `https://www.kasuality.com/${currentLang}/`;
    }

    // Preferenza Utente: Riduzione Movimento (WCAG 2.2.2 / 2.3.3)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensioni virtuali del gioco (HiDPI / Retina responsive)
    const V_WIDTH = 1000;
    const V_HEIGHT = 360;
    const GROUND_Y = 305;

    // Sprite di Gekko (Uso diretto PNG nativi per massima nitidezza e leggerezza)
    const gekkoImg = new Image();
    gekkoImg.src = 'img/gekko.png';
    const gekkoDuckImg = new Image();
    gekkoDuckImg.src = 'img/gekko_duck.png';

    let assetsLoaded = false;
    let loadCount = 0;
    function checkAssets() {
        loadCount++;
        if (loadCount >= 2) assetsLoaded = true;
    }
    gekkoImg.onload = checkAssets;
    gekkoDuckImg.onload = checkAssets;
    gekkoImg.onerror = () => { assetsLoaded = true; };
    gekkoDuckImg.onerror = () => { assetsLoaded = true; };

    // Palette Colori Graffiti (Spazio OKLCH vibrante Kasuality)
    const GRAFFITI_PALETTES = [
        ['#ec4899', '#8b5cf6', '#3b82f6'],
        ['#06b6d4', '#10b981', '#84cc16'],
        ['#f59e0b', '#ef4444', '#ec4899'],
        ['#a855f7', '#6366f1', '#06b6d4'],
        ['#f43f5e', '#fb923c', '#facc15']
    ];

    // Stato del Gioco
    const STATE = {
        START: 'start',
        PLAYING: 'playing',
        GAMEOVER: 'gameover'
    };

    let currentState = STATE.START;
    let score = 0;
    let hiScore = parseInt(localStorage.getItem('kasuality_gekko_hiscore') || '0', 10);
    let paintedCount = 0;
    let colorScore = 0;
    let lastMilestone = 0;
    let comboStreak = 0;
    let maxCombo = 0;
    let gameSpeed = 5.8;
    let baseSpeed = 5.8;
    let distanceRun = 0;
    let isDarkMode = false;
    let invertedCycle = false;

    // Gekko (Posizionato sulla DESTRA, corre verso SINISTRA)
    const gekko = {
        x: V_WIDTH - 150,
        y: GROUND_Y - 72,
        w: 72,
        h: 72,
        duckW: 86,
        duckH: 28, // Altezza scivolata ultra-bassa per passare agilmente sotto i droni
        vy: 0,
        gravity: 0.74,
        jumpForce: -14.2,
        isGrounded: true,
        isDucking: false,
        duckTimer: 0,
        runFrame: 0,
        runTimer: 0
    };

    let obstacles = [];
    let graffitiFrames = [];
    let particles = [];
    let popups = [];
    let groundOffset = 0;
    let backgroundOffset = 0;

    let nextObstacleDistance = 580;
    let nextGraffitiDistance = 450;
    let distanceSinceObstacle = 0;
    let distanceSinceGraffiti = 0;

    let lastSpaceTime = 0;
    let lastTapTime = 0;
    let touchStartY = 0;

    // Inizializzazione Canvas per Retina / HiDPI e Responsive Mobile
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = rect.width || canvas.clientWidth || 360;
        const h = w * (V_HEIGHT / V_WIDTH);

        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(canvas.width / V_WIDTH, canvas.height / V_HEIGHT);
    }
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 100));

    // Reset della partita
    function resetGame() {
        score = 0;
        distanceRun = 0;
        paintedCount = 0;
        colorScore = 0;
        lastMilestone = 0;
        comboStreak = 0;
        maxCombo = 0;
        gameSpeed = baseSpeed;
        obstacles = [];
        graffitiFrames = [];
        particles = [];
        popups = [];
        distanceSinceObstacle = 0;
        distanceSinceGraffiti = 180;
        nextObstacleDistance = 580;
        nextGraffitiDistance = 450;

        gekko.y = GROUND_Y - gekko.h;
        gekko.vy = 0;
        gekko.isGrounded = true;
        gekko.isDucking = false;
        gekko.duckTimer = 0;

        currentState = STATE.PLAYING;
        announce(t.srStart);
    }

    // Azione Salto
    function jump() {
        if (currentState === STATE.START || currentState === STATE.GAMEOVER) {
            resetGame();
            return;
        }

        // Può saltare sia da terra sia interrompendo una scivolata in corso
        if (gekko.isGrounded || gekko.isDucking) {
            gekko.isDucking = false;
            gekko.duckTimer = 0;
            gekko.y = GROUND_Y - gekko.h;
            gekko.vy = gekko.jumpForce;
            gekko.isGrounded = false;
            window.soundEngine.playJump();

            for (let i = 0; i < 4; i++) {
                particles.push({
                    x: gekko.x + gekko.w / 2 + (Math.random() * 20 - 10),
                    y: GROUND_Y - 2,
                    vx: -(Math.random() * 2 + 1),
                    vy: -(Math.random() * 2 + 1),
                    size: Math.random() * 3 + 2,
                    color: isDarkMode ? '#52525b' : '#a1a1aa',
                    alpha: 1,
                    decay: 0.05
                });
            }
        }
    }

    // Azione Chinata / Scivolata
    function duck(durationMs = 750) {
        if (currentState !== STATE.PLAYING) return;

        // Se è in aria (ad es. dopo il primo click rapido di spazio o a metà salto):
        // Interrompe istantaneamente il salto e scivola a terra a pancia in giù!
        if (!gekko.isGrounded) {
            gekko.y = GROUND_Y - gekko.h;
            gekko.vy = 0;
            gekko.isGrounded = true;
        }

        gekko.isDucking = true;
        gekko.duckTimer = durationMs;
        window.soundEngine.playSlide();

        for (let i = 0; i < 6; i++) {
            particles.push({
                x: gekko.x + 20 + Math.random() * 40,
                y: GROUND_Y - 2,
                vx: (Math.random() * 3 + 2),
                vy: -(Math.random() * 1.5 + 0.5),
                size: Math.random() * 4 + 2,
                color: isDarkMode ? '#71717a' : '#d4d4d8',
                alpha: 1,
                decay: 0.04
            });
        }
    }

    // Controlli Tastiera con Isolamento Conflitti Elementi Interattivi
    window.addEventListener('keydown', (e) => {
        // Se il focus è su un bottone o link, non intercettare la barra spaziatrice o invio!
        if (e.target && e.target.closest && e.target.closest('button, a, input, select, textarea')) {
            return;
        }
        if (e.repeat) return;

        if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
            e.preventDefault();
        }

        const now = Date.now();

        if (e.code === 'Space') {
            if (currentState === STATE.START || currentState === STATE.GAMEOVER) {
                resetGame();
                lastSpaceTime = now;
                return;
            }

            const timeDiff = now - lastSpaceTime;

            if (timeDiff > 0 && timeDiff < 350) {
                // Riconosciuto DOPPIO CLICK sulla barra spaziatrice:
                // Scivola immediatamente a terra sotto i droni!
                duck(750);
                lastSpaceTime = 0; // Reset così il click successivo non è considerato triplo click
            } else {
                // Singolo click: Salta!
                lastSpaceTime = now;
                jump();
            }
        }

        if (e.code === 'ArrowUp' || e.code === 'KeyW') {
            jump();
        }

        if (e.code === 'ArrowDown' || e.code === 'KeyS') {
            duck(999999);
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowDown' || e.code === 'KeyS') {
            gekko.duckTimer = 0;
            gekko.isDucking = false;
            gekko.y = GROUND_Y - gekko.h;
        }
    });

    // Touch controls su Canvas
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        touchStartY = touch.clientY;

        const now = Date.now();

        if (currentState === STATE.START || currentState === STATE.GAMEOVER) {
            resetGame();
            lastTapTime = now;
            return;
        }

        const timeDiff = now - lastTapTime;

        if (timeDiff > 0 && timeDiff < 350) {
            // Riconosciuto DOPPIO TOCCO su schermo:
            // Scivola immediatamente a terra!
            duck(750);
            lastTapTime = 0; // Reset
        } else {
            // Singolo tocco: Salta!
            lastTapTime = now;
            jump();
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const diffY = touch.clientY - touchStartY;
        if (diffY > 35 && !gekko.isDucking) {
            duck(750);
            lastTapTime = 0;
        }
    }, { passive: false });

    // Gestione Mute con Icone SVG e ARIA Accessibility
    const iconSoundOn = muteBtn.querySelector('.icon-sound-on');
    const iconSoundOff = muteBtn.querySelector('.icon-sound-off');

    function updateAudioIcon(isMuted) {
        if (iconSoundOn && iconSoundOff) {
            iconSoundOn.style.display = isMuted ? 'none' : 'block';
            iconSoundOff.style.display = isMuted ? 'block' : 'none';
        }
        muteBtn.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
        muteBtn.setAttribute('aria-label', isMuted ? t.ariaSoundOn : t.ariaSoundOff);
    }

    muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMuted = window.soundEngine.toggleMute();
        updateAudioIcon(isMuted);
    });
    updateAudioIcon(window.soundEngine ? Boolean(window.soundEngine.muted) : false);

    // Gestione Tema con Icone SVG e ARIA Accessibility
    const iconMoon = themeBtn.querySelector('.icon-moon');
    const iconSun = themeBtn.querySelector('.icon-sun');

    function setTheme(dark) {
        isDarkMode = dark;
        if (dark) {
            document.body.classList.add('dark-mode');
            if (iconMoon) iconMoon.style.display = 'none';
            if (iconSun) iconSun.style.display = 'block';
        } else {
            document.body.classList.remove('dark-mode');
            if (iconMoon) iconMoon.style.display = 'block';
            if (iconSun) iconSun.style.display = 'none';
        }
        themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
        themeBtn.setAttribute('aria-label', dark ? t.ariaThemeLight : t.ariaThemeDark);
    }

    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setTheme(!isDarkMode);
    });

    // -------------------------------------------------------------------------
    // SPAWN LOGIC (Da Sinistra verso Destra)
    // -------------------------------------------------------------------------

    function spawnObstacle() {
        const isAirDrone = Math.random() < 0.32 && score > 150;
        const type = isAirDrone ? 'drone' : (Math.random() < 0.5 ? 'bucket' : 'barrier');

        let obs = {
            x: -80,
            type: type,
            passed: false
        };

        if (type === 'drone') {
            obs.w = 52;
            obs.h = 24;
            // Altitudine drone calibrata: colpisce chi è in piedi o salta, ma lascia 23px di aria a Gekko quando scivola!
            obs.y = GROUND_Y - 76;
            obs.anim = 0;
        } else if (type === 'bucket') {
            obs.w = 24;
            obs.h = 34;
            obs.y = GROUND_Y - 34;
        } else {
            obs.w = 30;
            obs.h = 40;
            obs.y = GROUND_Y - 40;
        }

        obstacles.push(obs);
    }

    function spawnGraffitiFrame() {
        const palette = GRAFFITI_PALETTES[Math.floor(Math.random() * GRAFFITI_PALETTES.length)];
        const shapes = ['K', 'tag', 'heart', 'palette', 'star'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        const frame = {
            x: -90,
            y: GROUND_Y - 115 - Math.floor(Math.random() * 25),
            w: 80,
            h: 54,
            palette: palette,
            shape: shape,
            painted: false,
            sprayActivated: false,
            sprayAnim: 0
        };

        graffitiFrames.push(frame);
    }

    // -------------------------------------------------------------------------
    // COLLISION DETECTION (Hitbox Forgiving)
    // -------------------------------------------------------------------------

    function checkCollision(g, obs) {
        const currentH = g.isDucking ? g.duckH : g.h;
        const currentW = g.isDucking ? g.duckW : g.w;
        const currentY = g.isDucking ? (GROUND_Y - g.duckH) : g.y;
        const currentX = g.x + 10;

        const padX = obs.type === 'drone' ? 8 : 10;
        const padY = obs.type === 'drone' ? 8 : 6; // Tolleranza verticale extra per i droni

        return (
            currentX < obs.x + obs.w - padX &&
            currentX + currentW - padX > obs.x + padX &&
            currentY < obs.y + obs.h - padY &&
            currentY + currentH > obs.y + padY
        );
    }

    // -------------------------------------------------------------------------
    // UPDATE GAME LOOP
    // -------------------------------------------------------------------------

    let lastFrameTime = performance.now();

    function update(dt) {
        if (currentState !== STATE.PLAYING) return;

        // Normalizzazione temporale a 60 FPS (1.0 a 60fps, 0.5 a 120fps su schermi ProMotion)
        const timeScale = Math.min(Math.max(dt / 16.6667, 0.2), 2.5);
        const stepSpeed = gameSpeed * timeScale;

        distanceRun += stepSpeed;
        score = Math.floor(distanceRun / 10) + colorScore;

        // Accelerazione progressiva in stile Chrome Dino:
        // Aumento graduale legato alla sola distanza percorsa (metri), indipendente dai punti combo.
        // Crescita dolce e controllabile: +0.28 ogni 1000px percorsi (cap a 12.0).
        gameSpeed = Math.min(baseSpeed + (distanceRun * 0.00028), 12.0);

        // Traguardo 100 punti infallibile (anche durante salti di punteggio dovuti a combo)
        const currentMilestone = Math.floor(score / 100);
        if (currentMilestone > lastMilestone) {
            lastMilestone = currentMilestone;
            window.soundEngine.playMilestone();
            announce(t.srMilestone);
        }

        // Inversione Giorno / Notte automatica solo se non è richiesta riduzione movimento
        if (!prefersReducedMotion) {
            const cycle = Math.floor(score / 700) % 2 === 1;
            if (cycle !== invertedCycle) {
                invertedCycle = cycle;
                setTheme(invertedCycle);
            }
        }

        if (gekko.isDucking && gekko.duckTimer > 0) {
            gekko.duckTimer -= dt;
            if (gekko.duckTimer <= 0) {
                gekko.isDucking = false;
                gekko.y = GROUND_Y - gekko.h;
            }
        }

        if (!gekko.isGrounded) {
            gekko.vy += gekko.gravity * timeScale;
            gekko.y += gekko.vy * timeScale;

            if (gekko.y >= GROUND_Y - gekko.h) {
                gekko.y = GROUND_Y - gekko.h;
                gekko.vy = 0;
                gekko.isGrounded = true;
            }
        }

        gekko.runTimer += dt;
        if (gekko.runTimer > 80) {
            gekko.runFrame = (gekko.runFrame + 1) % 4;
            gekko.runTimer = 0;
        }

        groundOffset = (groundOffset + stepSpeed) % 40;
        backgroundOffset = (backgroundOffset + stepSpeed * 0.35) % 200;

        distanceSinceObstacle += stepSpeed;
        if (distanceSinceObstacle >= nextObstacleDistance) {
            spawnObstacle();
            distanceSinceObstacle = 0;
            // Spaziatura dinamica: il tempo di reazione resta sempre umano e accessibile
            nextObstacleDistance = 380 + (gameSpeed * 16) + Math.random() * 260;
        }

        distanceSinceGraffiti += stepSpeed;
        if (distanceSinceGraffiti >= nextGraffitiDistance) {
            spawnGraffitiFrame();
            distanceSinceGraffiti = 0;
            nextGraffitiDistance = 450 + Math.random() * 320;
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.x += stepSpeed;

            if (obs.type === 'drone') {
                obs.anim += 0.2 * timeScale;
                obs.y += Math.sin(obs.anim) * 0.8 * timeScale;
            }

            if (checkCollision(gekko, obs)) {
                currentState = STATE.GAMEOVER;
                window.soundEngine.playGameOver();
                announce(t.srGameOver.replace('{score}', score));

                if (score > hiScore) {
                    hiScore = score;
                    localStorage.setItem('kasuality_gekko_hiscore', hiScore);
                }
                if (comboStreak > maxCombo) maxCombo = comboStreak;
                return;
            }

            if (obs.x > V_WIDTH + 100) {
                obstacles.splice(i, 1);
            }
        }

        for (let i = graffitiFrames.length - 1; i >= 0; i--) {
            const frame = graffitiFrames[i];
            frame.x += stepSpeed;

            const dist = Math.abs(gekko.x - frame.x);
            if (!frame.painted && dist < 120 && !gekko.isGrounded) {
                frame.painted = true;
                paintedCount++;
                comboStreak++;
                if (comboStreak > maxCombo) maxCombo = comboStreak;

                // Assegna il punteggio comprensivo di moltiplicatore combo (50 * comboStreak)
                const ptsEarned = 50 * comboStreak;
                colorScore += ptsEarned;

                window.soundEngine.playSpray();
                setTimeout(() => window.soundEngine.playColorSplash(), 100);
                announce(t.srPainted);

                const nozzleX = gekko.x + 10;
                const nozzleY = gekko.y + 35;
                for (let p = 0; p < 24; p++) {
                    const color = frame.palette[Math.floor(Math.random() * frame.palette.length)];
                    particles.push({
                        x: nozzleX,
                        y: nozzleY,
                        vx: -(Math.random() * 5 + 3),
                        vy: (Math.random() * 4 - 2),
                        size: Math.random() * 5 + 2.5,
                        color: color,
                        alpha: 1,
                        decay: 0.03
                    });
                }

                const ptsText = comboStreak > 1 ? t.comboHit.replace('{pts}', 50 * comboStreak).replace('{combo}', comboStreak) : t.colorHit;
                popups.push({
                    text: ptsText,
                    x: frame.x + frame.w / 2,
                    y: frame.y - 12,
                    alpha: 1
                });
            }

            if (frame.x > V_WIDTH + 100) {
                if (!frame.painted) {
                    comboStreak = 0;
                }
                graffitiFrames.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx * timeScale;
            p.y += p.vy * timeScale;
            p.alpha -= p.decay * timeScale;
            if (p.alpha <= 0) particles.splice(i, 1);
        }

        for (let i = popups.length - 1; i >= 0; i--) {
            const pop = popups[i];
            pop.y -= 1.2 * timeScale;
            pop.alpha -= 0.025 * timeScale;
            if (pop.alpha <= 0) popups.splice(i, 1);
        }
    }

    // -------------------------------------------------------------------------
    // RENDER GRAFICO (Canvas 60 FPS con Contrasti WCAG AAA Verificati)
    // -------------------------------------------------------------------------

    function draw() {
        if (canvas.width === 0 || canvas.height === 0) {
            resizeCanvas();
        }
        ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

        const primaryColor = isDarkMode ? '#fafafa' : '#18181b';
        const secondaryColor = isDarkMode ? '#a1a1aa' : '#52525b'; // Contrasto 7.41:1 light / 7.30:1 dark AAA
        const groundColor = isDarkMode ? '#3f3f46' : '#d4d4d8';

        // 1. Sfondo Urbano Silhouettes
        ctx.fillStyle = isDarkMode ? '#1e1e24' : '#f0f0f2';
        for (let i = -1; i < 7; i++) {
            const bX = (i * 180) + backgroundOffset;
            const bW = 120;
            const bH = 80 + ((i * 37) % 70);
            ctx.fillRect(bX, GROUND_Y - bH, bW, bH);
            ctx.fillStyle = isDarkMode ? '#27272a' : '#e4e4e7';
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    ctx.fillRect(bX + 15 + c * 32, GROUND_Y - bH + 15 + r * 22, 14, 10);
                }
            }
            ctx.fillStyle = isDarkMode ? '#1e1e24' : '#f0f0f2';
        }

        // 2. Terreno Monocromatico
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y);
        ctx.lineTo(V_WIDTH, GROUND_Y);
        ctx.stroke();

        ctx.fillStyle = groundColor;
        for (let x = -40; x < V_WIDTH + 40; x += 35) {
            const gx = x + groundOffset;
            ctx.fillRect(gx, GROUND_Y + 8, 18, 4);
            ctx.fillRect(gx + 12, GROUND_Y + 18, 8, 3);
            ctx.fillRect(gx + 4, GROUND_Y + 28, 22, 4);
        }

        // 3. Disegno Muri / Stencil da Colorare
        graffitiFrames.forEach((frame) => {
            if (!frame.painted) {
                ctx.save();
                ctx.setLineDash([6, 4]);
                // Bordo stencil e scritta con contrasto 4.83:1 (#71717a) conforme WCAG
                ctx.strokeStyle = '#71717a';
                ctx.lineWidth = 2;
                ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);

                ctx.fillStyle = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
                ctx.fillRect(frame.x, frame.y, frame.w, frame.h);

                ctx.fillStyle = '#71717a';
                ctx.font = 'bold 12px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('[ SPRAY ]', frame.x + frame.w / 2, frame.y + frame.h / 2);
                ctx.restore();
            } else {
                ctx.save();
                ctx.shadowColor = frame.palette[0];
                ctx.shadowBlur = 10;

                const grad = ctx.createLinearGradient(frame.x, frame.y, frame.x + frame.w, frame.y + frame.h);
                grad.addColorStop(0, frame.palette[0]);
                grad.addColorStop(0.5, frame.palette[1]);
                grad.addColorStop(1, frame.palette[2]);

                ctx.fillStyle = grad;
                ctx.fillRect(frame.x, frame.y, frame.w, frame.h);

                // Etichetta "KASUALITY" con stroke scuro di contorno per massima leggibilità su ogni gradiente
                ctx.font = 'bold 14px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.strokeText('KASUALITY', frame.x + frame.w / 2, frame.y + frame.h / 2);
                ctx.fillStyle = '#ffffff';
                ctx.fillText('KASUALITY', frame.x + frame.w / 2, frame.y + frame.h / 2);

                ctx.fillStyle = frame.palette[1];
                ctx.beginPath();
                ctx.arc(frame.x + 8, frame.y + frame.h + 5, 3.5, 0, Math.PI * 2);
                ctx.arc(frame.x + 22, frame.y + frame.h + 8, 2.5, 0, Math.PI * 2);
                ctx.arc(frame.x + frame.w - 12, frame.y + frame.h + 6, 3, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        });

        // 4. Disegno Ostacoli B&W (Fill solido per ipovisione conforme WCAG 1.4.11 > 3:1)
        obstacles.forEach((obs) => {
            ctx.save();
            if (obs.type === 'bucket') {
                ctx.fillStyle = isDarkMode ? '#d4d4d8' : '#27272a';
                ctx.fillRect(obs.x + 2, obs.y + 6, obs.w - 4, obs.h - 6);
                ctx.strokeStyle = primaryColor;
                ctx.lineWidth = 2;
                ctx.strokeRect(obs.x + 2, obs.y + 6, obs.w - 4, obs.h - 6);
                ctx.beginPath();
                ctx.arc(obs.x + obs.w / 2, obs.y + 6, obs.w / 2 - 2, Math.PI, 0);
                ctx.stroke();
                ctx.fillStyle = isDarkMode ? '#a1a1aa' : '#52525b';
                ctx.fillRect(obs.x - 2, GROUND_Y - 3, obs.w + 4, 3);
            } else if (obs.type === 'barrier') {
                // Corpo barriera con fill visibile (3.38:1 light, 3.87:1 dark) non fuso con lo sfondo
                ctx.fillStyle = isDarkMode ? '#71717a' : '#8b8b93';
                ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

                ctx.strokeStyle = primaryColor;
                ctx.lineWidth = 2;
                ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

                // Strisce zebrate diagonali
                ctx.fillStyle = primaryColor;
                ctx.beginPath();
                for (let s = 0; s < obs.w; s += 10) {
                    ctx.moveTo(obs.x + s, obs.y);
                    ctx.lineTo(obs.x + s + 5, obs.y);
                    ctx.lineTo(obs.x + s - 2, obs.y + obs.h);
                    ctx.lineTo(obs.x + s - 7, obs.y + obs.h);
                }
                ctx.fill();

                ctx.fillRect(obs.x + 2, GROUND_Y - 4, 6, 4);
                ctx.fillRect(obs.x + obs.w - 8, GROUND_Y - 4, 6, 4);
            } else if (obs.type === 'drone') {
                ctx.fillStyle = isDarkMode ? '#e4e4e7' : '#18181b';
                ctx.fillRect(obs.x + 8, obs.y + 5, obs.w - 16, obs.h - 10);
                ctx.strokeStyle = primaryColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(obs.x, obs.y + 3);
                ctx.lineTo(obs.x + 16, obs.y + 3);
                ctx.moveTo(obs.x + obs.w - 16, obs.y + 3);
                ctx.lineTo(obs.x + obs.w, obs.y + 3);
                ctx.stroke();
                // LED drone con contrasto calibrato (5.10:1)
                ctx.fillStyle = isDarkMode ? '#b91c1c' : '#ef4444';
                ctx.beginPath();
                ctx.arc(obs.x + obs.w / 2, obs.y + obs.h / 2, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        // 5. Particelle
        particles.forEach((p) => {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // 6. DISEGNO DI GEKKO (Fallback con contrasto 5.48:1)
        ctx.save();
        if (gekko.isDucking) {
            const currentY = GROUND_Y - gekko.duckH;
            if (assetsLoaded && gekkoDuckImg.complete && gekkoDuckImg.naturalWidth > 0) {
                ctx.drawImage(gekkoDuckImg, gekko.x, currentY, gekko.duckW, gekko.duckH);
            } else {
                ctx.fillStyle = '#047857';
                ctx.fillRect(gekko.x, currentY, gekko.duckW, gekko.duckH);
            }
        } else {
            const bobbing = gekko.isGrounded ? Math.sin(gekko.runFrame * Math.PI) * 2.5 : 0;
            const currentY = gekko.y + bobbing;

            if (assetsLoaded && gekkoImg.complete && gekkoImg.naturalWidth > 0) {
                ctx.drawImage(gekkoImg, gekko.x, currentY, gekko.w, gekko.h);
            } else {
                ctx.fillStyle = '#047857';
                ctx.fillRect(gekko.x, currentY, gekko.w, gekko.h);
            }
        }
        ctx.restore();

        // 7. Popup Punteggi (+50 COLOR!) - Inchiostro solido con stroke per contrasto perfetto 21:1
        popups.forEach((pop) => {
            ctx.save();
            ctx.globalAlpha = Math.max(0, pop.alpha);
            ctx.font = 'bold 15px -apple-system, monospace';
            ctx.textAlign = 'center';
            ctx.lineWidth = 3.5;
            ctx.strokeStyle = isDarkMode ? '#121214' : '#ffffff';
            ctx.strokeText(pop.text, pop.x, pop.y);
            ctx.fillStyle = isDarkMode ? '#fafafa' : '#18181b';
            ctx.fillText(pop.text, pop.x, pop.y);
            ctx.restore();
        });

        // 8. HUD Arcade Multilingua con contrasti WCAG AAA verificati
        ctx.save();
        ctx.fillStyle = primaryColor;
        ctx.font = '700 18px monospace';
        ctx.textAlign = 'right';

        const sStr = String(score).padStart(5, '0');
        const hiStr = String(hiScore).padStart(5, '0');
        ctx.fillText(`HI ${hiStr}  ${sStr}`, V_WIDTH - 25, 34);

        ctx.textAlign = 'left';
        ctx.font = '700 13px monospace';
        // Contrasto 7.73:1 (light) / 7.30:1 (dark) AAA
        ctx.fillStyle = isDarkMode ? '#a1a1aa' : '#52525b';
        ctx.fillText(`${t.hudPainted}: ${paintedCount}`, 25, 34);

        if (comboStreak > 1) {
            // Contrasto 7.88:1 (light) / 10.32:1 (dark) AAA
            ctx.fillStyle = isDarkMode ? '#f9a8d4' : '#9d174d';
            ctx.fillText(`${t.hudCombo} x${comboStreak} 🔥`, 220, 34);
        }
        ctx.restore();

        // 9. Schermate di Stato (START con Tutorial Visivo AAA e GAMEOVER)
        if (currentState === STATE.START) {
            drawStartScreen();
        } else if (currentState === STATE.GAMEOVER) {
            drawGameOverScreen();
        }
    }

    // Schermata Iniziale con Istruzioni Visive a Schede (Tutti i contrasti WCAG AAA)
    function drawStartScreen() {
        ctx.save();
        ctx.fillStyle = isDarkMode ? 'rgba(18, 18, 20, 0.94)' : 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

        const primaryColor = isDarkMode ? '#ffffff' : '#18181b';
        const cardBg = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)';
        const cardBorder = '#71717a';

        ctx.textAlign = 'center';

        // 1. Titolo Principale e Sottotitolo
        ctx.fillStyle = primaryColor;
        ctx.font = '800 28px monospace';
        ctx.fillText(t.title, V_WIDTH / 2, 52);

        // Contrasto 7.41:1 light / 7.30:1 dark AAA
        ctx.fillStyle = isDarkMode ? '#a1a1aa' : '#52525b';
        ctx.font = '600 14px -apple-system, sans-serif';
        ctx.fillText(t.introDesc, V_WIDTH / 2, 76);

        // 2. Scheda Sinistra: Istruzioni SALTO
        const cardW = 320;
        const cardH = 135;
        const cardY = 106;
        const leftX = V_WIDTH / 2 - cardW - 18;

        ctx.fillStyle = cardBg;
        ctx.fillRect(leftX, cardY, cardW, cardH);
        ctx.strokeStyle = cardBorder;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(leftX, cardY, cardW, cardH);

        // Badge Salto con verde scuro #065f46 (Contrasto 7.68:1 AAA su testo bianco)
        ctx.fillStyle = '#065f46';
        ctx.fillRect(leftX + 18, cardY + 16, 95, 26);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(t.jumpTitle, leftX + 65, cardY + 33);

        ctx.textAlign = 'left';
        ctx.fillStyle = primaryColor;
        ctx.font = '700 14px -apple-system, sans-serif';
        ctx.fillText(t.jumpHeadline, leftX + 124, cardY + 34);

        // Testo istruzioni scheda (Contrasto 7.22:1 light / 11.99:1 dark AAA)
        ctx.font = '13px -apple-system, sans-serif';
        ctx.fillStyle = isDarkMode ? '#d4d4d8' : '#52525b';
        ctx.fillText(t.jumpDesk, leftX + 18, cardY + 68);
        ctx.fillText(t.jumpMob, leftX + 18, cardY + 90);

        // Tip con verde conforme (#065f46 light 7.17:1 / #34d399 dark 8.67:1 AAA)
        ctx.fillStyle = isDarkMode ? '#34d399' : '#065f46';
        ctx.font = '700 12px -apple-system, sans-serif';
        ctx.fillText(t.jumpTip, leftX + 18, cardY + 116);

        // 3. Scheda Destra: Istruzioni SCIVOLATA
        const rightX = V_WIDTH / 2 + 18;

        ctx.fillStyle = cardBg;
        ctx.fillRect(rightX, cardY, cardW, cardH);
        ctx.strokeStyle = cardBorder;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(rightX, cardY, cardW, cardH);

        // Badge Chinati con indaco scuro #4338ca (Contrasto 7.90:1 AAA su testo bianco)
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4338ca';
        ctx.fillRect(rightX + 18, cardY + 16, 105, 26);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(t.duckTitle, rightX + 70, cardY + 33);

        ctx.textAlign = 'left';
        ctx.fillStyle = primaryColor;
        ctx.font = '700 14px -apple-system, sans-serif';
        ctx.fillText(t.duckHeadline, rightX + 132, cardY + 34);

        ctx.font = '13px -apple-system, sans-serif';
        ctx.fillStyle = isDarkMode ? '#d4d4d8' : '#52525b';
        ctx.fillText(t.duckDesk, rightX + 18, cardY + 68);
        ctx.fillText(t.duckMob, rightX + 18, cardY + 90);

        // Tip con indaco conforme (#4338ca light 7.38:1 / #a5b4fc dark 8.36:1 AAA)
        ctx.fillStyle = isDarkMode ? '#a5b4fc' : '#4338ca';
        ctx.font = '700 12px -apple-system, sans-serif';
        ctx.fillText(t.duckTip, rightX + 18, cardY + 116);

        // 4. Prompt Lampeggiante (Fisso se l'utente richiede riduzione movimento)
        ctx.textAlign = 'center';
        const blink = prefersReducedMotion ? true : (Math.floor(Date.now() / 420) % 2 === 0);
        if (blink) {
            ctx.fillStyle = isDarkMode ? '#fafafa' : '#18181b';
            ctx.font = '800 15px monospace';
            ctx.fillText(t.startPrompt, V_WIDTH / 2, 290);
        }

        ctx.restore();
    }

    // Schermata Game Over Multilingua
    function drawGameOverScreen() {
        ctx.save();
        ctx.fillStyle = isDarkMode ? 'rgba(18, 18, 20, 0.94)' : 'rgba(255, 255, 255, 0.94)';
        ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

        ctx.textAlign = 'center';

        ctx.fillStyle = isDarkMode ? '#ffffff' : '#18181b';
        ctx.font = '800 34px monospace';
        ctx.fillText(t.gameOver, V_WIDTH / 2, V_HEIGHT / 2 - 38);

        // Contrasto 7.41:1 light / 7.30:1 dark AAA
        ctx.fillStyle = isDarkMode ? '#a1a1aa' : '#52525b';
        ctx.font = '700 14px -apple-system, sans-serif';
        ctx.fillText(`${t.statsScore}: ${score}   |   ${t.statsPainted}: ${paintedCount}   |   ${t.statsCombo}: x${maxCombo}`, V_WIDTH / 2, V_HEIGHT / 2 + 5);

        const blink = prefersReducedMotion ? true : (Math.floor(Date.now() / 420) % 2 === 0);
        if (blink) {
            ctx.fillStyle = isDarkMode ? '#fafafa' : '#18181b';
            ctx.font = '700 15px monospace';
            ctx.fillText(t.restartPrompt, V_WIDTH / 2, V_HEIGHT / 2 + 52);
        }
        ctx.restore();
    }

    // -------------------------------------------------------------------------
    // MAIN LOOP A 60 FPS
    // -------------------------------------------------------------------------

    function gameLoop(timestamp) {
        if (!lastFrameTime) lastFrameTime = timestamp;
        const dt = Math.min(Math.max(timestamp - lastFrameTime, 0), 35);
        lastFrameTime = timestamp;

        update(dt);
        draw();

        requestAnimationFrame(gameLoop);
    }

    // Avvio
    resizeCanvas();
    requestAnimationFrame(gameLoop);

})();
