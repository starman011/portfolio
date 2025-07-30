const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(helmet());
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));

// Rate limiter to limit repeated requests to public APIs
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 30, // limit each IP to 30 requests per windowMs
});
app.use(limiter);

// MongoDB connection
// Ensure an explicit URI is provided via environment variables.
let mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('Missing MONGO_URI environment variable');
    process.exit(1);
}

// Replace `<password>` placeholder if one is present and DB_PASSWORD is set
if (process.env.DB_PASSWORD) {
    const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
    if (mongoUri.includes('<password>')) {
        mongoUri = mongoUri.replace('<password>', encodedPassword);
    }
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Schema for view count
const counterSchema = new mongoose.Schema({
    page: { type: String, unique: true },
    count: { type: Number, default: 0 },
});
const Counter = mongoose.model('Counter', counterSchema);

// Schema to store hashed IPs with TTL to prevent fraud
const visitSchema = new mongoose.Schema({
    ip: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now, expires: '10m' }, // expire after 10 minutes
});
const Visit = mongoose.model('Visit', visitSchema);

app.post('/api/view', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const hash = crypto.createHash('sha256').update(ip).digest('hex');

        const existing = await Visit.findOne({ ip: hash });
        if (!existing) {
            await Visit.create({ ip: hash });
            await Counter.findOneAndUpdate(
                { page: 'home' },
                { $inc: { count: 1 } },
                { upsert: true }
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/api/count', async (req, res) => {
    try {
        const doc = await Counter.findOne({ page: 'home' });
        res.json({ count: doc ? doc.count : 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Serve static files from dedicated public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
