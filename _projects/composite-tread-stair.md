---
title: Steel stair with composite decking treads
summary: Redesigning an exterior steel stair with Trex composite decking treads so its geometry meets the Ontario Building Code, then turning it into a 3D model and two shop drawings for fabrication.
cover: /assets/images/projects/stair-profile.jpg
cover_alt: Stair profile drawing showing eleven tread frames climbing from the walk to the existing deck, with twelve equal risers
course: Client project · Exterior stair alteration
year: 2026
team: Client work
role: Leader
tools: [SolidWorks, interactive 3D model (three.js), shop drawings, OBC 2024 Part 3]
themes: [building]
note: "the code moved the stair"
tier: featured
order: 9
model: stair-model.html
gallery:
  - { src: /assets/images/projects/stair-section.jpg, caption: "Section through one tread: two Trex boards screwed up through a welded angle frame, with a closed riser plate." }
  - { src: /assets/images/projects/stair-frame-plan.jpg, caption: "Plan of tread frame TF-1 with bearer spacing and the 18 screw holes." }
  - { src: /assets/images/projects/stair-frame-iso.jpg, caption: "Isometric of the welded frame, boards hidden." }
  - { src: /assets/images/projects/stair-obc-table.jpg, caption: "The code check table on the second sheet: every geometry item against its OBC limit." }
---

## What it was

An exterior steel stair running from a new concrete walk up to an existing deck. The stair has steel channel stringers, welded steel frames for each tread, Trex Select composite decking boards on top, glass guards and handrails on both sides. My job was the tread system: how the composite boards sit on the steel, the stair geometry, the 3D model for coordination, and the shop drawings the fabricator works from. Client and site details are left out here.

## 1. Getting the boards onto steel

Composite decking isn't meant to span like wood, so each tread got its own welded frame. I went through a few versions in the model:

- **Tray frame:** angle lips on all four sides with the boards dropped in flush, and a 1-3/4" steel nosing.
- **Boards on top:** angles with the top leg as the board seat and the boards screwed up from below, so no screws show on the walking surface.
- **Closed risers:** the version that went to drawings, with a 3/16" riser plate on every frame.
- **Riser boards:** a 9/16" Trex fascia board on each riser line, sitting 1/8" above the tread below and screwed to the riser plate from behind. The plate is set back 9/16" to make room, so the tread still overhangs the riser face by 1/4".

To compare versions I built an interactive 3D model of the stair. It has sliders for the clear width between stringers and the maximum bearer spacing. As the width changes, it re-spaces the bearers, checks rise, run and support spacing, and updates the cut list. A "lift boards" control raises the treads so you can see the frame underneath. A second model put the existing porch and the proposed work over a laser scan of the site, so the longer stair could be checked against where it would actually land. The stair model is at the bottom of this page, so you can spin it yourself.

Each frame is L2x2x1/4 angles on all four sides, with three L1-1/2x1-1/2x3/16 bearers between them. That gives five supports per tread at 10-1/2" on centre, inside the 12" maximum spacing I set for the boards. The 44" clear width between stringers wasn't dimensioned on the drawings, so I assumed it (giving a 43-3/4" frame) and flagged it to be verified on site. Each tread is two Trex Select 2x6 boards (1.3" × 5-1/2") with a 3/8" gap, so 2 × 5-1/2" + 3/8" = 11-3/8" of tread. The boards are fastened from below with #12 stainless self-drilling screws, 18 holes per frame.

## 2. The code check that changed the stair

The issued drawings had 11 risers at 7-1/2" and 10 treads at a 10" run. Checked against OBC 2024 Part 3:

| Item | Issued | Code limit | Result |
|---|---|---|---|
| Rise | 7-1/2" = 190.5 mm | 125–180 mm | too tall |
| Run | 10" = 254 mm | 280–355 mm | too short |

The total height is fixed by the deck, so I re-divided it. The new design has **12 risers at 6-7/8" (174.6 mm)**, which adds up to 6'-10 1/2" of rise. It has **11 treads at 11-1/8" (282.6 mm)**, for a total run of 10'-2 3/8". That puts both values inside the limits. The cost is that the stair grows by about 1'-10 3/8" along the walk, so the stringers, the pier and the walk all had to be flagged for the engineer of record to redesign.

The rest of the checks went into a table on the drawing:

- **Risers:** open risers aren't allowed here, so the design uses closed risers, a 3/16" plate with a nominal 1/4" drain gap.
- **Nosing:** a 3/8" round-over on the front board, within the 6–13 mm range.
- **Guard:** 42-1/2" (1080 mm) against a minimum of 1070 mm. The structural drawing showed 42", so it was flagged to be revised.
- **Handrails:** both sides at 36", inside the 865–1070 mm range. They sit 2-1/4" clear of the posts (minimum 50 mm) and extend 12" past each end (minimum 300 mm).
- **Uniformity:** all 11 frames are identical. That meets the 5 mm tolerance between adjacent steps and 10 mm over the flight, as long as it's checked on install.

## 3. Shop drawings

Two sheets. The first has the frame plan, two sections and an isometric. The second has the stair profile with every frame located, a frame schedule with top-of-board and top-of-frame elevations for all 11 treads, a cut list, the code table and the general notes. Those notes cover steel grade and welding standards, hot-dip galvanizing then powder coat, the field-weld detail to the stringers, tolerances, and a reminder to confirm Trex's own span and overhang limits before install.

The cut list totals for 11 frames:

- 92.9 ft of L2x2x1/4
- 19.1 ft of L1-1/2x1-1/2x3/16
- 17.8 sq ft of 3/16" plate
- 198 holes
- 22 boards, cut from six 16' lengths

## What stood out

The drawings were "issued for review", which is the point: the stringers are only re-drawn to the new slope for coordination, and nothing gets fabricated until the engineer of record accepts it. The most useful thing I did was catch the rise and run before any steel was cut. Fixing it on paper meant one more riser; fixing it on site would have meant a new stair.
