document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);


  /* ================= PARTICLES ================= */

  const particles = $("particles");

  for(let i = 0; i < 45; i++){

    const p = document.createElement("div");

    p.className = "particle";

    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = (5 + Math.random() * 9) + "s";
    p.style.animationDelay = (Math.random() * 8) + "s";

    particles.appendChild(p);
  }


  /* ================= LOGIN ================= */

  const loginPage = $("loginPage");
  const website = $("website");

  const loginStep = $("loginStep");
  const otpStep = $("otpStep");

  const visitorName = $("visitorName");
  const visitorPhone = $("visitorPhone");

  const generatedOtp = $("generatedOtp");
  const otpInput = $("otpInput");

  const loginError = $("loginError");

  let correctOtp = "";


  function showError(text, good = false){

    loginError.textContent = text;

    loginError.style.color =
      good ? "#48e3aa" : "#ff8798";

  }


  $("sendOtp").addEventListener("click", () => {

    const name = visitorName.value.trim();
    const phone = visitorPhone.value.trim();

    if(name.length < 2){

      showError(
        "Name ta ektu thik kore dao 😄"
      );

      visitorName.focus();

      return;
    }


    if(!/^01\d{9}$/.test(phone)){

      showError(
        "বাংলাদেশি ১১ ডিজিটের ফোন নম্বর দাও।"
      );

      visitorPhone.focus();

      return;
    }


    correctOtp =
      String(
        Math.floor(
          100000 + Math.random() * 900000
        )
      );


    generatedOtp.textContent = correctOtp;

    loginStep.classList.add("hide");
    otpStep.classList.remove("hide");

    showError(
      "Verification code generated successfully.",
      true
    );

    otpInput.focus();

  });


  $("verifyOtp").addEventListener("click", () => {

    if(otpInput.value.trim() === correctOtp){

      loginPage.classList.add("hide");
      website.classList.remove("hide");

      document.body.style.overflow = "auto";

      showToast(
        `Welcome, ${visitorName.value.trim()}! 🎉`
      );

      window.scrollTo({
        top:0,
        behavior:"instant"
      });

    }

    else{

      showError(
        "Code মিলছে না 😅 আবার চেষ্টা করো।"
      );

      otpInput.animate(
        [
          {transform:"translateX(-6px)"},
          {transform:"translateX(6px)"},
          {transform:"translateX(-4px)"},
          {transform:"translateX(0)"}
        ],
        {
          duration:350
        }
      );

    }

  });


  $("backBtn").addEventListener("click", () => {

    otpStep.classList.add("hide");
    loginStep.classList.remove("hide");

    otpInput.value = "";

    showError("");

  });


  visitorPhone.addEventListener("keydown", e => {

    if(e.key === "Enter"){
      $("sendOtp").click();
    }

  });


  otpInput.addEventListener("keydown", e => {

    if(e.key === "Enter"){
      $("verifyOtp").click();
    }

  });


  /* ================= THEME ================= */

  $("themeButton").addEventListener("click", () => {

    document.body.classList.toggle("light");

    $("themeButton").textContent =
      document.body.classList.contains("light")
        ? "☀"
        : "☾";

  });


  /* ================= FUN FACTS ================= */

  const facts = [

    "Soil Science student detected. Yes, I can talk about dirt professionally. 😎",

    "Long drives are basically therapy with better scenery.",

    "Video game lag is always the game's fault. Obviously. 😂",

    "Typing speed: approximately 30 WPM. Brain speed: depends on Wi-Fi.",

    "Current mission: study, learn skills and somehow remain organized.",

    "One question on ChatGPT can somehow become a full research project. 😅",

    "Professional skill unlocked: finding information on the internet.",

    "Future plan: learn more technology without forgetting the syllabus.",

    "Swimming: because sometimes the brain also needs a refresh button.",

    "Movie night is technically educational… depending on the movie. 👀"

  ];


  function randomFact(){

    const box = $("factBox");

    const fact =
      facts[Math.floor(Math.random() * facts.length)];

    box.style.opacity = "0";

    setTimeout(() => {

      box.textContent = fact;

      box.style.opacity = "1";

    },150);

  }


  $("randomFact").addEventListener(
    "click",
    randomFact
  );


  $("funFactBtn").addEventListener("click", () => {

    randomFact();

    document
      .querySelector(".fun-box")
      .scrollIntoView({
        behavior:"smooth"
      });

  });


  /* ================= TOAST ================= */

  function showToast(text){

    const toast = $("toast");

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    },3500);

  }


  /* ================= IMAGE FALLBACK ================= */

  document
    .querySelectorAll("img")
    .forEach(img => {

      img.addEventListener("error", () => {

        if(img.dataset.failed) return;

        img.dataset.failed = "true";

        const text =
          img.alt || "PHOTO";

        img.src =
          "https://placehold.co/800x600/111827/ffffff?text=" +
          encodeURIComponent(text);

      });

    });


  /* ================= CARD REVEAL ================= */

  const revealElements =
    document.querySelectorAll(
      ".section-heading,.about-card,.personal-card,.timeline-card,.skill-card,.hobby-card,.fun-box,.gallery-item,.contact-card"
    );


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if(entry.isIntersecting){

            entry.target.animate(
              [
                {
                  opacity:0,
                  transform:"translateY(25px)"
                },
                {
                  opacity:1,
                  transform:"translateY(0)"
                }
              ],
              {
                duration:700,
                easing:"cubic-bezier(.2,.8,.2,1)",
                fill:"forwards"
              }
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold:.12
      }
    );


  revealElements.forEach(el =>
    revealObserver.observe(el)
  );


  /* ================= INITIAL STATE ================= */

  document.body.style.overflow = "hidden";

});
