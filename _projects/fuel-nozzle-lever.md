---
title: Generative design of a fuel nozzle lever
summary: Reverse-engineering a fuel nozzle lever and letting generative design strip out material while keeping the pivot and linkage intact.
cover: /assets/images/projects/nozzle-gen1.jpg
cover_alt: Fusion generative design outcome for the lever, coloured by safety factor
course: MECH 3401 · Mechanical design
year: 2026
team: Individual
tools: [Autodesk Fusion generative design]
themes: [drivetrains]
note: "let the solver remove material"
tier: more
order: 23
gallery:
  - { src: /assets/images/projects/nozzle-gen0.jpg, caption: "A second converged outcome, with extra material near the pivot." }
---

The lever on a fuel nozzle turns a squeeze into rotation about a pivot, pushing the valve linkage open. It's loaded mostly in bending, over and over.

I modelled the lever, locked the pivot hole and linkage slot as preserved regions, applied the grip load, and ran Fusion's generative design across aluminium 7075, stainless steel 316 and titanium, with both additive and machined manufacturing constraints.

The organic outcomes removed the most material. One put extra material around the pivot, showing where the solver found the stress concentrating. Every converged design stayed well above the required safety factor of 2, and the comparison came down to mass saved against how easily each shape could actually be made.
