---
title: CPU enclosure cooling CFD
summary: Simulating airflow through a CPU enclosure in ANSYS Fluent to compare a base design against two alternative vent layouts, then comparing the results with another group that ran a different flow and pressure.
cover: /assets/images/projects/cfd-base-velocity.jpg
cover_alt: Velocity streamlines through the base CPU enclosure, with the fastest flow concentrated down the middle of the box
course: Fluid dynamics
year: 2024
team: Individual report
role: Solo
tools: [ANSYS Fluent, DesignModeler, ANSYS Meshing]
themes: [energy]
note: "even beats fast"
tier: featured
order: 11
gallery:
  - { src: /assets/images/projects/cfd-mesh-design1.jpg, caption: "Base design geometry and its mesh." }
  - { src: /assets/images/projects/cfd-mesh-design3.jpg, caption: "Alternative design 2, with the vent crevices that pushed me toward a tetrahedral mesh." }
  - { src: /assets/images/projects/cfd-base-concentrated.jpg, caption: "Base design: fast flow down the middle and recirculation near the walls." }
  - { src: /assets/images/projects/cfd-alt1-velocity.jpg, caption: "Alternative design 1: velocity streamlines." }
  - { src: /assets/images/projects/cfd-alt1-even.jpg, caption: "Alternative design 1: the most even airflow of the three." }
  - { src: /assets/images/projects/cfd-alt2-velocity.jpg, caption: "Alternative design 2: velocity streamlines, with stagnation and vortices near the CPU." }
---

## What it was

A two-part CFD mini-project. Air enters a small enclosure through an inlet, flows over a CPU acting as a heat source, and leaves through outlet vents. There were three versions of the enclosure: the base case and two alternatives suggested by an "experienced colleague". The question was which one actually cools the CPU best for my group's flow conditions.

## 1. Planning the analysis

Part one was the plan, written before running anything:

- **Pressure drop:** follow the pressure from inlet to vents, since that's what drives the airflow.
- **Heat:** estimate the CPU's heat load, which is the energy the air has to carry away.
- **Boundary layers:** look at the boundary layers over the CPU and the Reynolds number for the flow.
- **Simulate:** then run the simulation and look for hot spots.

The outputs I needed were the velocity field, temperature, pressure contours and local heat transfer coefficients.

Fluent solves three equations:

- **Continuity:** ∇·(ρ**V**) = 0
- **Navier–Stokes:** ρ(∂**V**/∂t + **V**·∇**V**) = −∇p + μ∇²**V** + ρ**g**
- **Energy:** ρc<sub>p</sub>(∂T/∂t + **V**·∇T) = k∇²T + q̇

The boundary conditions:

- **Inlet:** velocity and mass flow specified.
- **Outlet:** atmospheric pressure, so the air runs from high pressure at the inlet to low at the vents.
- **CPU:** a heat source with constant heat flux.
- **Walls:** no-slip.

## 2. Meshing

The base design is a plain box with long straight faces, so a hexahedral mesh suits it: it conforms well and keeps the element count, and the run time, down. Both alternatives have small crevices at the outlet vents, so I chose tetrahedral meshes there, refined around the vents. I also noted that a refined hex mesh was a faster but less detailed option.

## 3. Inputs

Group 2 had **16 CFM** of flow at an inlet pressure of **1.1 mm H₂O**, through a 30 × 20 mm inlet. Fluent needs an inlet velocity, which comes from continuity:

- **Flow:** 16 CFM ≈ 0.00755 m³/s
- **Pressure:** 1.1 mm H₂O ≈ 10.8 Pa
- **Inlet area:** A = 30 mm × 20 mm = 600 mm² = 0.0006 m²
- **Inlet velocity:** v = Q / A = 0.00755 / 0.0006 ≈ **12.6 m/s**

## 4. Results

Each design was judged on three things: how evenly the flow is distributed, how fast the air circulates (which governs heat removal), and how much turbulence and recirculation it carries.

- **Base design:** the flow is heavily concentrated down the centre, with strong recirculation near the walls. The fast core looks good, but the uneven distribution invites hot spots over time.
- **Alternative 1:** the most uniform flow of the three, with less turbulence and fewer recirculation zones. The air enters slower, but the even velocity profile more than makes up for it. Steadier flow also means less energy lost to chaotic mixing.
- **Alternative 2:** irregular flow, with large regions of stagnation and recirculation. The worst of it is around the CPU, where vortices form. Its outlet geometry lets less air out than alternative 1, and the extra turbulence costs energy without cooling the CPU any better.

**Verdict for Group 2:** alternative 1.

## 5. Same box, different answer

Then I compared with Group 1, who ran a lower flow rate at a higher static pressure. Their air moved more slowly but pushed through obstructions more easily, which suited the narrow vent slits of alternative 2. They picked **alternative 2**.

Our higher flow rate moved more air, but our low static pressure couldn't force it past the obstacles in front of the CPU. Alternative 1 suited us because its open layout let that extra flow recirculate cooler air around the enclosure.

## What stood out

There isn't a single best design, only a best design for a given fan. The same three boxes ranked differently once the flow rate and the pressure traded places. That's a good argument for simulating the actual operating point rather than trusting the layout that looks most sensible.
