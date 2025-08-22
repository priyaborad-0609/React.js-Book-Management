import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-600">By {book.author}</p>
        <p className="text-xs text-gray-500">{book.year || "N/A"} • {book.isbn || "N/A"}</p>
        {book.description ? <p className="text-sm mt-2 text-gray-700">{book.description}</p> : null}
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(book)} className="text-blue-500 p-2 rounded hover:bg-blue-50"><FaEdit /></button>
        <button onClick={() => onDelete(book.id)} className="text-red-500 p-2 rounded hover:bg-red-50"><FaTrash /></button>
      </div>
    </div>
  );
}
