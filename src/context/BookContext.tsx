import { createContext, useState, ReactNode, useEffect } from 'react';
import { Book } from '../types/book';

// Mock data from the original application
const mockBooks: Book[] = [
  { id: 1, title: "El Laberinto de los Espíritus", author: "Carlos Ruiz Zafón", isbn: "978-8408163397", category: "Ficción", available: true, cover: "https://placehold.co/200x300/A5D6A7/4CAF50?text=Libro+1", description: "El apasionante desenlace de la saga del Cementerio de los Libros Olvidados.", type: "physical" },
  { id: 2, title: "Sapiens: De animales a dioses", author: "Yuval Noah Harari", isbn: "978-6073128680", category: "Historia", available: false, cover: "https://placehold.co/200x300/FFCC80/FF9800?text=Libro+2", description: "Una breve historia de la humanidad, desde los primeros humanos hasta el presente.", type: "physical", reservedBy: null },
  { id: 3, title: "Cien años de soledad", author: "Gabriel García Márquez", isbn: "978-0307474728", category: "Ficción", available: true, cover: "https://placehold.co/200x300/81D4FA/03A9F4?text=Libro+3", description: "La mítica novela que narra la historia de la familia Buendía en Macondo.", type: "physical" },
  { id: 4, title: "Principios de Programación", author: "Ada Lovelace JR.", isbn: "978-1234567890", category: "Tecnología", available: true, cover: "https://placehold.co/200x300/CE93D8/9C27B0?text=Ebook+1", description: "Fundamentos esenciales para aspirantes a desarrolladores.", type: "ebook" },
  { id: 5, title: "Cosmos", author: "Carl Sagan", isbn: "978-0345539434", category: "Ciencia", available: true, cover: "https://placehold.co/200x300/EF9A9A/F44336?text=Libro+4", description: "Un viaje inspirador a través del universo y nuestro lugar en él.", type: "physical" },
  { id: 6, title: "El Arte de la Guerra Digital", author: "Sun Tzu Moderno", isbn: "978-0987654321", category: "Tecnología", available: true, cover: "https://placehold.co/200x300/FFF59D/FFEB3B?text=Ebook+2", description: "Estrategias para el ciberespacio y la seguridad informática.", type: "ebook" },
  { id: 7, title: "Breve Historia del Tiempo", author: "Stephen Hawking", isbn: "978-0553380163", category: "Ciencia", available: true, cover: "https://placehold.co/200x300/B2DFDB/009688?text=Libro+5", description: "Del Big Bang a los agujeros negros, una obra maestra de la divulgación científica.", type: "physical" },
  { id: 8, title: "Diseño Web Adaptativo", author: "Ethan Marcotte II", isbn: "978-1111111111", category: "Tecnología", available: true, cover: "https://placehold.co/200x300/C5E1A5/8BC34A?text=Ebook+3", description: "Principios y prácticas para crear sitios web flexibles y accesibles.", type: "ebook" },
];

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

  // Initialize books
  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  // Update book availability
  const updateBookAvailability = (bookId: number, available: boolean, reservedBy: string | null = null) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, available, reservedBy } : book
    ));
  };

  // Get book by ID
  const getBookById = (id: number) => {
    return books.find(book => book.id === id);
  };

  // Get all physical books
  const getPhysicalBooks = () => {
    return books.filter(book => book.type === 'physical');
  };

  // Get all ebooks
  const getEbooks = () => {
    return books.filter(book => book.type === 'ebook');
  };

  // Get user's borrowed books
  const getUserBorrowedBooks = (borrowedIds: number[]) => {
    return books.filter(book => borrowedIds.includes(book.id));
  };

  // Get user's reserved books
  const getUserReservedBooks = (reservedIds: number[]) => {
    return books.filter(book => reservedIds.includes(book.id));
  };

  // Search books by query and optional category
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
