import React from 'react';
import Layout from './components/Layout';
import BooksList from './features/books/BooksList';

export default function App() {
  return (
    <Layout>
      <BooksList />
    </Layout>
  );
}
