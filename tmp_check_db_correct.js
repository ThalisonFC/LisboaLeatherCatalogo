import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// data.db is in the same directory as this file
const dbPath = join(__dirname, 'data.db');

try {
    const db = new Database(dbPath);
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('TABLES:', JSON.stringify(tables));

    if (tables.length > 0) {
        const products = db.prepare('SELECT id, name FROM products').all();
        const users = db.prepare('SELECT id, username FROM users').all();
        console.log('PRODUCTS:', JSON.stringify(products));
        console.log('USERS:', JSON.stringify(users));
    }
} catch (err) {
    console.error('ERROR:', err.message);
}
