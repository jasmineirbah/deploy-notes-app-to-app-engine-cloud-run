const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// GET semua notes
app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});


// TAMBAH note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";

  db.query(sql, [title, content], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "Note added successfully"
      });
    }
  });
});


// EDIT note
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const sql =
    "UPDATE notes SET title=?, content=? WHERE id=?";

  db.query(sql, [title, content, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "Note updated successfully"
      });
    }
  });
});


// HAPUS note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM notes WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "Note deleted successfully"
      });
    }
  });
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});