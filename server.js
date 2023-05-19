const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json());

const uri = "mongodb+srv://paoabella08:<password>@cluster0.40xzsku.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("your-database-name"); // Replace with your actual database name

    // API endpoint for retrieving contacts
    app.get('/contacts', async (req, res) => {
      try {
        const contacts = await db.collection('contacts').find().toArray();
        res.json(contacts);
      } catch (error) {
        res.status(500).json({ error });
      }
    });

    // Other API endpoints for CRUD operations can be added here

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
