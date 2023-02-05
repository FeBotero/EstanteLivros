const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
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
  const reservaCollection = db.collection("reserva");
  const usersCollection = db.collection("users");

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });
  // ==============CRUD ==============

  //   ----------------------CREATE------------------
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

  //   ----------------------READ------------------
  app.get("/livros", async function (req, res) {
    const books = await livrosCollection.find().toArray();

    res.send(books);
  });
  //   ----------------------READ BY ID------------------
  app.get("/livros/:id", async function (req, res) {
    const id = req.params.id;
    const books = await livrosCollection.findOne({
      _id: ObjectId(id),
    });
    if (!books) {
      res.status(400).send({
        message: "Livro não encontrado",
      });
    } else {
      res.send(books);
    }
  });

  //   ----------------------UPDATE------------------
  app.put("/livros/:id", async function (req, res) {
    const id = req.params.id;

    const book = req.body;

    await livrosCollection.updateOne({ _id: ObjectId(id) }, { $set: book });

    res.send({ message: "Livro atualizado com sucesso!" });
  });
  //   ----------------------DELETE------------------
  app.delete("/livros/:id", async function (req, res) {
    const id = req.params.id;

    await livrosCollection.deleteOne({ _id: new ObjectId(id) });
    res.send({
      message: "Livro excluído com sucesso!",
    });
  });
  // ======================Reservas=====================
  //   ----------------------CREATE------------------
  app.post("/reservas", async function (req, res) {
    const booking = req.body;

    await reservaCollection.insertOne(booking);

    if (!booking || !booking.bookingName) {
      res.status(400).send({
        message: "Reserva não cadastrada!",
      });
    } else {
      res.send({
        message: "Reserva cadastrada com sucesso!",
      });
    }
  });

  //   ----------------------READ------------------
  app.get("/reservas", async function (req, res) {
    const bookings = await reservaCollection.find().toArray();

    res.send(bookings);
  });
  //   ----------------------READ BY ID------------------
  app.get("/reservas/:id", async function (req, res) {
    const id = req.params.id;
    const bookings = await reservaCollection.findOne({
      _id: ObjectId(id),
    });
    if (!bookings) {
      res.status(400).send({
        message: "Reserva não encontrada!",
      });
    } else {
      res.send(bookings);
    }
  });

  //   ----------------------UPDATE------------------
  app.put("/reservas/:id", async function (req, res) {
    const id = req.params.id;

    const booking = req.body;

    await reservaCollection.updateOne({ _id: ObjectId(id) }, { $set: booking });

    res.send({ message: "Reserva atualizada com sucesso!" });
  });
  //   ----------------------DELETE------------------
  app.delete("/reservas/:id", async function (req, res) {
    const id = req.params.id;

    await reservaCollection.deleteOne({ _id: new ObjectId(id) });
    res.send({
      message: "Reserva excluída com sucesso!",
    });
  });

  // ======================Users=====================
  //   ----------------------CREATE------------------
  app.post("/users", async function (req, res) {
    const user = req.body;

    await usersCollection.insertOne(user);

    if (!user || !user.name) {
      res.status(400).send({
        message: "Usuário não cadastrado!",
      });
    } else {
      res.send({
        message: "Usuário cadastrado com sucesso!",
      });
    }
  });

  //   ----------------------READ------------------
  app.get("/users", async function (req, res) {
    const user = await usersCollection.find().toArray();

    res.send(user);
  });
  //   ----------------------READ BY ID------------------
  app.get("/users/:id", async function (req, res) {
    const id = req.params.id;
    const user = await usersCollection.findOne({
      _id: ObjectId(id),
    });
    if (!user) {
      res.status(400).send({
        message: "Usuário não encontrado!",
      });
    } else {
      res.send(user);
    }
  });

  //   ----------------------UPDATE------------------
  app.put("/users/:id", async function (req, res) {
    const id = req.params.id;

    const user = req.body;

    await usersCollection.updateOne({ _id: ObjectId(id) }, { $set: user });

    res.send({ message: "Usuário atualizado com sucesso!" });
  });
  //   ----------------------DELETE------------------
  app.delete("/users/:id", async function (req, res) {
    const id = req.params.id;

    await usersCollection.deleteOne({ _id: new ObjectId(id) });
    res.send({
      message: "Usuário excluído com sucesso!",
    });
  });

  app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
  });
}

main();
