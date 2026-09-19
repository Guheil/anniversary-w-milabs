(() => {
  "use strict";

  const TARGET_TIME = new Date("2026-09-24T00:00:00+08:00").getTime();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const state = {
    serverOffset: 0,
    status: "locked",
    timerId: null,
    lenis: null,
    scrollTimeline: null,
    unlockTimeline: null,
    letterAttempts: 0,
    letterMessageTimer: null,
    musicPrimed: false,
    musicStarted: false,
    musicFadeFrame: null,
    firstBloomTimeline: null,
    firstBloomReady: false,
    firstBloomHeroPinned: false,
    phaseOneFinaleReady: false,
    memoryAlbumReady: false,
    nightFinaleReady: false,
  };

  const elements = {
    body: document.body,
    experience: document.getElementById("countdownExperience"),
    introScene: document.getElementById("introScene"),
    introHello: document.getElementById("introHello"),
    introScroll: document.getElementById("introScroll"),
    flowerShell: document.getElementById("flowerShell"),
    outerPetals: Array.from(document.querySelectorAll(".flower-petal--outer")),
    innerPetals: Array.from(document.querySelectorAll(".flower-petal--inner")),
    flowerCore: document.querySelector(".flower-core"),
    bgFlowers: Array.from(document.querySelectorAll(".bg-flower")),
    bgFlowerPetals: Array.from(document.querySelectorAll(".bg-flower__petals")),
    bgFlowerCores: Array.from(document.querySelectorAll(".bg-flower__core")),
    bgFlowerCoreDots: Array.from(document.querySelectorAll(".bg-flower__core-dot")),
    bloomBurst: document.getElementById("bloomBurst"),
    countdownScene: document.getElementById("countdownScene"),
    countdownTitle: document.getElementById("countdownTitle"),
    countdown: document.getElementById("countdown"),
    units: Array.from(document.querySelectorAll(".countdown-unit")),
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    miniDays: document.getElementById("miniDays"),
    miniHours: document.getElementById("miniHours"),
    miniMinutes: document.getElementById("miniMinutes"),
    miniSeconds: document.getElementById("miniSeconds"),
    firstCopy: document.getElementById("firstCopy"),
    teaseCopy: document.getElementById("teaseCopy"),
    dateTease: document.getElementById("dateTease"),
    lockedCopy: document.getElementById("lockedCopy"),
    lockedCopyLead: document.querySelector(".locked-copy__lead"),
    lockedCopyMain: document.querySelector(".locked-copy__main"),
    lockedCopySub: document.querySelector(".locked-copy__sub"),
    waitOrnament: document.getElementById("waitOrnament"),
    waitWatch: document.getElementById("waitWatch"),
    waitBow: document.getElementById("waitBow"),
    waitHourHand: document.getElementById("waitHourHand"),
    waitMinuteHand: document.getElementById("waitMinuteHand"),
    waitSecondHand: document.getElementById("waitSecondHand"),
    scrollCue: document.getElementById("scrollCue"),
    unlockScene: document.getElementById("unlockScene"),
    unlockLines: Array.from(document.querySelectorAll("[data-unlock-line]")),
    sakuraField: document.getElementById("sakuraField"),
    nightVeil: document.getElementById("nightVeil"),
    letterFinale: document.getElementById("letterFinale"),
    finalDate: document.getElementById("finalDate"),
    letterScene: document.getElementById("letterScene"),
    loveLetter: document.getElementById("loveLetter"),
    letterFlap: document.getElementById("letterFlap"),
    letterSeal: document.getElementById("letterSeal"),
    letterPaper: document.getElementById("letterPaper"),
    letterMessage: document.getElementById("letterMessage"),
    letterMessageMain: document.getElementById("letterMessageMain"),
    letterMessageSub: document.getElementById("letterMessageSub"),
    letterLightWide: document.getElementById("letterLightWide"),
    letterLightNear: document.getElementById("letterLightNear"),
    letterFireflies: document.getElementById("letterFireflies"),
    letterFireflyDots: Array.from(document.querySelectorAll(".letter-firefly")),
    letterGarden: document.getElementById("letterGarden"),
    paperTransition: document.getElementById("paperTransition"),
    paperTransitionSheet: document.getElementById("paperTransitionSheet"),
    paperFoldLeft: document.getElementById("paperFoldLeft"),
    paperFoldRight: document.getElementById("paperFoldRight"),
    paperFoldTop: document.getElementById("paperFoldTop"),
    paperCreaseVertical: document.getElementById("paperCreaseVertical"),
    paperCreaseHorizontal: document.getElementById("paperCreaseHorizontal"),
    paperWorld: document.getElementById("paperWorld"),
    paperWorldCorners: Array.from(document.querySelectorAll(".paper-world__corner")),
    paperWorldStems: Array.from(document.querySelectorAll(".paper-world__stem")),
    paperWorldLeafBlooms: Array.from(document.querySelectorAll(".paper-world__leaf-bloom")),
    paperWorldLeaves: Array.from(document.querySelectorAll(".paper-world__leaf")),
    paperWorldPetalBlooms: Array.from(document.querySelectorAll(".paper-world__petal-bloom")),
    paperWorldPetals: Array.from(document.querySelectorAll(".paper-world__petal")),
    paperWorldCores: Array.from(document.querySelectorAll(".paper-world__core")),
    anniversarySite: document.getElementById("anniversarySite"),
    anniversaryHero: document.getElementById("anniversaryHero"),
    anniversaryHeroContent: document.getElementById("anniversaryHeroContent"),
    anniversaryMusic: document.getElementById("anniversaryMusic"),
    firstBloom: document.getElementById("firstBloom"),
    firstBloomStage: document.getElementById("firstBloomStage"),
    firstBloomScenes: Array.from(document.querySelectorAll("[data-bloom-scene]")),
    firstBloomDayMood: document.getElementById("firstBloomDayMood"),
    firstBloomNightMood: document.getElementById("firstBloomNightMood"),
    firstBloomBlueSoft: document.getElementById("firstBloomBlueSoft"),
    firstBloomPinkSoft: document.getElementById("firstBloomPinkSoft"),
    firstBloomMorningSoft: document.getElementById("firstBloomMorningSoft"),
    firstBloomLights: document.getElementById("firstBloomLights"),
    firstBloomLightDots: Array.from(document.querySelectorAll(".first-bloom__light")),
    firstBloomDiscord: document.getElementById("firstBloomDiscord"),
    firstBloomNicknameSun: document.getElementById("firstBloomNicknameSun"),
    firstBloomNicknameMoon: document.getElementById("firstBloomNicknameMoon"),
    firstBloomDiscordPath: document.getElementById("firstBloomDiscordPath"),
    firstBloomDiscordIntro: document.getElementById("firstBloomDiscordIntro"),
    firstBloomDiscordCare: document.getElementById("firstBloomDiscordCare"),
    firstBloomDiscordNights: document.getElementById("firstBloomDiscordNights"),
    firstBloomArawLine: document.getElementById("firstBloomArawLine"),
    firstBloomGabiLine: document.getElementById("firstBloomGabiLine"),
    firstBloomDiscordJoke: document.getElementById("firstBloomDiscordJoke"),
    firstBloomShared: document.getElementById("firstBloomShared"),
    firstBloomMotifs: Array.from(document.querySelectorAll(".first-bloom__motif")),
    firstBloomPlant: document.getElementById("firstBloomPlant"),
    firstBloomStem: document.getElementById("firstBloomStem"),
    firstBloomBranchA: document.getElementById("firstBloomBranchA"),
    firstBloomBranchB: document.getElementById("firstBloomBranchB"),
    firstBloomLeafA: document.getElementById("firstBloomLeafA"),
    firstBloomLeafB: document.getElementById("firstBloomLeafB"),
    firstBloomBud: document.getElementById("firstBloomBud"),
    firstBloomFlower: document.getElementById("firstBloomFlower"),
    firstBloomFlowerPetals: Array.from(document.querySelectorAll(".first-bloom__flower-petal")),
    firstBloomFlowerCore: document.getElementById("firstBloomFlowerCore"),
    phaseOneFinale: document.getElementById("phaseOneFinale"),
    phaseOneFinaleStage: document.getElementById("phaseOneFinaleStage"),
    phaseOneFinaleCopy: document.getElementById("phaseOneFinaleCopy"),
    phaseOneHeart: document.getElementById("phaseOneHeart"),
    phaseOneBrain: document.getElementById("phaseOneBrain"),
    phaseOneFiber: document.getElementById("phaseOneFiber"),
    phaseOneLove: document.getElementById("phaseOneLove"),
    phaseOneVines: document.getElementById("phaseOneVines"),
    phaseOneVineLeft: document.getElementById("phaseOneVineLeft"),
    phaseOneVineRight: document.getElementById("phaseOneVineRight"),
    phaseOneVinePaths: Array.from(document.querySelectorAll(".phase-one-finale__vine-path")),
    phaseOneVineBranches: Array.from(document.querySelectorAll(".phase-one-finale__vine-branch")),
    phaseOneVineLeaves: Array.from(document.querySelectorAll(".phase-one-finale__vine-leaf, .phase-one-finale__vine-bud")),
    phaseOneMeeting: document.getElementById("phaseOneMeeting"),
    phaseOneMeetingRings: Array.from(document.querySelectorAll(".phase-one-finale__meeting-ring")),
    phaseOneCenterBloom: document.getElementById("phaseOneCenterBloom"),
    phaseOneCenterBloomImageShell: document.getElementById("phaseOneCenterBloomImageShell"),
    phaseOneCenterBloomImage: document.getElementById("phaseOneCenterBloomImage"),
    phaseOneFinaleLights: document.getElementById("phaseOneFinaleLights"),
    phaseOneFinaleLightDots: Array.from(document.querySelectorAll(".phase-one-finale__light")),
    phaseOneFinalePetals: Array.from(document.querySelectorAll(".phase-one-finale__petal")),
    phaseOneFinaleWarmth: Array.from(document.querySelectorAll(".phase-one-finale__warmth-shape")),
    albumBgMood: document.getElementById("albumBgMood"),
    memoryAlbum: document.getElementById("memoryAlbum"),
    memoryAlbumStage: document.getElementById("memoryAlbumStage"),
    memoryAlbumDepthShadow: document.getElementById("memoryAlbumDepthShadow"),
    memoryAlbumBookWrap: document.getElementById("memoryAlbumBookWrap"),
    memoryAlbumBook: document.getElementById("memoryAlbumBook"),
    memoryAlbumSpread: document.getElementById("memoryAlbumSpread"),
    memoryAlbumSpine: document.querySelector(".memory-album__spine"),
    memoryAlbumCover: document.getElementById("memoryAlbumCover"),
    memoryAlbumMemories: Array.from(document.querySelectorAll("[data-album-memory]")),
    memoryAlbumPageTurnOne: document.getElementById("memoryAlbumPageTurnOne"),
    memoryAlbumPageTurnTwo: document.getElementById("memoryAlbumPageTurnTwo"),
    memoryAlbumClosing: document.getElementById("memoryAlbumClosing"),
    nightBgMood: document.getElementById("nightBgMood"),
    nightFinale: document.getElementById("nightFinale"),
    nightFinaleStage: document.getElementById("nightFinaleStage"),
    fireworksCanvas: document.getElementById("fireworksCanvas"),
    nightBloomLight: document.getElementById("nightBloomLight"),
    nightPaperWorld: document.getElementById("nightPaperWorld"),
    nightPlayfulDoodles: document.getElementById("nightPlayfulDoodles"),
    nightDoodles: Array.from(document.querySelectorAll(".night-finale__doodle")),
    nightEnvelopeWrap: document.getElementById("nightEnvelopeWrap"),
    nightEnvelope: document.getElementById("nightEnvelope"),
    nightEnvelopeFlap: document.getElementById("nightEnvelopeFlap"),
    nightLetterPaper: document.getElementById("nightLetterPaper"),
    nightLoveLetter: document.getElementById("nightLoveLetter"),
    nightLetterContent: document.getElementById("nightLetterContent"),
    nightLetterLines: Array.from(document.querySelectorAll(".night-finale__letter-greeting, .night-finale__letter-line, .night-finale__letter-placeholder, .night-finale__letter-closing")),
    nightEnvelopePieces: Array.from(document.querySelectorAll(".night-finale__envelope-back, .night-finale__envelope-front, .night-finale__pressed-flower")),
    nightEnding: document.getElementById("nightEnding"),
    nightFinalScene: document.getElementById("nightFinalScene"),
    nightFinalNight: document.getElementById("nightFinalNight"),
    nightFinalMoon: document.getElementById("nightFinalMoon"),
    nightFinalStars: document.getElementById("nightFinalStars"),
    nightFinalMeteorOne: document.getElementById("nightFinalMeteorOne"),
    nightFinalMeteorOneGuide: document.getElementById("nightFinalMeteorOneGuide"),
    nightFinalMeteorOneGlow: document.getElementById("nightFinalMeteorOneGlow"),
    nightFinalMeteorOneCore: document.getElementById("nightFinalMeteorOneCore"),
    nightFinalMeteorOneHead: document.getElementById("nightFinalMeteorOneHead"),
    nightFinalMeteorTwo: document.getElementById("nightFinalMeteorTwo"),
    nightFinalMeteorTwoGuide: document.getElementById("nightFinalMeteorTwoGuide"),
    nightFinalMeteorTwoGlow: document.getElementById("nightFinalMeteorTwoGlow"),
    nightFinalMeteorTwoCore: document.getElementById("nightFinalMeteorTwoCore"),
    nightFinalMeteorTwoHead: document.getElementById("nightFinalMeteorTwoHead"),
    nightFinalHearts: document.getElementById("nightFinalHearts"),
    nightFinalMessage: document.getElementById("nightFinalMessage"),
    nightFinalPersonal: document.getElementById("nightFinalPersonal"),
    nightFinalTitle: document.getElementById("nightFinalTitle"),
    nightFinalTitleLineOne: document.getElementById("nightFinalTitleLineOne"),
    nightFinalTitleLineTwo: document.getElementById("nightFinalTitleLineTwo"),
    nightFinalSubline: document.getElementById("nightFinalSubline"),
    nightFinalCurtain: document.getElementById("nightFinalCurtain"),
    nightCurtainLeft: document.getElementById("nightCurtainLeft"),
    nightCurtainRight: document.getElementById("nightCurtainRight"),
    nightCurtainHeart: document.getElementById("nightCurtainHeart"),
  };

  function now() {
    return Date.now() + state.serverOffset;
  }

  async function syncServerTime() {
    if (window.location.protocol === "file:") return;

    try {
      const started = Date.now();
      const response = await fetch(window.location.href, {
        method: "HEAD",
        cache: "no-store",
      });
      const serverDate = response.headers.get("date");
      if (!serverDate) return;

      const ended = Date.now();
      const midpoint = started + (ended - started) / 2;
      const serverTime = new Date(serverDate).getTime();

      if (Number.isFinite(serverTime)) {
        state.serverOffset = serverTime - midpoint;
      }
    } catch {
      state.serverOffset = 0;
    }
  }

  function pad(value) {
    return String(Math.max(0, value)).padStart(2, "0");
  }

  function getRemaining() {
    const difference = Math.max(0, TARGET_TIME - now());
    const totalSeconds = Math.floor(difference / 1000);

    return {
      difference,
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  function renderCountdown(remaining) {
    const days = pad(remaining.days);
    const hours = pad(remaining.hours);
    const minutes = pad(remaining.minutes);
    const seconds = pad(remaining.seconds);

    elements.days.textContent = days;
    elements.hours.textContent = hours;
    elements.minutes.textContent = minutes;
    elements.seconds.textContent = seconds;

    elements.miniDays.textContent = `${days}d`;
    elements.miniHours.textContent = `${hours}h`;
    elements.miniMinutes.textContent = `${minutes}m`;
    elements.miniSeconds.textContent = `${seconds}s`;

    elements.countdown.setAttribute(
      "aria-label",
      `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds until September 24`
    );
  }

  function applyCountdownZeroState() {
    elements.countdownTitle.textContent = "waiting is over hehe";
    elements.firstCopy.textContent = "waiting is over na milabs hehe";
    elements.teaseCopy.textContent = "eto naaa, pwede na buksan :>";
    elements.countdown.setAttribute("aria-label", "Waiting is over. It is now September 24.");
  }

  function applyWaitingZeroState() {
    if (elements.lockedCopyLead) elements.lockedCopyLead.textContent = "waiting is overrr";
    if (elements.lockedCopyMain) elements.lockedCopyMain.textContent = "here we go milabs hehe";
    if (elements.lockedCopySub) elements.lockedCopySub.textContent = "pwede na buksan ang letter :>";
  }

  function animatePaperWorldBloom(quick = false) {
    if (!window.gsap) return;
    const gsap = window.gsap;
    const tl = gsap.timeline();

    elements.paperWorldStems.forEach((stem) => {
      try {
        const length = stem.getTotalLength();
        gsap.set(stem, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.18 });
      } catch {
        gsap.set(stem, { opacity: 0.18 });
      }
    });

    tl.to(elements.paperWorldCorners, {
        opacity: 0.74,
        scale: 1,
        duration: quick ? 0.01 : 0.34,
        stagger: quick ? 0 : 0.08,
        ease: "power1.out",
      }, 0)
      .to(elements.paperWorldStems, {
        strokeDashoffset: 0,
        opacity: 0.7,
        duration: quick ? 0.01 : 0.56,
        stagger: quick ? 0 : 0.08,
        ease: "power2.out",
      }, quick ? 0 : 0.04)
      .to(elements.paperWorldLeafBlooms, {
        scale: 1,
        opacity: 1,
        duration: quick ? 0.01 : 0.42,
        stagger: quick ? 0 : 0.06,
        ease: "back.out(1.55)",
      }, quick ? 0 : 0.26)
      .to(elements.paperWorldPetalBlooms, {
        scale: 1,
        opacity: 1,
        duration: quick ? 0.01 : 0.62,
        stagger: quick ? 0 : 0.035,
        ease: "back.out(1.7)",
      }, quick ? 0 : 0.42)
      .to(elements.paperWorldCores, {
        scale: 1,
        opacity: 1,
        duration: quick ? 0.01 : 0.3,
        stagger: quick ? 0 : 0.05,
        ease: "back.out(1.4)",
      }, quick ? 0 : 0.66);
  }

  function primeAnniversaryMusic() {
    const audio = elements.anniversaryMusic;
    if (!audio || state.musicPrimed) return;

    try {
      audio.currentTime = 0;
      audio.volume = 0;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => { state.musicPrimed = true; })
          .catch(() => {
            /* The reveal makes one more playback attempt if the browser blocks priming. */
            state.musicPrimed = false;
          });
      } else {
        state.musicPrimed = true;
      }
    } catch {
      state.musicPrimed = false;
    }
  }

  function startAnniversaryMusic() {
    const audio = elements.anniversaryMusic;
    if (!audio || state.musicStarted) return;

    state.musicStarted = true;
    if (state.musicFadeFrame !== null) {
      window.cancelAnimationFrame(state.musicFadeFrame);
      state.musicFadeFrame = null;
    }

    try {
      audio.currentTime = 0;
    } catch {}

    audio.muted = false;
    audio.volume = 0;

    const fadeToTarget = () => {
      const targetVolume = 0.3;
      const fadeDuration = reducedMotion.matches ? 900 : 6500;
      const startedAt = performance.now();

      const step = (time) => {
        const progress = Math.min(1, (time - startedAt) / fadeDuration);
        const easedProgress = 0.5 - Math.cos(Math.PI * progress) / 2;
        audio.volume = Math.min(targetVolume, targetVolume * easedProgress);
        if (progress < 1) {
          state.musicFadeFrame = window.requestAnimationFrame(step);
        } else {
          audio.volume = targetVolume;
          state.musicFadeFrame = null;
        }
      };

      state.musicFadeFrame = window.requestAnimationFrame(step);
    };

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.then(fadeToTarget).catch(() => {
        state.musicStarted = false;
      });
    } else {
      fadeToTarget();
    }
  }

  function stopTimer() {
    if (state.timerId !== null) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function startTimer() {
    stopTimer();

    const tick = () => {
      const remaining = getRemaining();
      renderCountdown(remaining);

      if (remaining.difference <= 0 && state.status === "locked") {
        stopTimer();
        enterReadyState(true);
      }
    };

    tick();
    state.timerId = window.setInterval(tick, 250);
  }

  function seededRandom(index, salt = 0) {
    const value = Math.sin(index * 9283.17 + salt * 1237.91) * 43758.5453;
    return value - Math.floor(value);
  }

  function createSakuraField() {
    const count = reducedMotion.matches ? 6 : window.innerWidth < 640 ? 13 : 21;
    const colors = ["#f2b8c7", "#f8dce4", "#ffffff", "#dcecff"];
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < count; index += 1) {
      const petal = document.createElement("span");
      const depthRandom = seededRandom(index, 1);
      const depth = depthRandom < 0.3 ? "back" : depthRandom > 0.84 ? "front" : "mid";
      const sizeBase = depth === "front" ? 15 : depth === "back" ? 8 : 11;
      const width = sizeBase + seededRandom(index, 2) * 7;
      const duration = 12 + seededRandom(index, 3) * 11;
      const delay = -(seededRandom(index, 4) * duration);
      const drift = -70 + seededRandom(index, 5) * 145;
      const spin = 190 + seededRandom(index, 6) * 360;
      const scale = 0.82 + seededRandom(index, 7) * 0.42;

      petal.className = "sakura-petal";
      petal.dataset.depth = depth;
      petal.style.left = `${seededRandom(index, 8) * 100}%`;
      petal.style.setProperty("--petal-w", `${width}px`);
      petal.style.setProperty("--petal-h", `${Math.max(6, width * 0.66)}px`);
      petal.style.setProperty("--petal-color", colors[index % colors.length]);
      petal.style.setProperty("--fall-duration", `${duration.toFixed(2)}s`);
      petal.style.setProperty("--fall-delay", `${delay.toFixed(2)}s`);
      petal.style.setProperty("--petal-drift", `${drift.toFixed(1)}px`);
      petal.style.setProperty("--petal-spin", `${spin.toFixed(1)}deg`);
      petal.style.setProperty("--petal-scale", scale.toFixed(2));
      fragment.appendChild(petal);
    }

    elements.sakuraField.replaceChildren(fragment);
  }

  function createBloomBurst() {
    const fragment = document.createDocumentFragment();
    const count = 14;
    for (let index = 0; index < count; index += 1) {
      const petal = document.createElement("span");
      petal.className = "bloom-burst__petal";
      petal.dataset.angle = String(index * (360 / count) + (index % 2 ? 8 : -5));
      fragment.appendChild(petal);
    }
    elements.bloomBurst.replaceChildren(fragment);
  }

  function createLenis() {
    if (reducedMotion.matches || typeof window.Lenis !== "function") return;

    state.lenis = new window.Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    if (window.gsap && window.ScrollTrigger) {
      state.lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => state.lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    }
  }

  function setInitialVisualState() {
    if (!window.gsap) return;
    const gsap = window.gsap;

    gsap.set(elements.flowerShell, { xPercent: -50, yPercent: -50, scale: 0.66, rotation: -3, opacity: 1, x: 0, y: 0 });
    gsap.set(elements.outerPetals, { scale: 0.14, y: 21, opacity: 0, rotation: 0, transformOrigin: "120px 120px" });
    gsap.set(elements.innerPetals, { scale: 0.24, y: 13, opacity: 0.06, rotation: 0, transformOrigin: "120px 120px" });
    gsap.set(elements.flowerCore, { scale: 0.58, opacity: 0, transformOrigin: "120px 120px" });
    gsap.set(elements.bgFlowers, { opacity: 0, scale: 0.18, rotation: 0, y: 10, transformOrigin: "50% 50%" });
    gsap.set(elements.bgFlowerPetals, { scale: 0.22, opacity: 0.08, transformOrigin: "50% 50%" });
    gsap.set(elements.bgFlowerCores, { scale: 0.6, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(elements.bgFlowerCoreDots, { opacity: 0 });
    gsap.set(elements.introHello, { opacity: 1, y: 0 });
    gsap.set(elements.introScroll, { opacity: 0.92, y: 0 });
    gsap.set(elements.countdownScene, { autoAlpha: 0, opacity: 0, y: 14, scale: 0.98 });
    gsap.set(elements.firstCopy, { opacity: 0, y: 8 });
    gsap.set(elements.teaseCopy, { opacity: 0, y: 8 });
    gsap.set(elements.dateTease, { opacity: 0, scale: 0.97 });
    gsap.set(elements.lockedCopy, { autoAlpha: 0, opacity: 0, y: 12 });
    gsap.set(elements.waitOrnament, { opacity: 0, y: 10, scale: 0.88, transformOrigin: "50% 50%" });
    gsap.set(elements.waitWatch, { rotation: -8, transformOrigin: "130px 106px" });
    gsap.set(elements.waitBow, { y: -4, rotation: -5, transformOrigin: "130px 58px" });
    gsap.set(elements.waitHourHand, { rotation: -14, transformOrigin: "130px 106px" });
    gsap.set(elements.waitMinuteHand, { rotation: -10, transformOrigin: "130px 106px" });
    gsap.set(elements.waitSecondHand, { rotation: -28, transformOrigin: "130px 106px" });
    gsap.set(elements.scrollCue, { opacity: 0.9, y: 0 });
    gsap.set(elements.nightVeil, { opacity: 0 });
    gsap.set(elements.letterFinale, { autoAlpha: 0, opacity: 0 });
    gsap.set(elements.finalDate, { opacity: 0, y: 22, scale: 0.98 });
    gsap.set(elements.loveLetter, { opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 26, scale: 0.94, rotation: -1, transformOrigin: "50% 50%" });
    gsap.set(elements.letterFlap, { rotationX: 0, transformPerspective: 700, transformOrigin: "210px 72px" });
    gsap.set(elements.letterSeal, { opacity: 1, scale: 1, rotation: 0, transformOrigin: "210px 169px" });
    gsap.set(elements.letterPaper, { opacity: 0, y: 62, scale: 0.92, transformOrigin: "210px 205px" });
    gsap.set(elements.letterGarden, { opacity: 0, y: 24, scale: 0.96, transformOrigin: "50% 100%" });
    gsap.set(elements.letterMessage, { autoAlpha: 0, opacity: 0, y: 8 });
    gsap.set(elements.letterFireflies, { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" });
    gsap.set(elements.letterLightWide, { opacity: 0, scale: 0.62, xPercent: -50, yPercent: -50 });
    gsap.set(elements.letterLightNear, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    gsap.set(elements.paperTransition, { autoAlpha: 0, opacity: 0 });
    gsap.set(elements.paperTransitionSheet, { xPercent: -50, yPercent: -50, scale: 0.12, y: 54, rotation: -5, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(elements.paperFoldLeft, { rotationY: 62, transformOrigin: "100% 50%" });
    gsap.set(elements.paperFoldRight, { rotationY: -62, transformOrigin: "0% 50%" });
    gsap.set(elements.paperFoldTop, { rotationX: 52, transformOrigin: "50% 100%" });
    gsap.set([elements.paperCreaseVertical, elements.paperCreaseHorizontal], { opacity: 0.72 });
    gsap.set(elements.paperWorld, { autoAlpha: 0, opacity: 0 });
    gsap.set(elements.paperWorldCorners, { opacity: 0.04, scale: 0.9, transformOrigin: "50% 50%" });
    gsap.set(elements.paperWorldStems, { opacity: 0.18 });
    gsap.set(elements.paperWorldLeafBlooms, { scale: 0.15, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(elements.paperWorldPetalBlooms, { scale: 0.04, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(elements.paperWorldCores, { scale: 0.08, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(elements.anniversarySite, { autoAlpha: 0, opacity: 0 });
    gsap.set(elements.anniversaryHeroContent, { opacity: 0, y: 18 });
    gsap.set(elements.sakuraField, { opacity: 1 });

    const burstPetals = Array.from(elements.bloomBurst.children);
    gsap.set(burstPetals, { x: 0, y: 0, scale: 0.25, opacity: 0, rotation: 0 });
  }

  function addBloomBurstToTimeline(timeline, position) {
    if (!window.gsap) return;
    const petals = Array.from(elements.bloomBurst.children);
    const distance = window.innerWidth < 640 ? 104 : 148;

    petals.forEach((petal, index) => {
      const angle = Number(petal.dataset.angle) * (Math.PI / 180);
      const x = Math.cos(angle) * (distance + (index % 3) * 8);
      const y = Math.sin(angle) * (distance + (index % 2) * 10);

      timeline.to(
        petal,
        {
          x,
          y,
          scale: 0.5 + (index % 3) * 0.12,
          opacity: 0.78,
          rotation: 90 + index * 31,
          duration: 0.055,
          ease: "power2.out",
        },
        position
      );

      timeline.to(
        petal,
        {
          x: x * 1.22,
          y: y * 1.16 + 18,
          opacity: 0,
          rotation: 170 + index * 37,
          duration: 0.07,
          ease: "power1.in",
        },
        position + 0.052
      );
    });
  }

  function buildScrollTimeline() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    setInitialVisualState();

    state.scrollTimeline?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: elements.experience,
        start: "top top",
        end: "bottom bottom",
        scrub: reducedMotion.matches ? false : 0.78,
        invalidateOnRefresh: true,
      },
    });

    state.scrollTimeline = tl;

    elements.bgFlowers.forEach((flower, index) => {
      const enterAt = 0.04 + index * 0.045;
      const fullAt = enterAt + 0.10;
      const settleScale = [0.82, 0.92, 0.88, 0.80][index] || 0.86;
      const bloomScale = [1.08, 1.14, 1.04, 0.98][index] || 1.05;
      const rotateIn = [-7, 9, -5, 6][index] || 0;
      const yLift = [0, -4, 3, -2][index] || 0;
      const core = elements.bgFlowerCores[index];
      const petals = flower.querySelector('.bg-flower__petals');
      const dots = flower.querySelectorAll('.bg-flower__core-dot');

      tl.to(flower, {
        opacity: 0.34 + index * 0.07,
        scale: 0.54 + index * 0.05,
        rotation: rotateIn,
        y: yLift,
        duration: 0.10,
        ease: 'power2.out',
      }, enterAt)
      .to(petals, {
        scale: 0.84,
        opacity: 0.95,
        duration: 0.11,
        ease: 'power2.out',
      }, enterAt + 0.02)
      .to(core, {
        opacity: 1,
        scale: 1,
        duration: 0.07,
        ease: 'power2.out',
      }, enterAt + 0.06);

      if (dots.length) {
        tl.to(dots, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.01,
        }, enterAt + 0.075);
      }

      tl.to(flower, {
        scale: bloomScale,
        duration: 0.09,
        ease: 'back.out(1.45)',
      }, fullAt)
      .to(flower, {
        scale: settleScale,
        duration: 0.08,
        ease: 'power1.inOut',
      }, fullAt + 0.09);
    });

    elements.innerPetals.forEach((petal, index) => {
      tl.to(
        petal,
        {
          scale: 0.58 + (index % 2) * 0.04,
          y: 7 - (index % 2) * 2,
          opacity: 0.88,
          rotation: index % 2 ? 2 : -2,
          duration: 0.11,
          ease: "power2.out",
        },
        0.10 + index * 0.018
      );
    });

    elements.outerPetals.forEach((petal, index) => {
      tl.to(
        petal,
        {
          scale: 0.66 + (index % 2) * 0.04,
          y: 6 - (index % 3),
          opacity: 0.92,
          rotation: index % 2 ? 1.8 : -1.8,
          duration: 0.115,
          ease: "power2.out",
        },
        0.23 + index * 0.012
      );
    });

    tl.to(elements.flowerShell, { scale: 0.84, rotation: 0, duration: 0.19, ease: "power2.out" }, 0.08)
      .to(elements.flowerCore, { scale: 0.88, opacity: 1, duration: 0.14, ease: "power2.out" }, 0.22)
      .to(elements.introHello, { opacity: 0.42, y: -7, duration: 0.08 }, 0.27)
      .to(elements.introScroll, { opacity: 0.52, y: 4, duration: 0.08 }, 0.29)
      .to(elements.innerPetals, {
        scale: 0.76,
        y: 3,
        rotation: 0,
        opacity: 1,
        duration: 0.10,
        stagger: 0.005,
        ease: "power2.inOut",
      }, 0.35)
      .to(elements.outerPetals, {
        scale: 0.80,
        y: 2,
        rotation: 0,
        opacity: 1,
        duration: 0.11,
        stagger: 0.004,
        ease: "power2.inOut",
      }, 0.36)
      .to(elements.flowerShell, { scale: 0.97, duration: 0.10, ease: "power2.inOut" }, 0.37)

      /* V4: a real oversized bloom, followed by a calm settle before the timer. */
      .to(elements.innerPetals, {
        scale: 1.16,
        y: 0,
        duration: 0.09,
        stagger: 0.004,
        ease: "back.out(1.6)",
      }, 0.445)
      .to(elements.outerPetals, {
        scale: 1.22,
        y: 0,
        duration: 0.095,
        stagger: 0.004,
        ease: "back.out(1.55)",
      }, 0.448)
      .to(elements.flowerCore, { scale: 1.10, duration: 0.075, ease: "back.out(1.55)" }, 0.455)
      .to(elements.flowerShell, { scale: 2.28, duration: 0.095, ease: "power3.out" }, 0.445)
      .to(elements.introHello, { opacity: 0, y: -12, duration: 0.06 }, 0.448)
      .to(elements.introScroll, { opacity: 0, y: 9, duration: 0.06 }, 0.448)
      .to(elements.scrollCue, { opacity: 0.12, duration: 0.06 }, 0.46)
      .to(elements.flowerShell, { scale: 1.16, duration: 0.10, ease: "power2.inOut" }, 0.535)
      .to(elements.innerPetals, { scale: 1, duration: 0.08, stagger: 0.003, ease: "power1.inOut" }, 0.535)
      .to(elements.outerPetals, { scale: 1, duration: 0.08, stagger: 0.003, ease: "power1.inOut" }, 0.535)
      .to(elements.flowerCore, { scale: 1, duration: 0.08 }, 0.535);

    addBloomBurstToTimeline(tl, 0.455);

    tl.to(elements.flowerShell, { scale: 1.52, opacity: 0.20, duration: 0.09, ease: "power2.inOut" }, 0.575)
      .to(elements.bgFlowers, { opacity: 0.18, duration: 0.10, stagger: 0.01, ease: "power1.inOut" }, 0.58)
      .to(elements.countdownScene, { autoAlpha: 1, opacity: 1, y: 0, scale: 1, duration: 0.09, ease: "power2.out" }, 0.59)
      .to(elements.scrollCue, { opacity: 0, duration: 0.05 }, 0.59)
      .to(elements.firstCopy, { opacity: 1, y: 0, duration: 0.07 }, 0.635)
      .to(elements.units[0], { xPercent: -18, duration: 0.09 }, 0.665)
      .to(elements.units[1], { xPercent: -6, duration: 0.09 }, 0.665)
      .to(elements.units[2], { xPercent: 6, duration: 0.09 }, 0.665)
      .to(elements.units[3], { xPercent: 18, duration: 0.09 }, 0.665)
      .to(elements.firstCopy, { opacity: 0, y: -7, duration: 0.045 }, 0.705)
      .to(elements.dateTease, { opacity: 1, scale: 1, duration: 0.075 }, 0.715)
      .to(elements.teaseCopy, { opacity: 1, y: 0, duration: 0.065 }, 0.735)
      .to(elements.teaseCopy, { opacity: 0, y: -7, duration: 0.045 }, 0.775)
      .to(elements.units[0], { x: -90, y: -62, rotation: -3, duration: 0.075 }, 0.785)
      .to(elements.units[1], { x: 68, y: -38, rotation: 2, duration: 0.075 }, 0.785)
      .to(elements.units[2], { x: -62, y: 78, rotation: -2, duration: 0.075 }, 0.785)
      .to(elements.units[3], { x: 94, y: 58, rotation: 3, duration: 0.075 }, 0.785)
      .to(elements.flowerShell, { opacity: 0.14, scale: 1.78, rotation: 5, duration: 0.075 }, 0.785)
      .to(elements.units, { x: 0, y: 0, xPercent: 0, rotation: 0, duration: 0.06, stagger: 0.003 }, 0.835)
      .to(elements.dateTease, { opacity: 0, scale: 1.02, duration: 0.05 }, 0.835)

      /* Cleanly finish the countdown scene before anything from the waiting scene appears. */
      .to(elements.countdownScene, { autoAlpha: 0, opacity: 0, y: -30, scale: 0.94, duration: 0.065, ease: "power1.in" }, 0.852)
      .to(elements.flowerShell, { opacity: 0.24, scale: 1.42, rotation: 2, y: 0, duration: 0.055, ease: "power1.inOut" }, 0.86)

      /* Deliberate breathing beat: only the soft background remains for a moment. */
      .to(elements.bgFlowers, { opacity: 0.12, duration: 0.045, stagger: 0.004, ease: "power1.inOut" }, 0.908)

      /* Waiting scene enters only after the countdown is fully gone. */
      .to(elements.flowerShell, { opacity: 0.66, scale: 0.40, rotation: 0, y: 162, duration: 0.06, ease: "power2.out" }, 0.928)
      .to(elements.lockedCopy, { autoAlpha: 1, opacity: 1, y: 0, duration: 0.078, ease: "power2.out" }, 0.936)
      .to(elements.waitOrnament, { opacity: 1, y: 0, scale: 1, duration: 0.088, ease: "back.out(1.18)" }, 0.95)
      .to(elements.waitWatch, { rotation: 0, duration: 0.10, ease: "power2.out" }, 0.956)
      .to(elements.waitBow, { y: 0, rotation: 0, duration: 0.08, ease: "back.out(1.4)" }, 0.958)
      .to(elements.waitHourHand, { rotation: 8, duration: 0.12, ease: "power1.inOut" }, 0.966)
      .to(elements.waitMinuteHand, { rotation: 56, duration: 0.12, ease: "power1.inOut" }, 0.966)
      .to(elements.waitSecondHand, { rotation: 42, duration: 0.085, ease: "power1.out" }, 0.97)
      .to(elements.nightVeil, { opacity: 0.30, duration: 0.08, ease: "power1.inOut" }, 0.98)
      .to(elements.waitOrnament, { y: -5, duration: 0.075, ease: "sine.inOut" }, 1.014)
      .to(elements.waitHourHand, { rotation: 14, duration: 0.085, ease: "power1.inOut" }, 1.022)
      .to(elements.waitMinuteHand, { rotation: 102, duration: 0.10, ease: "power1.inOut" }, 1.022)
      .to(elements.waitSecondHand, { rotation: 112, duration: 0.07, ease: "power1.out" }, 1.024)
      .to(elements.waitOrnament, { y: 0, duration: 0.07, ease: "sine.inOut" }, 1.044)
      .to(elements.waitBow, { y: -2, rotation: -3, duration: 0.07, ease: "sine.inOut" }, 1.038)
      .to(elements.waitBow, { y: 0, rotation: 0, duration: 0.07, ease: "sine.inOut" }, 1.068)
      .to(elements.waitHourHand, { rotation: 18, duration: 0.085, ease: "power1.inOut" }, 1.062)
      .to(elements.waitMinuteHand, { rotation: 148, duration: 0.11, ease: "power1.inOut" }, 1.062)
      .to(elements.waitSecondHand, { rotation: 192, duration: 0.075, ease: "power1.out" }, 1.064)
      .to(elements.bgFlowers, { opacity: 0.05, scale: 0.7, duration: 0.075, stagger: 0.008, ease: "power1.inOut" }, 1.08)
      .to(elements.lockedCopy, { autoAlpha: 0, opacity: 0, y: -16, duration: 0.075, ease: "power1.in" }, 1.112)
      .to(elements.waitOrnament, { opacity: 0, y: -10, scale: 0.94, duration: 0.07, ease: "power1.in" }, 1.112)

      /* The airy blue world gives way to the firefly-lit love-letter scene. */
      .to(elements.nightVeil, { opacity: 0.76, duration: 0.10, ease: "power1.inOut" }, 1.126)
      .to(elements.sakuraField, { opacity: 0.42, duration: 0.10 }, 1.126)
      .to(elements.flowerShell, { y: 205, scale: 0.58, opacity: 0.28, duration: 0.085, ease: "power2.inOut" }, 1.134)
      .to(elements.letterFinale, { autoAlpha: 1, opacity: 1, duration: 0.06 }, 1.146)
      .to(elements.letterGarden, { opacity: 1, y: 0, scale: 1, duration: 0.09, ease: "back.out(1.15)" }, 1.161)
      .to(elements.letterFireflies, { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" }, 1.17)
      .to(elements.letterLightWide, { opacity: 0.72, scale: 1, duration: 0.08, ease: "power2.out" }, 1.178)
      .to(elements.letterLightNear, { opacity: 0.78, scale: 1, duration: 0.08, ease: "power2.out" }, 1.183)
      .to(elements.loveLetter, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.10, ease: "back.out(1.35)" }, 1.19)
      .to(elements.flowerShell, { opacity: 0, y: 236, scale: 0.42, duration: 0.06 }, 1.196)
      .to(elements.nightVeil, { opacity: 0.92, duration: 0.08, ease: "power1.inOut" }, 1.208)
      .to(elements.sakuraField, { opacity: 0.30, duration: 0.07 }, 1.226)
      .to(elements.finalDate, { opacity: 1, y: 0, scale: 1, duration: 0.09, ease: "power2.out" }, 1.246)
      .to(elements.letterLightNear, { opacity: 0.68, scale: 1.06, duration: 0.09, ease: "sine.inOut" }, 1.276);

    if (reducedMotion.matches) {
      tl.scrollTrigger?.kill(false);
      gsap.set(elements.outerPetals, { scale: 1, y: 0, opacity: 1, rotation: 0 });
      gsap.set(elements.innerPetals, { scale: 1, y: 0, opacity: 1, rotation: 0 });
      gsap.set(elements.flowerCore, { scale: 1, opacity: 1 });
      gsap.set(elements.bgFlowers, { opacity: 0.42, scale: 1, y: 0, rotation: 0 });
      gsap.set(elements.bgFlowerPetals, { scale: 1, opacity: 1 });
      gsap.set(elements.bgFlowerCores, { scale: 1, opacity: 1 });
      gsap.set(elements.bgFlowerCoreDots, { opacity: 1 });
      gsap.set(elements.flowerShell, { scale: 1.35, opacity: 0.18, xPercent: -50, yPercent: -50, y: 0, rotation: 0 });
      gsap.set(elements.paperWorldCorners, { opacity: 0.72, scale: 1 });
      gsap.set(elements.paperWorldStems, { opacity: 0.7, strokeDashoffset: 0 });
      gsap.set(elements.paperWorldLeafBlooms, { scale: 1, opacity: 1 });
      gsap.set(elements.paperWorldPetalBlooms, { scale: 1, opacity: 1 });
      gsap.set(elements.paperWorldCores, { scale: 1, opacity: 1 });
      gsap.set(elements.introScene, { opacity: 0 });
      gsap.set(elements.countdownScene, { autoAlpha: 1, opacity: 1, y: 0, scale: 1 });
      gsap.set(elements.firstCopy, { opacity: 1, y: 0 });
      gsap.set(elements.lockedCopy, { autoAlpha: 0, opacity: 0 });
      gsap.set(elements.waitOrnament, { opacity: 0, y: 0, scale: 1 });
      gsap.set(elements.waitBow, { y: 0, rotation: 0 });
      gsap.set(elements.nightVeil, { opacity: 0 });
      gsap.set(elements.letterFinale, { autoAlpha: 0, opacity: 0 });
      gsap.set(elements.scrollCue, { opacity: 0 });
    }
  }

  function resetCountdownVisualsForUnlock() {
    if (!window.gsap) return;

    state.scrollTimeline?.scrollTrigger?.disable(false);
    state.lenis?.stop();
    elements.body.classList.add("is-unlocking");

    window.gsap.killTweensOf([
      elements.introScene,
      elements.flowerShell,
      elements.outerPetals,
      elements.innerPetals,
      elements.flowerCore,
      elements.bgFlowers,
      elements.bgFlowerPetals,
      elements.bgFlowerCores,
      elements.bgFlowerCoreDots,
      elements.countdownScene,
      elements.countdown,
      elements.units,
      elements.dateTease,
      elements.firstCopy,
      elements.teaseCopy,
      elements.lockedCopy,
      elements.scrollCue,
      elements.nightVeil,
      elements.letterFinale,
      elements.finalDate,
      elements.letterLightWide,
      elements.loveLetter,
      elements.letterGarden,
      elements.letterMessage,
      elements.letterFireflies,
      elements.letterLightNear,
      elements.letterFlap,
      elements.letterSeal,
      elements.letterPaper,
      elements.paperTransition,
      elements.paperTransitionSheet,
      elements.paperFoldLeft,
      elements.paperFoldRight,
      elements.paperFoldTop,
      elements.paperCreaseVertical,
      elements.paperCreaseHorizontal,
      elements.paperWorld,
      elements.anniversarySite,
      elements.anniversaryHeroContent,
      elements.sakuraField,
    ]);
  }

  function clearLetterMessageTimer() {
    if (state.letterMessageTimer !== null) {
      window.clearTimeout(state.letterMessageTimer);
      state.letterMessageTimer = null;
    }
  }

  function showLetterMessage(main, sub = "", duration = 3000) {
    clearLetterMessageTimer();
    elements.letterMessageMain.textContent = main;
    elements.letterMessageSub.textContent = sub;

    if (!window.gsap) {
      elements.letterMessage.style.visibility = "visible";
      elements.letterMessage.style.opacity = "1";
      state.letterMessageTimer = window.setTimeout(() => {
        elements.letterMessage.style.opacity = "0";
      }, duration);
      return;
    }

    window.gsap.killTweensOf(elements.letterMessage);
    window.gsap.to(elements.letterMessage, {
      autoAlpha: 1,
      opacity: 1,
      y: 0,
      duration: reducedMotion.matches ? 0.01 : 0.28,
      ease: "power2.out",
    });

    state.letterMessageTimer = window.setTimeout(() => {
      window.gsap.to(elements.letterMessage, {
        autoAlpha: 0,
        opacity: 0,
        y: reducedMotion.matches ? 0 : 6,
        duration: reducedMotion.matches ? 0.01 : 0.24,
        ease: "power1.in",
      });
    }, duration);
  }

  function enterReadyState(liveMidnight = false) {
    if (["ready", "opening", "unfolding", "unlocked"].includes(state.status)) return;

    state.status = "ready";
    stopTimer();
    renderCountdown({ difference: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    elements.letterFinale.classList.add("is-ready");
    elements.letterFinale.setAttribute("aria-hidden", "false");
    elements.loveLetter.setAttribute("aria-label", "Open anniversary love letter. It is September 24.");

    if (window.gsap) {
      window.gsap.to(elements.letterFireflies, {
        opacity: 1,
        scale: liveMidnight ? 1.08 : 1,
        duration: reducedMotion.matches ? 0.01 : 0.55,
        ease: "power2.out",
      });
      window.gsap.to(elements.letterLightNear, {
        opacity: 0.9,
        scale: 1.12,
        duration: reducedMotion.matches ? 0.01 : 0.5,
        ease: "power2.out",
      });
      window.gsap.to(elements.letterSeal, {
        scale: 1.08,
        duration: reducedMotion.matches ? 0.01 : 0.42,
        ease: "back.out(1.5)",
      });
    }

    applyCountdownZeroState();
    applyWaitingZeroState();
    showLetterMessage("pwede na :>", "buksan mo na milabs hehe", liveMidnight ? 4200 : 3200);
  }

  function teaseLockedLetter() {
    state.letterAttempts += 1;
    const variants = [
      ["wala pa sa 24 hehe", "sa 24 mo pa po maoopen huhu"],
      ["waleyy pa 😭", "sa 24 mo pa po maoopen huhu"],
      ["milabsss wala pa talaga HAHAHA", "sa 24 mo pa po maoopen huhu"],
    ];
    const [main, sub] = variants[Math.min(state.letterAttempts - 1, variants.length - 1)];

    showLetterMessage(main, sub, 3000);

    if (!window.gsap) return;
    const gsap = window.gsap;
    const tl = gsap.timeline();
    tl.to(elements.loveLetter, { y: -5, rotation: -1.2, duration: 0.16, ease: "power2.out" })
      .to(elements.letterFlap, { rotationX: -18, duration: 0.20, ease: "power2.out" }, 0)
      .to(elements.letterSeal, { rotation: -5, scale: 1.05, duration: 0.18, ease: "power2.out" }, 0)
      .to(elements.letterFireflies, { scale: 1.08, opacity: 1, duration: 0.24, ease: "power2.out" }, 0)
      .to(elements.letterFlap, { rotationX: 0, duration: 0.24, ease: "power2.inOut" }, 0.55)
      .to(elements.letterSeal, { rotation: 0, scale: 1, duration: 0.22, ease: "power2.inOut" }, 0.55)
      .to(elements.loveLetter, { y: 0, rotation: 0, duration: 0.24, ease: "power2.inOut" }, 0.55)
      .to(elements.letterFireflies, { scale: 1, duration: 0.28, ease: "power1.inOut" }, 0.55);
  }

  function setupFirstBloom() {
    if (state.firstBloomReady || !elements.firstBloom) return;
    state.firstBloomReady = true;

    if (!window.gsap || !window.ScrollTrigger || reducedMotion.matches) {
      elements.firstBloom.classList.add("is-static");
      return;
    }

    const gsap = window.gsap;

    /* Keep the anniversary hero physically fixed. Scrolling only fades the copy away. */
    if (elements.anniversaryHero && elements.anniversaryHeroContent && !state.firstBloomHeroPinned) {
      state.firstBloomHeroPinned = true;
      gsap.timeline({
        scrollTrigger: {
          trigger: elements.anniversaryHero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
        .to({}, { duration: 0.22 })
        .to(elements.anniversaryHeroContent, {
          opacity: 0,
          ease: "none",
          duration: 0.78,
        });
    }

    const sceneLines = elements.firstBloomScenes.map((scene) =>
      Array.from(scene.querySelectorAll("[data-story-line]"))
    );

    const paths = [elements.firstBloomStem, elements.firstBloomBranchA, elements.firstBloomBranchB]
      .filter(Boolean);
    const pathLengths = new Map();

    paths.forEach((path) => {
      const length = path.getTotalLength();
      pathLengths.set(path, length);
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    let discordLength = 0;
    if (elements.firstBloomDiscordPath) {
      discordLength = elements.firstBloomDiscordPath.getTotalLength();
      gsap.set(elements.firstBloomDiscordPath, {
        strokeDasharray: discordLength,
        strokeDashoffset: discordLength,
      });
    }

    gsap.set(elements.firstBloomScenes, { autoAlpha: 0, y: 24 });
    sceneLines.flat().forEach((line) => gsap.set(line, { opacity: 0, y: 14 }));
    gsap.set([elements.firstBloomDayMood, elements.firstBloomNightMood], { autoAlpha: 0, opacity: 0 });
    gsap.set([elements.firstBloomBlueSoft, elements.firstBloomPinkSoft, elements.firstBloomMorningSoft], { opacity: 0 });
    gsap.set(elements.firstBloomNicknameSun, { autoAlpha: 0, opacity: 0, y: 14 });
    gsap.set(elements.firstBloomNicknameMoon, { autoAlpha: 0, opacity: 0, y: 14 });
    gsap.set(elements.firstBloomLights, { opacity: 0 });
    gsap.set(elements.firstBloomLightDots, { scale: 0.72, opacity: 0.18, transformOrigin: "50% 50%" });
    gsap.set(elements.firstBloomDiscord, { autoAlpha: 0, opacity: 0, scale: 0.97, transformOrigin: "50% 50%" });
    gsap.set(elements.firstBloomShared, { autoAlpha: 0, opacity: 0 });
    gsap.set(elements.firstBloomMotifs, { autoAlpha: 0, opacity: 0, scale: 0.72, y: 12, transformOrigin: "50% 50%" });
    gsap.set([elements.firstBloomLeafA, elements.firstBloomLeafB], { opacity: 0, scale: 0.12, transformOrigin: "0% 50%" });
    gsap.set(elements.firstBloomBud, { autoAlpha: 0, opacity: 0, scale: 0.72, transformOrigin: "50% 100%" });
    gsap.set(elements.firstBloomFlowerPetals, { opacity: 0, scale: 0.03, transformOrigin: "50% 100%" });
    gsap.set(elements.firstBloomFlowerCore, { opacity: 0, scale: 0.08, transformOrigin: "50% 50%" });
    gsap.set(elements.firstBloomPlant, { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: elements.firstBloom,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });
    state.firstBloomTimeline = tl;

    const revealScene = (index, hold = 1.2, stagger = 0.22) => {
      const scene = elements.firstBloomScenes[index];
      const lines = sceneLines[index];
      tl.to(scene, { autoAlpha: 1, y: 0, duration: 0.42 })
        .to(lines, { opacity: 1, y: 0, duration: 0.38, stagger }, "<+0.08")
        .to({}, { duration: hold });
    };

    const hideScene = (index, duration = 0.4) => {
      tl.to(elements.firstBloomScenes[index], { autoAlpha: 0, y: -18, duration });
    };

    /* Questions: same permanent paper world, no section background sliding in. */
    revealScene(0, 1.35, 0.32);
    hideScene(0, 0.44);

    tl.to(elements.firstBloomPinkSoft, { opacity: 0.22, scale: 1, duration: 0.8 })
      .to(elements.firstBloomBlueSoft, { opacity: 0.15, scale: 1.02, duration: 0.8 }, "<");
    revealScene(1, 1.55, 0.27);
    hideScene(1, 0.44);

    /* Discord setup: establish the memory first, with decorations outside the reading zone. */
    const discordScene = elements.firstBloomScenes[2];
    tl.to(discordScene, { autoAlpha: 1, y: 0, duration: 0.42 })
      .to(elements.firstBloomDiscord, { autoAlpha: 0.34, opacity: 0.34, scale: 1, duration: 0.72 }, "<")
      .to(elements.firstBloomDiscordPath, { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" }, "<")
      .to(elements.firstBloomDiscordIntro, { opacity: 1, y: 0, duration: 0.48 })
      .to({}, { duration: 1.05 })
      .to(elements.firstBloomDiscordIntro, { opacity: 0.22, y: -4, duration: 0.48 })
      .to(elements.firstBloomDiscordCare, { opacity: 1, y: 0, duration: 0.44 }, "<+0.1")
      .to({}, { duration: 0.72 })
      .to(elements.firstBloomDiscordNights, { opacity: 1, y: 0, duration: 0.44 })
      .to({}, { duration: 1.0 });

    /* ARAW ARAW: warm sunset, with the sun near the upper-left of center. */
    tl.to(elements.firstBloomDayMood, { autoAlpha: 1, opacity: 0.98, duration: 1.5, ease: "power1.inOut" })
      .to(elements.firstBloomStage, {
        "--discord-body": "#475c73",
        "--discord-emphasis": "#3c5f86",
        "--discord-aside": "#795f6a",
        "--discord-strong": "#365f89",
        duration: 1.2,
      }, "<")
      .to([elements.firstBloomDiscordIntro, elements.firstBloomDiscordCare, elements.firstBloomDiscordNights], { opacity: 0.12, duration: 0.68 }, "<+0.18")
      .to(elements.firstBloomDiscord, { opacity: 0.2, duration: 0.65 }, "<")
      .to(elements.firstBloomNicknameSun, { autoAlpha: 1, opacity: 1, y: 0, duration: 0.58, ease: "power2.out" }, "<+0.42")
      .to(elements.firstBloomArawLine, { opacity: 1, y: 0, duration: 0.52 }, "<+0.1")
      .to({}, { duration: 2.15 });

    /* Sunset drifts into dusk before the moon takes over. */
    tl.to(elements.firstBloomNicknameSun, { autoAlpha: 0, opacity: 0, y: -8, duration: 0.72 })
      .to(elements.firstBloomArawLine, { opacity: 0.12, y: -4, duration: 0.68 }, "<")
      .to(elements.firstBloomDayMood, { autoAlpha: 0, opacity: 0, duration: 1.9, ease: "power1.inOut" }, "<")
      .to(elements.firstBloomNightMood, { autoAlpha: 1, opacity: 1, duration: 1.9, ease: "power1.inOut" }, "<")
      .to(elements.firstBloomStage, {
        "--discord-body": "#e7edf5",
        "--discord-emphasis": "#fff3e7",
        "--discord-aside": "#f0cfd6",
        "--discord-strong": "#fff7ed",
        duration: 1.45,
      }, "<+0.18")
      .to(elements.firstBloomDiscord, { opacity: 0.11, duration: 1.0 }, "<")
      .to(elements.firstBloomLights, { opacity: 0.95, duration: 1.0 }, "<+0.48")
      .to(elements.firstBloomLightDots, { opacity: 1, scale: 1, duration: 0.48, stagger: 0.09 }, "<")
      .to({}, { duration: 0.6 });

    /* GABI GABI: a proper night hold, with readable light copy. */
    tl.to(elements.firstBloomNicknameMoon, { autoAlpha: 1, opacity: 1, y: 0, duration: 0.62, ease: "power2.out" })
      .to(elements.firstBloomGabiLine, { opacity: 1, y: 0, duration: 0.52 }, "<+0.08")
      .to({}, { duration: 1.9 })
      .to(elements.firstBloomDiscordJoke, { opacity: 1, y: 0, duration: 0.48 })
      .to({}, { duration: 1.55 });

    /* Night fades like dawn back into the original anniversary blue. */
    tl.to([elements.firstBloomNicknameMoon, elements.firstBloomGabiLine, elements.firstBloomDiscordJoke], {
        autoAlpha: 0,
        opacity: 0,
        y: -6,
        duration: 0.72,
      })
      .to(elements.firstBloomLights, { opacity: 0, duration: 1.05 }, "<")
      .to(elements.firstBloomNightMood, { autoAlpha: 0, opacity: 0, duration: 1.95, ease: "power1.inOut" }, "<")
      .to(elements.firstBloomStage, {
        "--discord-body": "#536f8e",
        "--discord-emphasis": "#3f6796",
        "--discord-aside": "#916f7b",
        "--discord-strong": "#476c99",
        duration: 1.5,
      }, "<+0.16")
      .to(elements.firstBloomDiscord, { autoAlpha: 0, opacity: 0, scale: 0.985, duration: 1.0 }, "<+0.3")
      .to(discordScene, { autoAlpha: 0, y: -16, duration: 0.58 }, "<+0.52")
      .to(elements.firstBloomBlueSoft, { opacity: 0.12, duration: 1.0 }, "<+0.5")
      .to({}, { duration: 0.72 });

    const stemLength = pathLengths.get(elements.firstBloomStem) || 1;


    /* Falling: only now does the plant enter, after the day/night memory has resolved. */
    tl.to(elements.firstBloomPlant, { opacity: 0.88, duration: 0.62, ease: "power1.out" })
      .to(elements.firstBloomStem, {
      strokeDashoffset: stemLength * 0.62,
      duration: 1.25,
      ease: "power2.out",
    });
    revealScene(3, 1.55, 0.42);
    hideScene(3, 0.42);

    /* Shared world: the first branch and leaf appear only after the stem reaches them. */
    tl.to(elements.firstBloomPinkSoft, { opacity: 0.44, scale: 1.06, duration: 0.9 })
      .to(elements.firstBloomStem, { strokeDashoffset: stemLength * 0.42, duration: 0.9, ease: "power2.out" }, "<")
      .to(elements.firstBloomBranchA, { strokeDashoffset: 0, duration: 0.72, ease: "power2.out" }, ">-0.08")
      .to(elements.firstBloomLeafA, { opacity: 0.8, scale: 1, duration: 0.52, ease: "back.out(1.55)" }, ">-0.12")
      .to(elements.firstBloomShared, { autoAlpha: 1, opacity: 1, duration: 0.5 }, "<")
      .to(elements.firstBloomMotifs, { autoAlpha: 0.72, opacity: 0.72, scale: 1, y: 0, duration: 0.56, stagger: 0.12, ease: "back.out(1.4)" }, "<+0.08");
    revealScene(4, 2.0, 0.27);
    hideScene(4, 0.48);

    /* Mature the mood and continue the stem, but still no detached bud. */
    tl.to(elements.firstBloomShared, { opacity: 0.18, duration: 0.75 })
      .to(elements.firstBloomMotifs, { opacity: 0.18, duration: 0.7 }, "<")
      .to(elements.firstBloomPinkSoft, { opacity: 0.24, duration: 0.7 }, "<")
      .to(elements.firstBloomMorningSoft, { opacity: 0.22, scale: 1, duration: 0.9 }, "<")
      .to(elements.firstBloomStem, { strokeDashoffset: stemLength * 0.25, duration: 0.9, ease: "power2.out" }, "<");
    revealScene(5, 1.6, 0.3);
    hideScene(5, 0.44);

    /* Growth: stem reaches the top first, then branch/leaf, and only then the bud exists. */
    tl.to(elements.firstBloomShared, { autoAlpha: 0, opacity: 0, duration: 0.7 })
      .to(elements.firstBloomMorningSoft, { opacity: 0.5, scale: 1.08, duration: 0.85 }, "<")
      .to(elements.firstBloomStem, { strokeDashoffset: 0, duration: 1.25, ease: "power2.out" }, "<")
      .to(elements.firstBloomBranchB, { strokeDashoffset: 0, duration: 0.76, ease: "power2.out" }, ">-0.18")
      .to(elements.firstBloomLeafB, { opacity: 0.8, scale: 1, duration: 0.52, ease: "back.out(1.55)" }, ">-0.1")
      .to(elements.firstBloomBud, { autoAlpha: 1, opacity: 1, scale: 1, duration: 0.58, ease: "back.out(1.5)" }, ">-0.04");
    revealScene(6, 2.2, 0.24);
    hideScene(6, 0.5);

    /* Final answer and first full bloom. */
    tl.to(elements.firstBloomPinkSoft, { opacity: 0.3, scale: 1, duration: 0.8 })
      .to(elements.firstBloomMorningSoft, { opacity: 0.62, scale: 1.12, duration: 0.9 }, "<")
      .to(elements.firstBloomScenes[7], { autoAlpha: 1, y: 0, duration: 0.45 });

    const finalLines = sceneLines[7];
    finalLines.forEach((line, index) => {
      tl.to(line, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" });

      if (index === 2) tl.to({}, { duration: 0.34 });
      if (index === 3) tl.to({}, { duration: 0.5 });
      if (index === 4) tl.to({}, { duration: 0.45 });

      if (index === 6) {
        tl.to(elements.firstBloomBud, { autoAlpha: 0, opacity: 0, scale: 0.76, duration: 0.38 }, "<+0.08")
          .to(elements.firstBloomPlant, { x: -20, y: -4, scale: 1.06, duration: 0.72, ease: "power2.out" }, "<")
          .to(elements.firstBloomFlowerPetals, {
            opacity: 1,
            scale: 1,
            duration: 0.72,
            stagger: 0.1,
            ease: "back.out(1.6)",
          }, "<+0.12")
          .to(elements.firstBloomFlowerCore, { opacity: 1, scale: 1, duration: 0.42, ease: "back.out(1.45)" }, "<+0.42");
      }

      tl.to({}, { duration: index === 6 ? 0.72 : 0.28 });
    });

    tl.to({}, { duration: 1.85 })
      .to(elements.firstBloomScenes[7], { autoAlpha: 0, y: -10, duration: 0.7, ease: "power1.inOut" })
      .to(elements.firstBloomPlant, { opacity: 0.34, scale: 0.98, duration: 0.7, ease: "power1.inOut" }, "<")
      .to({}, { duration: 0.75 });
  }

  function setupPhaseOneFinale() {
    if (state.phaseOneFinaleReady || !elements.phaseOneFinale) return;
    state.phaseOneFinaleReady = true;

    if (!window.gsap || !window.ScrollTrigger || reducedMotion.matches) return;

    const gsap = window.gsap;

    gsap.set([elements.phaseOneHeart, elements.phaseOneBrain, elements.phaseOneFiber, elements.phaseOneLove], {
      opacity: 0,
      y: 16,
    });
    gsap.set(elements.phaseOneFinaleWarmth, { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" });
    gsap.set(elements.phaseOneFinaleLights, { opacity: 0 });
    gsap.set(elements.phaseOneFinaleLightDots, { opacity: 0, scale: 0.55, transformOrigin: "50% 50%" });
    gsap.set(elements.phaseOneFinalePetals, { opacity: 0, scale: 0.7, y: 18, rotation: -14, transformOrigin: "50% 50%" });
    gsap.set(elements.phaseOneVineLeft, { opacity: 0.9, x: -42, y: 34, scale: 1, transformOrigin: "50% 100%" });
    gsap.set(elements.phaseOneVineRight, { opacity: 0.72, x: 26, y: 18, scale: 0.94, transformOrigin: "50% 100%" });
    gsap.set(elements.phaseOneVineBranches, { opacity: 0.18 });
    gsap.set(elements.phaseOneVineLeaves, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" });
    gsap.set(elements.phaseOneMeeting, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
    gsap.set(elements.phaseOneMeetingRings, { opacity: 0, scale: 0.36, transformOrigin: "50% 50%" });
    gsap.set(elements.phaseOneCenterBloom, { opacity: 0, scale: 0.78, y: 22, transformOrigin: "50% 50%" });
    gsap.set(elements.phaseOneCenterBloomImageShell, {
      "--bloom-reveal": "6%",
      "--bloom-feather": "18%",
      scaleX: 0.72,
      scaleY: 0.84,
      rotation: -1.2,
      transformOrigin: "50% 56%",
    });
    gsap.set(elements.phaseOneCenterBloomImage, {
      opacity: 0,
      scale: 0.88,
      y: 12,
      filter: "blur(10px) saturate(0.88) brightness(1.04) drop-shadow(0 10px 18px rgba(78, 102, 91, 0.08))",
      transformOrigin: "50% 56%",
    });

    [...elements.phaseOneVinePaths, ...elements.phaseOneVineBranches].forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: elements.phaseOneFinale,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    tl.to(elements.phaseOneFinaleWarmth, { opacity: 0.08, scale: 0.98, duration: 0.95, stagger: 0.08 })
      .to(elements.paperWorldCorners, { opacity: 0.24, duration: 0.68 }, "<")
      .to(elements.phaseOneHeart, { opacity: 1, y: 0, duration: 0.56 }, "<+0.16")
      .to(elements.phaseOneVinePaths[0], { strokeDashoffset: 0, duration: 1.2, ease: "none" }, "<")
      .to(elements.phaseOneVineBranches.slice(0, 2), { strokeDashoffset: 0, duration: 0.5, ease: "none", stagger: 0.04 }, "<+0.24")
      .to(elements.phaseOneVineLeaves.slice(0, 5), { opacity: 1, scale: 1, duration: 0.56, stagger: 0.06, ease: "back.out(1.8)" }, "<+0.12")
      .to({}, { duration: 1.0 });

    tl.to(elements.phaseOneBrain, { opacity: 1, y: 0, duration: 0.5 })
      .to(elements.phaseOneVinePaths[1], { strokeDashoffset: 0, duration: 1.2, ease: "none" }, "<")
      .to(elements.phaseOneVineBranches.slice(2), { strokeDashoffset: 0, duration: 0.5, ease: "none", stagger: 0.04 }, "<+0.24")
      .to(elements.phaseOneVineLeaves.slice(5), { opacity: 1, scale: 1, duration: 0.56, stagger: 0.06, ease: "back.out(1.8)" }, "<+0.12")
      .to(elements.phaseOneVineLeft, { x: -20, y: 12, scale: 1.01, duration: 1.05 }, "<")
      .to(elements.phaseOneVineRight, { x: 12, y: 4, scale: 0.97, duration: 1.05 }, "<")
      .to({}, { duration: 0.9 });

    tl.to(elements.phaseOneFinaleWarmth, { opacity: 0.12, scale: 1.02, duration: 1.06 })
      .to(elements.paperWorldCorners, { opacity: 0.44, scale: 1.02, duration: 0.92 }, "<")
      .to(elements.phaseOneFiber, { opacity: 1, y: 0, duration: 0.56 }, "<+0.16")
      .to(elements.phaseOneVineLeft, { x: -8, y: -1, duration: 1.0 }, "<")
      .to(elements.phaseOneVineRight, { x: 10, y: -12, duration: 1.0 }, "<")
      .to(elements.phaseOneFinaleLights, { opacity: 0.52, duration: 0.7 }, "<+0.12")
      .to(elements.phaseOneFinaleLightDots, { opacity: 0.48, scale: 0.86, duration: 0.62, stagger: 0.08 }, "<")
      .to({}, { duration: 1.1 });

    tl.to(elements.phaseOneMeeting, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.55)" })
      .to(elements.phaseOneMeetingRings[0], { opacity: 0.42, scale: 1.55, duration: 0.72, ease: "power2.out" }, "<")
      .to(elements.phaseOneMeetingRings[1], { opacity: 0.2, scale: 2.05, duration: 0.9, ease: "power2.out" }, "<+0.05")
      .to(elements.phaseOneCenterBloom, { opacity: 1, scale: 0.9, y: 12, duration: 0.42, ease: "power2.out" }, "<+0.08")
      .to(elements.phaseOneCenterBloomImage, { opacity: 0.72, y: 7, duration: 0.34, ease: "power1.out" }, "<")
      .to(elements.phaseOneCenterBloomImageShell, {
        "--bloom-reveal": "18%",
        "--bloom-feather": "18%",
        scaleX: 0.82,
        scaleY: 0.9,
        rotation: -0.8,
        duration: 0.38,
        ease: "power2.out",
      }, "<")
      .to(elements.phaseOneCenterBloomImageShell, {
        "--bloom-reveal": "36%",
        "--bloom-feather": "19%",
        scaleX: 0.94,
        scaleY: 0.98,
        rotation: -0.25,
        duration: 0.52,
        ease: "power2.out",
      })
      .to(elements.phaseOneCenterBloom, { scale: 1.03, y: 0, duration: 0.62, ease: "power2.out" }, "<")
      .to(elements.phaseOneCenterBloomImageShell, {
        "--bloom-reveal": "74%",
        "--bloom-feather": "17%",
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        duration: 0.78,
        ease: "power2.out",
      })
      .to(elements.phaseOneCenterBloomImage, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px) saturate(1) brightness(1) drop-shadow(0 10px 18px rgba(78, 102, 91, 0.12))",
        duration: 0.78,
        ease: "power2.out",
      }, "<")
      .to(elements.phaseOneCenterBloom, { scale: 1, duration: 0.36, ease: "power1.out" })
      .to(elements.phaseOneFinaleWarmth, { opacity: 0.62, scale: 1.2, duration: 0.9, stagger: 0.06, ease: "power2.out" }, "<")
      .to(elements.phaseOneFinaleLights, { opacity: 1, duration: 0.72 }, "<+0.08")
      .to(elements.phaseOneFinaleLightDots, { opacity: 0.7, scale: 1, duration: 0.7, stagger: 0.08 }, "<")
      .to(elements.phaseOneFinalePetals, {
        opacity: (index) => (index < 6 ? 0.62 : 0.38),
        y: (index) => (index % 2 === 0 ? -18 : 13),
        x: (index) => (index < 4 ? -14 : 14),
        rotation: (index) => (index % 2 === 0 ? 28 : -24),
        scale: (index) => (index % 3 === 0 ? 0.88 : 1),
        duration: 0.86,
        stagger: 0.07,
        ease: "power2.out",
      }, "<+0.16")
      .to([elements.phaseOneHeart, elements.phaseOneBrain, elements.phaseOneFiber], { opacity: 0.4, duration: 0.48 }, "<+0.08")
      .to(elements.phaseOneLove, { opacity: 1, y: 0, duration: 0.82, ease: "power2.out" }, "<+0.06")
      .to({}, { duration: 3.2 });

    tl.to(elements.phaseOneMeetingRings, { opacity: 0.08, scale: 1.32, duration: 0.92 })
      .to(elements.phaseOneFinaleLightDots, { opacity: 0.38, scale: 0.92, duration: 0.82 }, "<")
      .to(elements.phaseOneFinalePetals, {
        opacity: 0.34,
        y: "+=10",
        x: (index) => (index % 2 === 0 ? "-=6" : "+=6"),
        rotation: (index) => (index % 2 === 0 ? "+=10" : "-=10"),
        duration: 0.92,
      }, "<")
      .to(elements.phaseOneCenterBloom, { scale: 1.018, duration: 0.8 }, "<")
      .to(elements.phaseOneFinaleWarmth, { opacity: 0.56, scale: 1.16, duration: 0.9 }, "<")
      .to({}, { duration: 2.4 });
  }


  function setupMemoryAlbum() {
    if (state.memoryAlbumReady || !elements.memoryAlbum) return;
    state.memoryAlbumReady = true;

    if (!window.gsap || !window.ScrollTrigger || reducedMotion.matches) return;

    const gsap = window.gsap;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const pageTurns = [elements.memoryAlbumPageTurnOne, elements.memoryAlbumPageTurnTwo].filter(Boolean);

    gsap.set(elements.albumBgMood, { opacity: 0 });
    gsap.set(elements.memoryAlbumBookWrap, {
      opacity: 0,
      xPercent: isMobile ? -50 : -75,
      yPercent: -50,
      y: 42,
      scale: 0.82,
      rotationX: 4,
      transformOrigin: "50% 55%",
    });
    gsap.set(elements.memoryAlbumDepthShadow, { opacity: 0, scaleX: 0.72, scaleY: 0.8 });
    gsap.set(elements.memoryAlbumSpread, { opacity: 0 });
    gsap.set(elements.memoryAlbumSpine, { opacity: 0 });
    gsap.set(elements.memoryAlbumCover, {
      rotationY: 0,
      transformOrigin: "0% 50%",
      transformPerspective: 1700,
    });
    gsap.set(pageTurns, {
      opacity: 0,
      rotationY: 0,
      transformOrigin: "0% 50%",
      transformPerspective: 1700,
    });
    gsap.set(elements.memoryAlbumMemories, {
      opacity: 0,
      xPercent: isMobile ? -50 : 0,
      y: isMobile ? 16 : 24,
      scale: isMobile ? 0.95 : 0.92,
    });
    gsap.set(elements.memoryAlbumClosing, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: elements.memoryAlbum,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.05,
        invalidateOnRefresh: true,
      },
    });

    tl.to(elements.albumBgMood, { opacity: 0.82, duration: 1.15, ease: "power1.inOut" })
      .to(elements.paperWorldCorners, { opacity: 0.16, duration: 0.9, ease: "power1.inOut" }, "<")
      .to(elements.phaseOneFinaleWarmth, { opacity: 0.08, scale: 1.08, duration: 0.9, ease: "power1.inOut" }, "<")
      .to(elements.memoryAlbumDepthShadow, { opacity: 0.74, scaleX: 1, scaleY: 1, duration: 0.85 }, "<+0.12")
      .to(elements.memoryAlbumBookWrap, {
        opacity: 1,
        y: 0,
        scale: isMobile ? 0.93 : 0.9,
        duration: 1,
        ease: "power3.out",
      }, "<")
      .to({}, { duration: 0.7 })
      .to(elements.memoryAlbumSpread, { opacity: 1, duration: 0.42 }, "<")
      .to(elements.memoryAlbumBookWrap, {
        xPercent: -50,
        scale: 1,
        rotationX: isMobile ? 2 : 1.8,
        duration: 1.1,
        ease: "power2.inOut",
      })
      .to(elements.memoryAlbumSpine, { opacity: isMobile ? 0 : 0.66, duration: 0.45 }, "<+0.18")
      .to(elements.memoryAlbumCover, {
        rotationY: isMobile ? -108 : -178,
        x: isMobile ? -10 : 0,
        opacity: isMobile ? 0.06 : 1,
        duration: isMobile ? 0.9 : 1.2,
        ease: "power3.inOut",
      }, "<")
      .to(elements.memoryAlbumDepthShadow, { opacity: 0.62, scaleX: 1.08, duration: 0.68 }, "<+0.28")
      .to({}, { duration: 0.9 });

    const turnPage = (turnElement, memory) => {
      if (!turnElement) return;

      if (isMobile) {
        tl.set(turnElement, { opacity: 1, rotationY: 0, xPercent: 0, scaleX: 1 })
          .to(turnElement, { rotationY: -82, xPercent: -7, scaleX: 0.97, opacity: 0.18, duration: 0.62, ease: "power2.inOut" })
          .to(memory, { opacity: 0, y: -6, scale: 0.985, duration: 0.28, ease: "power1.inOut" }, "<+0.18")
          .set(turnElement, { opacity: 0, rotationY: 0, xPercent: 0, scaleX: 1 })
          .to({}, { duration: 0.18 });
        return;
      }

      tl.set(turnElement, { opacity: 1, rotationY: 0 })
        .to(turnElement, { rotationY: -178, duration: 0.9, ease: "power3.inOut" })
        .to(turnElement, { opacity: 0, duration: 0.22, ease: "power1.out" }, "-=0.14")
        .to({}, { duration: 0.34 });
    };

    elements.memoryAlbumMemories.forEach((memory, index) => {
      const isSpecial = index === 4;
      const isLast = index === elements.memoryAlbumMemories.length - 1;

      if (isSpecial) {
        tl.to(elements.memoryAlbumBookWrap, { scale: isMobile ? 1.018 : 1.055, duration: 0.48, ease: "power2.out" });
      }

      tl.to(memory, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? (isSpecial ? 0.5 : 0.42) : (isSpecial ? 0.68 : 0.54),
        ease: "power2.out",
      })
        .to({}, { duration: isMobile ? (isSpecial ? 0.78 : 0.62) : (isSpecial ? 1.25 : 0.88) });

      if (isSpecial) {
        tl.to(elements.memoryAlbumBookWrap, { scale: 1, duration: isMobile ? 0.38 : 0.52, ease: "power2.inOut" }, "<+0.05");
      }

      if (!isLast) {
        if (isMobile) {
          const turnElement = index % 2 === 0 ? elements.memoryAlbumPageTurnOne : elements.memoryAlbumPageTurnTwo;
          turnPage(turnElement, memory);
        } else {
          tl.to(memory, {
            opacity: 0,
            y: -10,
            scale: 0.985,
            duration: 0.38,
            ease: "power1.inOut",
          });
          if (index === 1) turnPage(elements.memoryAlbumPageTurnOne, memory);
          if (index === 4) turnPage(elements.memoryAlbumPageTurnTwo, memory);
        }
      }
    });

    tl.to(elements.memoryAlbumClosing, { opacity: 1, y: 0, duration: 0.72, ease: "power2.out" })
      .to(elements.memoryAlbumDepthShadow, { opacity: 0.5, scaleX: 1.02, duration: 0.76 }, "<")
      .to(elements.albumBgMood, { opacity: 0.76, duration: 0.8 }, "<")
      .to({}, { duration: 2.2 });
  }


  function setupNightFinale() {
    if (state.nightFinaleReady || !elements.nightFinale || !elements.fireworksCanvas) return;
    state.nightFinaleReady = true;

    const canvas = elements.fireworksCanvas;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastProgress = 0;
    let fireworkEvents = [];
    const TAU = Math.PI * 2;

    const palettes = {
      ivory: ["#fff2d8", "#f7e8d3", "#f0dfc6"],
      rose: ["#efb3c0", "#e89cab", "#f4c1c7"],
      blue: ["#bfd5e7", "#d0e0ec", "#a9c6dc"],
      gold: ["#f3ce8e", "#eab96d", "#f7dfad"],
    };

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function lerp(start, end, amount) {
      return start + (end - start) * amount;
    }

    function mulberry32(seed) {
      let value = seed >>> 0;
      return function random() {
        value += 0x6D2B79F5;
        let t = value;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function buildParticleLayer({ seed, count, shape, petals = 5, radiusScale = 1, delay = 0, angleOffset = 0, colors, asymmetry = 0 }) {
      const random = mulberry32(seed);
      const particles = [];

      for (let index = 0; index < count; index += 1) {
        const baseAngle = (index / count) * TAU + angleOffset;
        const angle = baseAngle + (random() - 0.5) * 0.055;
        const organic = 1 + asymmetry * Math.sin(angle * 2.15 + seed * 0.017);
        const flowerRadius = shape === "flower"
          ? 0.68 + 0.31 * Math.cos(petals * (angle - angleOffset))
          : 1;
        const radial = Math.max(0.28, flowerRadius) * radiusScale * organic * (0.9 + random() * 0.18);

        particles.push({
          angle,
          radial,
          speed: 0.88 + random() * 0.18,
          size: 1.35 + random() * 1.95,
          drift: (random() - 0.5) * 0.7,
          gravity: 0.82 + random() * 0.38,
          alpha: 0.82 + random() * 0.22,
          delay: delay + random() * 0.008,
          color: colors[Math.floor(random() * colors.length)],
        });
      }

      return particles;
    }

    function makeFirework(config) {
      const mobile = width <= 640;
      const event = { ...config };

      if (config.hero) {
        event.particles = [
          ...buildParticleLayer({
            seed: config.seed,
            count: mobile ? 132 : 214,
            shape: "flower",
            petals: 5,
            radiusScale: 1,
            delay: 0.026,
            angleOffset: -0.08,
            colors: [...palettes.rose, palettes.ivory[0]],
            asymmetry: 0.065,
          }),
          ...buildParticleLayer({
            seed: config.seed + 19,
            count: mobile ? 66 : 104,
            shape: "flower",
            petals: 5,
            radiusScale: 0.54,
            delay: 0.013,
            angleOffset: 0.16,
            colors: [...palettes.ivory, palettes.blue[1]],
            asymmetry: 0.045,
          }),
          ...buildParticleLayer({
            seed: config.seed + 41,
            count: mobile ? 38 : 62,
            shape: "circle",
            radiusScale: 0.22,
            delay: 0,
            colors: [...palettes.gold, palettes.ivory[0]],
            asymmetry: 0.02,
          }),
        ];
      } else {
        const baseCount = config.shape === "flower" ? (mobile ? 72 : 118) : (mobile ? 48 : 78);
        event.particles = buildParticleLayer({
          seed: config.seed,
          count: baseCount,
          shape: config.shape,
          petals: config.petals || 5,
          radiusScale: 1,
          delay: 0,
          angleOffset: config.angleOffset || 0,
          colors: config.colors,
          asymmetry: config.shape === "flower" ? 0.045 : 0.018,
        });
      }

      return event;
    }

    function buildFireworks() {
      fireworkEvents = [
        makeFirework({ seed: 11, start: 0.12, burst: 0.17, end: 0.29, launchX: 0.18, x: 0.25, y: 0.33, radius: 0.118, shape: "circle", colors: [...palettes.ivory, palettes.rose[0]] }),
        makeFirework({ seed: 27, start: 0.25, burst: 0.30, end: 0.42, launchX: 0.82, x: 0.73, y: 0.27, radius: 0.132, shape: "circle", colors: [...palettes.blue, palettes.ivory[1]] }),
        makeFirework({ seed: 39, start: 0.34, burst: 0.39, end: 0.50, launchX: 0.46, x: 0.52, y: 0.39, radius: 0.114, shape: "circle", colors: [...palettes.rose, palettes.gold[0]] }),
        makeFirework({ seed: 63, start: 0.43, burst: 0.48, end: 0.59, launchX: 0.23, x: 0.31, y: 0.29, radius: 0.165, shape: "flower", petals: 5, angleOffset: -0.12, colors: [...palettes.rose, palettes.ivory[0]] }),
        makeFirework({ seed: 81, start: 0.52, burst: 0.57, end: 0.65, launchX: 0.79, x: 0.70, y: 0.35, radius: 0.178, shape: "flower", petals: 5, angleOffset: 0.16, colors: [...palettes.blue, palettes.rose[2], palettes.ivory[1]] }),
        makeFirework({ seed: 109, start: 0.64, burst: 0.70, end: 0.89, launchX: 0.50, x: 0.50, y: width <= 640 ? 0.29 : 0.31, radius: width <= 640 ? 0.37 : 0.40, shape: "flower", petals: 5, hero: true }),
      ];
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, width <= 640 ? 1.5 : 1.8);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
      buildFireworks();
      renderFireworks(lastProgress);
    }

    function drawShell(event, progress) {
      if (progress < event.start || progress >= event.burst) return;
      const shellProgress = clamp((progress - event.start) / (event.burst - event.start), 0, 1);
      const eased = 1 - Math.pow(1 - shellProgress, 3);
      const startX = event.launchX * width;
      const startY = height * 1.06;
      const targetX = event.x * width;
      const targetY = event.y * height;

      for (let trail = 10; trail >= 0; trail -= 1) {
        const trailingProgress = clamp(shellProgress - trail * 0.026, 0, 1);
        if (trailingProgress <= 0) continue;
        const trailingEase = 1 - Math.pow(1 - trailingProgress, 3);
        const x = lerp(startX, targetX, trailingEase) + Math.sin(trailingProgress * Math.PI) * (event.x - event.launchX) * width * 0.055;
        const y = lerp(startY, targetY, trailingEase);
        const alpha = (1 - trail / 11) * (event.hero ? 1.05 : 0.95);
        context.beginPath();
        context.shadowBlur = trail === 0 ? 22 : 12;
        context.shadowColor = "rgba(255, 233, 188, 0.88)";
        context.fillStyle = `rgba(255, 237, 198, ${alpha})`;
        context.arc(x, y, trail === 0 ? 3.1 : 1.8, 0, TAU);
        context.fill();
      }
    }

    function drawBurstFlash(event, progress) {
      if (progress < event.burst || progress > event.end) return;
      const span = event.hero ? 0.13 : 0.08;
      const flashProgress = clamp((progress - event.burst) / span, 0, 1);
      const flashAlpha = (1 - flashProgress) * (event.hero ? 0.60 : 0.34);
      if (flashAlpha <= 0.01) return;

      const centerX = event.x * width;
      const centerY = event.y * height;
      const baseRadius = Math.min(width, height) * event.radius;
      const glowRadius = baseRadius * (event.hero ? 1.95 : 1.25) * (0.55 + flashProgress * 0.85);
      const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
      gradient.addColorStop(0, `rgba(255, 247, 224, ${flashAlpha})`);
      gradient.addColorStop(0.22, `rgba(248, 214, 197, ${flashAlpha * 0.82})`);
      gradient.addColorStop(0.52, `rgba(206, 215, 242, ${flashAlpha * 0.34})`);
      gradient.addColorStop(1, 'rgba(206, 215, 242, 0)');

      context.save();
      context.globalCompositeOperation = 'screen';
      context.globalAlpha = 1;
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(centerX, centerY, glowRadius, 0, TAU);
      context.fill();
      context.restore();
    }

    function drawExplosion(event, progress) {
      if (progress < event.burst || progress > event.end) return;
      const centerX = event.x * width;
      const centerY = event.y * height;
      const baseRadius = Math.min(width, height) * event.radius;

      event.particles.forEach((particle) => {
        const start = event.burst + particle.delay;
        if (progress < start) return;
        const age = clamp((progress - start) / Math.max(0.001, event.end - start), 0, 1);
        const growth = 1 - Math.pow(1 - age, 2.55);
        const settle = 1 - age * 0.075;
        const distance = baseRadius * particle.radial * particle.speed * growth * settle;
        const gravity = age * age * height * (event.hero ? 0.043 : 0.055) * particle.gravity;
        const drift = particle.drift * age * Math.min(width, height) * 0.018;
        const x = centerX + Math.cos(particle.angle) * distance + drift;
        const y = centerY + Math.sin(particle.angle) * distance + gravity;

        const previousAge = clamp(age - 0.034, 0, 1);
        const previousGrowth = 1 - Math.pow(1 - previousAge, 2.55);
        const previousDistance = baseRadius * particle.radial * particle.speed * previousGrowth * (1 - previousAge * 0.075);
        const previousX = centerX + Math.cos(particle.angle) * previousDistance + particle.drift * previousAge * Math.min(width, height) * 0.018;
        const previousY = centerY + Math.sin(particle.angle) * previousDistance + previousAge * previousAge * height * (event.hero ? 0.043 : 0.055) * particle.gravity;

        const fade = Math.pow(1 - age, event.hero ? 0.66 : 0.92);
        const appear = Math.min(1, age * 9);
        const alpha = particle.alpha * fade * appear;
        if (alpha <= 0.015) return;

        context.globalAlpha = alpha * (event.hero ? 0.62 : 0.48);
        context.strokeStyle = particle.color;
        context.lineWidth = Math.max(0.75, particle.size * 0.7);
        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(x, y);
        context.stroke();

        context.globalAlpha = alpha * (event.hero ? 0.34 : 0.2);
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(x, y, particle.size * (event.hero ? 3.2 : 2.5) * (1 - age * 0.12), 0, TAU);
        context.fill();

        context.globalAlpha = alpha;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(x, y, particle.size * (1 - age * 0.22), 0, TAU);
        context.fill();
      });

      context.globalAlpha = 1;
    }

    function renderFireworks(progress) {
      lastProgress = clamp(progress, 0, 1);
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = 'screen';
      fireworkEvents.forEach((event) => {
        drawShell(event, lastProgress);
        drawBurstFlash(event, lastProgress);
        drawExplosion(event, lastProgress);
      });
      context.restore();
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    if (reducedMotion.matches) {
      renderFireworks(0.785);
      return;
    }

    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    function renderMeteor(guide, glowPath, corePath, head, progress, tailFraction = 0.26) {
      if (!guide || !glowPath || !corePath || !head) return;
      const safeProgress = Math.max(0, Math.min(1, progress));
      const total = guide.getTotalLength();
      const headDistance = total * safeProgress;
      const tailDistance = total * Math.max(0, safeProgress - tailFraction);
      const segmentLength = Math.max(0, headDistance - tailDistance);
      const steps = Math.max(3, Math.ceil(segmentLength / 12));
      const points = [];

      for (let i = 0; i <= steps; i += 1) {
        const distance = tailDistance + (segmentLength * i) / steps;
        points.push(guide.getPointAtLength(distance));
      }

      const d = points.length > 1
        ? points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ")
        : "";
      const headPoint = guide.getPointAtLength(headDistance);
      glowPath.setAttribute("d", d);
      corePath.setAttribute("d", d);
      head.setAttribute("cx", headPoint.x.toFixed(2));
      head.setAttribute("cy", headPoint.y.toFixed(2));
    }

    const meteorOneState = { progress: 0 };
    const meteorTwoState = { progress: 0 };
    const drawMeteorOne = () => renderMeteor(elements.nightFinalMeteorOneGuide, elements.nightFinalMeteorOneGlow, elements.nightFinalMeteorOneCore, elements.nightFinalMeteorOneHead, meteorOneState.progress, 0.28);
    const drawMeteorTwo = () => renderMeteor(elements.nightFinalMeteorTwoGuide, elements.nightFinalMeteorTwoGlow, elements.nightFinalMeteorTwoCore, elements.nightFinalMeteorTwoHead, meteorTwoState.progress, 0.22);

    gsap.set(elements.nightBgMood, { opacity: 0 });
    gsap.set(elements.fireworksCanvas, { opacity: 0 });
    gsap.set(elements.nightBloomLight, { opacity: 0, scale: 0.58, xPercent: -50, yPercent: -50 });
    gsap.set(elements.nightPaperWorld, { opacity: 0, scale: 0.26, xPercent: -50, yPercent: -50, borderRadius: 30, transformOrigin: "50% 58%" });
    gsap.set(elements.nightPlayfulDoodles, { opacity: 0, scale: 0.98 });
    gsap.set(elements.nightDoodles, { opacity: 0, y: 16, scale: 0.88, rotation: 0 });
    gsap.set(elements.nightEnvelopeWrap, { opacity: 0, y: 104, scale: 0.84, xPercent: -50, yPercent: -50, transformOrigin: "50% 54%" });
    gsap.set(elements.nightEnvelopeFlap, { rotationX: 0, transformOrigin: "50% 0%", transformPerspective: 1200 });
    gsap.set(elements.nightLetterPaper, { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 0px)", borderColor: "rgba(122, 100, 84, 0)", backgroundColor: "rgba(251, 244, 232, 0)", boxShadow: "0 0 0 rgba(0, 0, 0, 0)", top: "50%", transformOrigin: "50% 100%" });
    gsap.set(elements.nightLetterContent, { opacity: 1, y: 0 });
    gsap.set(elements.nightLetterLines, { opacity: 0, y: 28 });
    gsap.set(elements.nightEnvelopePieces, { opacity: 1 });
    gsap.set(elements.nightEnding, { opacity: 0, y: 12, xPercent: -50 });
    gsap.set(elements.nightFinalScene, { opacity: 0 });
    gsap.set(elements.nightFinalNight, { opacity: 0 });
    gsap.set(elements.nightFinalMoon, { opacity: 0, y: 26, scale: 0.82 });
    gsap.set(elements.nightFinalStars, { opacity: 0 });
    gsap.set([elements.nightFinalMeteorOne, elements.nightFinalMeteorTwo], { opacity: 0 });
    drawMeteorOne();
    drawMeteorTwo();
    gsap.set(elements.nightFinalHearts, { opacity: 0, scale: 0.94 });
    gsap.set(elements.nightFinalMessage, { opacity: 1, y: 0 });
    gsap.set(elements.nightFinalPersonal, { opacity: 0, y: 16 });
    gsap.set(elements.nightFinalTitleLineOne, { opacity: 0, y: 22 });
    gsap.set(elements.nightFinalTitleLineTwo, { opacity: 0, y: 22 });
    gsap.set(elements.nightFinalSubline, { opacity: 0, y: 16 });
    gsap.set(elements.nightFinalCurtain, { opacity: 0 });
    gsap.set(elements.nightCurtainLeft, { xPercent: -101 });
    gsap.set(elements.nightCurtainRight, { xPercent: 101 });
    gsap.set(elements.nightCurtainHeart, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: elements.nightFinale,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.05,
        invalidateOnRefresh: true,
        onUpdate: (self) => renderFireworks(self.progress),
        onRefresh: (self) => renderFireworks(self.progress),
      },
    });

    tl.to(elements.nightBgMood, { opacity: 1, duration: 11, ease: "power1.inOut" }, 0)
      .to(elements.albumBgMood, { opacity: 0.06, duration: 9, ease: "power1.inOut" }, 0)
      .to(elements.paperWorldCorners, { opacity: 0.045, duration: 9, ease: "power1.inOut" }, 0)
      .to(elements.phaseOneFinaleWarmth, { opacity: 0.015, duration: 8, ease: "power1.inOut" }, 0)
      .to(elements.fireworksCanvas, { opacity: 1, duration: 5, ease: "power1.out" }, 8)
      .to({}, { duration: 49 }, 13)
       .to(elements.nightBloomLight, { opacity: 0.72, scale: 1.12, duration: 8, ease: "power2.out" }, 62)
       .to(elements.nightBloomLight, { opacity: 0.28, scale: 1.28, duration: 10, ease: "power1.inOut" }, 70)
       .to(elements.nightEnvelopeWrap, { opacity: 1, y: 0, scale: 1, duration: 7, ease: "power3.out" }, 79)
      .to(elements.nightBloomLight, { opacity: 0.12, duration: 5, ease: "power1.inOut" }, 82)
       .to(elements.nightEnvelopeFlap, { rotationX: -178, duration: 4.4, ease: "power3.inOut" }, 85.5)
       .to(elements.fireworksCanvas, { opacity: 0.12, duration: 5.8, ease: "power1.inOut" }, 89)
       .to(elements.nightBgMood, { opacity: 0.08, duration: 7.8, ease: "power1.inOut" }, 90)
       .to(elements.nightPaperWorld, { opacity: 1, scale: 1, borderRadius: 0, duration: 7.2, ease: "power3.out" }, 90.2)
       .to(elements.nightPlayfulDoodles, { opacity: 1, scale: 1, duration: 4.8, ease: "power2.out" }, 91.1)
       .to(elements.nightDoodles, {
          opacity: 1,
          y: (index) => index % 2 === 0 ? -4 : 4,
          x: (index) => index % 3 === 0 ? 10 : (index % 3 === 1 ? -8 : 6),
          rotation: (index) => index % 2 === 0 ? -10 : 10,
          scale: 1,
          stagger: 0.18,
          duration: 3.6,
          ease: "power2.out"
        }, 92.8)
       .to(elements.nightEnvelopePieces, { opacity: 0.02, duration: 4.5, ease: "power1.inOut" }, 89.4)
       .to(elements.nightEnvelopeFlap, { opacity: 0, duration: 4.5, ease: "power1.inOut" }, 89.4)
       .to(elements.nightEnvelopeWrap, { y: isMobile ? 12 : 42, scale: isMobile ? 0.94 : 0.88, opacity: 0, duration: 6.2, ease: "power2.inOut" }, 91)
       .to(elements.nightPaperWorld, { backgroundColor: "#fff8ef", duration: 3.2, ease: "power1.inOut" }, 96)
       .to(elements.nightLetterPaper, {
          autoAlpha: 1,
          top: "50%",
          y: 0,
          height: () => isMobile ? Math.min(window.innerHeight * 0.92, 760) : Math.min(window.innerHeight * 0.84, 780),
          width: () => isMobile ? Math.min(window.innerWidth - 24, 560) : Math.min(window.innerWidth * 0.72, 840),
          borderRadius: isMobile ? 14 : 8,
          duration: 0.24,
          ease: "power1.out"
        }, 96.1)
       .to(elements.nightLetterLines[0], { opacity: 1, y: 0, duration: 2.4, ease: "power2.out" }, 96.3)
       .to(elements.nightDoodles, {
          y: (index) => index % 2 === 0 ? -10 : 10,
          x: (index) => index % 3 === 0 ? 16 : (index % 3 === 1 ? -12 : 10),
          rotation: (index) => index % 2 === 0 ? -18 : 18,
          duration: 3.4,
          stagger: 0.08,
          ease: "power1.inOut"
        }, 96.6)
       .to(elements.nightLetterLines[1], { opacity: 1, y: 0, duration: 2.4, ease: "power2.out" }, 98.4)
       .to(elements.nightPaperWorld, { backgroundColor: "#fff2ea", duration: 3.2, ease: "power1.inOut" }, 99.2)
       .to(elements.nightLetterLines[2], { opacity: 1, y: 0, duration: 2.4, ease: "power2.out" }, 100.4)
       .to(elements.nightLetterContent, {
          y: () => {
            if (!isMobile) return 0;
            const overflow = Math.max(0, elements.nightLetterContent.scrollHeight - elements.nightLoveLetter.clientHeight + 18);
            return -Math.min(overflow * 0.46, 110);
          },
          duration: 2.6,
          ease: "power1.inOut"
        }, 100.9)
       .to(elements.nightDoodles, {
          y: (index) => index % 2 === 0 ? 5 : -5,
          x: (index) => index % 3 === 0 ? 8 : (index % 3 === 1 ? -6 : 5),
          rotation: (index) => index % 2 === 0 ? -6 : 6,
          duration: 3.4,
          stagger: 0.06,
          ease: "power1.inOut"
        }, 101.0)
       .to(elements.nightLetterLines[3], { opacity: 1, y: 0, duration: 2.4, ease: "power2.out" }, 102.4)
       .to(elements.nightPaperWorld, { backgroundColor: "#fdf4ea", duration: 3.0, ease: "power1.inOut" }, 103.1)
       .to(elements.nightLetterLines[4], { opacity: 1, y: 0, duration: 2.4, ease: "power2.out" }, 104.4)
       .to(elements.nightLetterContent, {
          y: () => {
            if (!isMobile) return 0;
            const overflow = Math.max(0, elements.nightLetterContent.scrollHeight - elements.nightLoveLetter.clientHeight + 18);
            return -Math.min(overflow, 220);
          },
          duration: 2.7,
          ease: "power1.inOut"
        }, 104.8)
      .to(elements.nightEnding, { opacity: 1, y: 0, duration: 3.8, ease: "power2.out" }, 107)
      .to(elements.nightLetterPaper, { opacity: 0.12, duration: 4.6, ease: "power1.inOut" }, 111)
      .to(elements.nightEnding, { opacity: 0.18, duration: 4.4, ease: "power1.inOut" }, 111)
      .to(elements.nightPlayfulDoodles, { opacity: 0.08, duration: 4.4, ease: "power1.inOut" }, 111)
      .to(elements.nightFinalScene, { opacity: 1, duration: 6.2, ease: "power2.out" }, 112)
      .to(elements.nightFinalHearts, { opacity: 0.56, scale: 1, duration: 4.0, ease: "power2.out" }, 113.5)
      .to(elements.nightFinalPersonal, { opacity: 1, y: 0, duration: 3.2, ease: "power2.out" }, 115.0)
      .to(elements.nightFinalPersonal, { opacity: 0.12, y: -8, duration: 3.8, ease: "power1.inOut" }, 121.0)
      .to(elements.nightFinalTitleLineOne, { opacity: 1, y: 0, duration: 3.8, ease: "power3.out" }, 123.0)
      .to(elements.nightFinalNight, { opacity: 1, duration: 10.2, ease: "power1.inOut" }, 124.5)
      .to(elements.nightFinalTitleLineTwo, { opacity: 1, y: 0, duration: 3.8, ease: "power3.out" }, 126.4)
      .to(elements.nightFinalStars, { opacity: 0.92, duration: 8.0, ease: "power1.inOut" }, 128.2)
      .to(elements.nightFinalMoon, { opacity: 1, y: 0, scale: 1, duration: 7.0, ease: "power2.out" }, 129.0)
      .to(elements.nightFinalSubline, { opacity: 1, y: 0, duration: 3.2, ease: "power2.out" }, 129.8)
      .to(elements.nightFinalHearts, { opacity: 0.64, scale: 1.02, duration: 5.6, ease: "power1.inOut" }, 130.2)
      .to(elements.nightFinalTitle, { color: "#fffaf3", textShadow: "0 0 22px rgba(255,246,234,.25), 0 18px 42px rgba(0,0,0,.24)", duration: 5.8, ease: "power1.inOut" }, 130.4)
      .to(elements.nightFinalSubline, { color: "rgba(255,247,240,.95)", duration: 5.2, ease: "power1.inOut" }, 130.4)
      .to(elements.nightFinalMeteorOne, { opacity: 1, duration: 0.18, ease: "power1.out" }, 136.0)
      .to(meteorOneState, { progress: 1, duration: 1.35, ease: "power2.inOut", onUpdate: drawMeteorOne }, 136.0)
      .to(elements.nightFinalMeteorOne, { opacity: 0, duration: 0.72, ease: "power1.in" }, 137.0)
      .to(elements.nightFinalMeteorTwo, { opacity: 0.76, duration: 0.18, ease: "power1.out" }, 141.3)
      .to(meteorTwoState, { progress: 1, duration: 1.12, ease: "power2.inOut", onUpdate: drawMeteorTwo }, 141.3)
      .to(elements.nightFinalMeteorTwo, { opacity: 0, duration: 0.62, ease: "power1.in" }, 142.1)
      .to({}, { duration: 6.4 }, 143.2)
      .to(elements.nightFinalCurtain, { opacity: 1, duration: 1.0, ease: "power1.out" }, 149.6)
      .to(elements.nightCurtainLeft, { xPercent: 0, duration: 7.2, ease: "power3.inOut" }, 149.8)
      .to(elements.nightCurtainRight, { xPercent: 0, duration: 7.2, ease: "power3.inOut" }, 149.8)
      .to(elements.nightCurtainHeart, { opacity: 1, scale: 1, duration: 2.2, ease: "back.out(1.8)" }, 155.6)
      .to({}, { duration: 6 }, 158);
  }

  function finishUnlock() {
    state.status = "unlocked";
    elements.experience.classList.add("is-finished");
    elements.anniversarySite.classList.remove("is-preparing");
    elements.anniversarySite.classList.add("is-active");
    elements.anniversarySite.setAttribute("aria-hidden", "false");
    elements.paperWorld.setAttribute("aria-hidden", "false");
    elements.body.classList.remove("is-unlocking");
    elements.body.classList.add("anniversary-unlocked");
    setupFirstBloom();
    setupPhaseOneFinale();
    setupMemoryAlbum();
    setupNightFinale();
    window.scrollTo(0, 0);
    state.lenis?.start();
    window.ScrollTrigger?.refresh();
    window.dispatchEvent(new CustomEvent("anniversary:unlocked"));
  }

  function beginUnlockSequence() {
    if (state.status !== "ready") return;

    /* Prime background music from Milabs' click so browsers allow audible playback later. */
    primeAnniversaryMusic();

    state.status = "opening";
    elements.anniversarySite.classList.add("is-preparing");
    resetCountdownVisualsForUnlock();
    clearLetterMessageTimer();
    elements.letterFinale.classList.add("is-ready");
    elements.letterFinale.setAttribute("aria-hidden", "false");

    if (!window.gsap) {
      elements.experience.classList.add("is-finished");
      elements.paperWorld.style.visibility = "visible";
      elements.paperWorld.style.opacity = "1";
      elements.anniversarySite.style.visibility = "visible";
      elements.anniversarySite.style.opacity = "1";
      elements.anniversaryHeroContent.style.opacity = "1";
      elements.anniversaryHeroContent.style.transform = "none";
      startAnniversaryMusic();
      finishUnlock();
      return;
    }

    const gsap = window.gsap;
    const quick = reducedMotion.matches;
    const tl = gsap.timeline({ onComplete: finishUnlock });
    state.unlockTimeline = tl;

    const fullWidth = Math.max(window.innerWidth + 8, 380);
    const fullHeight = Math.max(window.innerHeight + 8, 520);
    const midWidth = Math.min(window.innerWidth * 0.74, 960);
    const midHeight = Math.min(window.innerHeight * 0.68, 640);
    const gatherX = [-42, -20, 14, 36, 52, -55, -30, 26, 4, 46];
    const gatherY = [12, -34, -20, -10, 20, 36, 22, 34, -46, -38];

    gsap.set(elements.paperTransition, { autoAlpha: 1, opacity: 1 });
    gsap.set(elements.paperTransitionSheet, {
      width: window.innerWidth < 620 ? 250 : 330,
      height: window.innerWidth < 620 ? 180 : 226,
      xPercent: -50,
      yPercent: -50,
      scale: quick ? 0.7 : 0.12,
      y: quick ? 0 : 54,
      rotation: quick ? 0 : -5,
      opacity: 0,
      borderRadius: 15,
    });

    tl.to(elements.letterMessage, { autoAlpha: 0, opacity: 0, duration: quick ? 0.01 : 0.15 }, 0)
      .to(elements.letterFireflyDots, {
        x: (index) => gatherX[index] || 0,
        y: (index) => gatherY[index] || 0,
        scale: 1.18,
        opacity: 1,
        duration: quick ? 0.01 : 0.5,
        stagger: quick ? 0 : 0.018,
        ease: "power2.inOut",
      }, 0)
      .to(elements.letterLightNear, { opacity: 1, scale: 1.2, duration: quick ? 0.01 : 0.46, ease: "power2.out" }, 0)
      .to(elements.loveLetter, { y: -5, scale: 1.025, duration: quick ? 0.01 : 0.32, ease: "power2.out" }, quick ? 0 : 0.08)
      .to(elements.letterSeal, { opacity: 0, scale: 0.68, rotation: 9, duration: quick ? 0.01 : 0.34, ease: "power2.in" }, quick ? 0.01 : 0.28)
      .to(elements.letterFlap, { rotationX: -164, duration: quick ? 0.01 : 0.62, ease: "power2.inOut" }, quick ? 0.02 : 0.46)
      .to(elements.paperTransitionSheet, { opacity: 1, scale: quick ? 1 : 0.42, y: -26, rotation: -2.2, duration: quick ? 0.01 : 0.72, ease: "power3.out" }, quick ? 0.03 : 0.84)
      .to(elements.finalDate, { opacity: 0, y: quick ? 0 : -16, duration: quick ? 0.01 : 0.32 }, quick ? 0.04 : 1.18)
      .to(elements.letterGarden, { opacity: 0.18, y: 14, duration: quick ? 0.01 : 0.42 }, quick ? 0.04 : 1.32)
      .to(elements.loveLetter, { opacity: 0.22, y: 24, scale: 0.94, duration: quick ? 0.01 : 0.42 }, quick ? 0.04 : 1.34)
      .call(() => { state.status = "unfolding"; }, [], quick ? 0.05 : 1.48)

      /* The small letter first relaxes vertically. */
      .to(elements.paperTransitionSheet, {
        width: quick ? fullWidth : Math.max(360, Math.min(midWidth * 0.62, 560)),
        height: quick ? fullHeight : midHeight,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: quick ? 0.01 : 0.72,
        ease: "power2.inOut",
      }, quick ? 0.05 : 1.5)
      .to(elements.paperFoldTop, { rotationX: 0, opacity: 0.18, duration: quick ? 0.01 : 0.58, ease: "power2.inOut" }, quick ? 0.05 : 1.58)

      /* Then the side folds open, selling the uncrumpling illusion. */
      .to(elements.paperTransitionSheet, {
        width: quick ? fullWidth : midWidth,
        duration: quick ? 0.01 : 0.74,
        ease: "power2.inOut",
      }, quick ? 0.06 : 2.08)
      .to(elements.paperFoldLeft, { rotationY: 0, opacity: 0.12, duration: quick ? 0.01 : 0.64, ease: "power2.inOut" }, quick ? 0.06 : 2.12)
      .to(elements.paperFoldRight, { rotationY: 0, opacity: 0.12, duration: quick ? 0.01 : 0.64, ease: "power2.inOut" }, quick ? 0.06 : 2.12)
      .to([elements.paperCreaseVertical, elements.paperCreaseHorizontal], { opacity: 0.25, duration: quick ? 0.01 : 0.34 }, quick ? 0.06 : 2.58)

      /* Full-screen takeover. The animated sheet becomes the anniversary world. */
      .to(elements.paperTransitionSheet, {
        width: fullWidth,
        height: fullHeight,
        borderRadius: 0,
        duration: quick ? 0.01 : 1.02,
        ease: "power3.inOut",
      }, quick ? 0.07 : 2.78)
      .to([elements.paperFoldLeft, elements.paperFoldRight, elements.paperFoldTop], { opacity: 0, duration: quick ? 0.01 : 0.46 }, quick ? 0.07 : 3.1)
      .to([elements.paperCreaseVertical, elements.paperCreaseHorizontal], { opacity: 0.08, duration: quick ? 0.01 : 0.5 }, quick ? 0.07 : 3.18)
      .to(elements.paperWorld, { autoAlpha: 1, opacity: 1, duration: quick ? 0.01 : 0.42, ease: "power1.inOut" }, quick ? 0.08 : 3.5)
      .to([elements.letterFinale, elements.nightVeil, elements.sakuraField], { opacity: 0, duration: quick ? 0.01 : 0.44, ease: "power1.inOut" }, quick ? 0.08 : 3.48)
      .call(() => { animatePaperWorldBloom(quick); }, [], quick ? 0.085 : 4.08)
      .call(() => {
        elements.experience.classList.add("is-finished");
        window.scrollTo(0, 0);
      }, [], quick ? 0.09 : 3.86)
      .to(elements.anniversarySite, { autoAlpha: 1, opacity: 1, duration: quick ? 0.01 : 0.3 }, quick ? 0.09 : 3.88)
      .to(elements.paperTransition, { autoAlpha: 0, opacity: 0, duration: quick ? 0.01 : 0.38, ease: "power1.inOut" }, quick ? 0.1 : 4.02)

      /* The first unlocked section arrives only after the paper has settled. */
      .call(() => { startAnniversaryMusic(); }, [], quick ? 0.11 : 4.34)
      .to(elements.anniversaryHeroContent, { opacity: 1, y: 0, duration: quick ? 0.01 : 0.72, ease: "power2.out" }, quick ? 0.11 : 4.34);
  }

  function setupLetterInteraction() {
    elements.loveLetter.addEventListener("click", () => {
      if (state.status === "locked") {
        teaseLockedLetter();
        return;
      }
      if (state.status === "ready") {
        beginUnlockSequence();
      }
    });
  }

  function applyAlreadyUnlockedState() {
    enterReadyState(false);
    window.requestAnimationFrame(() => {
      const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      state.lenis?.stop();
      window.scrollTo(0, bottom);
      window.ScrollTrigger?.update();
      state.lenis?.start();
    });
  }

  function setupVisibilityRecovery() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      if (state.status === "locked" && now() >= TARGET_TIME) {
        stopTimer();
        enterReadyState(false);
      }
    });

    window.addEventListener("pageshow", () => {
      if (state.status === "locked" && now() >= TARGET_TIME) {
        stopTimer();
        enterReadyState(false);
      }
    });
  }

  function setupPreviewMode() {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("preview");
    const barePreview3 = params.has("preview3") || window.location.search === "?preview3";

    if (barePreview3 || preview === "unlock3" || preview === "3") {
      const simulatedTarget = Date.now() + 3000;
      state.serverOffset = TARGET_TIME - simulatedTarget;
      return;
    }

    if (preview === "midnight") {
      const simulatedTarget = Date.now() + 8000;
      state.serverOffset = TARGET_TIME - simulatedTarget;
    }
  }

  async function init() {
    await syncServerTime();
    setupPreviewMode();
    createSakuraField();
    createBloomBurst();
    createLenis();
    buildScrollTimeline();
    setupVisibilityRecovery();
    setupLetterInteraction();

    const remaining = getRemaining();
    renderCountdown(remaining);

    if (remaining.difference <= 0) {
      applyAlreadyUnlockedState();
      return;
    }

    startTimer();
  }

  init();
})();
