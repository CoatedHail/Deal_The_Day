Photos for the "Meet the team" page.

Drop a square image here, then point at it from `src/content/team.ts`:

    { id: "merisa", name: "Merisa", photo: "/team/merisa.jpg" }

The path is relative to `public/`, so a file at `public/team/merisa.jpg` is
served at `/team/merisa.jpg`. Square images look best — anything else is
cropped to a circle from the centre. Without a `photo`, the card falls back to
the person's initials, so an entry never has to wait on a picture.
