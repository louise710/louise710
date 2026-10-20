(() => {
  "use strict";

  const EMAIL = "louisefrancinemoira.canedo.23@usjr.edu.ph";
  const COLORS = { bg: "#2a2826", field: "#3e3a37", yellow: "#ecdc78", gold: "#d9a057", maroon: "#a04646", ink: "#2b2927" };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- data */

  // Only facts confirmed in README.md. Unknown stacks/links are left out rather than guessed.
  const projects = [
    {
      code: "AL", variant: "yellow", tags: ["web"],
      title: "Alliance Meeting Room Booking System", sub: "Web app · Full-stack",
      desc: "Full-stack booking system that manages room schedules, streamlines reservations, and prevents booking conflicts.",
      stack: "React · C# / .NET · SQL", source: "Private (company/school work)",
      shots: [
        ["assets/projects/marshal-available-rooms.jpg", "Available Rooms page listing bookable rooms with capacity, amenities and status"],
        // ["assets/projects/marshal-booking-calendar.jpg", "Booking screen with a monthly calendar, day schedule and recurring booking form"],
        // ["assets/projects/marshal-admin-stats.jpg", "Admin stats dashboard showing bookings per room and monthly bookings"],
      ],
    },
    {
      code: "EL", variant: "gold", tags: ["web"],
      title: "USJR E-Logbook", sub: "Web app · USJ-R",
      desc: "Digital logbook for tracking and managing records at USJ-R, streamlining administrative workflows.",
      source: "Private (company/school work)",
      shots: [
        ["assets/projects/comms-dashboard.jpg", "Communication System dashboard with status counters and recent communications"]
        // ["assets/projects/comms-communication-detail.jpg", "Communication detail view with status, document and approval route"],
      ],
    },
    {
      code: "IoT", variant: "maroon", tags: ["iot"],
      title: "Classroom Automation / Room Management", sub: "IoT · USJ-R",
      desc: "IoT system that remotely controls classroom lighting and environmental conditions over MQTT, used at USJ-R.",
      stack: "MQTT", source: "Private",
      shots: [
        ["assets/projects/rms-home.jpg", "Room Management System home showing AC and light status for each classroom"],
        ["assets/projects/rms-room-schedule.jpg", "Room SA 320 device controls and class schedule"],
        ["assets/projects/rms-login.jpg", "Room Management System login page"],
      ],
    },
    {
      code: "SG", variant: "yellow", tags: ["iot"],
      title: "Project SISIG", sub: "Copyrighted · CCR No. 2025-06396-N",
      desc: "Sustainable Intelligent System for Innovative Gardening: an intelligent system that automates plant monitoring and garden management. Officially copyrighted (CCR No. 2025-06396-N).",
      source: "Private",
    },
    {
      code: "TB", variant: "gold", tags: ["ai"],
      title: "TIMBLE", sub: "Undergraduate thesis · AI & optimization",
      desc: "A single workspace to plan subject offerings, open sections, and prepare class schedules. TIMBLE estimates subject demand from historical enrollment and curriculum data, then suggests suitable section numbers. Under the hood, a hybrid CSP + PPO reinforcement learning approach handles timetabling and faculty loading: OR-Tools CP-SAT enforces hard constraints (room capacity, faculty availability, prerequisites) and PPO balances timetables and faculty workloads. Philippine Startup Challenge Central Visayas Top 25 Qualifier (Team CascadeZero).",
      stack: "Python · OR-Tools CP-SAT · PPO", source: "Private",
      shots: [["assets/events/psc-central-visayas-top25-timble.jpg", "TIMBLE logo on the Philippine Startup Challenge Central Visayas Top 25 Qualifier announcement"]],
    },
    {
      code: "AQ", variant: "maroon", tags: ["ai"],
      title: "AutoQuad", sub: "Computer vision · IPBL 2026",
      desc: "Computer vision system built with an international project-based learning team for the Autonomous Quadruped Challenge. Team Stellar-One received the Unique Quadro Award.",
      shots: [
        ["assets/projects/autoquad-robot.jpg", "AutoQuad quadruped robot with a Raspberry Pi and servo legs on a workbench"],
        ["assets/events/ipbl-2026-award-group-photo.jpg", "Team Stellar-One with mentors receiving the Unique Quadro Award at IPBL 2026"],
      ],
    },
    {
      code: "PR", variant: "yellow", tags: ["ai"],
      title: "Vehicle Plate Number Recognition", sub: "Computer vision",
      desc: "Computer vision pipeline that detects and reads vehicle license plates from images.",
      shots: [["assets/projects/plate-recognition-demo.jpg", "Live demo detecting and reading the plate number 2021 from a phone screen"]],
    },
    {
      code: "TII", variant: "gold", tags: ["ai"],
      title: "Trash Intensification Index", sub: "NLP",
      desc: "NLP techniques to analyze and evaluate trends in waste-related data.",
      shots: [["assets/projects/trash-intensification-detection.jpg", "Trash Intensification app detecting 74 garbage objects in a photo"]],
    },
    {
      code: "FP", variant: "maroon", tags: ["ai"],
      title: "Faculty Performance Prediction", sub: "Predictive modelling",
      desc: "Predictive models that analyze and forecast faculty performance metrics.",
      source: "Private",
    },
  ];

  const receipts = [
    {
      code: "SCS", variant: "maroon",
      title: "SCS Hackathon Days", sub: "Hackathon · Participant",
      desc: "Joined SCS Hackathon Days.",
    },
    {
      img: "assets/certificates/ipbl-2026-unique-quadro-award.jpg",
      alt: "Unique Quadro Award certificate awarded to team Stellar-One, IPBL 2026",
      title: "Unique Quadro Award", sub: "IPBL 2026 · awarded to team Stellar-One",
      desc: "Certificate of Recognition for the team's originality and innovative approach in developing a distinctive autonomous quadruped, International Project-Based Learning 2026: Autonomous Quadruped Challenge, Aug 17–21 2026, University of San Jose–Recoletos.",
    },
    {
      img: "assets/certificates/ipbl-2026-participation.jpg",
      alt: "IPBL 2026 Certificate of Participation for Louise Francine Moira Cañedo",
      title: "IPBL 2026 Participation", sub: "Certificate of Participation · Aug 2026",
      desc: "International Project-Based Learning (IPBL) Program: Autonomous Quadruped Challenge with OIT, STUST and USJ-R, held Aug 17–21 2026 in Cebu City.",
    },
    {
      img: "assets/certificates/alliance-software-engineering-2025.jpg",
      alt: "Alliance Software Engineering Certificate Program certificate of completion",
      title: "Alliance Software Engineering Program", sub: "Certificate of Completion · Dec 2025",
      desc: "Completed the Alliance Software Engineering Certificate Program for S.Y. 2024–2026, with training in quality assurance, React JS, C#, and project management.",
    },
    {
      code: "L2", variant: "gold",
      title: "TOPCIT — Level 2", sub: "Test of Practical Competency in IT · 2026",
      desc: "Reached Level 2 in TOPCIT, the Test of Practical Competency in IT.",
    },
    {
      code: "AI", variant: "maroon",
      title: "TESDA AI Upskilling", sub: "Training program", badge: "In progress",
      desc: "TESDA AI Upskilling Training Program. Certificate pending.",
    },
    {
      img: "assets/events/psc-central-visayas-top25-timble.jpg",
      alt: "Philippine Startup Challenge Central Visayas Top 25 Qualifier announcement for TIMBLE by Team CascadeZero, University of San Jose–Recoletos",
      title: "PSC Regional Competition", sub: "Philippine Startup Challenge · Central Visayas Top 25", badge: "Ongoing",
      desc: "TIMBLE, by Team CascadeZero from the University of San Jose–Recoletos, was named a Central Visayas Top 25 Qualifier in the Philippine Startup Challenge (PSC) regional competition.",
    },
  ];

  const skills = [
    ["Py", "Python", "Language"], ["JS", "JavaScript / TypeScript", "Language"], ["PHP", "PHP", "Language"],
    ["C#", "C#", "Language"], ["Ja", "Java", "Language"], ["C++", "C / C++", "Language"],
    ["SQL", "SQL", "Database"], ["Re", "React", "Web"], ["Lv", "Laravel", "Web"],
    ["API", "REST APIs", "Web"], ["PT", "PyTorch", "AI / ML"], ["TF", "TensorFlow", "AI / ML"],
    ["CP", "OR-Tools CP-SAT", "Optimization"], ["RL", "Reinforcement Learning", "AI / ML"], ["CV", "Computer Vision", "AI / ML"],
    ["NLP", "NLP", "AI / ML"], ["MQ", "MQTT", "IoT"], ["Ar", "Arduino", "IoT"],
    ["Pi", "Raspberry Pi", "IoT"], ["Git", "Git / GitHub", "Tools"], ["Co", "Google Colab", "Tools"],
  ];

  const tickerItems = ["Open for practicum / OJT", "Full-stack", "IoT", "Applied AI", "Cebu City, PH"];

  /* ------------------------------------------------------------- helpers */

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const hex = (cx, cy, r) =>
    [-90, -30, 30, 90, 150, 210]
      .map((a) => { const t = (a * Math.PI) / 180; return `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`; })
      .join(" ");

  let uid = 0;
  // Geometric "cover art" for cards without a photo, in the three styles from the design.
  function art(variant, label, w, h) {
    const id = `a${uid++}`;
    const m = Math.min(w, h);
    const cx = w / 2, cy = h / 2;
    const fs = m * (label.length > 2 ? 0.17 : 0.22);
    const stripes = (color, size = 26) =>
      `<pattern id="${id}s" patternUnits="userSpaceOnUse" width="${size}" height="${size}" patternTransform="rotate(-35)"><rect width="${size / 2}" height="${size}" fill="${color}"/></pattern>`;
    const text = (fill) =>
      `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="Inter Tight, Inter, sans-serif" font-weight="900" font-size="${fs}" fill="${fill}" letter-spacing="-1">${esc(label)}</text>`;
    let body = "";
    if (variant === "yellow") {
      const band = h * 0.13;
      body = `<defs>${stripes(COLORS.yellow)}</defs>
        <rect y="${h - band}" width="${w}" height="${band}" fill="url(#${id}s)"/>
        <g class="art-main"><polygon points="${hex(cx, cy - band * 0.25, m * 0.33)}" fill="${COLORS.yellow}"/>${text(COLORS.ink).replace(`y="${cy}"`, `y="${cy - band * 0.25}"`)}</g>
        <polygon points="${hex(w - m * 0.16, m * 0.16, m * 0.08)}" fill="none" stroke="${COLORS.gold}" stroke-width="${m * 0.014}"/>`;
    } else if (variant === "gold") {
      const band = h * 0.1;
      body = `<defs>${stripes(COLORS.gold)}</defs>
        <rect width="${w}" height="${band}" fill="url(#${id}s)"/>
        <g class="art-main"><polygon points="${hex(cx, cy + band * 0.3, m * 0.32)}" fill="${COLORS.field}" stroke="${COLORS.gold}" stroke-width="${m * 0.022}"/>${text(COLORS.gold).replace(`y="${cy}"`, `y="${cy + band * 0.3}"`)}</g>
        <polygon points="${hex(m * 0.16, h - m * 0.14, m * 0.085)}" fill="${COLORS.maroon}"/>`;
    } else {
      body = `<defs>${stripes(COLORS.maroon, 22)}</defs>
        <g class="art-main"><polygon points="${hex(cx, cy, m * 0.27)}" fill="none" stroke="url(#${id}s)" stroke-width="${m * 0.11}"/>${text(COLORS.yellow)}</g>
        <polygon points="${hex(w - m * 0.17, h - m * 0.17, m * 0.075)}" fill="${COLORS.yellow}"/>`;
    }
    return `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false"><rect width="${w}" height="${h}" fill="${COLORS.bg}"/>${body}</svg>`;
  }

  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  /* -------------------------------------------------------------- ticker */

  const star = `<svg viewBox="0 0 40 40"><use href="#star"/></svg>`;
  const tickerRun = tickerItems.map((t) => `<span>${esc(t)}${star}</span>`).join("");
  $(".ticker-move").innerHTML = tickerRun + tickerRun;

  /* ------------------------------------------------------------ projects */

  const projectList = $("#project-list");
  projectList.innerHTML = projects
    .map(
      (p, i) => `<li class="reveal" data-tags="${p.tags.join(" ")}" style="transition-delay:${(i % 4) * 70}ms">
        <button class="tile" type="button" data-index="${i}" aria-haspopup="dialog">
          <div class="tile-media">
            ${p.shots ? `<img src="${p.shots[0][0]}" alt="${esc(p.shots[0][1])}" loading="lazy" />` : art(p.variant, p.code, 320, 240)}
            <span class="zoom">Details</span>
          </div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.sub)}</p>
        </button>
      </li>`
    )
    .join("");

  projectList.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    const order = $$("li:not(.hidden) .tile", projectList).map((t) => Number(t.dataset.index));
    openModal(order.map((i) => ({ kind: "project", item: projects[i] })), order.indexOf(Number(tile.dataset.index)), tile);
  });

  $$("#work .chip").forEach((chip, _, all) =>
    chip.addEventListener("click", () => {
      all.forEach((c) => { c.classList.toggle("is-on", c === chip); c.setAttribute("aria-pressed", c === chip); });
      const f = chip.dataset.filter;
      $$("li", projectList).forEach((li) => li.classList.toggle("hidden", f !== "all" && !li.dataset.tags.split(" ").includes(f)));
    })
  );

  /* ------------------------------------------------------------ receipts */

  const receiptList = $("#receipt-list");
  receiptList.innerHTML = receipts
    .map(
      (r, i) => `<li>
        <button class="card" type="button" data-index="${i}" aria-haspopup="dialog">
          <div class="card-art">${r.img ? `<img src="${r.img}" alt="${esc(r.alt)}" loading="lazy" />` : art(r.variant, r.code, 300, 375)}</div>
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.sub)}</p>
          ${r.badge ? `<span class="badge">${esc(r.badge)}</span>` : ""}
          <span class="more">${r.img ? "View" : "Details"} →</span>
        </button>
        <svg class="sep" viewBox="0 0 40 40" aria-hidden="true"><use href="#star"/></svg>
      </li>`
    )
    .join("");

  const carousel = $("#receipts .carousel");
  const arrows = $$("#receipts .arrow");

  function layoutCards() {
    const items = $$("li", receiptList);
    items.forEach((li, i) => {
      const card = $(".card", li);
      card.classList.toggle("offset", i % 2 === 1);
      // Re-render art so the square/tall shape matches the card's slot.
      const r = receipts[card.dataset.index];
      if (!r.img) $(".card-art", card).innerHTML = art(r.variant, r.code, 300, i % 2 ? 300 : 375);
      $(".sep", li).style.visibility = i === items.length - 1 ? "hidden" : "";
    });
    updateArrows();
  }

  function updateArrows() {
    const max = carousel.scrollWidth - carousel.clientWidth - 2;
    arrows[0].disabled = carousel.scrollLeft <= 2;
    arrows[1].disabled = carousel.scrollLeft >= max;
  }

  function step(dir) {
    const card = $("li", receiptList);
    const amount = card ? card.getBoundingClientRect().width : 400;
    carousel.scrollBy({ left: dir * amount, behavior: reduceMotion ? "auto" : "smooth" });
  }

  arrows.forEach((b) => b.addEventListener("click", () => step(Number(b.dataset.dir))));
  carousel.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });

  // Mouse drag-to-scroll (touch already scrolls natively).
  let drag = null;
  let suppressClick = false;
  carousel.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, left: carousel.scrollLeft, moved: false };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; carousel.classList.add("dragging"); }
    if (drag.moved) carousel.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    suppressClick = drag.moved;
    carousel.classList.remove("dragging");
    drag = null;
    setTimeout(() => (suppressClick = false), 0);
  });
  // Translate vertical wheel into horizontal scroll only while hovering with a mouse wheel.
  carousel.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.shiftKey) { carousel.scrollLeft += e.deltaY; e.preventDefault(); }
  }, { passive: false });

  receiptList.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card || suppressClick) return;
    openModal(receipts.map((r) => ({ kind: "receipt", item: r })), Number(card.dataset.index), card);
  });

  layoutCards();

  /* -------------------------------------------------------------- skills */

  const skillList = $("#skill-list");
  skillList.innerHTML = skills
    .map(([abbr, name, cat]) => `<li class="skill reveal" data-cat="${esc(cat)}"><div class="skill-tile" aria-hidden="true">${esc(abbr)}</div><strong>${esc(name)}</strong><span>${esc(cat)}</span></li>`)
    .join("");
  $$(".skill", skillList).forEach((el, i) => (el.style.transitionDelay = `${(i % 6) * 50}ms`));

  const cats = ["All", ...new Set(skills.map((s) => s[2]))];
  const skillFilters = $("#skill-filters");
  skillFilters.innerHTML = cats.map((c, i) => `<button class="chip${i ? "" : " is-on"}" type="button" data-cat="${esc(c)}" aria-pressed="${!i}">${esc(c)}</button>`).join("");
  skillFilters.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip", skillFilters).forEach((c) => { c.classList.toggle("is-on", c === chip); c.setAttribute("aria-pressed", c === chip); });
    const cat = chip.dataset.cat;
    $$(".skill", skillList).forEach((s) => {
      s.style.transitionDelay = "0ms";
      s.classList.toggle("dim", cat !== "All" && s.dataset.cat !== cat);
      s.classList.toggle("match", cat !== "All" && s.dataset.cat === cat);
    });
  });

  /* --------------------------------------------------------------- modal */

  const modal = $("#modal");
  const modalBody = $("#modal-body");
  const modalCount = $("#modal-count");
  const modalSteps = $$(".modal-nav .arrow", modal);
  let mItems = [], mIndex = 0, mReturn = null;

  function renderModal() {
    const { kind, item } = mItems[mIndex];
    const shots = item.shots || (item.img ? [[item.img, item.alt]] : []);
    let media;
    if (shots.length) {
      media = `<img class="modal-shot" src="${shots[0][0]}" alt="${esc(shots[0][1])}" />`;
      if (shots.length > 1)
        media += `<div class="modal-thumbs">${shots
          .map(([src, alt], i) => `<button type="button" class="${i ? "" : "is-on"}" data-shot="${i}" aria-label="Show picture ${i + 1} of ${shots.length}" aria-pressed="${!i}"><img src="${src}" alt="" /></button>`)
          .join("")}</div>`;
    } else media = `<div class="modal-art">${art(item.variant, item.code, 800, 350)}</div>`;

    const rows = [];
    if (kind === "project") {
      if (item.stack) rows.push(["Stack", item.stack]);
      if (item.source) rows.push(["Source", item.source]);
    }
    if (item.badge) rows.push(["Status", item.badge]);

    modalBody.innerHTML = `${media}
      <h3 id="modal-title">${esc(item.title)}</h3>
      <p class="modal-meta">${esc(item.sub)}</p>
      <p class="desc">${esc(item.desc)}</p>
      ${rows.length ? `<dl>${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}`;
    modalCount.textContent = `${mIndex + 1} / ${mItems.length}`;
    modalSteps.forEach((b) => (b.hidden = mItems.length < 2));
  }

  function openModal(items, index, returnFocus) {
    mItems = items; mIndex = Math.max(0, index); mReturn = returnFocus;
    renderModal();
    modal.showModal();
    $(".modal-close", modal).focus();
  }

  function moveModal(d) {
    mIndex = (mIndex + d + mItems.length) % mItems.length;
    renderModal();
  }

  modalSteps.forEach((b) => b.addEventListener("click", () => moveModal(Number(b.dataset.step))));
  modalBody.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-shot]");
    if (!thumb) return;
    const { item } = mItems[mIndex];
    const [src, alt] = item.shots[Number(thumb.dataset.shot)];
    const main = $(".modal-shot", modalBody);
    main.src = src; main.alt = alt;
    $$("[data-shot]", modalBody).forEach((b) => { b.classList.toggle("is-on", b === thumb); b.setAttribute("aria-pressed", b === thumb); });
  });
  $(".modal-close", modal).addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") moveModal(1);
    if (e.key === "ArrowLeft") moveModal(-1);
  });
  modal.addEventListener("close", () => mReturn && mReturn.focus());

  /* ----------------------------------------------------------------- nav */

  const nav = $(".nav");
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("open", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); links.classList.remove("open"); }
  });
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 10), { passive: true });

  const navLinks = $$('.nav-links a[href^="#"]:not(.btn)');
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["work", "receipts", "about", "skills", "contact"].forEach((id) => spy.observe(document.getElementById(id)));

  /* -------------------------------------------------------------- reveal */

  const revealer = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealer.unobserve(en.target); } }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealer.observe(el));

  /* ---------------------------------------------------------- hero parallax */

  const hero = $(".hero");
  const shapes = $$(".hero-art .shape");
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let raf = 0;
    hero.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        shapes.forEach((s) => {
          const d = Number(s.dataset.depth || 0);
          s.style.transform = `translate(${(x * d).toFixed(1)}px, ${(y * d).toFixed(1)}px)`;
        });
      });
    });
    hero.addEventListener("pointerleave", () => shapes.forEach((s) => (s.style.transform = "")));
  }

  /* ------------------------------------------------------------- contact */

  $(".copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast("Email copied!");
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  });

  const form = $("#contact-form");
  const fEmail = $("#f-email"), fMsg = $("#f-msg"), fName = $("#f-name");
  const setErr = (input, el, msg) => { input.classList.toggle("invalid", !!msg); input.setAttribute("aria-invalid", !!msg); el.textContent = msg; };

  function validate() {
    let ok = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value.trim())) { setErr(fEmail, $("#err-email"), "Please enter a valid email address."); ok = false; }
    else setErr(fEmail, $("#err-email"), "");
    if (!fMsg.value.trim()) { setErr(fMsg, $("#err-msg"), "Please write a short message."); ok = false; }
    else setErr(fMsg, $("#err-msg"), "");
    return ok;
  }
  [fEmail, fMsg].forEach((el) => el.addEventListener("input", () => el.classList.contains("invalid") && validate()));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) { (fEmail.classList.contains("invalid") ? fEmail : fMsg).focus(); return; }
    const name = fName.value.trim();
    const subject = `Practicum / OJT inquiry${name ? ` from ${name}` : ""}`;
    const body = `${fMsg.value.trim()}\n\n— ${name || "Sent from your portfolio"}\n${fEmail.value.trim()}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast("Opening your email app…");
  });
})();
