// Resume renderer — data-driven, mode-aware (job / grad).
// See docs/ARCHITECTURE.md for the data flow this file implements.

const EXPECTED_SCHEMA_VERSION = 1;

const DATA_FILES = {
  profile: "data/profile.json",
  experience: "data/experience.json",
  projects: "data/projects.json",
  research: "data/research.json",
  education: "data/education.json",
  skills: "data/skills.json",
  awards: "data/awards.json",
};

const SECTION_LABELS = {
  projects: "Projects",
  experience: "Experience",
  research: "Research",
  education: "Education",
  skills: "Skills",
  awards: "Awards",
};

function byModePriority(items, mode) {
  return items
    .filter((item) => Array.isArray(item.modes) && item.modes.includes(mode))
    .sort((a, b) => (a.priority?.[mode] ?? 99) - (b.priority?.[mode] ?? 99));
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function tagRow(stack) {
  if (!stack || !stack.length) return "";
  return `<div class="tag-row">${stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>`;
}

function bulletsFor(item, mode) {
  const b = item.bullets || item.highlights;
  if (!b) return [];
  if (Array.isArray(b)) return b;
  return b[mode] || b.job || [];
}

function cardClass(item) {
  return "card" + (item.emphasis === "high" ? " card--emphasis" : "");
}

function renderExperience(items, mode) {
  return byModePriority(items, mode)
    .map((item) => {
      const bullets = bulletsFor(item, mode);
      return `<div class="${cardClass(item)}">
        <div class="card__top">
          <p class="card__title">${item.role} · ${item.org}</p>
          <span class="card__meta">${item.period || ""}</span>
        </div>
        ${bullets.length ? `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
        ${tagRow(item.stack)}
      </div>`;
    })
    .join("");
}

function renderProjects(items, mode) {
  return byModePriority(items, mode)
    .map((item) => {
      const bullets = bulletsFor(item, mode);
      const link = item.links?.repo || item.links?.demo;
      return `<div class="${cardClass(item)}">
        <div class="card__top">
          <p class="card__title">${link ? `<a href="${link}" target="_blank" rel="noopener">${item.title}</a>` : item.title}</p>
        </div>
        ${item.description ? `<p class="card__sub">${item.description}</p>` : ""}
        ${bullets.length ? `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
        ${tagRow(item.stack)}
      </div>`;
    })
    .join("");
}

function renderResearch(items, mode) {
  return byModePriority(items, mode)
    .map((item) => {
      const title = item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>` : item.title;
      return `<div class="${cardClass(item)}">
        <div class="card__top">
          <p class="card__title">${title}</p>
          <span class="card__meta">${item.year || ""}</span>
        </div>
        <p class="card__sub">${item.venue || ""}${item.type ? ` · ${item.type}` : ""}</p>
        ${item.authors ? `<p class="card__sub">${item.authors}</p>` : ""}
      </div>`;
    })
    .join("");
}

function renderEducation(items, mode) {
  return byModePriority(items, mode)
    .map(
      (item) => `<div class="${cardClass(item)}">
        <div class="card__top">
          <p class="card__title">${item.school}</p>
          <span class="card__meta">${item.period || ""}</span>
        </div>
        <p class="card__sub">${item.degree || ""}</p>
        ${item.thesis ? `<p class="card__sub">Thesis: ${item.thesis}</p>` : ""}
      </div>`
    )
    .join("");
}

function renderAwards(items, mode) {
  return byModePriority(items, mode)
    .map(
      (item) => `<div class="${cardClass(item)}">
        <div class="card__top">
          <p class="card__title">${item.title}</p>
          <span class="card__meta">${item.year || ""}</span>
        </div>
        <p class="card__sub">${item.org || ""}</p>
      </div>`
    )
    .join("");
}

function renderSkills(items, mode) {
  const rows = byModePriority(items, mode)
    .map(
      (group) => `<div class="skills-row">
        <span class="skills-row__label">${group.category}</span>
        ${tagRow(group.items)}
      </div>`
    )
    .join("");
  return `<div class="skills-grid">${rows}</div>`;
}

const RENDERERS = {
  experience: renderExperience,
  projects: renderProjects,
  research: renderResearch,
  education: renderEducation,
  awards: renderAwards,
  skills: renderSkills,
};

async function fetchJsonWithFallback(path) {
  const fallback = path.replace(/\.json$/, ".example.json");
  const res = await fetch(path);
  if (res.ok) return res.json();

  const fallbackRes = await fetch(fallback);
  if (!fallbackRes.ok) throw new Error(`Failed to load ${path} (and fallback ${fallback})`);
  console.info(`[resume] ${path}를 찾지 못해 예시 데이터(${fallback})를 대신 불러왔습니다. 실제 데이터를 쓰려면 CONTENT_GUIDE.md의 "처음 시작하기"를 참고하세요.`);
  return fallbackRes.json();
}

async function fetchAll() {
  const entries = await Promise.all(
    Object.entries(DATA_FILES).map(async ([key, path]) => [key, await fetchJsonWithFallback(path)])
  );
  return Object.fromEntries(entries);
}

function getInitialMode() {
  const fromUrl = new URLSearchParams(location.search).get("mode");
  if (fromUrl === "job" || fromUrl === "grad") return fromUrl;
  const stored = localStorage.getItem("resumeMode");
  if (stored === "job" || stored === "grad") return stored;
  return "job";
}

function renderHero(profile, mode) {
  document.getElementById("brand-name").textContent = profile.basics.name;
  document.getElementById("hero-name").textContent = profile.basics.name;
  document.getElementById("hero-title").textContent = profile.basics.title;
  document.getElementById("hero-summary").textContent = profile.summary[mode] || "";
  document.title = `${profile.basics.name} — Resume / Portfolio`;

  const photo = document.getElementById("hero-photo");
  if (profile.photo) {
    photo.src = profile.photo;
    photo.alt = profile.basics.name;
    photo.hidden = false;
  } else {
    photo.hidden = true;
  }

  const linksEl = document.getElementById("hero-links");
  const links = [];
  if (profile.basics.email) links.push(`<a href="mailto:${profile.basics.email}">${profile.basics.email}</a>`);
  if (profile.basics.location) links.push(`<span>${profile.basics.location}</span>`);
  for (const [label, url] of Object.entries(profile.basics.links || {})) {
    if (url) links.push(`<a href="${url}" target="_blank" rel="noopener">${label}</a>`);
  }
  linksEl.innerHTML = links.map((l) => `<li>${l}</li>`).join("");
}

function renderSections(data, mode) {
  const container = document.getElementById("sections");
  container.innerHTML = "";
  const order = (data.profile.sectionOrder[mode] || []).filter((name) => name !== "summary");

  for (const name of order) {
    const renderer = RENDERERS[name];
    if (!renderer) continue;
    const items = data[name];
    if (!Array.isArray(items) || !items.length) continue;
    const body = renderer(items, mode);
    if (!body) continue;

    const section = el("section", "section");
    section.dataset.section = name;
    section.innerHTML = `<h2 class="section__title">${SECTION_LABELS[name] || name}</h2><div class="section__body">${body}</div>`;
    container.appendChild(section);
  }
}

function updateToggleUI(mode) {
  document.querySelectorAll(".mode-toggle__btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.mode === mode));
  });
}

function setMode(data, mode) {
  localStorage.setItem("resumeMode", mode);
  const url = new URL(location.href);
  url.searchParams.set("mode", mode);
  history.replaceState(null, "", url);
  updateToggleUI(mode);
  renderHero(data.profile, mode);
  renderSections(data, mode);
}

async function init() {
  let data;
  try {
    data = await fetchAll();
  } catch (err) {
    document.getElementById("sections").innerHTML =
      `<p class="card">데이터를 불러오지 못했습니다. 로컬 서버(예: <code>npx serve</code>)로 열었는지 확인하세요.</p>`;
    console.error(err);
    return;
  }

  if (data.profile.schemaVersion !== EXPECTED_SCHEMA_VERSION) {
    console.warn(
      `[resume] data/profile.json schemaVersion(${data.profile.schemaVersion}) !== main.js가 기대하는 버전(${EXPECTED_SCHEMA_VERSION}). docs/CHANGELOG.md를 확인하세요.`
    );
  }

  let mode = getInitialMode();
  setMode(data, mode);

  document.querySelectorAll(".mode-toggle__btn").forEach((btn) => {
    btn.addEventListener("click", () => setMode(data, btn.dataset.mode));
  });

  document.getElementById("print-btn").addEventListener("click", () => window.print());
}

init();
