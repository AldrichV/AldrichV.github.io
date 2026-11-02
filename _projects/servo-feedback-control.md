---
title: Servo motor feedback control
summary: Modelling a rotary servo from a bump test, then designing PI, PID, lead and cascade controllers in Simulink and running them on the real hardware.
cover: /assets/images/projects/servo-hw-step.jpg
cover_alt: Hardware step response of the servo speed under lead control, compared with the setpoint
course: ENG 4550 · Control systems lab
year: 2026
team: Lab pair
role: Team leader
tools: [MATLAB, Simulink, Quanser SRV02]
themes: [mechatronics]
note: "simulation ≠ hardware"
tier: featured
order: 5
gallery:
  - { src: /assets/images/projects/servo-calc.jpg, caption: "Hand calculation of the proportional and velocity gains." }
  - { src: /assets/images/projects/servo-simulink.jpg, caption: "Simulink model used for both simulation and hardware." }
  - { src: /assets/images/projects/servo-lead.jpg, caption: "Simulated speed response with the lead compensator." }
  - { src: /assets/images/projects/servo-bode.jpg, caption: "Measured gain against input frequency." }
---

## What it was

A semester of labs on a Quanser SRV02 rotary servo with my lab partner, building from a plant model to a full cascade controller. Every stage followed the same loop: derive the controller by hand, simulate it in Simulink, run it on the real motor, and compare.

## 1. Modelling the motor

A bump test — a square-wave step in input voltage — gave the motor's steady-state gain and time constant from the speed response, and a frequency sweep cross-checked the first-order model. Everything after depends on getting this right.

## 2. Speed control

A PI controller. The proportional gain sets how quickly the motor responds; the integral gain removes steady-state error so it actually reaches the target speed.

## 3. Position control

Position controllers with gains derived by hand from the target damping ratio and natural frequency, then tuned against peak time, percent overshoot and steady-state error.

## 4. Lead compensation

Adding phase lead to speed the response up without the overshoot that simply raising the gain causes.

## 5. Cascade control

An outer PID loop on position feeding speed setpoints to an inner PI loop on speed, with a saturation block keeping the motor under 10 V. We tested it on ramp inputs to see how well it tracked a steadily moving target.

## What stood out

Each design was judged against the same specs, and the gap between simulation and hardware was the interesting part. Several designs that met spec in Simulink showed more overshoot or error on the real motor. Tracking down why taught more than the cases that matched: the model is only as good as the bump test behind it.
