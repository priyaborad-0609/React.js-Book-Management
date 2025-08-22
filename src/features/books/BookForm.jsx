import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "./booksSlice";

export default function BookForm({ existingBook, onClose, onSuccess }) {
  const [form, setForm] = useState({ title: "", author: "", year: "", isbn: "", description: "" });
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => { if (existingBook) setForm(existingBook); }, [existingBook]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      alert("Title and author required");
      return;
    }
    existingBook ? dispatch(updateBook(form)) : dispatch(addBook(form));
    onSuccess();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="border p-2 w-full rounded" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input className="border p-2 w-full rounded" name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <div className="flex gap-2">
        <input className="border p-2 w-1/2 rounded" name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <input className="border p-2 w-1/2 rounded" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
      </div>
      <textarea className="border p-2 w-full rounded" name="description" placeholder="Short description" value={form.description} onChange={handleChange} />
      <div className="flex justify-end gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">{existingBook ? "Update" : "Add"}</button>
      </div>
    </form>

  );
}
