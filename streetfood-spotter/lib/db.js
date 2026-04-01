import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'streetfood.db'));

db.exec(`
    CREATE TABLE IF NOT EXISTS spots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        naam TEXT,
        soort_eten TEXT,
        locatie TEXT,
        omschrijving TEXT,
        afbeelding_url TEXT,
        tiktok_url TEXT,
        google_maps_url TEXT
    )
`);

// Seed data wordt alleen ingevoegd als de tabel leeg is
// Zo blijven zelf toegevoegde spots bewaard na een herstart
const count = db.prepare("SELECT COUNT(*) as count FROM spots").get();

if (count.count === 0) {
    const insert = db.prepare(`
        INSERT INTO spots (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
        "Bao Boys",
        "Bao buns",
        "Amsterdam",
        "Heerlijke gestoomde broodjes met Aziatische vulling. Kies uit pulled pork, crispy chicken of een vegan optie.",
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200",
        null,
        "https://www.google.com/maps/search/?api=1&query=Bao+Boys+Amsterdam"
    );

    insert.run(
        "Taco Loco",
        "Taco's",
        "Rotterdam",
        "Authentieke Mexicaanse taco's van de grill. Gemaakt met zelfgemaakte tortilla's en verse salsa.",
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200",
        null,
        "https://www.google.com/maps/search/?api=1&query=Taco+Rotterdam"
    );

    insert.run(
        "Wok on Wheels",
        "Noedels",
        "Utrecht",
        "Verse roerbak noedels met keuze uit toppings. Snel, lekker en bereid voor jouw ogen.",
        "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200",
        null,
        "https://www.google.com/maps/search/?api=1&query=Wok+Utrecht"
    );

    insert.run(
        "Bubble Dream",
        "Bubble tea",
        "Den Haag",
        "De beste bubble tea van de stad met meer dan 20 smaken. Kies je eigen suikergehalte en topping.",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
        null,
        "https://www.google.com/maps/search/?api=1&query=Bubble+tea+Den+Haag"
    );

    insert.run(
        "Sushi Straat",
        "Sushi",
        "Amsterdam",
        "Verse sushi rolls gemaakt voor jouw ogen. Van klassieke nigiri tot creatieve fusion rolls.",
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200",
        null,
        "https://www.google.com/maps/search/?api=1&query=Sushi+Amsterdam"
    );
}

export default db;
