# Rust in Ouderschap Quiz Funnel

Een production-ready mobile-first quizfunnel in `Next.js` met rustige premium UX, resultaatlogica en een Plug&Pay doorstroom naar een proefperiode van `€0,02`.

## Bestandsstructuur

- `app/`: App Router entrypoints en globale styling.
- `components/`: herbruikbare UI- en funnelcomponenten.
- `data/quiz.ts`: alle quizvragen, antwoordopties en scoregewichten.
- `lib/`: type-definities en resultaatberekening.
- `public/images/`: logo, illustraties en visuals voor de eindpagina.

De checkout-link is in deze versie bewust hardcoded in de CTA-knoppen.

## Lokaal draaien

1. Installeer dependencies:

```bash
npm install
```

2. Start de development server:

```bash
npm run dev
```

3. Open de URL die Next.js in de terminal toont, bijvoorbeeld `http://localhost:3000`.

## Productverbeteringen

- Voeg analytics toe voor quiz-start, drop-off per stap, profielresultaten en checkout-clicks.
- Test A/B-varianten van introcopy, CTA-teksten, volgorde van salesblokken en prijsframing.
- Verplaats quizresultaten en sessie-events naar server-side opslag of een analytics-pipeline.
- Maak de offerblokken dynamisch op basis van dominante en secundaire score voor verdere personalisatie.
