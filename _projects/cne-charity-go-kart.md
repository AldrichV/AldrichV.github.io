---
title: Charity race go-kart drivetrain
summary: A kid-safe go-kart concept and drivetrain for a CNE fundraiser race supporting SickKids, from functional diagrams to a 6:1 drivetrain layout.
cover: /assets/images/projects/cne-concepts.jpg
cover_alt: Pencil concept sketches of the go-kart from four angles inside a dimensioned bounding box
course: MECH 2412 · Engineering design
year: 2024
team: Team of 6
role: Bill of materials, detailed layout and conceptual design sketches
tools: [SolidWorks, Arduino, draw.io]
themes: [drivetrains]
note: "designed for kid drivers"
tier: featured
order: 8
gallery:
  - { src: /assets/images/projects/cne-gear-sketch.jpg, caption: "Hand layout of the gear train and axle." }
  - { src: /assets/images/projects/cne-drivetrain-cad.jpg, caption: "Drivetrain model, top and side." }
  - { src: /assets/images/projects/cne-layout.jpg, caption: "Dimensioned chassis layout." }
  - { src: /assets/images/projects/cne-torque.jpg, caption: "Motor torque–speed line used to size the drive." }
---

## The brief

The scenario: "Karts for Cancer", a fundraiser race at the Canadian National Exhibition with proceeds going to SickKids. Arduino was the event sponsor, so every kart had to run on Arduino boards and show off their TinyML hardware.

## A change of direction

The original plan was to design a kit of modular parts for teams to build their own karts. When the event committee raised safety concerns about children driving experimental vehicles, the brief changed: we would design the karts that actually raced.

## From functions to concepts

We broke the kart down into its functions — take in power, store it, convert it, transmit it to the wheels, and take in the driver's steering and throttle — and drew functional structure diagrams before sketching anything. That gave us four concepts, each drawn inside the same dimensioned bounding box so they could be compared fairly.

## The design we chose

The most enclosed of the four, closer to a golf cart than a racing kart:

- **Safer for kids:** the body protects drivers from head-on impacts.
- **Sturdy:** a traditional, robust shape that should last beyond one event.
- **Easy to build and fix:** fewer curves and angles mean cheaper production and simpler repairs.

## The drivetrain

Research in the go-kart community pointed to a **6:1 reduction** as the usual choice for entry-level karts, balancing acceleration against top speed. The gear train and axle were laid out around that ratio, and the motor's torque–speed line was used to check the drive.

My part was the conceptual design sketches, the detailed layout and the bill of materials.
