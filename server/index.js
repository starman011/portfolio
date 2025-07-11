const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rate limiter to limit repeated requests to public APIs
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 30, // limit each IP to 30 requests per windowMs
});
app.use(limiter);

// Default to a MongoDB Atlas connection string if no environment variable is provided.
// The password is URI encoded to ensure special characters are handled correctly.
// Example: plain-text password "p@ssw0rd'9'!" becomes "p%40ssw0rd%279%27%21".
const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD || 'Assassin10');
let mongoUri = process.env.MONGO_URI ||
    `mongodb+srv://forprogrammingonly01:${encodedPassword}@cluster0.ojfinsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Replace placeholder password if the user copied the example connection string
if (mongoUri.includes('<password>')) {
    mongoUri = mongoUri.replace('<password>', encodedPassword);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

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

// serve static files if needed
app.use(express.static(__dirname + '/../'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
