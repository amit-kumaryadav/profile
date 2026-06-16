/* ═══════════════════════════════════════════
   PORTFOLIO — Amit Kumar Yadav
   JavaScript (Vanilla)
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Initialize AOS ────────────────────
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: window.innerWidth < 480 ? 'phone' : false
  });

  // ── DOM references ────────────────────
  const navbar       = document.getElementById('navbar');
  const hamburger    = document.getElementById('hamburger');
  const navLinks     = document.getElementById('navLinks');
  const themeToggle  = document.getElementById('themeToggle');
  const backToTop    = document.getElementById('backToTop');
  const yearSpan     = document.getElementById('currentYear');
  const heroSection  = document.getElementById('hero');

  // ── Year ──────────────────────────────
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ═══════════════════════════════════════
  // THEME TOGGLE
  // ═══════════════════════════════════════
  const THEME_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ═══════════════════════════════════════
  // NAVBAR: scroll effects & active link
  // ═══════════════════════════════════════
  const sections = document.querySelectorAll('.section, .hero');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY;

    // Sticky shadow
    navbar.classList.toggle('navbar--scrolled', scrollY > 50);

    // Back to top
    backToTop.classList.toggle('visible', scrollY > 500);

    // Active section highlighting
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (scrollY >= top) currentSection = sec.getAttribute('id');
    });

    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ═══════════════════════════════════════
  // MOBILE MENU
  // ═══════════════════════════════════════
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ═══════════════════════════════════════
  // SKILL BARS — animate on scroll
  // ═══════════════════════════════════════
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ═══════════════════════════════════════
  // BACK TO TOP
  // ═══════════════════════════════════════
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ═══════════════════════════════════════
  // HERO PARTICLES
  // ═══════════════════════════════════════
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 6 + 2;
      p.style.width  = size + 'px';
      p.style.height = size + 'px';
      p.style.left   = Math.random() * 100 + '%';
      p.style.top    = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 6 + 4) + 's';
      p.style.animationDelay    = (Math.random() * 4) + 's';
      container.appendChild(p);
    }
  }

  createParticles();

  // ═══════════════════════════════════════
  // GITHUB API — fetch public repos
  // ═══════════════════════════════════════
  const GITHUB_USERNAME = 'amit-kumaryadav';
  const reposContainer  = document.getElementById('githubRepos');

  // Language → color mapping
  const langColors = {
    JavaScript:  '#f1e05a',
    TypeScript:  '#3178c6',
    Java:        '#b07219',
    Python:      '#3572A5',
    HTML:        '#e34c26',
    CSS:         '#563d7c',
    Shell:       '#89e051',
    Kotlin:      '#A97BFF',
    Go:          '#00ADD8',
    Rust:        '#dea584',
    C:           '#555555',
    'C++':       '#f34b7d',
    'C#':        '#178600',
    Ruby:        '#701516',
    PHP:         '#4F5D95',
    Dockerfile:  '#384d54'
  };

  async function fetchGitHubRepos() {
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`
      );
      if (!res.ok) throw new Error('GitHub API error');
      const repos = await res.json();

      if (!repos.length) {
        reposContainer.innerHTML = '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;">No public repositories found.</p>';
        return;
      }

      reposContainer.innerHTML = repos.map(repo => `
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-card">
          <div class="repo-card__name">${repo.name}</div>
          <div class="repo-card__desc">${repo.description || 'No description provided.'}</div>
          <div class="repo-card__meta">
            ${repo.language ? `
              <span>
                <span class="repo-card__lang-dot" style="background:${langColors[repo.language] || '#ccc'}"></span>
                ${repo.language}
              </span>
            ` : ''}
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
          </div>
        </a>
      `).join('');

    } catch (err) {
      console.warn('Could not fetch GitHub repos:', err);
      reposContainer.innerHTML = '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;">Unable to load repositories. Visit <a href="https://github.com/amit-kumaryadav" target="_blank" style="color:var(--accent)">GitHub</a> directly.</p>';
    }
  }

  fetchGitHubRepos();

  // ═══════════════════════════════════════
  // DOWNLOAD RESUME (placeholder)
  // ═══════════════════════════════════════
  const resumeBtn = document.getElementById('downloadResume');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', e => {
      e.preventDefault();
      // Replace with actual resume URL once uploaded
     window.open('assets/resume.pdf', '_blank');
    });
  }

  // ═══════════════════════════════════════
  // SMOOTH SCROLL POLYFILL (for older Safari)
  // ═══════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

});
