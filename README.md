# Sit Sat Sunk

Host stand app for the Harbor Hotel — a floor plan you arrange once and a running
waitlist. Plain HTML, CSS and JavaScript, no build step and no external libraries.
Everything is stored in the browser's `localStorage`, so the room stays arranged
between shifts and there is nothing to log into.

Open `index.html` in a browser, or serve the folder with any static file server.

## Floor Plan

- **Two layouts** — toggle between **Dining Room** and **Bar**. Each starts with
  tables roughly where they sit in the real room, plus scenery (harbor windows,
  kitchen pass, bar rail) to orient yourself.
- **Drag to arrange** — drag any table where it belongs. Positions save
  automatically and are clamped inside the room. **Reset Positions** puts the
  current layout back to its starting arrangement.
- **Status by color** — grey `clean`, blue `seated`, red `dirty`.
- **Tap a table** to open its panel: guest count, free-text notes, and the seat
  timer. **Tap it again** to cycle clean → seated → dirty → clean. The panel's
  three status buttons do the same thing if you'd rather pick directly.
- **Timer** starts the moment a table flips to *seated* and stops when it flips
  back to *clean*, which also banks the turn as "Last turn: 42 min". Flipping to
  *dirty* leaves the clock running — the table isn't turned until it's bussed and
  reset, and that wait is worth seeing.
- Clearing a table drops its guest count but keeps its notes, since notes tend to
  describe the table ("wobbly leg") rather than the party.

## Waitlist

- Add a party with name, phone, party size and notes. The time is stamped
  automatically; only the name is required.
- Each entry shows a **live wait timer**, which turns amber past 20 minutes and
  red past 35.
- **Seat** opens a table picker covering both layouts, listing clean tables with
  the ones big enough for the party first (tightest fit at the top) and too-small
  ones dimmed but still pickable. Choosing a table seats the party there: status
  flips to seated, the timer starts, the guest count is set from the party size,
  and the floor plan opens on that table — switching layouts first if the table
  is in the other room. **Seat without a table** just clears the party off the
  list. **Delete** removes an entry outright.
- Parties waiting, guests waiting and the longest current wait are totalled at
  the top.
- A party seated this way is shown by name in the table's panel, separate from
  the table's own notes, and is cleared when the table goes back to clean.

## Clear All

The **Clear All** button in the header is the end-of-shift reset. It empties the
waitlist and hands every table on both layouts back clean, clearing guest counts
and running timers along with any seated party's details. Table positions and
table notes are left alone, so the room
doesn't have to be rebuilt tomorrow.

## Files

| File | What's in it |
| --- | --- |
| `index.html` | Page structure: header, tabs, floor plan, waitlist, modal |
| `css/styles.css` | All styling, including light/dark tokens and table shapes |
| `js/theme.js` | Dark mode, loaded in `<head>` so there's no flash of the wrong theme |
| `js/storage.js` | State shape, seeded layouts, `localStorage` load/save |
| `js/app.js` | Rendering, dragging, status cycling, timers, event wiring |
