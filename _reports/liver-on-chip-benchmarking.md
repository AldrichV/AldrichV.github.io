---
title: Liver-on-chip platforms for drug safety
summary: A critical review of liver-on-chip research for predicting drug-induced liver injury, and what it would take to benchmark these chips well enough for regulators to trust them.
type: Literature review
course: Advanced mechanical technologies
year: 2026
team: Group of 4
role: Team member
order: 1
finding: "Regulators are already making room for liver-on-chip data, but the science behind it isn't standardized enough yet. We proposed a five-part benchmarking framework to close that gap."
sources:
  - { title: "Focus Group Organ-on-Chip Standardization Roadmap", by: "CEN/CENELEC, 2024" }
  - { title: "Reproducing human and cross-species drug toxicities using a Liver-Chip", by: "Jang et al., Science Translational Medicine, 2019" }
  - { title: "A High-Throughput Microphysiological Liver Chip System to Model Direct and Idiosyncratic DILI Using Human Liver Organoids", by: "bioRxiv preprint, 2023" }
  - { title: "Microfluidic organ-on-a-chip models for the gut–liver axis", by: "Biomaterials Science, 2025" }
  - { title: "Liver-on-a-chip devices: the pros and cons of complexity", by: "Dalsbecker et al., 2022" }
---

## The question

Drug-induced liver injury (DILI) is liver damage caused by a medicine, its metabolites or a drug interaction. It is one of the main reasons drugs fail late or get pulled from the market. The liver is where most drugs are metabolized, so it sees the most reactive by-products.

The models used today miss a lot of this. Flat 2D liver cell cultures lose their function within hours, and animal livers process drugs differently from ours. A liver-on-chip grows human liver cells inside tiny channels with flowing fluid, so they behave more like a real liver.

The question we set out to answer: **are liver-on-chip results trustworthy and comparable enough to support drug safety decisions, and if not, what's missing?**

## What was done

We ran a critical review of 21 papers and sorted them into three clusters:

- **Platform engineering (10 papers):** channel layout, flow, scaffolds, sensors and throughput.
- **Biological fidelity (5 papers):** which liver cells are used, co-cultures, biomarkers and injury mechanisms.
- **Benchmarking and regulation (6 papers):** reproducibility, which drugs get tested, cross-platform comparison, and guidance from the FDA, EMA, NIH and the European standards bodies (CEN/CENELEC).

For each key paper we wrote down what it claimed and then what it left out. Our first pass grouped those gaps into standardization, biological and engineering gaps, and the final review built them into a framework.

## The data

The case for better prediction comes down to a few numbers:

| The problem | The number |
|---|---|
| Hospital admissions caused by adverse drug reactions | about 5–7% |
| Average cost to develop one drug | $2.6 billion |
| Clinical candidates that reach approval | about 10% |
| Post-market withdrawals attributed to DILI | about 21% |
| How long human liver cells stay functional in 2D culture | 24–72 hours |
| How long they stay functional on a liver chip | 14+ days |

That last pair is the main argument for the chips. Liver injury that builds up over days is invisible in a culture that only works for three.

We also compared the testing options side by side:

| Feature | 2D culture, animal cells | Liver-on-chip, animal cells | 2D culture, human cells | Liver-on-chip, human cells |
|---|---|---|---|---|
| Physiological realism | Low | Low | Moderate | High |
| System complexity | Low | High | Low | High |
| Cost | Low | Moderate | Moderate | High |
| Predictive capability | Limited | Low | Moderate | Promising |

Regulation has been moving quickly:

<ul class="timeline">
  <li><b>2022</b> The FDA allows organ-on-chip data in investigational new drug applications, in place of animal testing.</li>
  <li><b>2024</b> The CEN/CENELEC roadmap names the three most urgent standardization gaps.</li>
  <li><b>Sep 2024</b> Emulate's Liver-Chip becomes the first organ-on-chip to reach the final stage of FDA qualification.</li>
  <li><b>Apr 2025</b> The FDA announces a 3–5 year phase-out of animal testing for monoclonal antibodies.</li>
  <li><b>Jul 2025</b> The NIH stops funding proposals that rely only on animal experiments.</li>
  <li><b>Jan 2026</b> The US EPA reaffirms its plan to phase out animal testing by 2035.</li>
</ul>

The papers themselves showed what the science still owes. Most report only a flow rate, not the shear stress the cells actually feel. The target shear in a liver sinusoid is only about 0.01–0.1 dyn/cm², and getting it wrong changes how the cells metabolize drugs. Inter-laboratory reproducibility data was rare. Only one study reached independent (Level 4) validation, which the FDA's qualification pathway treats as the minimum. Most studies also tested the same few well-known liver toxins, such as acetaminophen. That makes a chip look more accurate than it would be on a real drug pipeline.

## What it showed

**Policy has moved faster than the evidence.** Liver chips clearly beat 2D cultures and animal models on realism. They keep cells alive for weeks, respond at doses a real patient would take, and can catch species-specific toxicity. But no two papers we found used the same chip design or test setup, so their results can't be compared or confirmed.

We proposed a **five-category benchmarking framework** that any liver-chip study should meet:

1. **Cell model transparency:** state the cell source, species, donor details and co-culture ratios. Measure albumin, urea and at least one relevant liver enzyme at the start.
2. **Compound diversity:** test at least one direct toxin (a positive control), one drug that is toxic in humans but not in test animals, and one confirmed non-toxic drug (a negative control).
3. **Readout panel:** use quantitative readouts from at least two of four categories (synthetic function, drug metabolism, injury markers and transporter function), and state when each was measured relative to dosing.
4. **Reproducibility reporting:** set a standard number of repeat runs per sample source, so the variation between runs is known.
5. **Use case:** say which question the chip is built to answer, such as DILI, fibrosis or another area.

The bigger lesson was that "looks like liver tissue" isn't enough. A chip has to be shown to behave like a liver under the same, openly reported test conditions before anyone can rely on it in place of an animal study.
