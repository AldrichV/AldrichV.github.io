---
title: Elastic-powered car
summary: A 3D-printed car launched by a lever-stretched elastic, iterated through broken levers, slipping wheels and a switch to tank-style treads.
cover: /assets/images/projects/elastic-cad.jpg
cover_alt: SolidWorks render of the elastic car with lever, hook and treaded wheels
course: Engineering design and graphics
year: 2023
team: Team project
tools: [SolidWorks, FlashPrint, 3D printing]
themes: [drivetrains]
note: "the lever snapped on run 3"
tier: more
order: 20
model3d:
  label: Interactive 3D model of the elastic-powered car, assembled from its 3D-print files
  caption: assembled from the print files
  up: y
  explode: 0.32
  parts:
    - { name: chassis, src: /assets/models/elastic-car/chassis.stl, color: "#c8c3b8", explode: [0, 0, 0] }
    - { name: front grill, src: /assets/models/elastic-car/grill.stl, color: "#b9b3a6", explode: [0, 0, -1] }
    - { name: wheels, also: 3, src: /assets/models/elastic-car/wheels-left.stl, color: "#3a3f44", explode: [-1, 0, 0] }
    - { name: wheels (far side), toggle: false, src: /assets/models/elastic-car/wheels-right.stl, color: "#3a3f44", explode: [1, 0, 0] }
    - { name: axles, src: /assets/models/elastic-car/axles.stl, color: "#8d969c", metal: 0.6, rough: 0.35, explode: [0, -0.6, 0] }
    - { name: lever + hook, src: /assets/models/elastic-car/lever.stl, color: "#7c858c", explode: [0, 1, 0.5] }
gallery:
  - { src: /assets/images/projects/elastic-sketch.jpg, caption: "Launch mechanism concept: lever pulls the elastic back to a front hook." }
  - { src: /assets/images/projects/elastic-print.jpg, caption: "Printed prototype." }
  - { src: /assets/images/projects/elastic-wheel.jpg, caption: "Wheel with moulded treads for grip." }
  - { src: /assets/images/projects/elastic-tread.jpg, caption: "Second iteration: tank-style tread to stop the wheels seizing." }
  - { src: /assets/images/projects/elastic-slicer.jpg, caption: "Slicing parts for printing." }
---

A first-year build: a car with no motor, launched by an elastic band that a lever stretches back to a hook at the front.

**Early decisions.** Wrapping the elastic around the front axle would likely tangle and stall the car, so it was moved to a hook on a small front body instead. The lever looked fine in CAD but was thin enough to snap, so it was widened and given reinforcing ribs, which meant opening up space at the back for it to swing.

**Wheels.** Moulded treads, made with a cut and a circular pattern around the rim, gave grip without relying on spare elastic bands.

**What testing showed.** The car moved, but inefficiently, and on the third run the lever broke because energy was going straight into it rather than the wheels. The wheels also seized from lack of grip. The second iteration moved to tank-style treads, and the next step proposed was a raised lever with gearing to spread the load.

The model below is put together from the STL print files in the project folder.
