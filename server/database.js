import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, '../data.db'));

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    material TEXT,
    dimensions TEXT,
    details TEXT, 
    image TEXT,
    color TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// Create admin user if not exists
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (userCount === 0) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
}

// Check if products exist, if not add defaults
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;

if (productCount === 0) {
    const insert = db.prepare(`
    INSERT INTO products (name, description, material, dimensions, details, image, color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

    const initialProducts = [
        {
            name: 'Bolsa Off-White',
            description: 'Design clássico e sofisticado.',
            material: 'Couro Bolvino Legítimo',
            dimensions: '28cm x 20cm x 8cm',
            details: JSON.stringify([
                'Alça de mão e alça transversal',
                'Detalhes delicados em metal dourado',
                'Combina com looks casuais e sociais'
            ]),
            image: '/offwhite-new.jpg',
            color: 'Off-White'
        },
        {
            name: 'Bolsa Preta',
            description: 'Modelo estruturado com acabamento matelassê.',
            material: 'Couro Bolvino Legítimo',
            dimensions: '35cm x 30cm x 12cm',
            details: JSON.stringify([
                'Alça de mão e alça transversal removível',
                'Detalhes metálicos dourados',
                'Ideal para uso diário e ocasiões especiais'
            ]),
            image: '/bags/bag-2.png',
            color: 'Preta'
        },
        {
            name: 'Bolsa Dourada',
            description: 'Acabamento metalizado elegante.',
            material: 'Couro Bolvino Legítimo',
            dimensions: '32cm x 25cm x 10cm',
            details: JSON.stringify([
                'Alças reforçadas e alça longa ajustável',
                'Formato firme e moderno',
                'Perfeita para eventos e produções noturnas'
            ]),
            image: '/bags/bag-3.png',
            color: 'Dourada'
        }
    ];

    for (const p of initialProducts) {
        insert.run(p.name, p.description, p.material, p.dimensions, p.details, p.image, p.color);
    }
}

export default db;
