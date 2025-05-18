import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Notification } from '../types/book';

interface AuthContextType {
  currentUser: User | null;
  userBorrowedBooks: number[];
  userReservedBooks: number[];
  notifications: Notification[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addNotification: (message: string) => void;
  markNotificationAsRead: (id: number) => void;
  borrowBook: (bookId: number) => void;
  returnBook: (bookId: number) => void;
  reserveBook: (bookId: number) => void;
  cancelReservation: (bookId: number) => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userBorrowedBooks: [],
  userReservedBooks: [],
  notifications: [],
  login: () => false,
  logout: () => {},
  addNotification: () => {},
  markNotificationAsRead: () => {},
  borrowBook: () => {},
  returnBook: () => {},
  reserveBook: () => {},
  cancelReservation: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState<number[]>([]);
  const [userReservedBooks, setUserReservedBooks] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setUserBorrowedBooks(JSON.parse(localStorage.getItem('userBorrowedBooks') || '[]'));
      setUserReservedBooks(JSON.parse(localStorage.getItem('userReservedBooks') || '[]'));
      setNotifications(JSON.parse(localStorage.getItem('userNotifications') || '[]'));
    }
  }, []);

  // Login function
  const login = (username: string, password: string): boolean => {
    // Check registered users in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as any[];
    const matchedUser = storedUsers.find((u: any) => u.username === username && u.password === password);
    if (matchedUser) {
      const user: User = {
        username: matchedUser.username,
        fullName: matchedUser.fullName,
        email: matchedUser.email,
        department: matchedUser.department,
        memberSince: matchedUser.memberSince,
        avatar: matchedUser.avatar,
      };
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (!localStorage.getItem('userBorrowedBooks')) {
        localStorage.setItem('userBorrowedBooks', JSON.stringify([]));
      }
      if (!localStorage.getItem('userReservedBooks')) {
        localStorage.setItem('userReservedBooks', JSON.stringify([]));
      }
      if (!localStorage.getItem('userNotifications')) {
        localStorage.setItem('userNotifications', JSON.stringify([]));
      }
      addNotification(`Inicio de sesión exitoso a las ${new Date().toLocaleTimeString()}`);
      return true;
    }

    // For demo purposes, hardcoded credentials
    if (username === "testuser" && password === "password123") {
      const user: User = {
        username: username,
        fullName: "Usuario de Prueba",
        email: "test@example.com",
        department: "Ingeniería de Software",
        memberSince: "Enero 2024",
        avatar: "https://placehold.co/150x150/4B5563/FFFFFF?text=TP"
      };
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Initialize empty arrays for books and notifications if first login
      if (!localStorage.getItem('userBorrowedBooks')) {
        localStorage.setItem('userBorrowedBooks', JSON.stringify([]));
      }
      
      if (!localStorage.getItem('userReservedBooks')) {
        localStorage.setItem('userReservedBooks', JSON.stringify([]));
      }
      
      if (!localStorage.getItem('userNotifications')) {
        localStorage.setItem('userNotifications', JSON.stringify([]));
      }
      
      addNotification(`Inicio de sesión exitoso a las ${new Date().toLocaleTimeString()}`);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setUserBorrowedBooks([]);
    setUserReservedBooks([]);
    setNotifications([]);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userBorrowedBooks');
    localStorage.removeItem('userReservedBooks');
    localStorage.removeItem('userNotifications');
  };

  // Add notification
  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
  };

  // Mark notification as read
  const markNotificationAsRead = (id: number) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
  };

  // Borrow a book
  const borrowBook = (bookId: number) => {
    if (!userBorrowedBooks.includes(bookId)) {
      const updatedBorrowedBooks = [...userBorrowedBooks, bookId];
      setUserBorrowedBooks(updatedBorrowedBooks);
      localStorage.setItem('userBorrowedBooks', JSON.stringify(updatedBorrowedBooks));
      addNotification(`Has tomado prestado un nuevo libro (ID: ${bookId})`);
    }
  };

  // Return a book
  const returnBook = (bookId: number) => {
    const updatedBorrowedBooks = userBorrowedBooks.filter(id => id !== bookId);
    setUserBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem('userBorrowedBooks', JSON.stringify(updatedBorrowedBooks));
    addNotification(`Has devuelto un libro (ID: ${bookId})`);
  };

  // Reserve a book
  const reserveBook = (bookId: number) => {
    if (!userReservedBooks.includes(bookId)) {
      const updatedReservedBooks = [...userReservedBooks, bookId];
      setUserReservedBooks(updatedReservedBooks);
      localStorage.setItem('userReservedBooks', JSON.stringify(updatedReservedBooks));
      addNotification(`Has reservado un nuevo libro (ID: ${bookId})`);
    }
  };

  // Cancel reservation
  const cancelReservation = (bookId: number) => {
    const updatedReservedBooks = userReservedBooks.filter(id => id !== bookId);
    setUserReservedBooks(updatedReservedBooks);
    localStorage.setItem('userReservedBooks', JSON.stringify(updatedReservedBooks));
    addNotification(`Has cancelado la reserva de un libro (ID: ${bookId})`);
  };

  const contextValue = {
    currentUser,
    userBorrowedBooks,
    userReservedBooks,
    notifications,
    login,
    logout,
    addNotification,
    markNotificationAsRead,
    borrowBook,
    returnBook,
    reserveBook,
    cancelReservation
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
