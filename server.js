const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;

const MONGO_URL = 'mongodb://admin:password@mongodb';
const DB_NAME = 'demo_app';
const COLLECTION_NAME = 'users';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let db;

async function connectToMongo() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  db = client.db(DB_NAME);
  console.log('Connected to MongoDB successfully');
}

app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db.collection(COLLECTION_NAME).insertOne({ name, email, createdAt: new Date() });
    res.status(201).json({ message: 'User saved!', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection(COLLECTION_NAME).find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

connectToMongo().then(() => {
  app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});