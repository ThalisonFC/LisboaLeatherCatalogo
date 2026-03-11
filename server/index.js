import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;
const SECRET_KEY = 'lisboa_leather_secret_key_123';

// Ensure uploads directory exists
const uploadsDir = join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API Routes

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'API is working' });
});

// Login Route
app.post('/api/login', (req, res) => {
    console.log('Login attempt received:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    try {
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        if (!user) {
            console.log('User not found:', username);
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            console.log('Invalid password for:', username);
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
        console.log('Login successful for:', username);
        res.json({ token, username: user.username });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get all products (Public)
app.get('/api/products', (req, res) => {
    try {
        const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
        const parsedProducts = products.map(p => ({
            ...p,
            details: JSON.parse(p.details || '[]')
        }));
        res.json(parsedProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Protected routes below
app.use('/api/admin', authenticateToken);

// Create a product
app.post('/api/admin/products', (req, res) => {
    const { name, description, material, dimensions, details, image, color } = req.body;
    try {
        const info = db.prepare(`
      INSERT INTO products (name, description, material, dimensions, details, image, color)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, description, material, dimensions, JSON.stringify(details), image, color);
        res.status(201).json({ id: info.lastInsertRowid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product
app.put('/api/admin/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, material, dimensions, details, image, color } = req.body;
    try {
        db.prepare(`
      UPDATE products 
      SET name = ?, description = ?, material = ?, dimensions = ?, details = ?, image = ?, color = ?
      WHERE id = ?
    `).run(name, description, material, dimensions, JSON.stringify(details), image, color, id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
app.delete('/api/admin/products/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('DELETE FROM products WHERE id = ?').run(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload image
app.post('/api/admin/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on all interfaces at port ${port}`);
});
