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

export default db;