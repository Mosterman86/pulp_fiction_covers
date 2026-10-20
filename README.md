# Judging by the Cover

A proof of concept for Wolfsonian Digital Labs. It is a sister app to *The Objects That Connect Us*, with the same design system, header and folder layout.

Visitors read four pulp paperback covers through six lenses: **the gaze, gender, race, violence, sexuality and selling it** (design and marketing conventions). Each cover has:

- **Look closely:** hotspots on the cover. Selecting one puts a spotlight on that detail. Choosing a lens (the row of buttons under the tabs) shows that lens's analysis of the whole cover, with only its supporting details lit.
- **The book:** title, author, publisher, series, date, price and cover artist, plus a synopsis.
- **Context:** how the book was published and sold.
- **Respond:** questions for the visitor. Answers collect under My responses, and Start over clears them.

The landing page opens with *Five questions to ask any cover*, a media literacy toolkit that works for any image.

## Placeholder content

This is a proof of concept. In `data/covers.js`:

- Values in **[square brackets]** are placeholders. They appear in the app as grey italic text marked "to confirm".
- **Lorem ipsum** marks synopses still to write (Murderer's Holiday, Marooned, Bogus Lover).
- Facts stated without brackets were written to be accurate, but no curator has reviewed them yet.

## Folder structure

```
judging-by-the-cover/
├── index.html          page shell: header, About / How It Works, drawer, idle prompt
├── css/cover.css       shared Digital Labs styles plus cover-specific additions at the end
├── js/app.js           rendering, hotspots, lenses, spotlight, tabs, responses
├── data/covers.js      ALL CONTENT: lenses, toolkit, covers, hotspots, analysis, questions
└── images/covers/      one WebP per cover, named by its id (e.g. marooned.webp)
```

## Adding or replacing a cover

1. Add the image to `images/covers/`, about 1500px tall.
2. Copy a cover block in `data/covers.js` and change its fields. `size` is the image's pixel width and height.
3. Place hotspots: open the cover, press **Shift+P**, click the image and copy the line that appears. Set `lens` to one of `gaze`, `gender`, `race`, `violence`, `sexuality`, `selling`. `r` is the spotlight size, as a percentage of the cover's width.

## Kiosk settings

At the top of `js/app.js`: `idleSeconds` (default 180) and `warnSeconds` (default 20). Responses are held in memory only.
