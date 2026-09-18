import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      setError("Failed to load notes. Is the server running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      setError("");
      const res = await axios.post(API_URL, { title, content });
      setNotes((prev) => [res.data, ...prev]);
      setTitle("");
      setContent("");
    } catch (err) {
      setError("Failed to create note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  return (
    <main className="app">
      <header>
        <h1>Student Notes</h1>
        <p>Create, view, and delete notes.</p>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Heading / subject"
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Detailed body text"
          rows={4}
          required
        />

        <button type="submit">Add Note</button>
      </form>

      {error && <p className="status error">{error}</p>}

      <section className="notes-section">
        <h2>All Notes</h2>
        {loading ? (
          <p className="status">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="status empty">No notes yet — add one above!</p>
        ) : (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note._id} className="note-card">
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <time dateTime={note.createdAt}>
                    {new Date(note.createdAt).toLocaleString()}
                  </time>
                </div>
                <button type="button" onClick={() => handleDelete(note._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
