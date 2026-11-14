---
title: Floating solar tracking platform
summary: A self-powered buoy that turns its solar panel toward the brightest light on two axes, keeps its electronics dry, and reports sensor data to a live IoT dashboard.
cover: /assets/images/projects/solar-cad.jpg
cover_alt: SolidWorks render of the floating platform with pool-noodle floats, sealed electronics box and tilting solar panel
course: Mechanical design
year: 2026
team: Team of 4
role: Conceptual design, design calculations, risk assessment (FMEA), final design and testing write-up, bill of materials
tools: [SolidWorks, SolidWorks Simulation, Arduino, IoT dashboard, 3D printing]
themes: [mechatronics, energy]
note: "tested in a bathtub, with pool noodles"
resume: "Two-axis floating solar tracker with sealed electronics and an IoT dashboard; owned conceptual design, design calculations, FMEA, the final design write-up and BOM."
tier: featured
featured: true
order: 1
model3d:
  label: Interactive 3D model of the floating solar tracking platform, exported from the final SolidWorks assembly
  caption: the final SolidWorks assembly
  explode: 0.3
  parts:
    - { name: assembly, src: /assets/models/solar-tracker/final-assembly.glb }
  groups:
    - { name: float frame, match: "Final Frame Assembly", explode: [0, -0.6, 0] }
    - { name: electronics box, match: ["TupperWare-1", "Battery Housing-1", "battery_pack-1"], explode: [0, 0, 0] }
    - { name: lid, match: "TupperWareLid-1", explode: [0, 0.6, 0] }
    - { name: stepper + mast, match: ["NEMA17 Model-1", "StepperMotorClamp-2", "StepperAdapter-2", "Mast-1"], explode: [0, 1.0, 0] }
    - { name: tracking head, match: "TrackingMechanism", explode: [0, 1.15, 0] }
process:
  - { label: Sketch, src: /assets/images/projects/solar-sketch.jpg, alt: Annotated hand sketch of the platform layout }
  - { label: Model, src: /assets/images/projects/solar-cad.jpg, alt: SolidWorks render of the full assembly }
  - { label: Analyse, src: /assets/images/projects/solar-fea.jpg, alt: FEA displacement plot of the panel tilt mount }
  - { label: Test, src: /assets/images/projects/solar-stability.jpg, alt: Prototype being pushed during a stability test in a bathtub }
videos:
  - { src: /assets/video/solar-tracking.mp4, poster: /assets/video/solar-tracking.jpg, caption: "Tracking test: chasing a phone flashlight around the panel." }
  - { src: /assets/video/solar-test-float.mp4, poster: /assets/video/solar-test-float.jpg, caption: "Test 1: does it float with the payload on board?" }
  - { src: /assets/video/solar-test-stability.mp4, poster: /assets/video/solar-test-stability.jpg, caption: "Test 2: stability." }
  - { src: /assets/video/solar-test-push.mp4, poster: /assets/video/solar-test-push.jpg, caption: "Test 3: push it, let go, watch it settle." }
  - { src: /assets/video/solar-test-slosh.mp4, poster: /assets/video/solar-test-slosh.jpg, caption: "Test 4: slosh and waves." }
  - { src: /assets/video/solar-test-ingress.mp4, poster: /assets/video/solar-test-ingress.jpg, caption: "Test 6: water ingress and durability." }
  - { src: /assets/video/solar-test-margin.mp4, poster: /assets/video/solar-test-margin.jpg, caption: "Safety margin test." }
  - { src: /assets/video/solar-test-camera.mp4, poster: /assets/video/solar-test-camera.jpg, caption: "Camera module streaming to the laptop." }
gallery:
  - { src: /assets/images/projects/solar-tracking.jpg, caption: "Tracking test: the panel follows a phone flashlight as it moves." }
  - { src: /assets/images/projects/solar-tracking2.jpg, caption: "Same test, light moved to the other side: the panel turns to follow." }
  - { src: /assets/images/projects/solar-dims.jpg, caption: "Dimensioned layout sketch — 400 × 300 mm float frame." }
  - { src: /assets/images/projects/solar-thermal.jpg, caption: "Thermal study of the electronics enclosure in direct sun." }
  - { src: /assets/images/projects/solar-cad-side.jpg, caption: "Side view at the lowest panel position." }
  - { src: /assets/images/projects/solar-dashboard.jpg, caption: "IoT dashboard with live light and pH readings." }
  - { src: /assets/images/projects/solar-build-cell.jpg, caption: "The 5 V solar cell, still in the bag." }
  - { src: /assets/images/projects/solar-build-frame.jpg, caption: "First print of the red panel frame." }
  - { src: /assets/images/projects/solar-build-panel-in.jpg, caption: "The cell seated in the frame." }
  - { src: /assets/images/projects/solar-build-wired.jpg, caption: "Panel in, leads out the back." }
  - { src: /assets/images/projects/solar-build-mast.jpg, caption: "The mast and tilt arm." }
  - { src: /assets/images/projects/solar-build-bracket.jpg, caption: "Measuring the servo bracket." }
  - { src: /assets/images/projects/solar-build-servo.jpg, caption: "The servo mounted on the bracket." }
  - { src: /assets/images/projects/solar-build-mast-up.jpg, caption: "The mast standing on its base." }
  - { src: /assets/images/projects/solar-build-on-float.jpg, caption: "First fit on the float board." }
  - { src: /assets/images/projects/solar-build-breadboard.jpg, caption: "Labelled breadboard wiring for the light sensors." }
  - { src: /assets/images/projects/solar-build-wiring.jpg, caption: "Everything wired up on the bench." }
  - { src: /assets/images/projects/solar-build-schematic.jpg, caption: "Whiteboard sketch of the power path: panel, charger, Arduino." }
  - { src: /assets/images/projects/solar-build-sealed.jpg, caption: "Electronics sealed in their box." }
  - { src: /assets/images/projects/solar-build-final.jpg, caption: "The finished platform on its pool-noodle floats." }
---

## The problem

Ponds, park water and other small bodies of water are hard to monitor continuously: there's rarely power nearby, and battery-powered sensors need constant servicing. Our brief was to design and build a floating platform that powers itself from the sun, points its panel at the light, and carries environmental sensors that report to the cloud.

## What it had to do

We wrote the requirements as numbers so we could test against them later:

- Keep the panel within **3–4° of the light source**.
- Stay stable, tilting less than **10°** when pushed or hit by waves.
- Keep every electrical part dry.
- Run on its own with minimal power draw, and report readings to an **IoT dashboard**.

## Concepts we considered

We built a morphological chart for each function and scored the combinations in a weighted decision matrix:

| Function | Options we weighed |
| --- | --- |
| Sensing | Camera, moisture sensor, light sensor, thermal sensor |
| Motion | Servo, stepper, DC motor |
| Frame | PLA, wood, PVC pipe |
| Flotation | Pool noodle, paddle board, insulation panel |
| Energy storage | Lead-acid, lithium-ion |

The winning combination was a PVC frame on pool-noodle floats, light-dependent resistors for sensing, a lithium-ion battery, a stepper for azimuth and a servo for tilt. It wasn't the most sophisticated option on any one line, but it was cheap, easy to build and reliable, and it scored best overall.

## The design

- **Azimuth:** a NEMA 17 stepper turns the whole mast. A stepper holds its position without drawing current, which matters on a solar budget.
- **Tilt:** an MG90S servo on a 3D-printed pivot sets the panel angle for the season.
- **Sensing:** light-dependent resistors compare brightness from different directions, and the Arduino steers toward the brighter side. A pH probe pokes through a hole near the centre of gravity, and an ESP32 camera module watches the water.
- **Power:** the panel charges a 12 V lithium-ion pack; a buck converter steps it down to 5 V for the Arduino and sensors.
- **Layout:** the electronics box sits dead centre so the centre of gravity stays low and level, with the mast rising from the middle of it.

The electronics live in a polypropylene food container. It isn't glamorous, but it's waterproof, cost $2.50, and got us to testing quickly.

## The numbers behind it

I worked through the design calculations with the team, using a safety factor of 1.2 on everything to cover wind gusts, extra mass from wiring and fasteners (we allowed 12%), and printing variation.

| Check | Required | What we chose |
| --- | --- | --- |
| Tilt torque (panel weight on its lever arm) | 0.096 N·m | MG90S servo, comfortably above |
| Azimuth torque (10 m/s wind on the panel + joint friction) | 0.057 N·m | NEMA 17 stepper, far above |
| Buoyancy | 1.56 L displaced | Four pool noodles |
| Stability | Righting > upsetting | Margin of 2.99 |
| Power draw | — | About 14.3 W, 1.19 A from the 12 V pack |

Before printing anything, the tilt mount went through SolidWorks Simulation: peak stress was around 0.17 MPa against roughly 50 MPa yield for PLA, with very little deflection. A thermal study of the enclosure confirmed the sun-facing lid gets hottest while the walls shed heat by convection.

## Risk assessment

The FMEA flagged four main ways it could fail: the platform tipping, water reaching the electronics, an actuator stalling, and not enough power coming in. Each one shaped a design choice — symmetrical floats and a central box for stability, a sealed enclosure, oversized motors, and a stepper that doesn't burn power holding position.

## Testing

Most of the flotation testing happened in a bathtub: a basic float-and-payload test, stability, push-and-release, slosh and waves, and a water-ingress check. The platform stayed up under loads well beyond our components' weight and settled back after every disturbance.

| Requirement | Result |
| --- | --- |
| Tracking within 3–4° | Panel turned toward the brightest light, confirmed on the dashboard readings |
| Under 10° tilt when disturbed | Floated loaded and recovered from pushes and waves |
| Tell water conditions apart | pH sensor clearly separated tap water from orange juice |

## What I'd change

The biggest lesson was how much early CAD work paid off: moving parts around in the model caught interference between the tracker and the enclosure before anything was printed. Next time I'd design a purpose-built sealed housing with a rubber gasket and proper cable routing instead of adapting an off-the-shelf box.
