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

const count = db.prepare("SELECT COUNT(*) as count FROM spots").get();

if (count.count === 0) {
    const insert = db.prepare(`
        INSERT INTO spots (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run("Bao Boys", "Bao buns", "Amsterdam", "Heerlijke gestoomde broodjes met Aziatische vulling.", "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400", null, "https://maps.google.com");
    insert.run("Taco Loco", "Taco's", "Rotterdam", "Authentieke Mexicaanse taco's van de grill.", "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400", null, "https://maps.google.com");
    insert.run("Wok on Wheels", "Noedels", "Utrecht", "Verse roerbak noedels met keuze uit toppings.", "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400", null, "https://maps.google.com");
    insert.run("Bubble Dream", "Bubble tea", "Den Haag", "De beste bubble tea van de stad, 20+ smaken.", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", null, "https://maps.google.com");
    insert.run("Sushi Straat", "Sushi", "Amsterdam", "Verse sushi rolls gemaakt voor jouw ogen.", "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400", null, "https://maps.google.com");
}

export default db;