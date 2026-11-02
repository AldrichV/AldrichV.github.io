---
title: Automated plant watering system
summary: Soil moisture and light sensing through custom signal conditioning into LabVIEW, switching a pump and grow LEDs on when the plant needs them.
cover: /assets/images/projects/plant-circuit.jpg
cover_alt: Circuit diagram of the phototransistor amplifier stage feeding the DAQ
course: MECH 2502 · Instrumentation and measurement
year: 2024
team: Team of 4
tools: [LabVIEW, NI DAQ, analog circuits]
themes: [mechatronics]
note: "the plant shaded its own sensor"
tier: more
order: 21
gallery:
  - { src: /assets/images/projects/plant-block.jpg, caption: "System block diagram: sensor, signal conditioning, DAQ, LabVIEW, output." }
  - { src: /assets/images/projects/plant-moisture.jpg, caption: "Moisture reading dropping as water reaches the soil." }
  - { src: /assets/images/projects/plant-light.jpg, caption: "Phototransistor readings as light conditions change." }
---

Two loops look after one plant. A soil moisture sensor, read through a voltage divider and amplifier, triggers a pump when the soil is dry. A phototransistor measures how much light reaches the plant and turns on red and blue LEDs when it's too dark. Both signals go through a DAQ into a LabVIEW program that handles calibration and switching.

**What we'd fix.** The plant could shade its own light sensor, so taller mounting pillars are needed. And running the LEDs, phototransistor and moisture sensor through the same channel caused a loading error, where adjusting one changed the other's reading. Separate channels would have avoided it.

Beyond houseplants, the same setup points at small-scale urban farming, where automating light and water cuts down on daily attention.
