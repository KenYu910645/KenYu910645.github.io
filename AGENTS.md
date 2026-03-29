# AGENTS.md — Project Guide for AI Agents & Developers

This file describes the structure, purpose, and conventions of this repository for anyone
(human or AI agent) working on it. Read this before making changes.

AI agents must read `AGENTS.md` before processing any task in this repository.

---

## Project Overview

This is **Ken (Jia-Quan) Yu's personal portfolio and CV website**, hosted on GitHub Pages at
[KenYu910645.github.io](https://KenYu910645.github.io).

It is built with **Jekyll** using the [al-folio](https://github.com/alshedivat/al-folio) theme.
The site is fully static — Jekyll compiles Markdown, Liquid templates, SCSS, and YAML data files
into plain HTML/CSS/JS at build time. There is no backend or database.

**Active pages on the site:**

| URL              | Source File              | Purpose                                      |
| ---------------- | ------------------------ | -------------------------------------------- |
| `/`              | `_pages/about.md`        | Homepage — bio, profile photo, social links  |
| `/projects/`     | `_pages/projects.md`     | Gallery of all projects, grouped by category |
| `/publications/` | `_pages/publications.md` | Auto-generated list from BibTeX              |
| `/cv/`           | `_pages/cv.md`           | Curriculum vitae built from YAML data        |

---

## Technology Stack

| Layer                 | Tool                                            |
| --------------------- | ----------------------------------------------- |
| Static site generator | Jekyll 4.x                                      |
| Hosting               | GitHub Pages                                    |
| CSS framework         | Bootstrap 4 + Material Design Bootstrap (MDB)   |
| Icons                 | Font Awesome 6, Academicons                     |
| Math rendering        | MathJax 3                                       |
| Grid layout           | Masonry.js                                      |
| Image zoom            | medium-zoom                                     |
| Bibliography          | jekyll-scholar (BibTeX)                         |
| CI/CD                 | GitHub Actions (`.github/workflows/deploy.yml`) |
| Local dev             | Docker (`Dockerfile` + `docker-compose.yml`)    |

---

## Directory Structure

```
.
├── _bibliography/        # BibTeX publication data
├── _config.yml           # Master Jekyll configuration
├── _data/                # Structured YAML data (CV, repos, co-authors)
├── _includes/            # Reusable Liquid HTML snippets
├── _layouts/             # Full page layout templates
├── _news/                # News/announcement posts (currently empty)
├── _pages/               # Top-level site pages
├── _plugins/             # Custom Ruby Jekyll plugins
├── _posts/               # Blog posts (currently empty — blog disabled)
├── _projects/            # Individual project pages
├── _sass/                # SCSS stylesheets
├── assets/               # Static files (images, PDFs, JS, CSS, fonts)
├── bin/                  # Build/deploy shell scripts
├── blog/                 # Blog index page (disabled)
├── news.html             # Standalone news archive page
├── 404.html              # Custom 404 error page
├── robots.txt            # Search engine crawl rules
└── purgecss.config.js    # CSS tree-shaking config for production builds
```

---

## Directory & File Reference

### `_config.yml` — Master Configuration

The single most important file. Controls site-wide settings:

- **Identity:** `title`, `first_name`, `last_name`, `email`, `url`
- **Social links:** `github_username`, `linkedin_username`, `youtube_id`, etc. Set a key to
  enable its icon on the About page; leave blank to hide it.
- **Feature flags** (`enable_*`): Toggle dark mode, masonry grid, MathJax, image zoom,
  progress bar, etc. without touching any template code.
- **Blog section:** Currently disabled. To re-enable, uncomment `blog_name`,
  `blog_nav_title`, and `permalink`, then add posts to `_posts/`.
- **Scholar settings:** Controls how publications are rendered (grouping, author name
  highlighting, max authors shown).
- **Library versions:** CDN version pins for Bootstrap, jQuery, MathJax, etc.

---

### `_pages/` — Site Pages (4 active files)

Each file becomes a URL route. Front matter controls navigation order and layout.

| File              | Route            | Key Front Matter                                  |
| ----------------- | ---------------- | ------------------------------------------------- |
| `about.md`        | `/`              | `layout: about`, `profile:` block with image/bio  |
| `projects.md`     | `/projects/`     | `layout: page`, renders `_includes/projects.html` |
| `publications.md` | `/publications/` | `layout: page`, uses `{% bibliography %}` tag     |
| `cv.md`           | `/cv/`           | `layout: cv`, `cv_pdf:` for download button       |

**To add a new page:** create a `.md` file here with `permalink`, `title`, `nav: true`, and
a `nav_order` integer in the front matter.

---

### `_projects/` — Project Pages (14 files)

Each `.md` file is one project card. Front matter fields control how the card appears in
the gallery:

```yaml
---
layout: page
title: Project Name
description: One-line subtitle shown on the card
img: assets/img/preview/thumbnail.png # card thumbnail
importance: 1 # sort order within category (lower = higher)
category: Research # grouping label on /projects/ page
---
```

Project categories currently in use: **Research**, **Robotics**, **Course Projects**,
**Side Projects**.

The page body (below `---`) is standard Markdown + HTML and becomes the project's detail page
at `/projects/<filename>/`.

---

### `_bibliography/` — Publications (BibTeX)

| File         | Purpose                                                                              |
| ------------ | ------------------------------------------------------------------------------------ |
| `papers.bib` | **Active.** Ken's real publications. Rendered on `/publications/` by jekyll-scholar. |

**Custom BibTeX fields recognised by al-folio:**

| Field                | Effect                                        |
| -------------------- | --------------------------------------------- |
| `bibtex_show={true}` | Shows a "BibTeX" toggle button on the entry   |
| `preview={path}`     | Thumbnail image (relative to `assets/img/`)   |
| `arxiv={id}`         | Adds arXiv badge/link                         |
| `pdf={filename}`     | Links to `assets/pdf/<filename>`              |
| `slides={filename}`  | Links to `assets/pdf/<filename>`              |
| `code={url}`         | Links to external code repo                   |
| `selected={true}`    | Marks paper for the "selected papers" include |

Author names matching `scholar.last_name` / `scholar.first_name` in `_config.yml` are
automatically **bolded** in the rendered output.

---

### `_data/` — Structured YAML Data (4 files)

| File               | Used By                 | Purpose                                         |
| ------------------ | ----------------------- | ----------------------------------------------- |
| `cv.yml`           | `_layouts/cv.html`      | All CV content: education, work, awards, skills |
| `coauthors.yml`    | jekyll-scholar          | Maps co-author names to their profile URLs      |
| `repositories.yml` | `_includes/repository/` | GitHub users/repos for a repositories page      |
| `venues.yml`       | jekyll-scholar          | Abbreviation expansions for conference names    |

**`cv.yml` entry types** — each section in the CV declares a `type` that maps to an include:

| Type          | Include               | Renders As                             |
| ------------- | --------------------- | -------------------------------------- |
| `map`         | `cv/map.html`         | Key–value pairs (e.g. general info)    |
| `time_table`  | `cv/time_table.html`  | Timeline with year, title, institution |
| `nested_list` | `cv/nested_list.html` | Grouped bullet lists (e.g. skills)     |
| `list`        | `cv/list.html`        | Simple flat list (e.g. interests)      |
| `list_groups` | `cv/list_groups.html` | Grouped list with headings             |

---

### `_layouts/` — Page Templates (12 files)

Layouts wrap page content with full HTML structure. Each page's `layout:` front matter
key selects one of these.

| Layout                           | Used By             | Notes                              |
| -------------------------------- | ------------------- | ---------------------------------- |
| `default.html`                   | All layouts (base)  | `<html>`, `<head>`, nav, footer    |
| `about.html`                     | About page          | Profile photo, bio, social links   |
| `page.html`                      | Generic pages       | Title + content block              |
| `post.html`                      | Blog posts, news    | Date, tags, related posts          |
| `cv.html`                        | CV page             | Loops over `_data/cv.yml` sections |
| `bib.html`                       | Publications        | jekyll-scholar bibliography output |
| `distill.html`                   | Distill-style posts | Rich article layout with footnotes |
| `profiles.html`                  | (reserved)          | Multi-person profile page          |
| `archive-year/tag/category.html` | Blog archives       | Blog index pages                   |
| `none.html`                      | Special cases       | No chrome, raw content only        |

---

### `_includes/` — Reusable Snippets

Partials called with `{% include filename.html %}` inside layouts and pages.

**Key includes:**

| Include                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `head.html`            | `<head>` tag — CSS imports, meta tags                      |
| `header.html`          | Top navigation bar                                         |
| `footer.html`          | Site footer                                                |
| `social.html`          | Row of social media icon links                             |
| `projects.html`        | Project card grid (used by `/projects/`)                   |
| `selected_papers.html` | Papers with `selected={true}` (can be added to about page) |
| `news.html`            | Renders `_news/` entries                                   |
| `cv/`                  | Sub-includes for each CV section type                      |
| `resume/`              | JSON Resume format includes (alternative CV format)        |
| `repository/`          | GitHub stats cards                                         |
| `scripts/`             | JS CDN imports (jQuery, MathJax, Masonry, etc.)            |
| `giscus.html`          | GitHub Discussions comment embed                           |

---

### `_sass/` — Stylesheets

SCSS source files compiled into `assets/css/main.scss`.

| File              | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `_variables.scss` | Color palette, spacing, breakpoint variables |
| `_themes.scss`    | Light / dark mode theme token definitions    |
| `_base.scss`      | Element-level base styles                    |
| `_layout.scss`    | Page structure, navbar, footer, card grid    |
| `_cv.scss`        | CV timeline and card styles                  |
| `_distill.scss`   | Distill article styles                       |
| `font-awesome/`   | Full Font Awesome 6 SCSS source (icons)      |

To change site colours or fonts, edit `_variables.scss`. Do **not** edit vendor files
under `font-awesome/`.

---

### `assets/` — Static Files

```
assets/
├── css/          # Compiled CSS + vendor stylesheets (Bootstrap, MDB, Academicons)
├── fonts/        # Academicons font files
├── img/          # All images used on the site
│   ├── KenYu.jpg                  # Profile photo (referenced in _pages/about.md)
│   ├── darth_abby.gif             # Personal image
│   ├── preview/                   # Project/publication card thumbnails
│   ├── printer/                   # 3D printer project images
│   ├── project_amr/               # AMR project images
│   ├── project_elevator/          # Elevator project images
│   ├── project_ocmid/             # OCMID project images
│   ├── project_pac/               # PAC project images
│   ├── project_panoptic_depthlab/ # Panoptic DepthLab project images
│   ├── project_racecar/           # RaceCAR project images
│   ├── project_safty_metric/      # Safety metric project images
│   └── project_scene_aware_da/    # Scene-aware DA project images
├── js/           # JavaScript files (Bootstrap, MDB, dark mode, zoom, masonry)
├── pdf/          # Downloadable PDFs (CV, thesis, papers, slides)
├── fonts/        # Web fonts (Academicons, Font Awesome)
├── webfonts/     # Font Awesome woff2/ttf files
└── json/
    ├── resume.json    # JSON Resume format (alternative to cv.yml)
    └── table_data.json
```

**Profile photo:** swap `assets/img/KenYu.jpg` to update the photo on the About page.
The filename is hardcoded in `_pages/about.md` under `profile.image`.

**Adding a PDF:** drop the file into `assets/pdf/` and reference it by filename in
BibTeX (`pdf={filename.pdf}`) or in a page (`assets/pdf/filename.pdf`).

**Adding project images:** create a subdirectory under `assets/img/` and reference images
with `assets/img/<subdir>/<file>` in the project's `.md` file.

---

### `_plugins/` — Custom Ruby Plugins (5 files)

| File                  | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `cache-bust.rb`       | Appends MD5 hash to CSS/JS URLs to bust browser cache      |
| `file-exists.rb`      | Liquid tag `{% file_exists path %}` — conditional includes |
| `details.rb`          | Adds `{% details %}` / `{% enddetails %}` Liquid tags      |
| `hideCustomBibtex.rb` | Strips internal-only fields from BibTeX download output    |
| `external-posts.rb`   | Fetches external RSS feeds to display as blog posts        |

---

### Root-Level Files

| File                 | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `_config.yml`        | Jekyll master config (see above)                           |
| `Gemfile`            | Ruby gem dependencies                                      |
| `Dockerfile`         | Docker image for local development                         |
| `docker-compose.yml` | Runs Jekyll in Docker (`docker-compose up`)                |
| `purgecss.config.js` | Removes unused CSS classes in production builds            |
| `news.html`          | Standalone `/news/` archive page                           |
| `blog/index.html`    | Blog index (disabled — no posts exist)                     |
| `404.html`           | Custom not-found page                                      |
| `robots.txt`         | Allows all crawlers                                        |
| `CONTRIBUTING.md`    | Contribution guidelines (from al-folio upstream)           |
| `README.md`          | Full al-folio theme documentation                          |
| `AGENTS.md`          | **This file** — project guide for developers and AI agents |

---

## Common Tasks

### Add a new project

1. Create `_projects/project_<name>.md` with the required front matter (see `_projects/` section above).
2. Add a thumbnail image to `assets/img/preview/<name>.png`.
3. Add any supporting images to `assets/img/project_<name>/`.

### Add a publication

1. Append a new `@article{...}` entry to `_bibliography/papers.bib`.
2. Optionally add a preview image to `assets/img/preview/` and a PDF to `assets/pdf/`.

### Update the CV

Edit `_data/cv.yml`. Sections render automatically — no template changes needed.

### Update profile info / social links

Edit `_config.yml`. Social link fields are near the top under `# Social integration`.

### Enable the blog

1. In `_config.yml`, uncomment and fill in `blog_name`, `blog_nav_title`, `blog_description`, and `permalink`.
2. Set `announcements.enabled: true` and `latest_posts.enabled: true` if desired.
3. Add posts as `.md` files in `_posts/` with filename format `YYYY-MM-DD-title.md`.

### Local development with Docker

```bash
docker-compose up
# Site available at http://localhost:8080
```

### Local development with Homebrew Ruby

Use this workflow when you need to verify the site locally after syncing newer `al-folio`
changes. The merged upstream stack expects a modern Ruby/Bundler toolchain.

1. Install Ruby 3.3 via Homebrew:

```bash
brew install ruby@3.3
```

2. Use the Homebrew Ruby and gem bin paths in your shell:

```bash
export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
```

3. Confirm the toolchain:

```bash
ruby -v
bundle -v
```

Expected: Ruby `3.3.x` and Bundler `4.x` after `bundle install`. 4. Install dependencies:

```bash
bundle install
```

5. Build the site:

```bash
bundle exec jekyll build
```

6. Serve the built site locally:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

7. Open the preview:

```text
http://127.0.0.1:4000/
```

### Verified local workflow

The following workflow was successfully used in this repository on March 17, 2026:

1. Install `ruby@3.3` with Homebrew.
2. Export:

```bash
export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
```

3. Run:

```bash
bundle install
bundle exec jekyll build
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

4. Verify key pages:
   - `/`
   - `/projects/`
   - `/cv/`

### Required workflow for AI agents

1. Read `AGENTS.md` before doing any task.
2. If any code, config, template, content, styling, or asset affecting the site is changed, run Prettier after the change to ensure the repository passes the Prettier check.
3. Preferred formatting commands:

```bash
npx prettier . --write
npx prettier . --check
```

4. If any code, config, template, content, styling, or asset affecting the site is changed, rebuild the project locally.
5. After rebuilding, present the localhost preview URL to the user so they can inspect the result.
6. Preferred local preview command:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

7. Preferred preview URL:

```text
http://127.0.0.1:4000/
```

### Upstream sync notes

If you force-merge a newer `al-folio` upstream into this repo:

1. Prefer doing the merge on a dedicated branch, not `master`.
2. Expect many add/add conflicts if the histories are unrelated.
3. Keep personal content files unless you intentionally want upstream sample content:
   - `_pages/about.md`
   - `_pages/projects.md`
   - `_pages/publications.md`
   - `_pages/cv.md`
   - `_data/cv.yml`
   - `_bibliography/papers.bib`
4. Prune upstream demo/sample content before merging back:
   - sample `_posts/`
   - sample `_books/`
   - sample `_teachings/`
   - sample `_projects/`
   - demo media/assets and readme preview files
5. Re-run local build and localhost preview after pruning.

---

## What NOT to Edit

| Path                                | Reason                                                |
| ----------------------------------- | ----------------------------------------------------- |
| `assets/css/bootstrap.min.css`      | Vendor file — update via CDN version in `_config.yml` |
| `assets/css/mdb.min.css`            | Vendor file                                           |
| `assets/js/bootstrap.bundle.min.js` | Vendor file                                           |
| `assets/js/mdb.min.js`              | Vendor file                                           |
| `_sass/font-awesome/`               | Vendor SCSS — do not modify                           |
| `Gemfile.lock`                      | Auto-generated — do not hand-edit                     |

---

## Deployment

The site is deployed automatically via **GitHub Actions** on every push to `master`.
Workflow file: `.github/workflows/deploy.yml`.

Built output is pushed to the `gh-pages` branch, which GitHub Pages serves at
`https://KenYu910645.github.io`.
