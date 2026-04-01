# StreetfoodSpotter

Een Next.js webapp voor het ontdekken en delen van streetfood spots in Nederland. Gebouwd als schoolopdracht met Next.js App Router, Tailwind CSS en SQLite.

## Projectstructuur

```
streetfood-spotter/
├── app/
│   ├── layout.tsx              # Hoofd-layout: navigatie + footer (geldt voor alle pagina's)
│   ├── page.tsx                # Homepage met hero sectie en uitlegblokken
│   ├── globals.css             # Globale stijlen en Tailwind import
│   ├── add-spot/
│   │   └── page.tsx            # Formulierpagina om een nieuwe spot toe te voegen
│   ├── spots/
│   │   ├── page.tsx            # Overzicht van alle spots met zoekfunctie
│   │   └── [id]/
│   │       └── page.tsx        # Detailpagina per spot (dynamische route)
│   └── components/
│       ├── SearchInput.tsx     # Client-component voor live zoeken (typt → URL bijwerken)
│       └── SpotCard.tsx        # Herbruikbare kaartcomponent voor één spot
├── lib/
│   └── db.js                   # Database-verbinding, tabelcreatie en seed data
├── next.config.ts              # Next.js config: better-sqlite3 als server-only package
└── streetfood.db               # SQLite databasebestand (automatisch aangemaakt bij opstarten)
```

## Opstarten

```bash
cd streetfood-spotter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Database instellen

Er is **geen handmatige setup nodig**. Bij het opstarten van de app regelt `lib/db.js` automatisch:

1. Een verbinding met `streetfood.db` (bestand wordt aangemaakt als het niet bestaat)
2. De tabel `spots` aanmaken via `CREATE TABLE IF NOT EXISTS`
3. Vijf voorbeeldspots invoegen als de tabel leeg is (seed data)

### Tabelstructuur (`spots`)

| Kolom           | Type    | Omschrijving                          |
|-----------------|---------|---------------------------------------|
| id              | INTEGER | Automatisch oplopend ID (primary key) |
| naam            | TEXT    | Naam van de spot                      |
| soort_eten      | TEXT    | Type eten (bijv. taco's, sushi)       |
| locatie         | TEXT    | Stad of adres                         |
| omschrijving    | TEXT    | Korte beschrijving van de spot        |
| afbeelding_url  | TEXT    | URL naar een afbeelding               |
| tiktok_url      | TEXT    | Optionele TikTok video-URL            |
| google_maps_url | TEXT    | Optionele Google Maps-URL             |

## Hoe werkt de zoekfunctie?

De zoekfunctie werkt via twee stappen:

**1. Client-side (SearchInput.tsx):**
`SearchInput` is een `"use client"` component. Bij elke toetsaanslag wordt de URL bijgewerkt met `router.push()`:
```
/spots?q=amsterdam
```

**2. Server-side (spots/page.tsx):**
De server leest de `q`-parameter uit de URL en voert een SQL-query uit met `LIKE`:
```sql
SELECT * FROM spots WHERE naam LIKE '%amsterdam%' OR locatie LIKE '%amsterdam%'
```
De `%`-tekens zorgen dat de zoekopdracht ook matcht als de term ergens middenin staat.

## Hoe werkt het formulier (add-spot)?

De pagina gebruikt een **Server Action** — een Next.js functie met `"use server"` die direct op de server draait, zonder aparte API-route.

Stappen:
1. Gebruiker vult het formulier in en klikt op "Spot toevoegen"
2. Het formulier stuurt de data via `action={addSpot}` naar de server
3. De server leest de velden uit `formData`
4. Validatie: als TikTok én Google Maps allebei leeg zijn → redirect met `?error=media`
5. Als alles klopt: `INSERT INTO spots ...` query uitvoeren
6. Redirect naar `/spots` zodat de nieuwe spot zichtbaar is

## Hoe werken de media-embeds?

### TikTok embed
Uit een TikTok-URL wordt het video-ID geëxtraheerd via een reguliere expressie:
```js
url.match(/video\/(\d+)/)
// "https://www.tiktok.com/@user/video/1234567890" → "1234567890"
```
Dat ID wordt gebruikt in een `<iframe>`:
```
https://www.tiktok.com/embed/1234567890
```

### Google Maps embed
Als er geen TikTok-video is, wordt de locatienaam gebruikt in een automatische kaartweergave:
```
https://maps.google.com/maps?q=Amsterdam&output=embed&z=14
```
Dit toont een ingesloten kaart zonder dat een API-sleutel nodig is.

## Pagina-overzicht

| Route         | Omschrijving                                      |
|---------------|---------------------------------------------------|
| `/`           | Homepage met hero en uitlegblokken                |
| `/spots`      | Overzicht van alle spots met zoekbalk             |
| `/spots/[id]` | Detailpagina van één spot                         |
| `/add-spot`   | Formulier om een nieuwe spot toe te voegen        |

## Technische keuzes

- **Next.js App Router** — moderne mappenstructuur, Server Components en Server Actions
- **Tailwind CSS v4** — utility-first styling, geen aparte CSS-bestanden nodig
- **better-sqlite3** — synchrone SQLite library, werkt goed met Next.js server-side rendering
- **Geen Prisma / externe database** — SQLite bestand staat lokaal, geen setup vereist
