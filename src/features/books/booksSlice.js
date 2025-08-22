import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadBooks = () => JSON.parse(localStorage.getItem("books") || "[]");
const saveBooks = (books) => localStorage.setItem("books", JSON.stringify(books));

const booksSlice = createSlice({
  name: "books",
  initialState: { list: loadBooks() },
  reducers: {
    addBook: {
      reducer(state, action) {
        state.list.push(action.payload);
        saveBooks(state.list);
      },
      prepare(book) {
        return { payload: { id: nanoid(), ...book } };
      }
    },
    updateBook(state, action) {
      const idx = state.list.findIndex(b => b.id === action.payload.id);
      if (idx >= 0) {
        state.list[idx] = action.payload;
        saveBooks(state.list);
      }
    },
    deleteBook(state, action) {
      state.list = state.list.filter(b => b.id !== action.payload);
      saveBooks(state.list);
    }
  }
});

export const { addBook, updateBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;
