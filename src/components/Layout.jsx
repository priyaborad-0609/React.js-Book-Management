import React from "react";

export default function Layout({ children }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center">📚 Book Management</h1>
      {children}
    </div>
  );
}
