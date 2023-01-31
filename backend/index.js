const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Connection URL
const url = process.env.URL;
const client = new MongoClient(url);
const dbName = process.env.BDNAME;

async function main() {
  console.log("Conecntando ao bando de dados.");
  await client.connect();
  console.log("Conectado com sucesso no banco de dados.");
  const db = client.db(dbName);
  const livrosCollection = db.collection("Livros");

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });
  // ==============CRUD LIVROS==============
  app.post("/livros", async function (req, res) {
    const book = req.body;

    await livrosCollection.insertOne(book);

    if (!book || !book.name) {
      res.status(400).send({
        message: "Livro não cadastrado",
      });
    } else {
      res.send({
        message: "Livro cadastrado com sucesso",
      });
    }
  });

  app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
  });
}

main();
