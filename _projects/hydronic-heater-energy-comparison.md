---
title: Electric furnaces vs. gas-fired hydronic heaters
summary: An energy and operating-cost comparison for replacing two 15 kW electric furnaces with three hydronic unit heaters on a gas boiler. It covers capacity from the manufacturer schedules, seasonal energy, demand charges, alternatives and a break-even gas price.
cover: /assets/images/projects/gei-cost.jpg
cover_alt: Bar chart of estimated seasonal heating cost, $8,608 for the existing electric furnaces against $2,831 for the proposed gas-fired hydronic system
kind: work
course: Client project · Heating energy comparison
year: 2026
team: Client work
role: Leader
tools: [Excel, manufacturer output schedules, Ontario electricity tariffs]
themes: [energy, building]
note: "uses more energy, costs a third as much"
tier: featured
order: 12
gallery:
  - { src: /assets/images/projects/gei-capacity.jpg, caption: "Heat output against the existing 15 kW furnace, at 160°F and 180°F supply water." }
  - { src: /assets/images/projects/gei-energy.jpg, caption: "Purchased energy by fuel over a 2,000-hour season, with the alternatives alongside." }
---

## What it was

A commercial building heated two crawl spaces with a 15 kW electric warm-air furnace each. The question was whether three hydronic unit heaters on a gas-fired boiler could replace them: one large unit in the first space, two smaller ones in the second. It also asked how the change would affect capacity, energy use and operating cost. The client, site and utility accounts are left out here.

## 1. What the existing furnaces actually deliver

The only field data was the discharge-air temperature on each furnace, from 115°F on mild days up to 160°F on the coldest. With constant blower airflow, output scales with how much warmer the discharge air is than the return air. So I anchored the model at the 15 kW nameplate at 160°F, with 70°F return air:

**Q = 15 kW × (T<sub>discharge</sub> − 70) ÷ (160 − 70)**

| Operating point | Discharge | Rise | Output | Share of full load |
|---|---|---|---|---|
| Lowest recorded | 115°F | 45°F | 7.50 kW | 50% |
| Seasonal average | 137.5°F | 67.5°F | 11.25 kW | 75% |
| Coldest day | 160°F | 90°F | 15.00 kW | 100% |

The same anchor gives the airflow: 51,182 Btu/h ÷ (1.08 × 90°F) ≈ **527 cfm**. That's a number to replace with a measured value on site.

## 2. Can the new heaters keep up?

I converted the manufacturer's output schedules to kilowatts (kW = MBH ÷ 3.412) and compared them with the 15 kW furnace. At 180°F supply water and a 20°F drop through each coil:

| Space | Proposed | Output | vs. 15 kW | Water flow |
|---|---|---|---|---|
| First crawl space | one large unit | 18.64 kW | +24.3% | 6.5 gpm |
| Second crawl space | two smaller units | 21.34 kW | +42.2% | 7.4 gpm |
| Both | three units | 39.98 kW | +33.3% | 13.9 gpm |

The sensitivity mattered more than the headline. Output falls quickly as the supply water gets cooler or the temperature drop gets bigger:

| Supply water | Drop | First space | Second space |
|---|---|---|---|
| 160°F | 20°F | 14.27 kW (−4.8%) | 16.62 kW (+10.8%) |
| 160°F | 30°F | 11.31 kW (−24.6%) | 13.86 kW (−7.6%) |
| **180°F** | **20°F** | **18.64 kW (+24.3%)** | **21.34 kW (+42.2%)** |
| 180°F | 30°F | 15.74 kW (+4.9%) | 18.61 kW (+24.1%) |
| 180°F | 40°F | 12.90 kW (−14.0%) | 15.97 kW (+6.5%) |
| 200°F | 20°F | 22.98 kW (+53.2%) | 26.00 kW (+73.3%) |

The single unit in the first space is the tightest selection. At 160°F water it comes up 4.8% short on the coldest day, so the boiler has to be set to supply 180°F.

## 3. Seasonal energy

I modelled a 2,000-hour season, split evenly between the two recorded conditions, which averages 11.25 kW per space. That gives 11.25 × 2 spaces × 2,000 h = **45,000 kWh** of useful heat. Every option has to deliver that same heat. What changes is how much it has to buy to do it:

| System | Electricity | Gas | Total bought |
|---|---|---|---|
| Existing electric furnaces (COP 1) | 45,000 kWh | — | 45.0 MWh |
| **Gas boiler hydronic, 90% boiler, 95% distribution** | **1,127 kWh** | **52,632 kWh-eq (≈ 5,060 m³)** | **53.8 MWh** |
| High-efficiency gas boiler (95%) | 1,127 kWh | 49,861 kWh-eq | 51.0 MWh |
| Heat pump hydronic (COP 3) | 16,916 kWh | — | 16.9 MWh |
| Electric boiler hydronic | 48,495 kWh | — | 48.5 MWh |

The gas system buys about 19% *more* energy than the furnaces, because of flue and piping losses. Yet it cuts electricity by 97%, down to the three fans at their 0.564 kVA combined draw. The heat pump looks best on paper, but it would need to make 180°F water to match these capacities, and most can't do that efficiently.

## 4. Cost, and the charge nobody sees

Electricity was priced from the Ontario forecasts and the local utility's published tariff for a 50–499 kW general-service customer:

- **Energy:** an all-in rate of about **13.4¢/kWh**. That's the market price plus the Global Adjustment, regulatory charges and the disposition rider, with a 1.036 line-loss factor applied.
- **Delivery:** **$14.43 per kW-month**, charged on monthly peak demand.

That second line is the hidden cost. 30 kW of resistance heat adds about **$2,600 a season** in demand charges, over six winter billing months. The new fans draw under 1 kW.

| Seasonal cost | Existing | Proposed | Savings |
|---|---|---|---|
| Electricity, energy | $6,011 | $151 | $5,860 |
| Electricity, demand | $2,598 | $49 | $2,549 |
| Natural gas | — | $2,632 | −$2,632 |
| **Total** | **$8,608** | **$2,831 + pump** | **$5,777 (67%)** |

The savings hold across mild and severe winters:

| Season | Existing | Proposed | Savings |
|---|---|---|---|
| Mild, 1,000 h | $5,603 | $1,440 | 74% |
| Typical, 2,000 h | $8,608 | $2,831 | 67% |
| Severe, 3,000 h | $11,614 | $4,222 | 64% |

Gas was priced at an illustrative 5¢ per kWh-equivalent until the client's gas rate came in, so I also worked out the **break-even**. At these electricity rates the gas system stays cheaper as long as gas is under about **16¢/kWh-eq (≈ $1.65/m³)**, several times typical commercial gas prices.

## What stood out

Two things. First, "more energy" and "less money" aren't a contradiction once you price fuel per unit of heat and look past the energy line to the demand charges. Second, the margin table did more work than the headline numbers. It's what showed that one heater only works if the boiler is set to 180°F, which became the main design note in the report. The report states its limits plainly: the airflow is implied, not measured, and run hours, return-air temperature and the actual bills will confirm or correct the figures.
