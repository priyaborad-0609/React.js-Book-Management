import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "./booksSlice";
import BookItem from "./BookItem";
import Modal from "../../components/Modal";
import BookForm from "./BookForm";
import Toast from "../../components/Toast";

export default function BooksList() {
  const books = useSelector(state => state.books.list);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const handleDelete = (id) => {
    if (confirm('Delete this book?')) {
      dispatch(deleteBook(id));
      showToast("Book deleted!");
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const filtered = books.filter(b =>
    `${b.title} ${b.author} ${b.isbn}`.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = filtered.slice().sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'author') return a.author.localeCompare(b.author);
    if (sortBy === 'oldest') return (a.year || 0) - (b.year || 0);
    return -1; // newest default (keep original order added)
  });

  return (
    <div>
      {toast && <Toast message={toast} />}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Search by title, author, isbn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => { setModalOpen(true); setEditBook(null); }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </div>

      <div className="space-y-3">
        {sorted.length > 0 ? sorted.map(book => (
          <BookItem
            key={book.id}
            book={book}
            onEdit={(b) => { setEditBook(b); setModalOpen(true); }}
            onDelete={handleDelete}
          />
        )) : (
          <div className="text-center text-gray-500 p-8">
            <p className="text-lg">No books yet</p>
            <p className="mt-2">Click "Add Book" to create your first entry.</p>
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <BookForm
            existingBook={editBook}
            onClose={() => setModalOpen(false)}
            onSuccess={() => showToast(editBook ? "Book updated!" : "Book added!")}
          />
        </Modal>
      )}
    </div>
  );
}
