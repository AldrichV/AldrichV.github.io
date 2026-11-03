# Portfolio site

A Jekyll site that GitHub Pages builds for you — no Node, no build tools.

## Put it online (one time, ~5 minutes)

1. On GitHub, create a new **public** repository named `<your-username>.github.io`.
   That name gives you the root URL; leave `baseurl` empty in `_config.yml`.
2. Upload everything in this folder to the repo (drag-and-drop on the repo page works),
   including the hidden `.gitignore`.
3. Repo → **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then visit `https://<your-username>.github.io`.
   If something's wrong, the build log is under the repo's **Actions** tab.

Using a different repo name (say `portfolio`)? Set `baseurl: "/portfolio"` in `_config.yml`.

## Things to fill in

`_config.yml` — contact links (email, LinkedIn, GitHub, résumé). Empty ones are hidden.
For a résumé, add `assets/resume.pdf` and set `resume: /assets/resume.pdf`.

Read through the project pages too — they were written from your reports, and a few say
"Team project" where the reports didn't record your part. Add a `role:` line wherever you can.

## How the site is laid out

- **About (home page, `index.html`)**: your intro, the Sketch → Model → Analyse → Test strip, the three
  "What I keep coming back to" threads, your toolbox, contact, and four starter projects. Edit the text
  directly in `index.html`.
- **The strip** comes from the `process:` list in whichever project has `featured: true`.
- **Projects (`projects/index.html`)**: every project with `tier: featured` as a large row, `tier: more` as
  smaller cards, then the reports list from `_data/coursework.yml` (add `file: /assets/files/x.pdf` to link a PDF).
- **Project pages** use `_layouts/project.html`; the drawing title block fills itself from front matter.
- **Notebook look**: colours, fonts and the grid paper live at the top of `assets/css/site.css`.
- **Your photo** is `assets/images/aldrich.jpg`. Swap in another JPG with the same name to change it.
- **System sketches**: every project has a hand-drafted sketch in `_includes/sketches/<project-file-name>.svg`.
  It's used on the Projects page, the About page cards, and at the top of each project write-up. A new project
  needs a sketch with the same file name as its `.md` file (copy an existing one to start).
- **Filters** use each project's `themes:`; labels are set under `themes:` in `_config.yml`.

## Add or edit a project

Each project is one file in `_projects/`. The fields:

```markdown
---
title: Project name
summary: One or two sentences, shown on the home page.
cover: /assets/images/projects/my-render.jpg
cover_alt: What the cover image shows
course: MECH 4301 · Course name
year: 2026
team: Team of 3
role: What you personally did          # shown as "My part" in the title block
note: "a short red-pen margin note"
tools: [SolidWorks, MATLAB]
themes: [drivetrains]                  # drivetrains, mechatronics, energy, sustainability
tier: featured                         # or: more
order: 9                               # lower comes first
gallery:                               # optional, shown under "From the project files"
  - { src: /assets/images/projects/photo.jpg, caption: "What it shows." }
---

The write-up, in Markdown. Use ## for section headings.
```

Images go in `assets/images/projects/`. Around 1400–1800 px wide JPGs at ~80% quality keep pages fast.
Renders and plots sit whole on white plates, so they're never cropped.

## Write a journal entry

The Journal (`/journal/`) is the personal side: a scrapbook wall of entries, each opening as a ruled diary page.

**From a computer or phone (github.com or the GitHub app):**

1. Open the `_journal` folder in the repo and open `2026-11-02-example-entry.md`. It's hidden from the site and shows every option.
2. Go back to `_journal` and choose **Add file → Create new file**. Name it with the date and a short title, e.g. `2026-11-14-first-snow.md`.
3. Paste this in and write:

```markdown
---
title: First snow
date: 2026-11-14
mood: "cozy"              # optional
where: "Toronto"          # optional
listening: "an album"     # optional
tape: pink                # yellow, pink, mint or blue
photos:                   # optional polaroids at the top
  - src: /assets/images/journal/first-snow.jpg
    caption: "out the window"
---

Whatever you want to say.
```

4. For photos, open `assets/images/journal`, choose **Add file → Upload files**, and upload your pictures first. Phone photos are big, so resize them to about 1600 px wide if you can.
5. Commit. The entry shows up on the wall a minute or two later, and the newest three also appear under "From the journal" on the About page.

Entries with photos show as polaroids on the wall; entries without show as notecards. To hide an entry without deleting it, add `published: false`.

### Trips and day-by-day entries

Trips live in `_data/trips.yml` (id, title, start and end dates). Add `trip: japan-2026` to an entry and it appears on that trip's day strip at the top of the journal, on its own date. Days without an entry stay as empty dots, so you can fill in earlier days later in any order: just make `_journal/2026-10-05-whatever.md` with `trip: japan-2026`.

For a stop-by-stop day like `_journal/2026-10-12-miyajima.md`, use `timeline:` instead of `photos:`: each stop has a `time`, a `title`, an optional `note` and its `photos` (`src`, `caption`, and optionally `video` for a short looping clip). Give the entry a `cover:` photo for the journal wall. Strip location data from photos before uploading (phones store GPS in them).

## Write a post

Add `_posts/YYYY-MM-DD-short-title.md`:

```markdown
---
title: What I learned printing gears in PLA
summary: Optional one-liner shown under the title.
---

Post body in Markdown.
```

A "Notes" link and section appear automatically once there's at least one post.

## Preview locally (optional)

With Ruby installed: `bundle install`, then `bundle exec jekyll serve`, and open http://localhost:4000.

## Where things are

| Path | What it does |
| --- | --- |
| `index.html` | Home page |
| `_projects/` | One Markdown file per project |
| `_data/coursework.yml` | The reports and research list |
| `_journal/` | Journal entries (one Markdown file each) |
| `assets/images/journal/` | Journal photos |
| `_layouts/`, `_includes/` | Page templates |
| `assets/css/site.css` | All styling; colours and type sizes are at the top |

## Visit counts (optional)

Sign up free at goatcounter.com, pick a code (for example `aldrichv`), and put it in `_config.yml` as `goatcounter: "aldrichv"`. The counter script then loads on every page. GoatCounter doesn't use cookies, so no cookie banner is needed.

## Photos load as WebP

Every JPG/PNG in `assets/images/` has a `name.webp` and `name-700.webp` next to it, and pages serve those automatically through `_includes/img.html`. When you add new photos, make the WebP copies too (any image tool can export WebP), or ask Claude to run the conversion. If a WebP copy is missing, the browser falls back to the original photo.
