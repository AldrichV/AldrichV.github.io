---
# ─────────────────────────────────────────────────────────────
# EXAMPLE ENTRY — hidden from the site because of the line below.
# Copy this file to start a new entry, rename it with today's date,
# change `published` to true (or delete that line), and write.
# ─────────────────────────────────────────────────────────────
published: false

title: How a journal entry works
date: 2026-11-02

# Everything below is optional. Delete any line you don't want.
mood: "curious"                     # a word or two, shows in the margin
listening: "song or album"          # "on repeat: …"
where: "Toronto"                    # place stamp
tape: yellow                        # tape colour on the wall: yellow, pink, mint or blue
photos:                             # taped-in polaroids at the top of the page
  - src: /assets/images/journal/example-photo.jpg
    caption: "a caption in my handwriting"
---

Write the entry here like a diary page. Normal Markdown works: blank lines between paragraphs, **bold**, *italics*, and lists.

- a list
- of small things

> A quote or something someone said gets a red-pen bar beside it.

Photos can go in the middle of an entry too, and they'll show up as polaroids:

![a caption under the photo]({{ '/assets/images/journal/example-photo.jpg' | relative_url }})

Short entries with no photos show up on the journal wall as notecards; entries with photos show up as polaroids.
