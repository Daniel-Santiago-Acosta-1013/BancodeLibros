import { createContext, useState, ReactNode, useEffect } from 'react';
import { Book } from '../types/book';
import booksData from '../data/books.json';

interface BookContextType {
  books: Book[];
  updateBookAvailability: (bookId: number, available: boolean, reservedBy?: string | null) => void;
  getBookById: (id: number) => Book | undefined;
  getPhysicalBooks: () => Book[];
  getEbooks: () => Book[];
  getUserBorrowedBooks: (borrowedIds: number[]) => Book[];
  getUserReservedBooks: (reservedIds: number[]) => Book[];
  searchBooks: (query: string, category?: string, type?: 'physical' | 'ebook') => Book[];
}

export const BookContext = createContext<BookContextType>({
  books: [],
  updateBookAvailability: () => {},
  getBookById: () => undefined,
  getPhysicalBooks: () => [],
  getEbooks: () => [],
  getUserBorrowedBooks: () => [],
  getUserReservedBooks: () => [],
  searchBooks: () => [],
});

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(booksData as Book[]);
  }, []);

  const updateBookAvailability = (bookId: number, available: boolean, reservedBy: string | null = null) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, available, reservedBy } : book
    ));
  };

  const getBookById = (id: number) => {
    return books.find(book => book.id === id);
  };

  const getPhysicalBooks = () => {
    return books.filter(book => book.type === 'physical');
  };

  const getEbooks = () => {
    return books.filter(book => book.type === 'ebook');
  };

  const getUserBorrowedBooks = (borrowedIds: number[]) => {
    return books.filter(book => borrowedIds.includes(book.id));
  };

  const getUserReservedBooks = (reservedIds: number[]) => {
    return books.filter(book => reservedIds.includes(book.id));
  };

  const searchBooks = (query: string, category?: string, type?: 'physical' | 'ebook') => {
    return books.filter(book => {
      const matchesType = type ? book.type === type : true;
      const matchesCategory = category ? book.category === category : true;
      const matchesQuery = query.trim() === '' || 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        (book.isbn && book.isbn.includes(query));

      return matchesType && matchesCategory && matchesQuery;
    });
  };

  const contextValue = {
    books,
    updateBookAvailability,
    getBookById,
    getPhysicalBooks,
    getEbooks,
    getUserBorrowedBooks,
    getUserReservedBooks,
    searchBooks
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};
