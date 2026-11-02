---
title: Two-mode e-bike gearbox
summary: A compact spur-gear transmission that gives an e-bike a climbing gear and an acceleration gear, sized with a MATLAB script that iterated gear pairs against AGMA bending limits.
cover: /assets/images/projects/ebike-cad.jpg
cover_alt: SolidWorks render of the gearbox with a cut-away housing showing the spur gears
course: MECH 3409 · Machine elements design
year: 2025
team: Team of 4
role: Team leader
tools: [SolidWorks, MATLAB, Excel]
themes: [drivetrains]
note: "let MATLAB do the iterating"
tier: featured
order: 3
gallery:
  - { src: /assets/images/projects/ebike-sketch.jpg, caption: "Early hand sketch of the shaft and gear layout." }
  - { src: /assets/images/projects/ebike-tooth-fea.jpg, caption: "Meshed gear tooth for stress checking." }
  - { src: /assets/images/projects/ebike-goodman.jpg, caption: "Goodman diagram for the acceleration gear." }
  - { src: /assets/images/projects/ebike-cad2.jpg, caption: "Final assembly." }
---

## The problem

Most e-bike motors deliver fixed torque at a given speed with no transmission behind them, so hill climbs and hard starts are where they struggle. We designed a small gearbox between motor and rear wheel to add torque when it's needed, without a bigger motor or a bigger battery, and without changing the rest of the bike.

## What it had to do

- Take a motor giving **8 N·m at 650 rpm** and a **70 kg** rider up to **35 km/h** on a 0.7 m wheel.
- Last **8 years** at **6 km a day**.
- Fit inside a housing no wider than **131 mm** and no longer than **151 mm**, in line with the bike's central axis.
- Stay sealed against dust, mud and spray, and never need the rider to lubricate it.
- Stay light and cheap enough to mass-produce.

## Concepts

Each of us brought a concept: a hand sketch of a multi-shaft spur layout, a full SolidWorks model, and a simplified 2D reference drawing. We picked the SolidWorks model because it was the only one that already settled gear meshing, shaft clearances, bolt locations and housing size, so it was ready to analyse.

## Getting the ratios right

We wanted two modes: one for climbing and one for accelerating. Our first layout used 17:25 and 20:22 pairs. On paper it looked fine, but the two pairs didn't produce the same output speed, so the shaft running parallel to the input would fight itself and bind. Those ratios also gave far more speed than the bike needed. We reworked both modes around a common target of about 2.5:1:

| Mode | Gear pair | Ratio | Result |
| --- | --- | --- | --- |
| Climbing | 14T → 35T | 2.5 : 1 | 260 rpm out, about 34 km/h |
| Acceleration | 13T → 32T | 2.46 : 1 | about 19.7 N·m at the wheel |

All gears use a 2 mm module and 15 mm face width on 15 mm shafts.

## Letting MATLAB do the iterating

Rather than hand-iterating gear pairs, we wrote a MATLAB script that loops through tooth counts and reports, for each pair: the individual and overall ratios, output speed and wheel speed, torque at the wheel, tangential force at each mesh, Lewis bending stress (AGMA method) and safety factor. Material strength (200–380 MPa variants) and tooth-count ranges are inputs, so we could narrow the search and re-run in seconds.

It made the trade-offs obvious: bigger modules are stronger but won't fit in the frame, narrower faces save weight but lose strength, and steel was consistently the safe choice.

## Checking it

With AISI 1095 steel:

| Gear | Teeth | Bending stress | Safety factor |
| --- | --- | --- | --- |
| Acceleration pinion | 13 | 73.3 MPa | 6.8 |
| Climbing pinion | 14 | 33.4 MPa | 15.0 |
| Acceleration gear | 32 | 57.0 MPa | 8.8 |
| Climbing gear | 35 | 25.7 MPa | 19.4 |

- Shaft torsional stress was just 12.1 MPa.
- A Goodman check put alternating stress at 36.6 MPa against a 237 MPa endurance limit — a fatigue factor of 5.25 over the 8-year life.

## What I'd change

The design is deliberately conservative: a safety factor of 6.8 on the most-loaded tooth is a lot of extra steel. The next pass would use the same script to trim face widths and take weight out while keeping a sensible margin.
