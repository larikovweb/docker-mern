import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { List } from './List';
import { Form } from './Form';

const baseUrl =
  process.env.NODE_ENV === 'production' ? 'http://62.217.179.82:5050' : 'http://localhost:5050';
const api = axios.create({
  baseURL: baseUrl,
});

function App() {
  const [notes, setNotes] = useState([]);

  async function createNote(text) {
    const note = await api.post('/api/note', { text });
    setNotes([...notes, { ...note.data.note }]);
  }

  const fetchNotes = useCallback(async () => {
    const notes = await api.get('/api/note');
    setNotes(notes.data);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <>
      <nav className="navbar">
        <h1>TES1212T</h1>
        <h3>Docker MERN</h3>
      </nav>
      <div className="container with-nav">
        <Form onCreate={createNote} />
        <List list={notes} />
      </div>
    </>
  );
}

export default App;
