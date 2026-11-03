---
title: Septic system sizing
summary: Sizing a septic tank and leaching bed for a two-bedroom dwelling from Ontario Building Code Part 8, from the daily design flow through tank compartments, chamber length, trench layout and a sensitivity check on soil percolation time.
cover: /assets/images/projects/septic-layout.jpg
cover_alt: Layout diagram of a two-compartment 3,600 litre septic tank feeding a level distribution box and six 12.7 metre chamber trenches
kind: work
course: Client project · Residential septic design
year: 2026
team: Client work
role: Leader
tools: [OBC 2024 Part 8, Excel, CAD model review]
themes: [building, sustainability]
note: "T = 20 is right on the edge"
resume: "Sized a residential septic tank and leaching bed to OBC Part 8 (3,600 L two-compartment tank, 76.2 m of Type II chamber in six trenches) and flagged the design's sensitivity to the soil percolation time."
tier: featured
order: 10
gallery:
  - { src: /assets/images/projects/septic-trench-section.jpg, caption: "Concept cross-section of a Type II chamber trench. Final elevations need the site evaluation." }
---

## What it was

A concept sizing for the septic system serving a two-bedroom dwelling on a rural property. Every number comes from Ontario Building Code Part 8 (the 2024 compendium) plus the soil test results, and each step feeds the next: flow, tank, chamber length, trench layout, then a check of how sensitive it all is to the soil. The property, owner and site details are left out here.

## 1. Daily design flow

The code sets a minimum daily design sewage flow by dwelling size (Table 8.2.1.3.-A): 750 L/day for one bedroom, 1,100 for two, 1,600 for three, 2,000 for four, 2,500 for five, and another 500 for each bedroom after that. I used the two-bedroom row directly, with no per-person reduction, so the system stays sized to the dwelling class:

**Q = 1,100 L/day**

## 2. Tank volume and compartments

Article 8.2.2.3 requires a working capacity equal to the greater of 3,600 L or 2Q:

- 2Q = 2 × 1,100 = 2,200 L, so the 3,600 L minimum governs.
- That is 3,600 / 1,100 ≈ 3.27 days of design flow. It's a useful comparison, not a pumping interval.

The tank also needs at least two compartments:

| Check | Calculation | Minimum | Sized |
|---|---|---|---|
| First compartment | 1.3Q = 1.3 × 1,100 = 1,430 L | 2,400 L | 2,400 L |
| Second compartment | 50% of the first | 1,200 L | 1,200 L |
| Total | greater of 3,600 L or 2Q | 3,600 L | 3,600 L |

## 3. Leaching chamber length

For Type II chambers taking septic-tank effluent, Article 8.7.3.2 gives the required length as L = QT / 300, with a 40 m minimum. The tested percolation time was T = 20 min/cm:

- **Required:** L = (1,100 × 20) / 300 = **73.33 m**
- **Provided:** 6 × 12.7 m = **76.2 m**

## 4. Six-trench layout

A level distribution box splits the flow evenly into six equal 12.7 m runs. Equal runs are simpler to level and balance:

| Per trench | Calculation | Result |
|---|---|---|
| Minimum length | 73.33 / 6 | 12.22 m |
| Flow share | 1,100 / 6 | 183.33 L/day |
| Capacity of a 12.7 m run | 12.7 × 300 / 20 | 190.5 L/day |
| Reserve | 190.5 − 183.33 | 7.17 L/day |

The trench geometry stays inside the Part 8 ranges:

| Item | Code range | Used |
|---|---|---|
| Trench width | 500–1,000 mm | 600 mm |
| Trench depth | 600–900 mm | 750 mm, preliminary |
| Chamber size | 555–575 mm wide, 300–320 mm high | approved Type II module |
| Run length | no more than 30 m | 12.7 m |
| Centre spacing | 2.4 m, or 1.6 m in fill | 2.4 m |

Final depth depends on finished grade and on keeping at least 900 mm of separation between the trench bottom and groundwater, rock or unsuitable soil.

## 5. Soil loading and the T-time sensitivity

If the trenches are built in leaching-bed fill, Table 8.7.4.1 allows a loading rate of 10 L/m²/day at T = 20, so the minimum fill area is A = 1,100 / 10 = **110 m²**.

The catch is that T = 20 sits right at the upper edge of that loading band. So I ran the numbers across a range of percolation times:

| T (min/cm) | Chamber length | Loading rate | Minimum fill area |
|---|---|---|---|
| 15 | 55.0 m | 10 L/m²/day | 110.0 m² |
| 20 | 73.33 m | 10 | 110.0 m² |
| 21 | 77.0 m | 8 | 137.5 m² |
| 25 | 91.67 m | 8 | 137.5 m² |
| 30 | 110.0 m | 8 | 137.5 m² |
| 36 | 132.0 m | 6 | 183.33 m² |

If the accepted T comes back even slightly above 20, the minimum fill area {% include pen.html v='jumps 25%' n='137.5 m² ÷ 110 m² = 1.25' %} and the 76.2 m of chamber {% include pen.html v='no longer covers' n='at T = 21: 1,100 × 21 ÷ 300 = 77.0 m, more than the 76.2 m provided' %} the required length. That warning went in the report in bold.

## 6. Clearances

The site plan has to dimension the tank and the chamber centre lines from everything around them:

| From | Tank | Chamber centre line |
|---|---|---|
| Structure | 1.5 m | 5 m |
| Drilled well, watertight casing ≥ 6 m deep | 15 m | 15 m |
| Any other well | 15 m | 30 m |
| Lake, pond, river or stream | 15 m | 15 m |
| Property line | 3 m | 3 m |

## What stood out

The arithmetic was short. The judgement was in what it depends on. Two numbers drive the whole design: the bedroom count and one soil test result, and that result happened to sit exactly on a code boundary. A sensitivity table turned "it passes" into "it passes if T holds", which is the more honest thing to hand a client before anything gets dug.
