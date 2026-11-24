# LuzLibre / Comparador Eléctrico Abierto

**Free, public, auditable electricity-tariff comparison tool.**  
**Gratis, público y auditable.**

Built from a real research/coding map (`docs/tarifa_app_kod_haritasi.html`) and turned into a working web app that anyone can use, audit, and extend.

> ⚡ Spain-first (2.0TD), extensible to other countries/markets through JSON configuration.  
> ✉️ Email only — no phone numbers, no auto-contracts, no pressure.

---

## What it does / Qué hace

- **Calculates real annual cost** with taxes (VAT + electricity tax), meter rental, power term, and energy term.
- **Compares tariffs** in a clear ranking with charts (Chart.js).
- **Recommends with rules**, not black boxes: minimum savings threshold, SVA/bundle exclusion, indexed/pool-risk warning, and a "before you switch" checklist.
- **Creative Scenario Lab**: change consumption, simulate solar self-consumption offset, stress-test pool price for indexed tariffs, optimize contracted power, and create custom country/market configs.
- **Email desk (email only)**: generates a written-offer request draft. You review and send it yourself. No automatic sending.
- **Privacy-first**: 100% client-side by default. Your profile stays in your browser.

## Golden rules / Reglas de oro

1. **Email only** — the product model has no phone field.  
2. **No automatic contracts** — the tool informs; you decide.  
3. **Visible math** — every recommendation shows annual cost, taxes, and difference.  
4. **Verify before contracting** — prices are reference/community data; always confirm the source and get the written offer.  
5. **Indexed tariffs are never a single number** — scenario/risk view is required.

## Quick start / Uso rápido

### Option A: Open locally
Just open `index.html` in a browser. The app includes embedded fallback data, so it works even without a server.

### Option B: Serve locally (recommended)
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

### Option C: GitHub Pages
Publish the repository root with GitHub Pages. The app is fully static.

## Project structure / Estructura

```text
.
├── index.html                      # Main bilingual app (ES/EN)
├── assets/
│   ├── style.css                   # UI styles
│   └── app.js                      # Calculator, recommender, charts, i18n, email drafts
├── data/
│   ├── countries.json              # Country/market configs (taxes, periods, defaults)
│   └── tariffs.es.json             # Spain reference tariff dataset
├── docs/
│   └── tarifa_app_kod_haritasi.html  # Original research/coding map (source blueprint)
├── README.md
├── LICENSE
└── .gitignore
```

## Data model / Modelo de datos

Each tariff follows this shape (see `data/tariffs.es.json`):

```json
{
  "id": "company-tariff",
  "company": "Company",
  "name": "Tariff name",
  "type": "fijo | dh3 | indexada | trimestral",
  "energy": { "P1": 0.12, "P2": 0.12, "P3": 0.12 },
  "power":  { "P1": 0.08, "P2": 0.02 },
  "permanencia_meses": 0,
  "sva_bundle": false,
  "promo_until": null,
  "tier_rule": null,
  "source_url": "https://...",
  "extracted_at": "YYYY-MM-DD",
  "notes": "Verification notes",
  "email_contact": "contact@example.com"
}
```

### Tier rules
For tariffs whose price depends on annual consumption (e.g. &lt;4000 / &gt;=4000 kWh), use:

```json
"tier_rule": { "type": "annual_kwh", "lte": 4000, "price_lte": 0.119, "price_gt": 0.189 }
```

## Add another country / Añadir otro país

1. Add a country object in `data/countries.json` with taxes, currency, periods and defaults.
2. Add `data/tariffs.<code>.json` with reference tariffs for that market.
3. Keep the same transparency rules: source URL, extraction date, and "verify before contracting".
4. Open a PR.

The app also has a **Custom market** mode in the UI for quick experiments.

## Methodology / Metodología

The calculator follows the blueprint formula:

```text
energy = Σ kWh_period × price_period
power  = Σ kW_period × days × power_price_period
regulated = meter_daily × days
subtotal = energy + power + regulated
total = subtotal × (1 + electricity_tax) × (1 + VAT)
```

Recommendation rules (from the research map):
- **Minimum savings**: &gt; 100 €/year to justify switching.
- **SVA/bundle**: flagged and excluded by default.
- **Indexed/quarterly**: show scenario/risk; never present as a single certain number.
- **Before switching**: get written offer, ask current retailer for retention/cancel-and-rejoin, do not cancel before new contract is confirmed, 14-day cooling-off right.

## Important disclaimer / Aviso importante

This tool is for **informational and decision-support purposes only**. It is **not** financial, legal, or commercial advice, and it is **not** a binding offer. Tariff prices, taxes, and conditions change frequently. Always verify the official source and request the final offer in writing before contracting.

Este proyecto es solo para **información y apoyo a la decisión**. No es asesoramiento financiero, legal o comercial, ni una oferta vinculante. Verifica siempre la fuente oficial y solicita la oferta final por escrito.

## Contributing / Contribuir

Contributions welcome:
- Add/update tariff datasets with source URLs and extraction dates.
- Add country/market configs.
- Improve calculator rules, accessibility, i18n, or tests.
- Report broken sources or pricing-rule edge cases.

Please do **not** add phone-based sales flows, auto-contracting, or dark patterns.

## License / Licencia

[MIT](LICENSE) — free to use, modify, and share.
