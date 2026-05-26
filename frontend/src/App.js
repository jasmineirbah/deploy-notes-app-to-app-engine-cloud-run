import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = "https://notes-backend-789849209944.us-central1.run.app";

  // GET NOTES
  const getNotes = async () => {
    const response = await fetch(`${API_URL}/notes`);
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ADD NOTE
  const addNote = async () => {
    if (!title || !content) return;

    await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle("");
    setContent("");

    getNotes();
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });

    getNotes();
  };

  // EDIT NOTE
  const editNote = async () => {
    await fetch(`${API_URL}/notes/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setEditId(null);
    setTitle("");
    setContent("");
    setShowModal(false);

    getNotes();
  };

  // OPEN MODAL
  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1>Notes App</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Masukkan Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Tulis isi catatan..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={addNote}>Tambah Catatan</button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="card" key={note.id}>
            <h3>{note.title}</h3>

            <p>{note.content}</p>

            <div className="button-group">
              <button
                className="edit-btn"
                onClick={() => handleEdit(note)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Catatan</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="button-group">
              <button onClick={editNote}>
                Update
              </button>

              <button
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;