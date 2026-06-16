# Portfolio — Amit Kumar Yadav

A modern, responsive personal portfolio website for a Senior Software Engineer.

## 🗂 Project Structure

```
portfolio/
├── index.html      # Main HTML page (all sections)
├── styles.css      # Complete CSS styles with dark/light theme
├── script.js       # Vanilla JS — theme toggle, GitHub API, animations
└── README.md       # This file
```

## ✨ Features

- **Dark / Light mode** toggle with OS-preference auto-detection
- **Smooth scrolling** navigation with sticky header
- **AOS scroll animations** (Animate On Scroll library)
- **GitHub API integration** — dynamically fetches your latest public repos
- **Mobile-first responsive** design (works on phone → desktop)
- **SEO-friendly** meta tags (Open Graph, description, keywords)
- **Contact form** (opens `mailto:` as a static-site fallback)
- **Downloadable resume** button (add your PDF to `assets/` folder)
- **Animated skill bars** triggered on scroll
- **Hero particles** background animation

## 🚀 Deploy on GitHub Pages

### Option 1 — Push to `main` branch (simplest)

1. Create a new GitHub repository named `amit-kumaryadav.github.io`
   (or any name you like).

2. Push the code:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/amit-kumaryadav/amit-kumaryadav.github.io.git
   git push -u origin main
   ```

3. Go to **Settings → Pages** in the repo:
   - Source: **Deploy from a branch**
   - Branch: **main** / root
   - Click **Save**

4. Your site will be live at:
   `https://amit-kumaryadav.github.io`

### Option 2 — Using any repo name

1. Push to any repo (e.g., `portfolio`).
2. In **Settings → Pages**, set the branch to `main` / root.
3. Site will be at: `https://amit-kumaryadav.github.io/portfolio/`

## 📝 Customisation

| Item | Where to change |
|------|----------------|
| Resume PDF | Add file to `assets/` folder, update the link in `script.js` (`downloadResume` handler) |
| Profile photo | Replace the avatar `<div>` in `index.html` with an `<img>` tag |
| Projects | Edit the project cards directly in `index.html` |
| Colours | Change CSS custom properties in `:root` / `[data-theme]` blocks in `styles.css` |
| GitHub username | Update `GITHUB_USERNAME` in `script.js` |

## 📦 Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (ES6+)
- [AOS](https://michalsnik.github.io/aos/) — scroll animations
- [Devicon](https://devicon.dev/) — tech stack icons
- [Google Fonts](https://fonts.google.com/) — Inter + JetBrains Mono

## 📄 License

© 2026 Amit Kumar Yadav. All rights reserved.
