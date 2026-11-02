---
title: Hospital delivery go-kart
summary: An Arduino go-kart for carrying food and medication around a ward, driven by joystick, IR remote, phone app or on its own with obstacle avoidance.
cover: /assets/images/projects/rckart-cad.jpg
cover_alt: SolidWorks render of the go-kart chassis with suspension and steering linkage
course: Engineering design
year: 2025
team: Team of 6
role: Embodiment design, definitive layout and gearbox design calculations
tools: [SolidWorks, SolidWorks Simulation, Arduino, Blynk, 3D printing]
themes: [drivetrains, mechatronics]
note: "lesson learned: PLA gears soften under load"
tier: featured
order: 2
model: kart-model.html
videos:
  - { src: /assets/video/rckart-floor-demo.mp4, poster: /assets/video/rckart-floor-demo.jpg, caption: "Prototype floor demo." }
  - { src: /assets/video/rckart-phone-demo.mp4, poster: /assets/video/rckart-phone-demo.jpg, caption: "Bench demo: driving the motors from the phone app." }
gallery:
  - { src: /assets/images/projects/rckart-gearbox-section.jpg, caption: "Section through the two-speed gearbox as designed." }
  - { src: /assets/images/projects/rckart-chassis-print.jpg, caption: "Printed chassis plate and steering parts." }
  - { src: /assets/images/projects/rckart-gears.jpg, caption: "PLA spur gears off the printer." }
  - { src: /assets/images/projects/rckart-wiring.jpg, caption: "Arduino, motor driver and sensor wiring on the deck." }
  - { src: /assets/images/projects/rckart-fea.jpg, caption: "FEA of the top plate under the electronics load." }
  - { src: /assets/images/projects/rckart-dims.jpg, caption: "Dimensioned concept layout." }
  - { src: /assets/images/projects/rckart-torque.jpg, caption: "Predicted output torque against motor speed." }
---

## The problem

Hospitals are understaffed, and nurses lose time to small errands between rooms. The brief was a compact, modular vehicle that could take some of those runs: delivering food and medication around a controlled indoor space without spilling and without overheating.

## Concepts we considered

Each of us sketched a concept and we scored all four on weighted criteria, with safety and function (no spills, no overheating, carries food, reliable) weighted highest:

| Concept | Idea | Score |
| --- | --- | --- |
| 1 | Belt drive, PLA frame, joystick control, a secured bed | 15.8 |
| 2 | Chain drive, carbon frame, separate trailer | 11.0 |
| 3 | Planetary gearbox, aluminium chassis, trailer | 14.4 |
| 4 | 90° bevel gearbox, steel frame, lockable safe and solar panel | 21.8 |

We merged the two best: concept 4's enclosed, compact 90° gearbox and concept 1's lightweight printed bed.

## The design

A 12 V XD3420 DC motor drives the rear axle through a bevel pair that turns the drive 90°, then a spur pair. A servo on a simple ball-joint linkage steers the front wheels, and the front has suspension springs. An Arduino Uno runs four control modes:

- **Joystick:** direct analog driving. The stick reads 0–1023 and should rest at 512, but drifts, so we measured the drift and coded a dead zone around centre.
- **IR remote:** decodes each button's code into drive and steering commands.
- **Phone app:** sends commands over Wi-Fi through Blynk.
- **Autonomous:** an ultrasonic sensor watches ahead; anything within 20 cm stops the kart and it turns away.

Steering is set to three angles: 53° straight ahead, 90° left and 135° right.

## My part: layout and gearbox

I owned the embodiment design and definitive layout, and the gearbox calculations. Starting from the motor's speed at peak efficiency, the target wheel speeds gave two ratios — about 2.1:1 for high speed and about 8.6:1 for low speed — and I laid the gearbox out to shift between them. The calculations went through gear efficiencies for each bevel and spur pair, pitch-line velocities, and the tangential, radial and axial forces on each gear.

The team sized the chassis plates by hand for steel, aluminium and PLA. PLA at 75% infill came out lightest by a wide margin, and FEA confirmed the top plate could carry the electronics.

## Testing

| Function | Result |
| --- | --- |
| Joystick, IR and app control | All worked; the dead zone stopped drifting at rest |
| Obstacle avoidance | Stopped and turned away from objects inside 20 cm |
| Steering | Hit 53°, 90° and 135° reliably, with minimal backlash |
| Two-speed gearbox | Not included in the final build |

At the bottom of this page there's a 3D model of the kart built from the dimensioned layout: you can steer it to the three tested servo angles, run the drive, and look through the gearbox housing at the bevel and spur pairs as designed.

## What went wrong

The shifting never made it in. Three problems stacked up:

- **Bevel geometry.** Bevel gears only mesh properly at the exact cone angle, and we had very little experience with them. Small angle errors meant partial meshing, slipping and lost power.
- **Tolerances.** We bumped the gear module from 1.0 to 1.25 to make alignment more forgiving, but printed parts still weren't precise enough to shift reliably.
- **Heat.** Under sustained load the PLA gears softened, ground down and degraded.

We shipped a single-speed version that drove, steered and avoided obstacles. It was a useful gap to run into: the gearbox was fine in CAD and in the calculations, and the problems only appeared once real parts were meshing. Next time I'd use metal or bought-in bevel gears, check contact ratio and heat build-up properly, and test a bare gear pair long before the full assembly.
