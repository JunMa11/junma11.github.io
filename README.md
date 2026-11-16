# Jun Ma research website

A four-tab site (Home, Research, Resources, Publications) in the UHN design system. It is plain HTML, CSS and JavaScript: there is nothing to install or build. Open `index.html` to preview it, and upload this folder to any web host to publish it.

## Where things live

| To change | Edit |
|---|---|
| Name, tabs, footer links | `content/site.js` |
| Photo, contact links, bio, news | `content/home.js` |
| Research areas | `content/research.js` |
| Datasets, models, code | `content/resources.js` |
| Journal covers, paper list | `content/publications.js` |

Images go in `images/` and videos in `videos/`. You should not need to touch `index.html` or the `assets/` folder.

Each content file starts with a short note on its fields. Text between backticks (`` ` ``) is Markdown: leave a blank line between paragraphs, write links as `[text](https://address)` and bold as `**text**`.

## Change the links under the photo

In `content/home.js`, each link has a `label`, an `icon` and a `url`. The built-in icons are `email`, `scholar`, `code`, `chat`, `briefcase` and `link`. To use your own icon, save the image in `images/icons/` and give its path as the `icon`. Add `text` to show something other than the label. An entry with `text` and an empty `url` is shown as plain text: the email is written this way ("jun dot ma2 at uhn dot ca") so the address is not left in the page for spam robots.

## Add a news item

In `content/home.js`, add a line at the top of `news`, newest first:

```
11/2026: Our paper was accepted at [a conference](https://example.org)
```

The part before the first colon is shown as the date. Delete every line to hide the News section.

## Add a paper

Open `content/publications.js` and paste the citation into `list` as a new paragraph, newest first, with a blank line before and after:

```
Ma J, Yang Z, Kim S, Chen B, Baharoon M, Fallahpour A, Asakereh R, Lyu H, Wang B. MedSAM2: segment anything in 3D medical images and videos. arXiv [Preprint]. 2025 Apr 4. https://doi.org/10.48550/arXiv.2504.03600
```

The site sets the title in bold, links it to the address at the end, and puts "Ma J" in bold. Optional extras:

- Equal contribution: put `*` after the names, as in `Fallahpour A*, Ma J*`.
- More links: add them at the end, as in `[Code](https://github.com/bowang-lab/MedRAX)`.
- Year headings: add a line such as `## 2026` between paragraphs.

To feature a paper in the top row, save its journal cover in `images/covers/` and add a line to `highlights`.

## Add a research area

1. Save the figure in `images/research/`.
2. In `content/research.js`, copy one `{ ... }` block inside `areas`, paste it where it should appear, and change the `title`, `image`, `imageAlt` and `text`.

To attach a demo video, save it in `videos/` and add `video: "videos/your-file.mp4"` to the block. It appears as a "Watch the demo" button.

## Add a dataset, model or demo video

In `content/resources.js`, copy one `{ ... }` item, paste it into the right section, and change the `name`, `url` and `description`.

To show a demo video beside an item, save the file in `videos/` and add:

```js
video: "videos/your-demo.mp4",
poster: "videos/your-demo.jpg",        // optional still image shown before the video plays
videoCaption: "One line about what the video shows.",   // optional
```

## Add a new tab

1. In `content/site.js`, add a line to `tabs`, for example `{ id: "team", label: "Team" },`
2. Create `content/team.js`:

   ```js
   SITE.team = {
     title: "Team",
     body: `
   ## Current members

   - **Jun Ma**, Principal Investigator

   ## Join us

   We are recruiting graduate students. Email jun dot ma2 at uhn dot ca.
   `,
   };
   ```

3. In `index.html`, add `<script src="content/team.js"></script>` below the other content files.

## If a tab shows "This page could not be loaded"

The content file for that tab has a typo. The message names the file and usually the line. The usual causes are a missing comma between `{ ... }` blocks, a missing quotation mark, or a missing closing backtick.

## Publish

The site is published from the GitHub repository `JunMa11/junma11.github.io` at https://junma11.github.io. After changing anything, run these in Terminal from this folder:

```
git add -A
git commit -m "Describe the change"
git push
```

GitHub updates the live site a minute or two after each push.
